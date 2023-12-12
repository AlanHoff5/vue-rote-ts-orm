<template>
    <div id="tab_aut">

        <div v-if="currentCliente" class="edit-form">
            <h3>Cliente</h3>
            <form>
                <div class="form-group">
                    <label for="inputNickname">Nome:</label>
                    <input type="text" v-model="cliente.nickname" class="form-control" id="inputNome">
                </div>
                <div class="form-group">
                    <label for="inputSenha">Senha:</label>
                    <input type="password" v-model="cliente.senha" class="form-control" id="inputSenha">
                </div>
                <div class="form-group">
                    <label for="inputContato">Contato:</label>
                    <input type="text" v-model="cliente.contato" class="form-control" id="inputContato">
                </div>
                <div class="form-group">
                    <label for="inputDataNasc">Data de nascimento:</label>
                    <input type="text" v-model="cliente.data_nascimento" class="form-control" id="inputDataNasc">
                </div>
                <div class="form-group">
                    <label for="inputCPF">CPF:</label>
                    <input type="text" v-model="cliente.cpf" class="form-control" id="inputCPF">
                </div>
                <div class="form-group">
                    <label for="inputRG">RG:</label>
                    <input type="text" v-model="cliente.rg" class="form-control" id="inputRG">
                </div>
                <div class="form-group">
                    <label for="inputCredito">Crédito:</label>
                    <input type="text" v-model="cliente.credito" class="form-control" id="inputCredito">
                </div>
                <!--SELECT PRA VEICULO-->
                <div class="form-group">
                    <label for="selectVeiculo">Veículos:</label>
                    <select v-model="cliente.veiculo" class="form-control" id="selectVeiculo" multiple>
                        <option v-for="v in veiculos" :key="v.id" v-bind:value="v">
                            {{ v.modelo }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputCep">Cep:</label>
                    <input type="text" v-model="cliente.endereco.cep" class="form-control" id="inputCep">
                </div>
            </form>
            <button class="badge badge-success" @click="updateCliente">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteCliente">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Cliente...</p>
        </div>


    </div>
</template>
<script>

import ClienteDataService from '../../services/ClienteDataService'
import VeiculoDataService from '../../services/VeiculoDataService'

export default {
    name: 'editClientes',
    data() {
        return {
            currentCliente: null,
            message: '',
            veiculos: []
        }
    },
    methods: {

        getCliente(nome) {

            ClienteDataService.get(nome)
                .then(response => {
                    console.log(response.data);
                    this.currentCliente = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        listClientes() {

            ClienteDataService.list().then(response => {

                console.log("Retorno do seviço VeiculoDataService.list", response.status);

                this.veiculos = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço VeiculoDataService.list');
                console.log(response);
            });
        },
        updateCliente() {

            ClienteDataService.update(this.currentCliente)
                .then(response => {
                    console.log('ClienteDataService.update');
                    this.message = 'Cliente alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteCliente() {

            ClienteDataService.delete(this.currentTutorial.nome)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "clientes-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "clientes-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getCliente(this.$route.params.nome);
    }
}
</script>
    
<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>