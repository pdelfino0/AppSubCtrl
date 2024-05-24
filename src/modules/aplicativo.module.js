import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AplicativoRepositoryORM } from '../infrastructure/repositories/aplicativo-orm.repository';
import { AplicativoService } from '../infrastructure/services/aplicativo.service';
import { AplicativoController } from '../infrastructure/controllers/aplicativo.controller';
import { Aplicativo } from '../domain/entities/aplicativo.entity';

/**
 * @class AplicativoModule
 * @description Módulo responsável por prover a funcionalidade de aplicativo.
 */


@Module
({
  imports: [TypeOrmModule.forFeature([Aplicativo])],
  controllers: [AplicativoController],
  providers: [AplicativoRepositoryORM, AplicativoService],
})

export class AplicativoModule {
}
