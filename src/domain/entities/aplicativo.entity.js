import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Aplicativo')
class Aplicativo {

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