import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ id: '1', task: 'task-1', isDone: 0 }),
  new TodoEntity({ id: '2', task: 'task-2', isDone: 0 }),
  new TodoEntity({ id: '3', task: 'task-3', isDone: 0 }),
];
const newTodoEntity = new TodoEntity({ task: 'new-task', isDone: 0 });

const updatedTodoEntity = new TodoEntity({ task: 'task-1', isDone: 1 });

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            create: jest.fn().mockResolvedValue(newTodoEntity),
            findOneByOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedTodoEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todosController = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(todosController).toBeDefined();
    expect(todosService).toBeDefined();
  });
  describe('findAll', () => {
    it('should return a todo list entity successfully', async () => {
      // Act
      const result = await todosController.findAll();

      // Assert
      expect(result).toEqual(todoEntityList);
      expect(typeof result).toEqual('object');
      expect(todosService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todosService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(todosController.findAll()).rejects.toThrowError();
    });
  });
  describe('create', () => {
    it('should create a new todo item successfully', async () => {
      // Arrange
      const body: CreateTodoDto = {
        task: 'new-task',
        isDone: 0,
      };

      // Act
      const result = await todosController.create(body);

      // Assert
      expect(result).toEqual(newTodoEntity);
      expect(todosService.create).toHaveBeenCalledTimes(1);
      expect(todosService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateTodoDto = {
        task: 'new-task',
        isDone: 0,
      };

      jest.spyOn(todosService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(todosController.create(body)).rejects.toThrowError();
    });
  });
  describe('findOne', () => {
    it('should get a todo item successfully', async () => {
      // Act
      const result = await todosController.findOneByOrFail('1');

      // Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todosService.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(todosService.findOneByOrFail).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(todosService, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(todosController.findOneByOrFail('1')).rejects.toThrowError();
    });
  });
  describe('update', () => {
    it('should update a todo item successfully', async () => {
      // Arrange
      const body: UpdateTodoDto = {
        task: 'task-1',
        isDone: 1,
      };

      // Act
      const result = await todosController.update('1', body);

      // Assert
      expect(result).toEqual(updatedTodoEntity);
      expect(todosService.update).toHaveBeenCalledTimes(1);
      expect(todosService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateTodoDto = {
        task: 'task-1',
        isDone: 1,
      };

      jest.spyOn(todosService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(todosController.update('1', body)).rejects.toThrowError();
    });
  });
  describe('remove', () => {
    it('should remove a todo item successfully', async () => {
      // Act
      const result = await todosController.remove('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todosService, 'remove').mockRejectedValueOnce(new Error());

      // Assert
      expect(todosController.remove('1')).rejects.toThrowError();
    });
  });
});
