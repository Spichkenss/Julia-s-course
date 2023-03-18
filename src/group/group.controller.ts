import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IMessage } from '../utils/message.nterface';
import { GroupEntity } from './entities/group.entity';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

// Декотратор, создающий уровень в эндпоинте
@Controller('group')
export class GroupController {
  // Конструктор, в котором создаем ссылку на сервис для текущего контроллера
  constructor(private readonly groupService: GroupService) {}

  // Создание новой записи в бд
  @Post('create')
  create(
    // Принимаем JSON и записываем в переменную createGroupDto
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<IMessage & { group: GroupEntity }> /* Возвращаемый тип */ {
    // Вызываем метод из сервиса
    return this.groupService.create(createGroupDto);
  }

  // УДаление записи в бд
  @Delete('remove-by-id/:id')
  removeById(
    @Param('id') id: string /* Принимаем параметр из URL */,
  ): Promise<IMessage> /* Возвращаемый тип */ {
    // Вызываем метод из сервиса
    return this.groupService.removeGroupById(+id);
  }

  // Получаем группу по ID
  @Get('get-by-id/:id')
  findById(
    @Param('id') id: string /* Принимаем параметр из URL */,
  ): Promise<GroupEntity> /* Возвращаемый тип */ {
    // Вызываем метод из сервиса
    return this.groupService.findById(+id);
  }

  // Получаем список всех групп
  @Get('get-all')
  findAll(): Promise<GroupEntity[]> /* Возвращаемый тип */ {
    // Вызываем метод из сервиса
    return this.groupService.findAll();
  }
}
