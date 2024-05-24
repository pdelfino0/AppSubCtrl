import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './modules/cliente.module';
import { AplicativoModule } from './modules/aplicativo.module';
import { AssinaturaModule } from './modules/assinatura.module';

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
    ClienteModule,
    AssinaturaModule,
    AplicativoModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}