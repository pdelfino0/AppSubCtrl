import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Aplicativo } from './aplicativo.entity';
import { Cliente } from './cliente.entity';


@Entity('Assinatura')
export class Assinatura {
  @PrimaryGeneratedColumn()
  codigo;

  @ManyToOne(() => Aplicativo, { eager: true, nullable: false })
  aplicativo;

  @ManyToOne(() => Cliente, { eager: true, nullable: false })
  cliente;

  @Column('date')
  dataPagamento;

}