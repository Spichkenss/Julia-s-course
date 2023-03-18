import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateVisitDto } from './dto/create-visit.dto'
import { VisitEntity } from './entities/visit.entity'
import { VisitService } from './visit.service'

@Controller('visit')
export class VisitController {
  // ссылка на сервис
  constructor(private readonly visitService: VisitService) {
  }

  // создание посещения
  @Post('create')
  create(@Body() createVisitDto: CreateVisitDto): Promise<VisitEntity> {
    return this.visitService.create(createVisitDto)
  }

  // вывод всех посещений
  @Get('get-all')
  findAll(): Promise<VisitEntity[]> {
    return this.visitService.findAll()
  }

  // получаем посещения конкретног остудента
  @Get('by-student-id/:id')
  findAllByStudentId(@Param('id') studentId: string): Promise<VisitEntity[]> {
    return this.visitService.findAllByStudentId(+studentId)
  }
}
