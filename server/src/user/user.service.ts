import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthService } from '../shared/auth/auth.service';
import { JwtPayload } from '../shared/auth/jwt-payload.model';
import { BaseService } from '../shared/base.service';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { RegisterVm } from './models/view-models/register-vm.model';
import { User } from './models/user.model';
import { UserVm } from './models/view-models/user-vm.model';
import { mapFrom } from '@nartc/automapper';

@Injectable()
export class UserService extends BaseService<typeof User> {
    constructor(
        @InjectModel(User.modelName) private readonly _userModel: ReturnModelType<typeof User>,
        @Inject(forwardRef(() => AuthService))
        readonly _authService: AuthService,
    ) {
        super(User);
        this._model = _userModel;
        this._initMapper();
    }

    private _initMapper() {
        this._mapper.createMap(User, UserVm)
          .forMember(
            dest => dest.fullName,
            mapFrom(src => src.firstName + ' ' + src.lastName)
          );
    }

    async register(vm: RegisterVm) {
        const { username, password, firstName, lastName } = vm;

        const newUser = User.createModel();
        newUser.username = username.trim().toLowerCase();
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        try {
            const result = await this.create(newUser);
            return result.toJSON() as User;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(vm: LoginVm): Promise<LoginResponseVm> {
        const { username, password } = vm;

        const user = await this.findOne({ username });

        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayload = {
            username: user.username,
            role: user.role,
        };

        const token = await this._authService.signPayload(payload);

        console.log(user);

        const userVm: UserVm = await this.map(user.toJSON(), User, UserVm);
        return {
            token,
            user: userVm,
        };
    }
}
