export class ClienteResponseDto {
  constructor(cliente) {
    this.codigo = cliente.codigo;
    this.nome = cliente.nome;
    this.email = cliente.email;
  }
}
