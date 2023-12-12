<template>
    <div class="submit-form">
        <div v-if="!submitted">

            <div class="form-group">
                <label for="inputRua">Rua:</label>
                <input type="text" v-model="endereco.rua" class="form-control" id="inputRua">
            </div>
            <div class="form-group">
                <label for="inputCEP">CEP:</label>
                <input type="text" v-model="endereco.cep" class="form-control" id="inputCEP">
            </div>
            <div class="form-group">
                <label for="inputComplemento">Complemento:</label>
                <input type="text" v-model="endereco.complemento" class="form-control" id="inputComplemento">
            </div>

            <button @click="saveEndereco" class="btn btn-success">Salvar</button>
            <router-link to="/enderecos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newEndereco">Novo</button>
            <router-link to="/enderecos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import EnderecoDataService from '../../services/EnderecoDataService'

export default {
    name: "addendereco",
    data() {
        return {
            endereco: {
                indice: '',
                rua: '',
                cep: '',
                complemento: '',
            },
            submitted: false
        }
    },
    methods: {

        saveEndereco() {

            var end = jQuery.extend({}, this.endereco);

            if (end.rua.trim().length > 0 && end.cep.trim().length > 0 &&
                end.complemento.trim().length > -1) {

                EnderecoDataService.create(end)
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
        newEndereco() {

            this.submitted = false;
            this.endereco = {};
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