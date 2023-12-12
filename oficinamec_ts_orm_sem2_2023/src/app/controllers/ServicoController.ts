import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Servico from '../models/Servico';

class ServicoController {

    // Ele lista todos os possíveis registros da tb_Servico
    async list(req: Request, res: Response) {
        const repository = getRepository(Servico); //Foi importado do typeorm
        const lista = await repository.createQueryBuilder('tb_servico').innerJoinAndSelect("tb_servico.veiculo", "veiculo").innerJoinAndSelect("tb_servico.funcionario", "funcionario").getMany();
        return res.json(lista); //Substitui o metodo sw.get dos cogidos anteriore
    }
    //metodos para inserção, alteração e remoção de Servico

    async store(req: Request, res: Response) {

        const repository = getRepository(Servico);//recupera o repositorio de Endereço
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }

    //store faz tanto a inserção quanto a alteração

    //codigo fonte referente a parate 11.
    async delete(req: Request, res: Response) {

        const repository = getRepository(Servico);//recupera o repositorio do Pessoa.

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

        const repository = getRepository(Servico);//recupera o repositorio do Cliente.

        const { id } = req.body;//extrai os atributos id do corpo da mensagem

        const idExists = await repository.findOne({ where: { id } });//consulta na tabela se existe um registro com o mesmo nickname.

        if (!idExists) {
            return res.sendStatus(404);
        }

        const s = repository.create(req.body); //cria a entidade Cliente

        console.log(s);

        await repository.save(s); //persiste (update) a entidade na tabela.

        return res.json(s);
    }
}

export default new ServicoController();