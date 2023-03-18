import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from '../group/group.module';
import { StudentEntity } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity]), GroupModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService], // Обязательно экспортируем, чтоб использовать в других модулях
})
export class StudentModule {}
