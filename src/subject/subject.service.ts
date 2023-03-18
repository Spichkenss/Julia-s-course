import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IsEmpty } from "../utils/helpers";
import { IMessage } from "../utils/message.nterface";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { SubjectEntity } from "./entities/subject.entity";

@Injectable()
export class SubjectService {
  constructor(
    // ссылка на таблицу в бд
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>
  ) {
  }

  // кидаем ошибку, если дисицплина существует
  private throwErrorIfSubjectExists(subject: SubjectEntity) {
    if (subject)
      throw new BadRequestException(
        "Дисциплина, проводимая данным преподавателем уже существует"
      );
  }

  // кидаем ошибку, если дисицплина не существует
  private throwErrorIfSubjectDoesntExist(subject: SubjectEntity) {
    if (!subject)
      throw new BadRequestException("Такой дисциплины не существует");
  }

  // создание дициплины
  public async create(
    createSubjectDto: CreateSubjectDto
  ): Promise<IMessage & { subject: SubjectEntity }> {
    // ищем дисциплину по ее названии и по преподавателю
    const foundSubject = await this.subjectRepository.findOne({
      where: {
        name: createSubjectDto.name,
        teacher: { id: createSubjectDto.teacherId }
      }
    });
    // если найдем, то кидаем ошибку
    this.throwErrorIfSubjectExists(foundSubject);

    // создаем новый экземпляр
    const subject = await this.subjectRepository.create({
      ...createSubjectDto,
      teacher: { id: createSubjectDto.teacherId }
    });

    // возвращаем и сохраняем в бд
    return {
      message: "Дисциплина была успешно создана",
      subject: await this.subjectRepository.save(subject)
    };
  }

  // выводим список всех дисциплин
  public async findAll(): Promise<SubjectEntity[]> {
    // ищем
    const subjects = await this.subjectRepository.find({
      relations: { teacher: true }
    });

    if (IsEmpty(subjects))
      // если дисциплин нет, выводим ошибку
      throw new BadRequestException("Список дисциплин пуст");
    return subjects;
  }

  // поиск дисциплины по ID
  public async findByID(id: number): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOne({
      // ищем по ID и выводим вместе с преподающим преподавателем
      where: { id },
      relations: { teacher: true }
    });
    // если нет такого предмета, то кидаем ошибку
    this.throwErrorIfSubjectDoesntExist(subject);
    return subject;
  }
}
