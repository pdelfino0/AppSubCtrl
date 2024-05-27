import { Injectable } from '@nestjs/common';

/**
 * @class BrokerService
 * @description Serviço de Tópico
 * @method subscribe - Inscreve um observador
 * @method notifyAll - Notifica todos os observadores
 * @property observers
 */
@Injectable()

export class BrokerService {
  #observers = [];


  constructor() {
  }

  /**
   * @method subscribe
   * @description Inscreve um observador
   * @param observer
   */
  // Inscreve um observador (Adiciona um observador à lista de observadores)
  subscribe(observer) {
    this.#observers.push(observer);
  }

  /**
   * @method notifyAll
   * @description Notifica todos os observadores
   * @param Evento
   */
  // Notifica todos os observadores (Notifica todos os observadores de um evento,
  //os observadores tem essa função e cada um possui a sua lógica sobre como lidar com o evento notificado
  notifyAll(Evento) {
    this.#observers.forEach(observer => observer.notify(Evento));
  }
}