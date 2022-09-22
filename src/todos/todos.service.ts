import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(
      this.todoRepository.create(createTodoDto),
    );
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOneByOrFail(id: string) {
    try {
      return await this.todoRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOneByOrFail(id);
    this.todoRepository.merge(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async remove(id: string) {
    await this.findOneByOrFail(id);
    await this.todoRepository.softDelete(id);
  }
}
