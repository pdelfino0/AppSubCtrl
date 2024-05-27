/**
 * @class UsuarioModule
 * @classdesc Modulo de usuario
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../domain/entities/usuario.entity';
import { UsuarioRepositoryOrm } from '../infrastructure/repositories/usuario.repository';


@Module({
  // Importa o módulo de TypeORM para fornecer a funcionalidade de persistência para a entidade Usuario
  imports: [TypeOrmModule.forFeature([Usuario])],
  // Define os controladores e serviços que fazem parte do módulo
  controllers: [],
  // Define os repositórios e serviços que fazem parte do módulo
  providers: [UsuarioRepositoryOrm],
})
export class UsuarioModule {
}
