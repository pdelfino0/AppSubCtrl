import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Aplicativo } from './aplicativo.entity';
import { Cliente } from './cliente.entity';


@Entity('Assinatura')
export class Assinatura {
  @PrimaryGeneratedColumn()
  codigo;

  @ManyToOne(() => Aplicativo, (aplicativo) => aplicativo.codApp, { eager: true })
  codApp;

  @ManyToOne(() => Cliente, (cliente) => cliente.codCli, { eager: true })
  codCli;

  @Column('date')
  dataPagamento;

}