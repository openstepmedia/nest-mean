import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/models/user-role.enum';

/**
 * @see https://docs.nestjs.com/custom-decorators
 * @param roles
 */
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
