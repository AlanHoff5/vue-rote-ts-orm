<template>
    <div id="tab_aut">
        <div class="col-md-6">
            <h4>Listagem de Serviços</h4>
            <table class="table table-striped">
                <tr>
                    <th scope="col">Data de entrada</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Veículo</th>
                    <th scope="col">Funcionário</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>
                <tbody>
                    <tr v-for="(s, indice) in servico" :key="s.servico" :class="{ active: indice == currentIndex }">
                        <td>{{ s.data_entrada | formataData }}</td>
                        <td>{{ s.descricao }}</td>
                        <td>{{ s.veiculo.placa }}</td>
                        <td>{{ s.funcionario.nome }}</td>
                        <td><button v-on:click="setCurrentServico(s, indice)" class="btn" type="button">Alterar</button>
                        </td>
                        <td><button v-on:click="remServico(s, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="col-md-6">
            <div v-if="currentServico">
                <h4>Serviço</h4>
                <div>
                    <label><strong>Data de entrada:</strong></label> {{ currentServico.data_entrada }}
                </div>
                <div>
                    <label><strong>Data de Saida:</strong></label> {{ currentServico.data_saida }}
                </div>
                <div>
                    <label><strong>Descrição:</strong></label> {{ currentServico.descricao }}
                </div>
                <div>
                    <label><strong>Pagamento:</strong></label> {{ currentServico.pagamento }}
                </div>
                <div>
                    <label><strong>Veículo:</strong></label> {{ currentServico.veiculo.placa }}
                </div>
                <div>
                    <label><strong>Funcionario:</strong></label> {{ currentServico.funcionario.cpf }}
                </div>

                <a class="badge badge-warning" :href="'/servico/' + currentServico.descricao">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a servico...</p>
                <router-link to="/addservico" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>

import ServicoDataService from '../../services/ServicoDataService'

export default {
    name: 'listServico',
    data() {
        return {
            servico: [],
            currentServico: null,
            currentIndex: -1
        }
    },
    methods: {
        listServico() {

            ServicoDataService.list().then(response => {

                console.log("Retorno do seviço authenticateServico", response.status);

                this.servico = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listservico');
                console.log(response);
            });
        },
        setCurrentServico(servico, index) {

            this.currentServico = servico;
            this.currentIndex = index;
        },
        remServico(servico, index) {

            ServicoDataService.delete(servico.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

        },
        refreshList() {
            this.listServico();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listServico();
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