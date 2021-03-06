import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { InstanceType } from 'typegoose';
import { getModelForClass, prop, types, ReturnModelType, DocumentType } from '@typegoose/typegoose';

import { UserRole } from '../../user/models/user-role.enum';
import { User } from '../../user/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this._reflector.get<UserRole[]>('roles', context.getHandler());

        if (!roles || roles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: DocumentType<User> = request.user;

        console.log('RolesGuard: user:', user);

        const hasRole = () => roles.indexOf(user.role) >= 0;

        if (user && user.role && hasRole()) {
            return true;
        }

        throw new HttpException('You do not have permission (Roles)', HttpStatus.UNAUTHORIZED);
    }
}
