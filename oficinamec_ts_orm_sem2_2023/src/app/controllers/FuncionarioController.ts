import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Funcionario from '../models/Funcionario';

class FuncionarioController {

    //LOGIN DE FUNCIONARIO
    async login(req: Request, res: Response) {
        const repository = getRepository(Funcionario);

        const { cpf, senha } = req.body;
        const j = await repository.findOne(
            { where: { "cpf": cpf, "senha": senha } });

        if (j) {
            //  res.sendStatus(201);
            return res.json(j);
        } else {
            return res.sendStatus(204);
        }
    }

    // Ele lista todos os possíveis registros da tb_local
    async list(req: Request, res: Response) {
        const repository = getRepository(Funcionario); //Foi importado do typeorm
        const lista = await repository.createQueryBuilder('tb_funcionario').innerJoinAndSelect("tb_funcionario.endereco", "endereco").getMany();
        return res.json(lista); //Substitui o metodo sw.get dos cogidos anteriores
    }

    async store(req: Request, res: Response) {
        const repository = getRepository(Funcionario);//recupera o repositorio de Endereço
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }

    //store faz tanto a inserção quanto a alteração

    //codigo fonte referente a parte 11.
    async delete(req: Request, res: Response) {

        const repository = getRepository(Funcionario);//recupera o repositorio do Pessoa.

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

        const repository = getRepository(Funcionario);//recupera o repositorio do Cliente.

        const { id } = req.body;//extrai os atributos id do corpo da mensagem

        const idExists = await repository.findOne({ where: { id } });//consulta na tabela se existe um registro com o mesmo nickname.

        if (!idExists) {
            return res.sendStatus(404);
        }

        const f = repository.create(req.body); //cria a entidade Cliente

        await repository.save(f); //persiste (update) a entidade na tabela.

        return res.json(f);
    }
}

export default new FuncionarioController();