import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { BaseService } from '../shared/base.service';
import { Todo } from './models/todo.model';
import { TodoParams } from './models/view-models/todo-params.model';
import { TodoVm } from './models/view-models/todo-vm.model';

@Injectable()
export class TodoService extends BaseService<typeof Todo> {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Todo.modelName) private readonly _todoModel: ReturnModelType<typeof Todo>,
  ) {
    super(Todo);
    this._model = _todoModel;
    this._initMapper();
    this._logger.log('inside TodoService');
  }

  private _initMapper() {
    this._mapper.createMap(Todo, TodoVm)
  }

  async createTodo(params: TodoParams): Promise<Todo> {
    const { content, level } = params;

    const newTodo = Todo.createModel();

    newTodo.content = content;

    if (level) {
      newTodo.level = level;
    }

    try {
      const result = await this.create(newTodo);
      return result.toJSON() as Todo;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
