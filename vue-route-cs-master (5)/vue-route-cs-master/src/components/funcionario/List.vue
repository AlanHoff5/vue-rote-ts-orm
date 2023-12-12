<template>
    <div id="tab_aut">
        <div class="col-md-6">
            <h4>Listagem de Funcionarios</h4>
            <table class="table table-striped">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Data de Nascimento</th>
                    <th scope="col">Contato</th>
                    <th scope="col">CPF</th>
                    <th scope="col">RG</th>
                    <th scope="col">CTPS</th>
                    <th scope="col">PIS</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>
                <tbody>
                    <tr v-for="(f, indice) in funcionarios" :key="f.nome" :class="{ active: indice == currentIndex }">
                        <td>{{ f.nome }}</td>
                        <td>{{ f.data_nascimento | formataData }}</td>
                        <td>{{ f.contato }}</td>
                        <td>{{ f.cpf }}</td>
                        <td>{{ f.rg }}</td>
                        <td>{{ f.numero_ctps }}</td>
                        <td>{{ f.numero_pis }}</td>
                        <td>{{ f.endereco.cep }}</td>
                        <td><button v-on:click="setCurrentFuncionario(f, indice)" class="btn" type="button">Alterar</button>
                        </td>
                        <td><button v-on:click="remFuncionario(f, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="col-md-6">
            <div v-if="currentFuncionario">
                <h4>Funcionário</h4>

                <div>
                    <label><strong>Nome:</strong></label> {{ currentFuncionario.nome }}
                </div>
                <div>
                    <label><strong>Senha:</strong></label> {{ currentFuncionario.senha }}
                </div>
                <div>
                    <label><strong>Contato:</strong></label> {{ currentFuncionario.contato }}
                </div>
                <div>
                    <label><strong>Data de nascimento:</strong></label> {{ currentFuncionario.data_nascimento }}
                </div>
                <div>
                    <label><strong>CPF:</strong></label> {{ currentFuncionario.cpf }}
                </div>
                <div>
                    <label><strong>RG:</strong></label> {{ currentFuncionario.rg }}
                </div>
                <div>
                    <label><strong>CTPS:</strong></label> {{ currentFuncionario.numero_ctps }}
                </div>
                <div>
                    <label><strong>PIS:</strong></label> {{ currentFuncionario.numero_pis }}
                </div>
                <div>
                    <label><strong>CEP:</strong></label> {{ currentFuncionario.endereco.cep }}
                </div>

                <a class="badge badge-warning" :href="'/funcionario/' + currentFuncionario.nome">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addfuncionario" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>

import FuncionarioDataService from '../../services/FuncionarioDataService'

export default {
    name: 'listFuncionarios',
    data() {
        return {
            funcionarios: [],
            currentFuncionario: null,
            currentIndex: -1
        }
    },
    methods: {
        listarFuncionarios() {

            FuncionarioDataService.list().then(response => {

                console.log("Retorno do seviço authenticateFuncionario", response.status);

                this.funcionarios = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listfuncionario');
                console.log(response);
            });
        },

        setCurrentFuncionario(funcionario, index) {

            this.currentFuncionario = funcionario;
            this.currentIndex = index;
        },

        //REMOVER UM FUNCIONARIO
        remFuncionario(funcionario, index) {

            FuncionarioDataService.delete(funcionario.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

        },


        refreshList() {
            this.listarFuncionarios();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarFuncionarios();
    }

}
</script>
    
<style scoped>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>