import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AplicativoRepositoryORM } from '../repositories/aplicativo-orm.repository';
import { AplicativoService } from '../services/aplicativo.service';
import { AplicativoController } from '../controllers/aplicativo.controller';
import { Aplicativo } from '../../domain/entities/aplicativo.entity';


/**
 * @class AplicativoModule
 * @description Módulo de Aplicativo
 */

@Module
({
  imports: [TypeOrmModule.forFeature([Aplicativo])],
  controllers: [AplicativoController],
  providers: [AplicativoRepositoryORM, AplicativoService],
})

export class AplicativoModule {
}
