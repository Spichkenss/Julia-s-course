import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MarkService } from './mark.service';
import { CreateMarkDto } from './dto/create-mark.dto';

@Controller('mark')
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  // Метод создания нвоой оценки
  @Post('create')
  create(@Body() createMarkDto: CreateMarkDto) {
    return this.markService.create(createMarkDto);
  }

  // Метод поиска всех оценок конкретного студента
  @Get('by-student-id/:id')
  findAllByStudentId(@Param('id') studentId: string) {
    return this.markService.findAllByStudentId(+studentId);
  }
}
