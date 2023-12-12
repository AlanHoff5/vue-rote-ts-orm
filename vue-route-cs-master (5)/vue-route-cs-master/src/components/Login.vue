<template>
    <div id="tab_aut">
        <h3>Autenticacação</h3>
        <form>
            <div class="form-outline mb-4">
                <label class="form-label" for="inputACpf">CPF:</label>
                <input class="form-control" type="text" v-model="funcionario.cpf" id="inputACpf">
            </div>

            <div class="form-outline mb-4">
                <label class="form-label" for="inputASenha">Senha:</label>
                <input class="form-control" type="password" v-model="funcionario.password" id="inputASenha">
            </div>

            <button class="btn btn-primary" @click='createFuncionarioForm()' type="button">Autenticar</button>
            <button class="btn btn-primary" @click='clearForm()' type="button">Limpar</button>
        </form>
    </div>
</template>

<script>

import FuncionarioDataService from '../services/FuncionarioDataService'

export default {
    name: 'login',
    data() {
        return {
            funcionario: { cpf: '', password: '' }
        }
    },
    methods: {
        createFuncionarioForm() {

            console.log('chamou o createFuncionarioForm');

            const f = {
                cpf: this.funcionario.cpf,
                senha: this.funcionario.password
            }

            FuncionarioDataService.authenticate(f).then(response => {

                console.log("Retorno do seviço authenticatefuncionario", response.status);
                if (response.status == 201 || response.status == 200) {

                    alert('funcionario ' + response.data.cpf + ' authenticate com sucesso');

                    this.setAuthenticated({ cpf: response.data.cpf })

                    this.$router.push({ name: "home" });

                } else if (response.status == 204) {

                    alert('cpf ou senha inválidos ! ');
                }

                this.clearForm();
            }
            ).catch(response => {

                // error callback
                alert('Não conectou no serviço authenticatefuncionario ' + response);
                // console.log(response);
            });


        },
        clearForm() {
            this.funcionario.cpf = "";
            this.funcionario.password = "";
        },
        setAuthenticated(funcionario) {

            localStorage.setItem('authUser', JSON.stringify(funcionario));

        }

    }

}
</script>
   
<style scoped></style>