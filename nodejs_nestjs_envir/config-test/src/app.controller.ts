/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE');
    return message;
  }

  @Get('service-url')
  getServiceUrl(): string | undefined {
    return this.configService.get('SERVICE_URL');
  }

  @Get('db-info')
  getTest(): string | undefined {
    console.log(this.configService.get('logLevel'));
    console.log(this.configService.get('apiVersion'));
    return this.configService.get('dbInfo');
  }
}
