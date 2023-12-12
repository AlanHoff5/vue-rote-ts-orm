import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, TableInheritance } from 'typeorm';

import Endereco from '../models/Endereco';

@Entity('tb_pessoa')
@TableInheritance({ column: { type: "varchar", name: "type" } })
abstract class Pessoa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @Column('text')
    senha: string;

    @Column('varchar')
    contato: string;

    @Column('date')
    data_nascimento: Date;

    //coluna opcional, caso nao seja informado data, vai recebere a data corrente.
    @Column('date', { default: () => 'CURRENT_TIMESTAMP' })
    data_cadastro: Date;

    @Column('varchar', { length: 11 })
    cpf: string;

    @Column('varchar', { length: 10 })
    rg: string;

    //associação (flecha)
    @ManyToOne(type => Endereco)
    @JoinColumn({ name: "endereco_id", referencedColumnName: "id" })
    endereco: Endereco;

}
export default Pessoa;