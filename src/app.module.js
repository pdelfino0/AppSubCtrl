import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './domain/entities/Cliente.entity';
import { ClienteRepositoryORM } from './infrastructure/repositories/ClienteORM.repository';
import { ClienteController } from './infrastructure/controller/cliente.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: ***REMOVED***,
      username: 'root',
      password: 'my-secret-pw',
      database: 'AppSubCtrlDatabase',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Cliente]),
  ],
  controllers: [ClienteController],
  providers: [ClienteRepositoryORM],
})
export class AppModule {}