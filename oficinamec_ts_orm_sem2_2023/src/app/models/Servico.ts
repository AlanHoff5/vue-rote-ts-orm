import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import Funcionario from './Funcionario';
import Veiculo from './Veiculo';
@Entity('tb_servico')
class Servico {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('date')
    data_entrada: Date;

    @Column('date')
    data_saida: Date;

    @Column('text')
    descricao: string;

    @Column('text')
    pagamento: string;

    //associação.
    @ManyToOne(type => Veiculo)
    @JoinColumn({ name: "veiculo_id", referencedColumnName: "id" })
    veiculo: Veiculo;

    //associação.
    @ManyToOne(type => Funcionario)
    @JoinColumn({ name: "funcionario_id", referencedColumnName: "id" })

    funcionario: Funcionario;
}
export default Servico;