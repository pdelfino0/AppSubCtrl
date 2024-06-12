/**
 * @class CreatePagamentoDto
 * @description Data transfer object for creating a pagamento
 */
export class CreatePagamentoDto{

  /**
   * @param {Date} dataPagamento
   * @param {number} codAssinatura
   * @param {number} valorPago
   */
  constructor(dataPagamento, codAssinatura, valorPago ) {
    this.dataPagamento = dataPagamento;
    this.codAssinatura = codAssinatura;
    this.valorPago = valorPago;
  }
}
