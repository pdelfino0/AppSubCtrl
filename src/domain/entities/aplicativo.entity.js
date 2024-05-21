import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * @class Aplicativo
 * @description Entidade Aplicativo
 * @property {int} codigo Código do aplicativo
 * @property {string} nome Nome do aplicativo
 * @property {float} custoMensal Custo mensal do aplicativo
 */
@Entity('Aplicativo')
export class Aplicativo {
  @PrimaryColumn('int')
  codigo;
  @Column('varchar')
  nome;
  @Column('float')
  custoMensal;

  constructor(codigo, nome, custoMensal) {
    this.codigo = codigo;
    this.nome = nome;
    this.custoMensal = custoMensal;
  }

}

module.exports = { Aplicativo };