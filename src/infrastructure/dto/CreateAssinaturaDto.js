export class CreateAssinaturaDto {

  /**
   * @param {number} codigoAplicativo
   * @param {number} codigoCliente
   */
  constructor(codigoAplicativo, codigoCliente) {
    this.codigoAplicativo = codigoAplicativo;
    this.codigoCliente = codigoCliente;
  }
}
