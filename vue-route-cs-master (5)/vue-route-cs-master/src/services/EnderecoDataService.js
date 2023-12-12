
import http from "../http-common";

class EnderecoDataService {

    async get(id){

        console.log('EnderecoDataService.get: ', id);
        return await http.get('/endereco/find/' + id);
    }

    async list(){

        console.log('EnderecoDataService.list: ');
        return await http.get(`/endereco/list`);
    }

    async delete(id){

        console.log('EnderecoDataService.delete: ', id);
        return await http.delete(`/endereco/delete/` + id);
    }

    async update(data){

        console.log('EnderecoDataService.update: ', data);
        return await http.post(`/endereco/update/:id`, data);
    }
    
    async create(data){

        console.log('EnderecoDataService.create: ', data);
        return await http.post(`/endereco/store`, data);

    }  

}

export default new EnderecoDataService();
