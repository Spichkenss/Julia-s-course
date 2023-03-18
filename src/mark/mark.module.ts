import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '../student/student.module';
import { SubjectModule } from '../subject/subject.module';
import { MarkEntity } from './entities/mark.entity';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MarkEntity]),
    StudentModule, // Тут обязательно надо импортировать этот модуль, чтобы исспользовать StudentService внутри MarkService
    SubjectModule, // Тут обязательно надо импортировать этот модуль, чтобы исспользовать SubjectService внутри MarkService
  ],
  controllers: [MarkController],
  providers: [MarkService],
})
export class MarkModule {}
