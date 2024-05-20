import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import Aplicativo from '../../domain/entities/aplicativo.entity';

@Injectable()
@Dependencies(getRepositoryToken(Aplicativo))

export class AplicativoRepositoryORM {

  constructor(aplicativos) {
    this.aplicativoRepo = aplicativos;
  }

  async todos() {
    return this.aplicativoRepo.find();
  }
}