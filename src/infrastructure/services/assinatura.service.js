import { Dependencies, Injectable } from '@nestjs/common';
import { AssinaturaRepositoryORM } from '../repositories/assinatura-orm.repository';
import { Assinatura } from '../../domain/entities/assinatura.entity';
import { formatDateToMySQL } from '../../common/utils';

/**
 * @class AssinaturaService
 * @description Serviço de Assinatura
 * @method todasAssinaturas - Retorna todas as assinaturas
 */
@Injectable()
@Dependencies(AssinaturaRepositoryORM)
export class AssinaturaService {
  constructor(assinaturaRepositoryORM) {
    this.assinaturaRepositoryORM = assinaturaRepositoryORM;
  }

  async todasAssinaturas() {
    return this.assinaturaRepositoryORM.todasAssinaturas();
  }

  async criarAssinatura(createAssinaturaDto) {
    const inicioVigencia = new Date();
    const fimVigencia = new Date(inicioVigencia);
    fimVigencia.setDate(inicioVigencia.getDate() + 30);

    const formattedInicioVigencia = formatDateToMySQL(inicioVigencia);
    const formattedFimVigencia = formatDateToMySQL(fimVigencia);

    const assinatura = new Assinatura(
      createAssinaturaDto.codigoAplicativo,
      createAssinaturaDto.codigoCliente,
      formattedInicioVigencia,
      formattedFimVigencia,
    );

    return this.assinaturaRepositoryORM.criarAssinatura(assinatura);
  }

}

module.exports = { AssinaturaService };



