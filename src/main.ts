import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'


async function bootstrap() {
  // создаем приложение
  const app = await NestFactory.create(AppModule)
  // устанвливаем глобальный префикс (то что будет после порта хоста http://localhost:3000/api)
  app.setGlobalPrefix('api')
  // говорим серваку, чтоб он встал на 3000 порт
  await app.listen(3000)
}

bootstrap()
