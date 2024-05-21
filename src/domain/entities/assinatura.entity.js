import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Aplicativo } from './aplicativo.entity';
import { Cliente } from './cliente.entity';


@Entity('Assinatura')
export class Assinatura {
  @PrimaryGeneratedColumn() codigo;

  @ManyToOne(() => Aplicativo, { eager: true, nullable: false })
  aplicativo;

  @ManyToOne(() => Cliente, { eager: true, nullable: false })
  cliente;

  @Column('date') inicioVigencia;
  @Column('date') fimVigencia;

  constructor(aplicativo, cliente, inicioVigencia, fimVigencia) {
    this.aplicativo = aplicativo;
    this.cliente = cliente;
    this.inicioVigencia = inicioVigencia;
    this.fimVigencia = fimVigencia;
  }

}