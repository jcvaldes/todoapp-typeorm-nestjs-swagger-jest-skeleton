import { HttpService } from '@nestjs/axios';
import { TodoFake } from './interfaces/todo-fake.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosFakeService {
  constructor(private readonly httpService: HttpService) {}

  async getAllTodos() {
    let todos: TodoFake[] = [];

    const url = 'https://jsonplaceholder.typicode.com/todos';

    const { status, data } = await this.httpService
      .get<TodoFake[]>(url)
      .toPromise();
    if (status === 200) {
      todos = data;
    }

    return todos;
  }
}
