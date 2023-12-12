import { Entity, Column } from 'typeorm';

import Pessoa from './Pessoa';


@Entity('tb_funcionario')
class Funcionario extends Pessoa {

    @Column('varchar')
    numero_ctps: string;

    @Column('varchar')
    numero_pis: string;

}
export default Funcionario;