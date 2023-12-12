<template>
    <div id="tab_aut">

        <div v-if="currentFuncionario" class="edit-form">
            <h3>Funcionário</h3>
            <form>
                <div class="form-group">
                    <label for="inputNome">Nome:</label>
                    <input type="text" v-model="funcionario.nome" class="form-control" id="inputNome">
                </div>
                <div class="form-group">
                    <label for="inputSenha">Senha:</label>
                    <input type="password" v-model="funcionario.senha" class="form-control" id="inputSenha">
                </div>
                <div class="form-group">
                    <label for="inputContato">Contato:</label>
                    <input type="number" v-model="funcionario.contato" class="form-control" id="inputContato">
                </div>
                <div class="form-group">
                    <label for="inputData_nascimento">Data de nascimento:</label>
                    <input type="date" v-model="funcionario.data_nascimento" class="form-control" id="inputCep">
                </div>
                <div class="form-group">
                    <label for="inputCPF">CPF:</label>
                    <input type="text" v-model="funcionario.cpf" class="form-control" id="inputCpf">
                </div>
                <div class="form-group">
                    <label for="inputRg">RG:</label>
                    <input type="text" v-model="funcionario.rg" class="form-control" id="inputRg">
                </div>
                <div class="form-group">
                    <label for="inputCtps">Número CTPS:</label>
                    <input type="text" v-model="funcionario.numero_ctps" class="form-control" id="inputCtps">
                </div>
                <div class="form-group">
                    <label for="inputPis">Número Pis:</label>
                    <input type="text" v-model="funcionario.numero_pis" class="form-control" id="inputPis">
                </div>

                <!-- Associação de endereço e funcionario -->
                <div class="form-group">
                    <label for="selectEndereco">Endereço:</label>
                    <select v-model="funcionario.endereco" class="form-control" id="selectEndereco" multiple>
                        <option v-for="e in enderecos" :key="e.codigo" v-bind:value="e">
                            {{ e.rua }}
                        </option>
                    </select>

                </div>


            </form>
            <button class="badge badge-success" @click="updateFuncionario">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteFuncionario">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Funcionario...</p>
        </div>


    </div>
</template>
<script>

import FuncionarioDataService from '../../services/FuncionarioDataService'
//import PatenteDataService from '../../services/PatenteDataService'

export default {
    name: 'editFuncionarios',
    data() {
        return {
            currentFuncionario: null,
            message: '',
        }
    },
    methods: {

        getFuncionario(nome) {

            FuncionarioDataService.get(nome)
                .then(response => {
                    console.log(response.data);
                    this.currentFuncionario = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },

        //LISTAGEM DE ENDEREÇOS 
        listEnderecos() {

            EnderencoDataService.list().then(response => {

                console.log("Retorno do seviço PatenteDataService.list", response.status);

                this.enderecos = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço PatenteDataService.list');
                console.log(response);
            });
        },

        //EDITAR FUNCIONARIO
        updateFuncionario() {

            FuncionarioDataService.update(this.currentFuncionario)
                .then(response => {
                    console.log('FuncionarioDataService.update');
                    this.message = 'funcionario alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },

        //DELETAR FUNCIONÁRIO
        deleteFuncionario() {

            FuncionarioDataService.delete(this.currentTutorial.nome)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "funcionarios-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "funcionarios-list" });
        }
    },
    mounted() {

        this.message = '';
        this.listEnderecos();
        this.getFuncionario(this.$route.params.nome);
    }
}
</script>
    
<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>