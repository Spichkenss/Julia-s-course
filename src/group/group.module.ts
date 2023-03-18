import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

// Корневой файл отдельного модуля
@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity])], // Не знаю, как это правильно назвать, но без этого бд не будет знать, что у нее должа быть такая сущность
  controllers: [GroupController], // Тут массив контроллеров. Обычно сюда передаются только контроллеры текущего модуля.
  providers: [GroupService], // Тут массив сервисов
  exports: [GroupService], // Тут мы экспортируем модуль, чтобы использовать его сервис в сервисах других модулей. Такая строка есть не во всех модулях, потому что не все сервисы нужно было использовать вне своего модуля
})
export class GroupModule {}
