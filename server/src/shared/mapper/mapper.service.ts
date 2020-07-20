import { Injectable } from '@nestjs/common';
//import {AutoMapper, Mapper, Configuration} from 'automapper-nartc';
import {AutoMapper, Mapper, mapFrom} from '@nartc/automapper';
import { User } from '../../user/models/user.model';
import { UserVm } from '../../user/models/view-models/user-vm.model';
import { Todo } from '../../todo/models/todo.model';
import { TodoVm } from '../../todo/models/view-models/todo-vm.model';

@Injectable()
export class MapperService {
    mapper: AutoMapper;

    constructor() {
        this.mapper = Mapper;
        this.initializeMapper();
    }
    private initializeMapper(): void {
        this.mapper.createMap(User, UserVm)
          .forMember(
            dest => dest.fullName,
            mapFrom(src => src.firstName + ' ' + src.lastName)
          );

        this.mapper.createMap(Todo, TodoVm);


/*
        this.mapper.createMap(User, UserVm)
          .forMember(
            dest => dest.fullName,
            mapFrom(src => src.firstName + ' ' + src.lastName)
          )
          .forMember(
            dest => dest.isAdult,
            mapFrom(src => src.age >= 18)
          );
*/
    }

/*
    private initializeMapper(): void {
        this.mapper.initialize(MapperService.configure);
    }

    private static configure(config: Configuration): void {
        config.createMap(User, UserVm)
            .forMember("fullName", opts => opts.mapFrom(s => s.fullName));
        config.createMap(Todo, TodoVm);
        Mapper.createMap(Source, Destination)
            .forMember(d => d.destMember, mapFrom(s => s.sourceMember))
    }
*/

}
