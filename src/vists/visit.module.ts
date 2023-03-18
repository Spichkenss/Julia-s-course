import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '../student/student.module';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { VisitEntity } from './entities/visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitEntity]), StudentModule],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
