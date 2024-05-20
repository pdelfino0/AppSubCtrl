import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from '../infrastructure/controllers/cliente.controller';
import { ClienteRepositoryORM } from '../infrastructure/repositories/cliente-orm.repository';
import { Cliente } from '../domain/entities/cliente.entity';
import { ClienteService } from '../infrastructure/services/cliente.service';

/**
 * @class ClienteModule
 * @description Módulo de Cliente
 */
@Module
({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [ClienteRepositoryORM, ClienteService],

})

export class ClienteModule {
}

