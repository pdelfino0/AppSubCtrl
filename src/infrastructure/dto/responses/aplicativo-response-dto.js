/**
 * @class AplicativoResponseDto
 * @property {number} codigoAplicativo
 * @property {string} nome
 * @property {number} custoMensal
 *
 */

export class AplicativoResponseDto {

  /**
   * @param aplicativo
   */

  constructor(aplicativo) {
    this.codigoAplicativo = aplicativo.codigo;
    this.nome = aplicativo.nome;
    this.custoMensal = aplicativo.custoMensal;
  }
}