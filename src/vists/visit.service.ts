import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { StudentService } from '../student/student.service'
import { IsEmpty } from '../utils/helpers'
import { CreateVisitDto } from './dto/create-visit.dto'
import { VisitEntity } from './entities/visit.entity'

@Injectable()
export class VisitService {
  constructor(
    // ссылка на таблицу в бд
    @InjectRepository(VisitEntity)
    private readonly visitRepository: Repository<VisitEntity>,
    // сссылка на сервис стундетов
    private readonly studentService: StudentService
  ) {
  }

  // создание посещения
  async create(createVisitDto: CreateVisitDto): Promise<VisitEntity> {
    // прверяем, есть ли ваще такой студент
    await this.studentService.findStudentById(createVisitDto.studentId)

    // создаем
    const visit = await this.visitRepository.create({
      student: { id: createVisitDto.studentId }
    })

    // сохраняем
    return await this.visitRepository.save(visit)
  }

  // выводим все посещения
  async findAll(): Promise<VisitEntity[]> {
    // ищем
    const visits = await this.visitRepository.find()
    // если список пуст, выдаем ошибку
    if (IsEmpty(visits)) throw new BadRequestException('Список посещений пуст')
    return visits
  }

  // поиск всех посещений конкретного студнента
  async findAllByStudentId(studentId: number): Promise<VisitEntity[]> {
    await this.studentService.findStudentById(studentId) // прверяем, есть ли ваще такой студент

    // ищем его посещения
    const visits = await this.visitRepository.find({
      where: { student: { id: studentId } }
    })
    // если список пуст, выдаем ошибку
    if (IsEmpty(visits)) throw new BadRequestException('Список посещений пуст')

    return visits
  }
}
