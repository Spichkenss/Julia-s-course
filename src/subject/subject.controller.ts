import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectEntity } from './entities/subject.entity';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subject')
export class SubjectController {
  // ссылка на сервис
  constructor(private readonly subjectService: SubjectService) {}

  // создание дисциплины
  @Post('create')
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  // получение списка дисциплин
  @Get('get-all')
  findAll(): Promise<SubjectEntity[]> {
    return this.subjectService.findAll();
  }

  // поиск конкретной дисциплины
  @Get('get-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findByID(+id);
  }
}
