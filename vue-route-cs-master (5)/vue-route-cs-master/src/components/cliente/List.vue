<template>
    <div id="tab_aut">
        <div class="col-md-6">
            <h4>Listagem de Clientes</h4>
            <table class="table table-striped">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Data de Nascimento</th>
                    <th scope="col">Contato</th>
                    <th scope="col">CPF</th>
                    <th scope="col">RG</th>
                    <th scope="col">Crédito</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>
                <tbody>
                    <tr v-for="(c, indice) in cliente" :key="c.cliente" :class="{ active: indice == currentIndex }">
                        <td>{{ c.nome }}</td>
                        <td>{{ c.data_nascimento | formataData }}</td>
                        <td>{{ c.contato }}</td>
                        <td>{{ c.cpf }}</td>
                        <td>{{ c.rg }}</td>
                        <td>{{ c.credito }}</td>
                        <td>{{ c.endereco.cep }}</td>
                        <td><button v-on:click="setCurrentCliente(c, indice)" class="btn" type="button">Alterar</button>
                        </td>
                        <td><button v-on:click="remCliente(c, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="col-md-6">
            <div v-if="currentCliente">
                <h4>Cliente</h4>
                <div>
                    <label><strong>Nome:</strong></label> {{ currentCliente.nome }}
                </div>
                <div>
                    <label><strong>Senha:</strong></label> {{ currentCliente.senha }}
                </div>
                <div>
                    <label><strong>Contato:</strong></label> {{ currentCliente.contato }}
                </div>
                <div>
                    <label><strong>Data de nascimento:</strong></label> {{ currentCliente.data_nascimento }}
                </div>
                <div>
                    <label><strong>CPF:</strong></label> {{ currentCliente.cpf }}
                </div>
                <div>
                    <label><strong>RG:</strong></label> {{ currentCliente.rg }}
                </div>
                <div>
                    <label><strong>Crédito:</strong></label> {{ currentCliente.credito }}
                </div>
                <div>
                    <label><strong>CEP:</strong></label> {{ currentCliente.endereco.cep }}
                </div>

                <a class="badge badge-warning" :href="'/cliente/' + currentCliente.nome">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Cliente...</p>
                <router-link to="/addcliente" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>

import ClienteDataService from '../../services/ClienteDataService'

export default {
    name: 'listClientes',
    data() {
        return {
            cliente: [],
            currentCliente: null,
            currentIndex: -1
        }
    },
    methods: {
        listClientes() {

            ClienteDataService.list().then(response => {

                console.log("Retorno do seviço authenticateCliente", response.status);

                this.cliente = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listcliente');
                console.log(response);
            });
        },
        setCurrentCliente(cliente, index) {

            this.currentCliente = cliente;
            this.currentIndex = index;
        },
        remCliente(cliente, index) {

            ClienteDataService.delete(cliente.nome)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

        },
        refreshList() {
            this.listClientes();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listClientes();
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