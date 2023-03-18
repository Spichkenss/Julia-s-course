import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IsEmpty } from '../utils/helpers'
import { IMessage } from '../utils/message.nterface'
import { CreateTeacherDto } from './dto/create-teacher.dto'
import { TeacherEntity } from './entities/teacher.entity'

@Injectable()
export class TeacherService {
  constructor(
    // Ссылка на таблицу в бд
    @InjectRepository(TeacherEntity)
    private readonly teacherRepository: Repository<TeacherEntity>
  ) {
  }

  // Кидаем ошибку, если нашли учителя
  private throwErrorIfTeacherExists(teacher: TeacherEntity) {
    if (teacher)
      throw new BadRequestException('Такой преподаватель уже существует')
  }

  // Кидаем ошибку, если не нашли учителя
  private throwErrorIfTeacherDoesntExist(teacher: TeacherEntity) {
    if (!teacher)
      throw new BadRequestException(
        'Преподавателя с таким уникальным номером не существует'
      )
  }

  // Ищем учителя по уникальному номеру (что-то типа номера студака)
  private async findByUnique(uniqueCode: string) {
    return await this.teacherRepository.findOne({
      where: { uniqueCode }
    })
  }

  // создание учителя
  async create(
    createTeacherDto: CreateTeacherDto
  ): Promise<IMessage & { teacher: TeacherEntity }> {
    // ищем по уник коду
    const foundTeacher = await this.findByUnique(createTeacherDto.uniqueCode)
    // если нашли, кидаем ошибку
    this.throwErrorIfTeacherExists(foundTeacher)

    // создаем новый экземпляр
    const teacher = await this.teacherRepository.create({
      ...createTeacherDto
    })

    // возвращаем и сохраняем
    return {
      teacher: await this.teacherRepository.save(teacher),
      message: 'Преподаватель был успешно создан'
    }
  }

  // поиск всех учителей
  async findAll() {
    // ищем
    const teachers = await this.teacherRepository.find()
    if (IsEmpty(teachers))
      // ошибка, если список пуст
      throw new BadRequestException('Список преподавателей пуст')
    return teachers
  }

  // поиск учителя по Id
  async findById(id: number): Promise<TeacherEntity> {
    // ищем
    const teacher = await this.teacherRepository.findOne({ where: { id } })
    // кидаем ошибку, если не нашли
    this.throwErrorIfTeacherDoesntExist(teacher)
    return teacher
  }
}
