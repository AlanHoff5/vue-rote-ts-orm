<template>
    <div id="tab_aut">
        <div class="col-md-6">
            <h4>Listagem de Veiculos</h4>
            <table class="table table-striped">
                <tr>
                    <th scope="col">Placa</th>
                    <th scope="col">Cor</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Ano</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Remover</th>
                </tr>
                <tbody>
                    <tr v-for="(v, indice) in veiculo" :key="v.veiculo" :class="{ active: indice == currentIndex }">
                        <td>{{ v.placa }}</td>
                        <td>{{ v.cor }}</td>
                        <td>{{ v.modelo }}</td>
                        <td>{{ v.marca }}</td>
                        <td>{{ v.ano }}</td>
                        <td><button v-on:click="setCurrentVeiculo(v, indice)" class="btn" type="button">Alterar</button>
                        </td>
                        <td><button v-on:click="remVeiculo(v, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="col-md-6">
            <div v-if="currentVeiculo">
                <h4>Veiculo</h4>
                <div>
                    <label><strong>Placa:</strong></label> {{ currentVeiculo.placa }}
                </div>
                <div>
                    <label><strong>Cor:</strong></label> {{ currentVeiculo.cor }}
                </div>
                <div>
                    <label><strong>Modelo:</strong></label> {{ currentVeiculo.modelo }}
                </div>
                <div>
                    <label><strong>Marca:</strong></label> {{ currentVeiculo.marca }}
                </div>
                <div>
                    <label><strong>Ano:</strong></label> {{ currentVeiculo.ano }}
                </div>

                <a class="badge badge-warning" :href="'/veiculo/update/' + currentVeiculo.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a veiculo...</p>
                <router-link to="/addveiculo" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>

import VeiculoDataService from '../../services/VeiculoDataService'

export default {
    name: 'listVeiculo',
    data() {
        return {
            veiculo: [],
            currentVeiculo: null,
            currentIndex: -1
        }
    },
    methods: {
        listVeiculo() {

            VeiculoDataService.list().then(response => {

                console.log("Retorno do seviço authenticate veiculo", response.status);

                this.veiculo = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listVeiculo');
                console.log(response);
            });
        },
        setCurrentVeiculo(veiculo, index) {

            this.currentVeiculo = veiculo;
            this.currentIndex = index;
        },
        remVeiculo(veiculo, index) {

            VeiculoDataService.delete(veiculo.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

        },
        refreshList() {
            this.listVeiculo();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listVeiculo();
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