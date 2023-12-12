<template>
    <div class="submit-form">
        <div v-if="!submitted">

            <div class="form-group">
                <label for="inputPlaca">Placa:</label>
                <input type="text" v-model="veiculo.placa" class="form-control" id="inputPlaca">
            </div>
            <div class="form-group">
                <label for="inputCor">Cor:</label>
                <input type="text" v-model="veiculo.cor" class="form-control" id="inputCor">
            </div>
            <div class="form-group">
                <label for="inputModelo">Modelo:</label>
                <input type="text" v-model="veiculo.modelo" class="form-control" id="inputModelo">
            </div>
            <div class="form-group">
                <label for="inputMarca">Marca:</label>
                <input type="text" v-model="veiculo.marca" class="form-control" id="inputMarca">
            </div>
            <div class="form-group">
                <label for="inputAno">Ano:</label>
                <input type="text" v-model="veiculo.ano" class="form-control" id="inputaAno">
            </div>

            <button @click="saveVeiculo" class="btn btn-success">Salvar</button>
            <router-link to="/veiculos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newVeiculo">Novo</button>
            <router-link to="/veiculos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import VeiculoDataService from '../../services/VeiculoDataService'

export default {
    name: "addveiculo",
    data() {
        return {
            veiculo: {
                indice: '',
                placa: '',
                cor: '',
                modelo: '',
                marca: '',
                ano: 0
            },
            submitted: false
        }
    },
    methods: {

        saveVeiculo() {

            var veic = jQuery.extend({}, this.veiculo);

            if (veic.placa.trim().length > 0 && veic.cor.trim().length > 0 &&
                veic.modelo.trim().length > 0 && veic.marca.trim().length > 0 &&
                veic.ano.trim().length > 0) {

                VeiculoDataService.create(veic)
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
        newVeiculo() {

            this.submitted = false;
            this.veiculo = {};
        },
    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>