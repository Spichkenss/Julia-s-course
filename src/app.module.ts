import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VisitModule } from '././vists/visit.module'
import { AppController } from './app.controller'
import { GroupModule } from './group/group.module'
import { MarkModule } from './mark/mark.module'
import { StudentModule } from './student/student.module'
import { SubjectModule } from './subject/subject.module'
import { TeacherModule } from './teacher/teacher.module'

// Корневой модуль приложения. тут подрубаемся к бд и ипортируем сюда все модули
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'attendance-tracker',
      autoLoadEntities: true,
      synchronize: true
    }),
    StudentModule,
    GroupModule,
    TeacherModule,
    VisitModule,
    SubjectModule,
    MarkModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {
}
