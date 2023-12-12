<template>
    <div class="submit-form">
        <div v-if="!submitted">

            <div class="form-group">
                <label for="inputDt_entrada">Data de entrada:</label>
                <input type="date" v-model="servico.data_entrada" class="form-control" id="inputDt_entrada">
            </div>
            <div class="form-group">
                <label for="inputDt_saida">Data de saída:</label>
                <input type="date" v-model="servico.data_saida" class="form-control" id="inputDt_saida">
            </div>
            <div class="form-group">
                <label for="inputDescricao ">descrição:</label>
                <input type="text" v-model="servico.descricao" class="form-control" id="inputDescricao">
            </div>
            <div class="form-group">
                <label for="inputPagamento">Pagamento:</label>
                <input type="text" v-model="servico.pagamento" class="form-control" id="inputPagamento">
            </div>

            <div class="form-group">
                <label for="selectFuncionario">Funcionários:</label>
                <select v-model="servico.funcionario" class="form-control" id="selectFuncionario" multiple>
                    <option v-for="f in funcionario" :key="f.id" v-bind:value="f">
                        {{ f.cpf }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="selectVeiculo">Veiculos:</label>
                <select v-model="servico.veiculo" class="form-control" id="selectVeiculo" multiple>
                    <option v-for="v in veiculo" :key="v.id" v-bind:value="v">
                        {{ v.placa }}
                    </option>
                </select>
            </div>

            <button @click="saveServico" class="btn btn-success">Salvar</button>
            <router-link to="/servico" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newServico">Novo</button>
            <router-link to="/servico" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import FuncionarioDataService from '../../services/FuncionarioDataService';
import ServicoDataService from '../../services/ServicoDataService'
import VeiculoDataService from '../../services/VeiculoDataService'


export default {
    name: "addservico",
    data() {
        return {
            servico: {
                indice: '',
                data_entrada: '',
                data_saida: '',
                descricao: '',
                pagamento: '',
                funcionario: {},
                veiculo: {},
            },
            submitted: false,
            
            funcionario: [],
            veiculo: []
        }
    },
    methods: {

        saveServico() {

            var serv = jQuery.extend({}, this.servico);

            if (serv.data_entrada.trim().length > 0) {

                ServicoDataService.create(serv)
                    .then(response => {

                        this.submitted = true;
                    })
                    .catch(s => {
                        alert("Erro ao tentar cadastrar. !!! " + s.message);

                    })

            } else {
                alert('Formulário incompleto !!!');
            }

        },
        newServico() {

            this.submitted = false;
            this.servico = {};
        },
        listVeiculos() {

            VeiculoDataService.list().then(response => {

                console.log("Retorno do seviço VeiculoDataService.list", response.status);

                for (let v of response.data) {

                    this.veiculo.push(v);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço VeiculoDataService.list');
                console.log(response);
            });
        },

        listFuncionario() {
            FuncionarioDataService.list().then(response => {

                console.log("Retorno do seviço FuncionarioDataService.list", response.status);

                for (let f of response.data) {

                    this.funcionario.push(c);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço CompradorDataService.list');
                console.log(response);
            });
        },

        mounted() {
            this.listVeiculos();
            this.listFuncionario();
            this.listServico();

        }
    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>