import { Test, TestingModule } from '@nestjs/testing';
import { TodosFakeController } from '../todos-fake.controller';
import { TodosFakeService } from '../todos-fake.service';

describe('TodosFakeController', () => {
  let controller: TodosFakeController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosFakeController],
      providers: [
        {
          provide: TodosFakeService,
          useValue: {
            getAllTodos: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosFakeController>(TodosFakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
