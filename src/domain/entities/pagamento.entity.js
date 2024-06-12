import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Assinatura } from './assinatura.entity';

/**
 * @class Pagamento
 * @description Entidade de Pagamento
 *  @property {number} codigo Código do pagamento
 *  @property {number} codAssinatura Codigo da assinatura
 *  @property {float} valorPago Valor pago
 *  @Date {Date} dataPagamento Data do pagamento
 */

@Entity('Pagamento')
export class Pagamento {
  @PrimaryGeneratedColumn() codigo;
  //Relacao de muitos para um, onde uma assinatura pode ter varios pagamentos
  @ManyToOne(() => Assinatura, { eager: true, nullable: false })
  assinatura;
  @Column('float') valorPago;
  @Column('date')
  dataPagamento;

  constructor(assinatura, valorPago, dataPagamento) {
    this.assinatura = assinatura;
    this.valorPago = valorPago;
    this.dataPagamento = dataPagamento;
  }
}

module.exports = { Pagamento };