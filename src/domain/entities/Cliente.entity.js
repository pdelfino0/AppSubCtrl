import { Column, Entity, PrimaryColumn } from 'typeorm';

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