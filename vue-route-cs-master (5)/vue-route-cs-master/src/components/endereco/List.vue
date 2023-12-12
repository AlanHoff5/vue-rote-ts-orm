<template>
    <div id="tab_aut">
        <div class="col-md-6">
            <h4>Listagem de Endereços</h4>
            <table class="table table-striped">
                <tr>
                    <th scope="col">Rua</th>
                    <th scope="col">CEP</th>
                    <th scope="col">Complemento</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>
                <tbody>
                    <tr v-for="(e, indice) in endereco" :key="e.endereco" :class="{ active: indice == currentIndex }">
                        <td>{{ e.rua }}</td>
                        <td>{{ e.cep }}</td>
                        <td>{{ e.complemento }}</td>
                        <td><button v-on:click="setCurrentEndereco(e, indice)" class="btn" type="button">Alterar</button>
                        </td>
                        <td><button v-on:click="remEndereco(e, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="col-md-6">
            <div v-if="currentEndereco">
                <h4>Endereço</h4>
                <div>
                    <label><strong>Rua:</strong></label> {{ currentEndereco.rua }}
                </div>
                <div>
                    <label><strong>CEP:</strong></label> {{ currentEndereco.cep }}
                </div>
                <div>
                    <label><strong>Complemento:</strong></label> {{ currentEndereco.complemento }}
                </div>
                <a class="badge badge-warning" :href="'/endereco/find/' + currentEndereco.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Endereço...</p>
                <router-link to="/addendereco" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>

import EnderecoDataService from '../../services/EnderecoDataService'

export default {
    name: 'listEnderecos',
    data() {
        return {
            endereco: [],
            currentEndereco: null,
            currentIndex: -1
        }
    },
    methods: {
        listEnderecos() {

            EnderecoDataService.list().then(response => {

                console.log("Retorno do seviço authenticateEndereco", response.status);

                this.endereco = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listendereco');
                console.log(response);
            });
        },
        setCurrentEndereco(endereco, index) {

            this.currentEndereco = endereco;
            this.currentIndex = index;
        },

        remEndereco(endereco, index) {

            EnderecoDataService.delete(endereco.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

        },


        refreshList() {
            this.listEnderecos();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listEnderecos();
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