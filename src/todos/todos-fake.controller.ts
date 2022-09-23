import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodosFakeService } from './todos-fake.service';

@Controller('todosfake')
@ApiTags('TodosFake')
export class TodosFakeController {
  constructor(private readonly todosService: TodosFakeService) {}

  @Get()
  async findAllTodos() {
    return await this.todosService.getAllTodos();
  }
}
