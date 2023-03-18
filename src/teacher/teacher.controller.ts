import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { IMessage } from '../utils/message.nterface'
import { CreateTeacherDto } from './dto/create-teacher.dto'
import { TeacherEntity } from './entities/teacher.entity'
import { TeacherService } from './teacher.service'

@Controller('teacher')
export class TeacherController {

  // ссылка на сервис
  constructor(private readonly teacherService: TeacherService) {
  }

  // создаем учителя
  @Post('create')
  create(
    @Body() createTeacherDto: CreateTeacherDto
  ): Promise<IMessage & { teacher: TeacherEntity }> {
    return this.teacherService.create(createTeacherDto)
  }

  // выводим список всех учителей
  @Get('get-all')
  findAll() {
    return this.teacherService.findAll()
  }

  // ищем учителя по ID
  @Get('get-by-id/:id')
  findById(@Param('id') id: string) {
    return this.teacherService.findById(+id)
  }
}
