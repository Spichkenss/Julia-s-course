import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupService } from '../group/group.service';
import { IsEmpty } from '../utils/helpers';
import { IMessage } from '../utils/message.nterface';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    private readonly groupService: GroupService,
  ) {}

  // Кидаем ошибку, если нашли существующего студента. Это при добавлении нового
  private throwErrorIfStudentExists(student: StudentEntity) {
    if (student) throw new BadRequestException('Такой студент уже существует');
  }

  // Кидаем ошибку, если не нашли студента
  private throwErrorIfStudentDoesntExist(student: StudentEntity) {
    if (!student)
      throw new BadRequestException('Такого студента не существует');
  }

  // СОздаем студента
  public async create(
    createStudentDto: CreateStudentDto,
  ): Promise<IMessage & { student: StudentEntity }> {
    // Проверяем существует ли студент в базе
    const foundStudent = await this.findOneByUniqueCode(
      createStudentDto.uniqueCode,
    );
    // кидаем ошибку, если существует
    this.throwErrorIfStudentExists(foundStudent);

    // Ищем группу по заданному номеру
    const foundGroup = await this.groupService.findOneByGroupName(
      createStudentDto.groupName,
    );

    // Если такой группы нет, то кидаем ошибку
    this.groupService.throwErrorIfGroupDoesntExist(foundGroup);

    // После получения группы, в которую мы зачислим студента, создадим самого студента
    const newStudent = this.studentRepository.create({
      ...createStudentDto,
      group: foundGroup,
    });

    // Сохраняем нового студента в базе
    const student = await this.studentRepository.save(newStudent);

    return { message: 'Студент был успешно создан', student };
  }

  // поиск по уникальному коду. т.к. при добавлении студента у него еще нет ID, искать можем только так
  async findOneByUniqueCode(uniqueCode: string): Promise<StudentEntity> {
    // Возвращает студента по его уникальному номеру
    const student = await this.studentRepository.findOne({
      where: { uniqueCode },
    });
    return student;
  }

  // поиск всех студентов
  public async findAllStudents(): Promise<StudentEntity[]> {
    // Возвращает массив всех студентов
    const students = await this.studentRepository.find();
    if (IsEmpty(students))
      // кидаем ошибку если список студентов пуст
      throw new BadRequestException('Список студентов пуст');
    return students;
  }

  // поиск студента по ID
  public async findStudentById(id: number): Promise<StudentEntity> {
    // ищем студента
    const student = await this.studentRepository.findOne({
      where: { id }, // поиск по ID
      relations: { group: true, visits: true, marks: true }, // эти данные мы хотим видеть в ответе
    });
    this.throwErrorIfStudentDoesntExist(student); // кидаем ошибку, если не нашли студента
    return student;
  }

  // удаляем студента по ID
  public async removeStudentById(id: number): Promise<IMessage> {
    const foundStudent = await this.findStudentById(id);

    await this.studentRepository.remove(foundStudent);
    return { message: 'Студент был успешно удален' };
  }

  // обновляем студента по ID
  public async updateStudentById(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IMessage & { student: StudentEntity }> {
    // ищем студента
    const student = await this.findStudentById(id);

    // обновляем
    const updatedStudent = await this.studentRepository.save({
      ...student,
      ...updateStudentDto,
    });

    // чекаем, все ли норм обновилось
    if (updatedStudent)
      return {
        message: 'Студент был успешно изменен',
        student: updatedStudent,
      };

    // Если хреново обновилось, то кидаем внутреннюю ошибку
    throw new InternalServerErrorException('Ошибка обновления студента');
  }
}
