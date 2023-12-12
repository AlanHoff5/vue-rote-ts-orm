import { Router } from 'express';
import EnderecoController from './app/controllers/EnderecoController';
import ClienteController from './app/controllers/ClienteController';
import FuncionarioController from './app/controllers/FuncionarioController';
import ServicoController from './app/controllers/ServicoController';
import VeiculoController from './app/controllers/VeiculoController';

const router = Router();

//criando  rotas para.
// http://localhost:3000/endereco/...
router.get('/endereco/list', EnderecoController.list);//define uma rota ... 
router.post('/endereco/store', EnderecoController.store);//define uma rota vai método post para chamar o método store da classe EnderecoController
router.delete('/endereco/delete/:id', EnderecoController.delete);//define uma rota ...
router.post('/endereco/update', EnderecoController.update);

// http://localhost:3000/cliente/...
router.get('/cliente/list', ClienteController.list);//define uma rota ... 
router.post('/cliente/store', ClienteController.store);//define uma rota vai método post para chamar o método store da classe EnderecoController
router.delete('/cliente/delete/:id', ClienteController.delete);//define uma rota ...
router.post('/cliente/login', ClienteController.login);
router.post('/cliente/update', ClienteController.update);

// http://localhost:3000/funcionario/
router.get('/funcionario/list', FuncionarioController.list);
router.post('/funcionario/store', FuncionarioController.store);
router.delete('/funcionario/delete/:id', FuncionarioController.delete);
router.post('/funcionario/login', FuncionarioController.login);
router.post('/funcionario/update', FuncionarioController.update);

//router.post('/jogador/login', PessoaController.login);
//router.post('/pessoa/update', PessoaController.update);

// http://localhost:3000/servico/...
router.get('/servico/list', ServicoController.list);//define uma rota ... 
router.post('/servico/store', ServicoController.store);//define uma rota vai método post para chamar o método store da classe PatenteController
router.delete('/servico/delete/:id', ServicoController.delete);//define uma rota ...
router.post('/servico/update', ServicoController.update);

// http://localhost:3000/veiculo/...
router.get('/veiculo/list', VeiculoController.list);//define uma rota ... 
router.post('/veiculo/store', VeiculoController.store);//define uma rota vai método post para chamar o método store da classe PatenteController
router.delete('/veiculo/delete/:id', VeiculoController.delete);//define uma rota ...
router.post('/veiculo/update', VeiculoController.update);

export default router;