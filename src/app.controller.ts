import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(): string {
    console.log(process.env.SAMPLE_TEXT);
    return 'Hello nest';
  }
}
