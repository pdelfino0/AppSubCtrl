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
  // Retorna todos os aplicativos
  async getTodosAplicativos() {
    return this.aplicativoRepo.getTodosAplicativos();
  }

  /**
   * @method atualizarCustoMensal
   * @param {UpdateCustoMensalAplicativoDto} updateCustoMensalAplicativoDto
   * @param {string} codigoAplicativo
   * @returns {AplicativoResponseDto} aplicativoResponseDto
   */
  // Atualiza o custo mensal de um aplicativo
  async atualizarCustoMensal(updateCustoMensalAplicativoDto, codigoAplicativo) {
    // Busca o aplicativo pelo código
    const aplicativo = await this.aplicativoRepo.findOneById(codigoAplicativo);
    // Atualiza o custo mensal fixando 2 casas decimais
    aplicativo.custoMensal = parseFloat(updateCustoMensalAplicativoDto.custoMensal).toFixed(2);
    // Atualiza o aplicativo
    const aplicativoAtualizado = await this.aplicativoRepo.atualizar(aplicativo);
    // Retorna o aplicativo atualizado
    return new AplicativoResponseDto(aplicativoAtualizado);
  }

  /**
   * @method getCustoMensal
   * @description Retorna o custo mensal de um aplicativo
   * @param codigoAplicativo
   * @returns {Promise<number>}
   */
  //Retorna o custo mensal de um aplicativo
  async getCustoMensal(codigoAplicativo) {
    //Busca o aplicativo pelo código
    const aplicativo = await this.aplicativoRepo.findOneById(codigoAplicativo);
    //Atualiza o custo mensal do aplicativo recém encontrado
    return aplicativo.custoMensal;
  }

  /**
   * @method isValorPagoEqualCustoMensal
   * @description Verifica se o valor pago é igual ao custo mensal
   * @param codigoAplicativo
   * @param valorPago
   * @returns {Promise<boolean>}
   */
  //Verifica se o valor pago é igual ao custo mensal
  async isValorPagoEqualCustoMensal(codigoAplicativo, valorPago) {
    //Busca o aplicativo pelo código
    const aplicativo = await this.aplicativoRepo.findOneById(codigoAplicativo);
    //Retorna se o valor pago é igual ao custo mensal
    return parseFloat(valorPago) === parseFloat(aplicativo.custoMensal);
  }
}