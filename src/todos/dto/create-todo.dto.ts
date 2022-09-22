import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsIn,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  task: string;

  @IsNumber()
  @IsIn([0, 1])
  @IsOptional()
  @ApiPropertyOptional()
  isDone?: number;
}
