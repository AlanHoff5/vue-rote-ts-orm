<template>
    <div class="submit-form">
        <div v-if="!submitted">

            <div class="form-group">
                <label for="inputNome">Nome:</label>
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
                <input type="date" v-model="cliente.data_nascimento" class="form-control" id="inputDataNasc">
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

            <!--SELECT PARA VEICULO-->
            <div class="form-group">
                <label for="selectVeiculo">Veículos:</label>
                <select v-model="cliente.veiculo" class="form-control" id="selectVeiculo" multiple>
                    <option v-for="v in veiculos" :key="v.id" v-bind:value="v">
                        {{ v.modelo }}
                    </option>
                </select>
            </div>

            <!-- SELECT PARA ENDERECO-->
            <div class="form-group">
                <label for="selectEndereco">Endereços:</label>
                <select v-model="cliente.endereco" class="form-control" id="selectEndereco" multiple>
                    <option v-for="e in enderecos" :key="e.id" v-bind:value="e">
                        {{ e.rua }}
                    </option>
                </select>
            </div>

            <button @click="saveCliente" class="btn btn-success">Salvar</button>
            <router-link to="/clientes" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newCliente">Novo</button>
            <router-link to="/clientes" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import ClienteDataService from '../../services/ClienteDataService'
import EnderecoDataService from '../../services/EnderecoDataService';
import VeiculoDataService from '../../services/VeiculoDataService'

export default {
    name: "addCliente",
    data() {
        return {
            cliente: {
                id: '',
                nome: '',
                senha: '',
                contato: '',
                data_nascimento: '',
                cpf: '',
                rg: '',
                veiculo: [],
                endereco: [],
            },
            submitted: false,
            veiculos: [],
            enderecos: []
        }
    },
    methods: {

        saveCliente() {

            var cli = jQuery.extend({}, this.cliente);
            var end = jQuery.extend({}, this.cliente.enderecos);
            cli.endereco = end;

            if (cli.nome.trim().length > 0) {

                ClienteDataService.create(cli)
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
        newCliente() {

            this.submitted = false;
            this.cliente = {};
        },
        listVeiculos() {

            VeiculoDataService.list().then(response => {

                console.log("Retorno do seviço VeiculoDataService.list", response.status);

                for (let c of response.data) {

                    this.veiculos.push(c);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço VeiculoDataService.list');
                console.log(response);
            });
        },
        listEnderecos() {

            EnderecoDataService.list().then(response => {

                console.log("Retorno do seviço EnderecoDataService.list", response.status);

                for (let c of response.data) {

                    this.enderecos.push(c);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço EnderecoDataService.list');
                console.log(response);
            });
        }

    },
    mounted() {
        this.listVeiculos();
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