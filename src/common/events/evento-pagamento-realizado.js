/**
 * @class EventoPagamentoRealizado
 * @description Evento de Assinatura Renovada
 * @property {Date} dataRenovacao
 * @property {string} codAss
 * @property {string} valorPago
 */
export class EventoPagamentoRealizado {


  /**
   * @constructor EventoPagamentoRealizado
   * @param createPagamentoDto
   */
  constructor(createPagamentoDto) {
    this.dataPagamento = createPagamentoDto.dataPagamento;
    this.codAss = createPagamentoDto.codAssinatura;
    this.valorPago = createPagamentoDto.valorPago
  }

}