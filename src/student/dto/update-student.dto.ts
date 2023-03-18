import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

// тип объекта для изменения полей конкретного студента
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
