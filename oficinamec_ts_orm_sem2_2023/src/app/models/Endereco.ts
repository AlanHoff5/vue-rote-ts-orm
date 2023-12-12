import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tb_endereco')
class Endereco {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    rua: string;

    @Column("varchar", { length: 8 })
    cep: string;

    @Column("varchar")
    complemento: string;

}
export default Endereco;