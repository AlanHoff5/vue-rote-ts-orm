<template>
    <div class="submit-form">
        <div v-if="!submitted">

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

            <button @click="savefuncionario" class="btn btn-success">Salvar</button>
            <router-link to="/funcionarios" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newfuncionario">Novo</button>
            <router-link to="/funcionarios" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import EnderecoDataService from '../../services/EnderecoDataService';
import FuncionarioDataService from '../../services/FuncionarioDataService';

export default {
    name: "addfuncionario",
    data() {
        return {
            funcionario: {
                indice: '',
                nome: '',
                senha: '',
                contato: '',
                data_nascimento: '',
                //data_cadastro: '',
                endereco: []

            },
            submitted: false,
            enderecos: []
        }
    },
    methods: {

        savefuncionario() {

            var jgd = jQuery.extend({}, this.funcionario);//clona o this.novo_funcionario e armazena na variavel funcionario. dessa forma alteracoes em this.novo_funcionario nao irao refletir em funcionario.
            var end = jQuery.extend({}, this.funcionario.endereco);//clona o this.novo_funcionario.endereco                        
            jgd.endereco = end;

            if (jgd.nome.trim().length > 0 && jgd.senha.trim().length > 0) {

                FuncionarioDataService.create(jgd)
                    .then(response => {

                        this.submitted = true;
                    })
                    .catch(e => {
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

            } else {
                alert('Formulário incompleto !!!');
            }

        },
        newfuncionario() {

            this.submitted = false;
            this.funcionario = {};
        },


        listEnderecos() {

            EnderecoDataService.list().then(response => {

                console.log("Retorno do seviço EnderecoDataService.list", response.status);
                for (let j of response.data) {

                    this.enderecos.push(j);
                }

            }).catch(response => {

                //error callback
                alert('Não conectou no serviço EnderecoDataService.list');
                console.log(response);
            });
        }

    },
    mounted() {
        this.listEnderecos();

    }


}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>