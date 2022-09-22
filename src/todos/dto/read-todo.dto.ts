import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { TodoEntity } from './../entities/todo.entity';
export class ReadTodoDto extends TodoEntity {}
// export class ReadTodoDto extends PartialType(
//   OmitType(TodoEntity, ['createdAt', 'updatedAt', 'deletedAt']),
// ) {}
// export class ReadTodoDto {
//   @ApiProperty({ type: TodoEntity, isArray: true })
//   items: TodoEntity[];
// }
