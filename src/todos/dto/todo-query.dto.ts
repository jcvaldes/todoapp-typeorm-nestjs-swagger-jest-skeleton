import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsIn,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TodoQueryDto {
  @ApiPropertyOptional()
  task?: string;
}
