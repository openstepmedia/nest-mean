import { ApiPropertyOptional } from '@nestjs/swagger';
import { LoginVm } from './login-vm.model';

export class RegisterVm extends LoginVm {
    @ApiPropertyOptional({ example: 'John' })
    firstName?: string;

    @ApiPropertyOptional({ example: 'Doe' })
    lastName?: string;
}
