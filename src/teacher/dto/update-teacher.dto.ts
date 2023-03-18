import { PartialType } from '@nestjs/mapped-types'
import { CreateTeacherDto } from './create-teacher.dto'

// тип объекта для обновления полей учитьеля
export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
}
