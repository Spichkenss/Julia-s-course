import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsEmpty } from '../utils/helpers';
import { IMessage } from '../utils/message.nterface';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupEntity } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    // Ссылка на таблицу в бд
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  // Кидаем ошибку, если группа существует
  private throwErrorIfGroupExists(group: GroupEntity) {
    if (group)
      throw new BadRequestException('Группа с таким номером уже существует');
  }

  // Кидаем ошибку, если группа не существует
  throwErrorIfGroupDoesntExist(group: GroupEntity) {
    if (!group)
      throw new BadRequestException('Группа с таким номером не существует');
  }

  // Ищем группу по ее имени и выводим ее и ее студентов
  async findOneByGroupName(groupName: string): Promise<GroupEntity> {
    return await this.groupRepository.findOne({
      where: { groupName }, // фильтр, по которому мы ищем конкретную запись. т.к. groupName у нас уникален, то запись всегда вернутся одна
      relations: { students: true }, // тут мы говорим, какие связные таблицы мы хотим добавть в ответ от базы. в данном случае мы хотим видеть студентов этой группы
    });
  }

  // Создание новой группы
  public async create(
    // Аргументы
    createGroupDto: CreateGroupDto,
  ): Promise<IMessage & { group: GroupEntity }> {
    const foundGroup = await this.findOneByGroupName(createGroupDto.groupName); // Ищем группу по имени
    this.throwErrorIfGroupExists(foundGroup); // Если нашли, то кидаем ошибку, что такая группа уже существует и останавливаем выполнение функции

    // Создаем новый экземпляр
    const group = await this.groupRepository.create({
      groupName: createGroupDto.groupName,
    });

    // Возвращаем ответ клиенту
    return {
      message: 'Группа была успешно создана',
      group: await this.groupRepository.save(group), // Сохраняем в бд
    };
  }

  // Поиск всех групп
  async findAll(): Promise<GroupEntity[]> {
    const groups = await this.groupRepository.find(); // Поиск всех групп
    if (IsEmpty(groups)) throw new BadRequestException('Список групп пуст'); // Кидаем ошибку, если групп нет вообще
    return groups;
  }

  // Ищем конкретную группу по ID
  async findById(id: number): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({
      where: { id }, // фильтр, по которому мы ищем конкретную запись
      relations: { students: true }, // тут мы говорим, какие связные таблицы мы хотим добавть в ответ от базы. в данном случае мы хотим видеть студентов этой группы
    });
    this.throwErrorIfGroupDoesntExist(group); // Кидаем ошибку о том, что не нашли группу по ID
    return group;
  }

  // Удаляем группу по ID
  async removeGroupById(id: number): Promise<IMessage> {
    const foundGroup = await this.findById(id); // ищем группу по ID
    if (!IsEmpty(foundGroup.students))
      // Если в группе есть студенты, то блочим удаление
      return { message: 'Нельзя удалить группу, пока в ней есть студенты' };

    await this.groupRepository.remove(foundGroup); // Иначе спокойно сносим группу
    return { message: 'Группа была успешно удалена' };
  }
}
