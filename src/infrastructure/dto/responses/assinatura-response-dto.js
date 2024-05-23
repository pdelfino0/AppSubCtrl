import { AssinaturaService } from '../../services/assinatura.service';

/**
 * @class
 * @classdesc DTO para resposta de assinatura
 * @param {string} codigoAplicativo
 * @param {string} codigoCliente
 * @param {Date} inicioVigencia
 * @param {Date} fimVigencia
 * @param {string} status
 */
export class AssinaturaResponseDto {
  constructor(assinatura) {
    this.codigoAplicativo = assinatura.aplicativo.codigo || assinatura.codigo;
    this.codigoCliente = assinatura.cliente.codigo || assinatura.codigo;
    this.inicioVigencia = assinatura.inicioVigencia;
    this.fimVigencia = assinatura.fimVigencia;
    this.status = AssinaturaService.getStatusAssinatura(assinatura.fimVigencia);
  }
}