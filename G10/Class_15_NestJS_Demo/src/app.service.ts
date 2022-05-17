import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { id: '123', firstName: 'Goce' };
  }
}
