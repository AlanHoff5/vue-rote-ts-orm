import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_veiculo')
class Veiculo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    placa: string;

    @Column('varchar')
    cor: string;

    @Column('varchar')
    modelo: string;

    @Column('varchar')
    marca: string;

    @Column('varchar')
    ano: string;

}
export default Veiculo;