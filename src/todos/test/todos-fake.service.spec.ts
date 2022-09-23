import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { TodoFake } from '../interfaces/todo-fake.interface';
import { TodosFakeService } from '../todos-fake.service';

describe('TodosFakeService', () => {
  let todosService: TodosFakeService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosFakeService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    todosService = module.get<TodosFakeService>(TodosFakeService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(todosService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('getAllTodos', () => {
    it('should return a todo list', async () => {
      // Arrange
      const expected: TodoFake[] = [
        {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: false,
        },
      ];

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          status: 200,
          statusText: 'OK',
          config: {},
          headers: {},
          data: expected,
        }),
      );

      // Act
      const result = await todosService.getAllTodos();

      // Assert
      expect(result).toEqual(expected);
    });

    it('should return an empty array', async () => {
      // Arrange
      const expected: TodoFake[] = [];

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          status: 204,
          statusText: 'NO CONTENT',
          config: {},
          headers: {},
          data: expected,
        }),
      );

      // Act
      const result = await todosService.getAllTodos();

      // Assert
      expect(result).toEqual(expected);
    });

    it('should throw an unexpected error', () => {
      // Arrange
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(new Error('error inesperado')));

      // Assert
      expect(todosService.getAllTodos()).rejects.toThrowError(
        'error inesperado',
      );
    });
  });
});
