import { TodosFakeService } from './todos-fake.service';
import { TodosFakeController } from './todos-fake.controller';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodosController, TodosFakeController],
  providers: [TodosService, TodosFakeService],
  exports: [TodosService, TodosFakeService],
})
export class TodosModule {}
