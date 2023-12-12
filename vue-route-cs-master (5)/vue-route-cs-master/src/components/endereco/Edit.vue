<template>
    <div id="tab_aut">

        <div v-if="currentEndereco" class="edit-form">
            <h3>Endereço</h3>
            <form>

                <div class="form-group">
                    <label for="inputRua">Rua:</label>
                    <input type="text" v-model="currentEndereco.rua" class="form-control" id="inputRua">
                </div>

                <div class="form-group">
                    <label for="inputCep">cep:</label>
                    <input type="text" v-model="currentEndereco.cep" class="form-control" id="inputCep">
                </div>

                <div class="form-group">
                    <label for="inputComplemento">Complemento:</label>
                    <input type="text" v-model="currentEndereco.complemento" class="form-control" id="inputComplemento">
                </div>

            </form>
            <button class="badge badge-success" @click="updateEndereco">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteEndereco">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>
        </div>
        <div v-else>
            <br />
            <p>Por favor clique em um Veiculo...</p>
        </div>


    </div>
</template>
<script>

import EnderecoDataService from '../../services/EnderecoDataService'


export default {
    name: 'editendereco',
    data() {
        return {
            currentEndereco: null,
            message: ''
        }
    },
    methods: {

        getEndereco(id) {
            console.log("Pegou o ID de veiculos - getVeiculos - edit.vue");
            EnderecoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentEndereco = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateEndereco() {
            console.log("Entrou update Veiculo (edit.vue)");
            EnderecoDataService.update(this.currentEndereco)
                .then(response => {
                    console.log('EnderecoDataService.update');
                    this.message = 'Endereco alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteEndereco() {
            console.log("Entrou delete Endereco (edit.vue)");
            EnderecoDataService.delete(this.currentEndereco.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "endereco-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "endereco-list" });
        },

    },
    mounted() {
        console.log("chegou aqui no mouted")
        this.message = '';
        this.getEndereco(this.$route.params.id);
    }
}
</script>
    
<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>