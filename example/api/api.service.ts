import "reflect-metadata";
import * as ng from 'angular';

import { Reasy, ReasyItem, BaseUrl, child } from '../../lib/services/reasy.service';

class HomeModel {
    name: string =  '123';
    street: string = 'Street';
}

class RoomModel {
    type: string = 'Bath room'
}

// ROOM SERVICE ;)

export class RoomReasyServiceItem extends ReasyItem<RoomModel> { }

@BaseUrl('room')
export class RoomReasyService extends Reasy<RoomModel, RoomReasyServiceItem> { }


// HOME SERVICE

interface IHomeReasyService {
    roomReasyService: RoomReasyService;
}

class HomeReasyItemService extends ReasyItem<HomeModel> implements IHomeReasyService{
    public roomReasyService: RoomReasyService;
}


@BaseUrl('home')
export class HomeReasyService extends Reasy<HomeModel, HomeReasyItemService> implements IHomeReasyService {

    @child({
        provide: 'roomReasyService',
        use: RoomReasyService
    })
    roomReasyService: RoomReasyService;
    
}
