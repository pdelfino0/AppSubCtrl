import { Module } from '@nestjs/common';
import { AssinaturasValidasService } from '../infrastructure/services/assinaturas-validas.service';
import { AssinaturasValidasController } from '../infrastructure/controllers/assinaturas-validas.controller';
import { AssinaturasValidasCache } from '../infrastructure/services/assinaturas-validas-cache.service';
import { AssinaturaModule } from './assinatura.module';

//Modulo de Assinaturas Válidas
@Module({
  //Modulo de Assinaturas
  imports: [AssinaturaModule],
  //Controllers de Assinaturas Válidas
  controllers: [AssinaturasValidasController],
  //Providers de Assinaturas Válidas
  providers: [AssinaturasValidasService, AssinaturasValidasCache],
  //Exporta o serviço de Assinaturas Válidas
  exports: [AssinaturasValidasService],
})

export class AssinaturasValidasModule {
}