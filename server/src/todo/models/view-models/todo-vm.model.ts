import { ApiProperty } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.model';
import { TodoLevel } from '../todo-level.enum';
import { Expose } from 'class-transformer';
import { AutoMap } from '@nartc/automapper';

export class TodoVm extends BaseModelVm {
    @ApiProperty()
    @AutoMap()
    content: string;

    @ApiProperty({ enum: TodoLevel })
    @AutoMap()
    level: TodoLevel;

    @ApiProperty()
    @AutoMap()
    isCompleted: boolean;
}
