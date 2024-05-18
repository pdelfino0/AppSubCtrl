import { Controller, Dependencies, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@Dependencies(AppService, ClientService)
export class AppController {
  constructor(appService, clientService) {
    this.appService = appService;
    this.clientService = clientService;
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('servcad/clientes')
  @getClientes(){

  }
}
