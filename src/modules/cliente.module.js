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
  // Importa o módulo de TypeORM para fornecer a funcionalidade de persistência para a entidade Cliente
  imports: [TypeOrmModule.forFeature([Cliente])],
  // Define os controladores e serviços que fazem parte do módulo
  controllers: [ClienteController],
  // Define os repositórios e serviços que fazem parte do módulo
  providers: [ClienteRepositoryORM, ClienteService],

})

export class ClienteModule {
}

