import { DocumentType, prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { BaseModel } from '../../shared/base.model';
import { UserRole } from './user-role.enum';
import { Expose } from 'class-transformer';
import { AutoMap } from '@nartc/automapper';

export class User extends BaseModel {
    @prop({
        required: [true, 'Username is required'],
        unique: true,
        minlength: [6, 'Must be at least 6 characters'],
    })
    @AutoMap()
    username: string;

    @prop({
        required: [true, 'Password is required'],
        minlength: [6, 'Must be at least 6 characters'],
    })
    @AutoMap()
    password: string;

    @prop()
    @AutoMap()
    firstName?: string;

    @prop()
    @AutoMap()
    lastName?: string;

    @prop({ enum: UserRole, default: UserRole.User })
    @AutoMap()
    role?: UserRole;

/*
    @prop()
    @AutoMap()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
*/
    static get model(): ReturnModelType<typeof User> {
        // return new User().getModelForClass(User, { schemaOptions });
        //return this.getModelForClass(User, { schemaOptions });
        // return new User();
        const m = getModelForClass(User);
        return m;
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(): DocumentType<User> {
        return new this.model();
    }
}
