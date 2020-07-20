import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TodoLevel } from '../todo-level.enum';

export class TodoParams {
    @ApiProperty() content: string;
    @ApiPropertyOptional({ enum: TodoLevel, example: TodoLevel.Normal })
    level?: TodoLevel;
}

