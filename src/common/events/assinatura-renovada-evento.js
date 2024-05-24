/**
 * @class AssinaturaRenovadaEvento
 * @description Evento de Assinatura Renovada
 * @property {Date} dataRenovacao
 * @property {string} codAss
 * @property {string} valorPago
 */
export class AssinaturaRenovadaEvento {
  constructor(dataRenovacao, codAss, valorPago) {
    this.dataPagamento = dataRenovacao;
    this.codAss = codAss;
    this.valorPago = valorPago;
  }
}