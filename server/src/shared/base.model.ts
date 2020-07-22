import { ApiPropertyOptional } from '@nestjs/swagger';
import { prop, modelOptions } from '@typegoose/typegoose';
import { AutoMap } from '@nartc/automapper';

export class BaseModelVm {
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    @AutoMap()
    createdAt?: Date;

    @ApiPropertyOptional({ type: String, format: 'date-time' })
    @AutoMap()
    updatedAt?: Date;

    @ApiPropertyOptional()
    @AutoMap()
    id?: string;
}

/**
 * @see https://typegoose.github.io/typegoose/docs/api/decorators/model-options
 */
@modelOptions({ schemaOptions: {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
} })
export abstract class BaseModel {
    @prop()
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    @AutoMap()
    createdAt: Date;

    @prop()
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    @AutoMap()
    updatedAt: Date;

    @ApiPropertyOptional()
    @AutoMap()
    id: string;
}
