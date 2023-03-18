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
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './entities/student.entity';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  // ссылка на сервис
  constructor(private readonly studentService: StudentService) {}

  // создание нового студента
  @Post('create')
  create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<IMessage & { student: StudentEntity }> {
    return this.studentService.create(createStudentDto);
  }

  // получаем студента по ID
  @Get('get-by-id/:id')
  findStudentById(@Param('id') id: string): Promise<StudentEntity> {
    return this.studentService.findStudentById(+id);
  }

  // Получаем всех студентов
  @Get('get-all')
  findAll(): Promise<StudentEntity[]> {
    return this.studentService.findAllStudents();
  }

  // Удаляем студента
  @Delete('remove-by-id/:id')
  removeStudentByUnique(@Param('id') id: string): Promise<IMessage> {
    return this.studentService.removeStudentById(+id);
  }

  // Обновляем поля студента.
  @Patch('update-by-id/:id')
  updateStudentById(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<IMessage & { student: StudentEntity }> {
    return this.studentService.updateStudentById(+id, updateStudentDto);
  }
}
