import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Veiculo from '../models/Veiculo';

class VeiculoController {

    // Ele lista todos os possíveis registros da tb_mapa
    async list(req: Request, res: Response) {
        const repository = getRepository(Veiculo); //Foi importado do typeorm
        const lista = await repository.find(); // find() é uma especie de select | o await serve para o banco aguardar o banco terminar o processo e retonrar as informações para poder continuar o processo no script
        return res.json(lista); //Substitui o metodo sw.get dos cogidos anteriores
    }
    //metodos para inserção, alteração e remoção de Mapa

    async store(req: Request, res: Response) {

        const repository = getRepository(Veiculo);//recupera o repositorio de Endereço
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }

    //store faz tanto a inserção quanto a alteração

    //codigo fonte referente a parate 11.
    async delete(req: Request, res: Response) {

        const repository = getRepository(Veiculo);//recupera o repositorio do Pessoa.

        const id = req.params.id;//extrai os atributos nickname e endereco do corpo da mensagem.

        const idExists = await repository.findOne({ where: { id } });//consulta na tabela se existe um registro com o mesmo nickname da mensagem.

        if (idExists) {

            await repository.remove(idExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
            return res.sendStatus(204);//retorna o coigo 204.

        } else {

            return res.sendStatus(404);//se nao encontrar Pessoa para remover, retorna o codigo 404.
        }
    }

    async update(req: Request, res: Response) {

        const repository = getRepository(Veiculo);//recupera o repositorio do Cliente.

        const { id } = req.body;//extrai os atributos id do corpo da mensagem

        const idExists = await repository.findOne({ where: { id } });//consulta na tabela se existe um registro com o mesmo nickname.

        if (!idExists) {
            return res.sendStatus(404);
        }

        const v = repository.create(req.body); //cria a entidade Cliente

        await repository.save(v); //persiste (update) a entidade na tabela.

        return res.json(v);
    }
}

export default new VeiculoController();