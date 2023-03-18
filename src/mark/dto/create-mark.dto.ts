import { Marks } from '../entities/mark.entity';

// Тип объекта для создания оценки
export class CreateMarkDto {
  studentId: number;
  subjectId: number;
  mark: Marks;
}
