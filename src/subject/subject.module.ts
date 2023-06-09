import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
