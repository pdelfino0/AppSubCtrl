import { Dependencies, Injectable } from '@nestjs/common';
import { AplicativoRepositoryORM } from '../repositories/aplicativo-orm.repository';
import { AplicativoResponseDto } from '../../common/dto/responses/aplicativo-response-dto';

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
   * @method getTodosAplicativos
   * @description Retorna todos os aplicativos
   * @returns {Promise<AplicativoResponseDto[]>}
   */
  async getTodosAplicativos() {
    return this.aplicativoRepo.todos();
  }

  /**
   * @method atualizarCustoMensal
   * @param {UpdateCustoMensalAplicativoDto} updateCustoMensalAplicativoDto
   * @param {string} codigoAplicativo
   * @returns {AplicativoResponseDto} aplicativoResponseDto
   */
  async atualizarCustoMensal(updateCustoMensalAplicativoDto, codigoAplicativo) {
    const aplicativo = await this.aplicativoRepo.findOneById(codigoAplicativo);
    aplicativo.custoMensal = parseFloat(updateCustoMensalAplicativoDto.custoMensal).toFixed(2);
    const aplicativoAtualizado = await this.aplicativoRepo.atualizar(aplicativo);
    return new AplicativoResponseDto(aplicativoAtualizado);
  }

  /**
   * @method getCustoMensal
   * @description Retorna o custo mensal de um aplicativo
   * @param codigoAplicativo
   * @returns {Promise<number>}
   */
  async getCustoMensal(codigoAplicativo) {
    const aplicativo = await this.aplicativoRepo.findOneById(codigoAplicativo);
    return aplicativo.custoMensal;
  }

  /**
   * @method isValorPagoEqualCustoMensal
   * @description Verifica se o valor pago é igual ao custo mensal
   * @param codigoAplicativo
   * @param valorPago
   * @returns {Promise<boolean>}
   */
  async isValorPagoEqualCustoMensal(codigoAplicativo, valorPago) {
    const aplicativo = await this.aplicativoRepo.findOneById(codigoAplicativo);
    return parseFloat(valorPago) === parseFloat(aplicativo.custoMensal);
  }
}