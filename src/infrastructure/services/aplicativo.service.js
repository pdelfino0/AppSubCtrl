import { Dependencies, Injectable } from '@nestjs/common';
import { AplicativoRepositoryORM } from '../repositories/aplicativo-orm.repository';
import { AplicativoResponseDto } from '../dto/responses/aplicativo-response-dto';

/**
 * @class AplicativoService
 * @description Serviço de Aplicativo
 * @method todos - Retorna todos os aplicativos
 */
@Injectable()
@Dependencies(AplicativoRepositoryORM)
export class AplicativoService {
  constructor(aplicativoRepositoryORM) {
    this.aplicativoRepo = aplicativoRepositoryORM;
  }

  /**
   * @method todos
   * @returns {Promise<Aplicativo[]>}
   */
  async todos() {
    return this.aplicativoRepo.todos();
  }

  /**
   * @method atualizarCustoMensal
   * @param {UpdateCustoMensalAplicativoDto} updateCustoMensalAplicativoDto
   * @param {string} codigoAplicativo
   * @returns {AplicativoResponseDto}
   */
  async atualizarCustoMensal(updateCustoMensalAplicativoDto, codigoAplicativo) {
    const aplicativo = await this.aplicativoRepo.findOneById();
    aplicativo.custoMensal = parseFloat(updateCustoMensalAplicativoDto.custoMensal).toFixed(2);
    const aplicativoAtualizado = await this.aplicativoRepo.atualizar(aplicativo);
    return new AplicativoResponseDto(aplicativoAtualizado);
  }
}