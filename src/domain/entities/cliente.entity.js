import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * @class Cliente
 * @description Entidade Cliente
 * @property {number} codigo - Código do cliente
 * @property {string} nome - Nome do cliente
 * @property {string} email - E-mail do cliente
 */
@Entity('Cliente')
export class Cliente {
  @PrimaryColumn('int')
  codigo;
  @Column('varchar')
  nome;
  @Column('varchar')
  email;

  constructor(codigo, nome, email) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
  }
}

module.exports = { Cliente };