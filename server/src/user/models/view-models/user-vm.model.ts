import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';
import { Expose } from 'class-transformer';
import { AutoMap } from '@nartc/automapper';

export class UserVm extends BaseModelVm {
    @ApiProperty()
    @AutoMap()
    username: string;
    @ApiPropertyOptional()
    @AutoMap()
    firstName?: string;
    @ApiPropertyOptional()
    @AutoMap()
    lastName?: string;
    @ApiPropertyOptional()
    @AutoMap()
    fullName?: string;
    @ApiPropertyOptional({ enum: UserRole })
    @AutoMap()
    role?: UserRole;
}
