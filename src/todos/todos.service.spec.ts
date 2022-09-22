import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TodosService } from './todos.service';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ id: '1', task: 'task-1', isDone: 0 }),
  new TodoEntity({ id: '2', task: 'task-2', isDone: 0 }),
  new TodoEntity({ id: '3', task: 'task-3', isDone: 0 }),
];

const updatedTodoEntityItem = new TodoEntity({ task: 'task-1', isDone: 1 });

describe('TodosService', () => {
  let todosService: TodosService;
  let todosRepository: Repository<TodoEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: {
            find: jest.fn().mockReturnValue(todoEntityList),
            findOneByOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            save: jest.fn().mockResolvedValue(todoEntityList[0]),
            create: jest.fn().mockReturnValue(todoEntityList[0]),
            merge: jest.fn().mockReturnValue(updatedTodoEntityItem),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    todosService = module.get<TodosService>(TodosService);
    todosRepository = module.get<Repository<TodoEntity>>(
      getRepositoryToken(TodoEntity),
    );
  });

  it('should be defined', () => {
    expect(todosService).toBeDefined();
    expect(todosRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a todo entity list successfully', async () => {
      // Act
      const result = await todosService.findAll();

      // Assert
      expect(result).toEqual(todoEntityList);
      expect(todosRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todosRepository, 'find').mockRejectedValueOnce(new Error());

      // Assert
      expect(todosService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a todo entity item successfully', async () => {
      // Act
      const result = await todosService.findOneByOrFail('1');

      // Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todosRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(todosRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(todosService.findOneByOrFail('1')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
  describe('create', () => {
    it('should create a new todo entity item successfully', async () => {
      // Arrange
      const data: CreateTodoDto = {
        task: 'task-1',
        isDone: 0,
      };

      // Act
      const result = await todosService.create(data);

      // Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todosRepository.create).toHaveBeenCalledTimes(1);
      expect(todosRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      const data: CreateTodoDto = {
        task: 'task-1',
        isDone: 0,
      };

      jest.spyOn(todosRepository, 'save').mockRejectedValueOnce(new Error());

      // Assert
      expect(todosService.create(data)).rejects.toThrowError();
    });
  });
  describe('update', () => {
    it('should update a todo entity item successfully', async () => {
      // Arrange
      const data: UpdateTodoDto = {
        task: 'task-1',
        isDone: 1,
      };

      jest
        .spyOn(todosRepository, 'save')
        .mockResolvedValueOnce(updatedTodoEntityItem);

      // Act
      const result = await todosService.update('1', data);

      // Assert
      expect(result).toEqual(updatedTodoEntityItem);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(todosRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      const data: UpdateTodoDto = {
        task: 'task-1',
        isDone: 1,
      };

      // Assert
      expect(todosService.update('1', data)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todosRepository, 'save').mockRejectedValueOnce(new Error());

      const data: UpdateTodoDto = {
        task: 'task-1',
        isDone: 1,
      };

      // Assert
      expect(todosService.update('1', data)).rejects.toThrowError();
    });
  });
  describe('remove', () => {
    it('should delete a todo entity item successfully', async () => {
      // Act
      const result = await todosService.remove('1');

      // Assert
      expect(result).toBeUndefined();
      expect(todosRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(todosRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(todosRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(todosService.remove('1')).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(todosRepository, 'softDelete')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(todosService.remove('1')).rejects.toThrowError();
    });
  });
});
