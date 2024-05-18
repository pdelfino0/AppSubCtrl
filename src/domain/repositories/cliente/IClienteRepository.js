/**
 * Interface que define os métodos que devem ser implementados pelo repositório de cliente.
 * @interface
 */
class IClienteRepository {
  /**
   * Obtém todos os clientes.
   * @returns {Cliente[]} Uma lista de clientes.
   */
  getClients() {
    throw new Error('Method not implemented.');
  }
}