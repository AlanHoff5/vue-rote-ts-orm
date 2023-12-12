import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/Login'
import home from  '@/components/Home'
import listFuncionarios from  '@/components/funcionario/List'
import editFuncionario   from  '@/components/funcionario/Edit'
import novoFuncionario   from  '@/components/funcionario/Add'

import listCliente from  '@/components/cliente/List'
import novoCliente from '@/components/cliente/Add'
import editCliente from '@/components/cliente/Edit'


import listEndereco from '@/components/endereco/List'
import novoEndereco from '@/components/endereco/Add'
import editEndereco from '@/components/endereco/Edit'


import listServico from '@/components/servico/List'
import novoServico from '@/components/servico/Add'
import editServico from '@/components/servico/Edit'

import listVeiculo from '@/components/veiculo/List'
import novoVeiculo from '@/components/veiculo/Add'
import editVeiculo from '@/components/veiculo/Edit'


//import listPatentes from  '@/components/patente/List'


Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },

    //LOGIN, ADICIONAR, DELETAR E EDITAR DE FUNCIONARIO
    {
      path: '/funcionario/login',
      name: 'login',
      component: login
    },
    {
        path: '/funcionarios',
        name: 'funcionarios-list',
        component: listFuncionarios    
     },
    ,
    {
      path: '/funcionario/:nome',
      name: "funcionario-edit",
      component: editFuncionario
    },
    {
      path: '/addfuncionario',
      name: "funcionario-add",
      component: novoFuncionario
    },
    // FINAL DE FUNCIONARIO


    //ADICIONAR, DELETAR E EDITAR DE CLIENTE
    {
      path: '/cliente',
      name: 'ciente-list',
      component: listCliente
    },
    {
      path: '/addcliente',
      name: "cliente-add",
      component: novoCliente
    },
    {
      path: '/cliente/find/:id',
      name: "update-edit",
      component: editCliente
    },
    

    //ENDERECO
    {
      path: '/enderecos',
      name: 'endereco-list',
      component: listEndereco
    },
    {
      path: '/addendereco',
      name: "endereco-add",
      component: novoEndereco
    },
    {
      path: '/endereco/find/:id',
      name: "update-edit",
      component: editEndereco
    },


    //SERVICO
    {
      path: '/servicos',
      name: 'servico-list',
      component: listServico
    },
    {
      path: '/addservico',
      name: "servico-add",
      component: novoServico
    },
    {
      path: '/servico/find/:id',
      name: "update-edit",
      component: editServico
    },

    //VEICULO
    {
      path: '/veiculos',
      name: 'veiculo-list',
      component: listVeiculo
    },
    ,
    {
      path: '/veiculo/update/:id',
      name: "veiculo-edit",
      component: editVeiculo
    },
    {
      path: '/addveiculo',
      name: "veiculo-add",
      component: novoVeiculo
    }
  ]
})

router.beforeEach((to, from, next) => {
    
  if (to.name !== 'login' && !localStorage.getItem('authUser')){
     next({name: 'login'})
  } else {
     next()
  }
  
})

export default router;