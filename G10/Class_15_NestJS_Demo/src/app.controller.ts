import { Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';

// http:/localhost:3000/
@Controller('/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  // @Header('Content-Type', 'text/html')
  getHello(): any {
    return this.appService.getHello();
  }
}
