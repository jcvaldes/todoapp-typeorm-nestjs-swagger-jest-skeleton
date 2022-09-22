import { NotFoundSwagger } from './../helpers/swagger/not-found.swagger';
import { BadRequestSwagger } from './../helpers/swagger/bad-request.swagger';
import { TodoQueryDto } from './dto/todo-query.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReadTodoDto } from './dto/read-todo.dto';

@Controller('todos')
@ApiTags('Todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar nueva tarea' })
  @ApiResponse({
    status: 201,
    description: 'tarea creada con éxito',
    type: CreateTodoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tareas' })
  @ApiResponse({
    status: 200,
    description: 'Listado de tareas retornadas con éxito',
    type: ReadTodoDto,
    isArray: true,
  })
  // async findAll(@Query() query?: TodoQueryDto) {
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mostrar datos de una tarea' })
  @ApiResponse({
    status: 200,
    description: 'Datos de una tarea retornado con éxito',
    type: ReadTodoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarea no fue encontrada',
    type: NotFoundSwagger,
  })
  async findOneByOrFail(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todosService.findOneByOrFail(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiResponse({
    status: 200,
    description: 'Tarea actualizada con éxito',
    type: UpdateTodoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarea no fue encontrada',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiResponse({
    status: 204,
    description: 'Tarea eliminada con éxito',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarea no fue encontrada',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todosService.remove(id);
  }
}
