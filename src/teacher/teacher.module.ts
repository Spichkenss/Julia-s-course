import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from './entities/teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
