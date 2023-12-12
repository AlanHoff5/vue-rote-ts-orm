
import http from "../http-common";

class FuncionarioDataService {
    async get(id){

        console.log('FuncionarioDataService.get: ', id);
        return await http.get('/funcionario/find/' + id);
    }


    async authenticate(data){

        console.log('FuncionarioDataService.authenticate: ', data);
        const response = await http.post(`/funcionario/login`, data);
        return response;
    }

    async get(cpf){

        console.log('FuncionarioDataService.get: ', cpf);
        return await http.get('/funcionario/' + cpf);
    }

    async list(){

        console.log('FuncionarioDataService.list: ');
        return await http.get(`/funcionario/list`);
    }

    async delete(id){

        console.log('FuncionarioDataService.delete: ', id);
        return await http.delete(`/funcionario/delete` + id);
    }

    async update(data){

        console.log('FuncionarioDataService.update: ', data);
        return await http.post(`/funcionario/update`, data);
    }
    
    async create(data){

        console.log('FuncionarioDataService.create: ', data);
        return await http.post(`/funcionario/store`, data);

    }  

}

export default new FuncionarioDataService();
