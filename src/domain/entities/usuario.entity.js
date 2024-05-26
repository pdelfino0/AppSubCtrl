import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * @class Usuario
 * @description Entidade Usuario
 * @property {string} usuario Nome do usuario
 * @property {string} senha Senha do usuario
 */

@Entity('Usuario')
export class Usuario {
  @PrimaryColumn('varchar')
  usuario;
  @Column('varchar')
  senha;

  constructor(usuario, senha) {
    this.usuario = usuario;
    this.senha = senha;
  }

}

module.exports = { Usuario };