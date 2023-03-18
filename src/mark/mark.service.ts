import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentService } from '../student/student.service';
import { SubjectService } from '../subject/subject.service';
import { IsEmpty } from '../utils/helpers';
import { CreateMarkDto } from './dto/create-mark.dto';
import { MarkEntity } from './entities/mark.entity';

@Injectable()
export class MarkService {
  constructor(
    // Ссылка на таблицу в бд
    @InjectRepository(MarkEntity)
    private readonly markRepository: Repository<MarkEntity>,
    // Ниже инжектим внешние сервисы
    private readonly studentService: StudentService,
    private readonly subjectService: SubjectService,
  ) {}

  // Создаем оценку
  async create(createMarkDto: CreateMarkDto): Promise<MarkEntity> {
    // Две строки внизу проверяют существует ли студент, которому мы хотим поставить оценку, и предмет, по которому ставим оценку
    await this.studentService.findStudentById(createMarkDto.studentId);
    await this.subjectService.findByID(createMarkDto.subjectId);
    // Если чего-то нет, то останавливаемся

    // Сздаем новую оценку
    const mark = await this.markRepository.create({
      ...createMarkDto,
      subject: { id: createMarkDto.subjectId },
      student: { id: createMarkDto.studentId },
    });

    // Сохраняем и возвращаем
    return await this.markRepository.save(mark);
  }

  // Поиск всех оценок конкртеного студента
  async findAllByStudentId(studentId: number): Promise<MarkEntity[]> {
    // Проверяем, есть ли такой студент в базе
    await this.studentService.findStudentById(studentId);
    // ищем все его оценки
    const marks = await this.markRepository.find({
      where: { student: { id: studentId } },
      relations: { subject: true },
    });

    // Если оценок нет, то кидаем ошибку о том, что Список оценок пуст
    if (IsEmpty(marks)) throw new BadRequestException('Список оценок пуст');
    return marks;
  }
}
