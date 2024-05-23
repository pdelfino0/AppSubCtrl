/**
 * @class
 * @classdesc DTO para resposta de assinatura
 * @param {string} codigoAplicativo
 * @param {string} codigoCliente
 * @param {Date} inicioVigencia
 * @param {Date} fimVigencia
 * @param {string} tipo
 */
export class AssinaturaResponseDto {
  constructor(assinatura) {
    this.codigoAplicativo = assinatura.aplicativo.codigo;
    this.codigoCliente = assinatura.cliente.codigo;
    this.inicioVigencia = assinatura.inicioVigencia;
    this.fimVigencia = assinatura.fimVigencia;
    this.tipo = new Date(assinatura.fimVigencia) < new Date() ? 'CANCELADA' : 'ATIVA';
  }
}