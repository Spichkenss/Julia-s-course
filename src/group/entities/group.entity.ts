import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../utils/base.entity';
import { StudentEntity } from '../../student/entities/student.entity';

// Декоратор, создающий таблицу в бд с названием в скобках
@Entity('group')
export class GroupEntity extends BaseEntity {
  // Колонка в базе данных (имя группы). В скобках параметры
  @Column({ name: 'group_name', unique: true })
  groupName: string;

  // Связь "один ко многим". Одна группа ко многим студентам
  @OneToMany(() => StudentEntity, (student) => student.group)
  students: StudentEntity[];
}
