import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { VisitEntity } from '../.././vists/entities/visit.entity';
import { MarkEntity } from '../../mark/entities/mark.entity';
import { BaseEntity } from '../../utils/base.entity';
import { GroupEntity } from '../../group/entities/group.entity';

@Entity('student')
export class StudentEntity extends BaseEntity {
  // уникальный код (номер в студаке)
  @Column({ unique: true, name: 'unique_code' })
  uniqueCode: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @ManyToOne(() => GroupEntity, (group) => group.students)
  group: GroupEntity;

  @OneToMany(() => VisitEntity, (visit) => visit.student)
  visits: VisitEntity[];

  @OneToMany(() => MarkEntity, (mark) => mark.student)
  marks: MarkEntity[];
}
