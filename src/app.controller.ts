import { Controller, Get } from '@nestjs/common'

// тестовый контроллер чтоб по адресу http://localhost:3000/api/test проверить работу серва
@Controller('test')
export class AppController {
  @Get()
  getHello(): string {
    return 'Сервак работает'
  }
}
