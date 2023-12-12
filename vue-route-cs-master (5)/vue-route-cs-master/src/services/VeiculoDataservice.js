
import http from "../http-common";

class VeiculoDataService {

    async get(id){

        console.log('VeiculoDataService.get: ', id);
        return await http.get('/veiculo/find/' + id);
    }

    async list(){

        console.log('VeiculoDataService.list: ');
        return await http.get(`/veiculo/list`);
    }

    async delete(id){

        console.log('VeiculoDataService.delete: ', id);
        return await http.delete(`/veiculo/delete/` + id);
    }

    async update(data){

        console.log('VeiculoDataServsice.update: ', data);
        return await http.post(`/veiculo/update/:id`, data);
    }
    
    async create(data){

        console.log('veiculoDataService.create: ', data);
        return await http.post(`/veiculo/store`, data);

    }  

}

export default new VeiculoDataService();
