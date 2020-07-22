// import { InstanceType, ModelType, prop } from 'typegoose';
import { getModelForClass, prop, ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { BaseModel } from '../../shared/base.model';
import { TodoLevel } from './todo-level.enum';
import { AutoMap } from '@nartc/automapper';

export class Todo extends BaseModel {
    @prop({ required: [true, 'Content is required'] })
    @AutoMap()
    content: string;

    @prop({ enum: TodoLevel, default: TodoLevel.Normal })
    @AutoMap()
    level: TodoLevel;

    @prop({ default: false })
    @AutoMap()
    isCompleted: boolean;

    static get model(): ReturnModelType<typeof Todo> {
        const m = getModelForClass(Todo);
        return m;
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(): DocumentType<Todo> {
        return new this.model();
    }
}
