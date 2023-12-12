import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import Veiculo from '../models/Veiculo';
import Pessoa from './Pessoa';


@Entity('tb_cliente')
class Cliente extends Pessoa {

    @Column('varchar')
    credito: string;

    @ManyToMany(() => Veiculo)
    @JoinTable({
        name: "tb_cliente_veiculo",
        joinColumn: {
            name: "cliente_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "veiculo_id",
            referencedColumnName: "id"
        }
    })
    veiculo: Veiculo[];
}
export default Cliente;