import { BaseUrl, child, ReasyItem, ReasyService } from '../../../core';
import { ReasyInjectable } from '../../../core/angular';

import { RoomReasyService, IRoomReasyService } from '../room/room.reasy.service';
import { ApplianceReasyService } from '../appliances/appliance.reasy.service';
import { HomeModel } from './home.model';
// HOME SERVICE

interface IHomeReasyService {
    roomReasyService: RoomReasyService;
    applianceReasyService: ApplianceReasyService;
}

class HomeReasyItemService extends ReasyItem<HomeModel> implements IHomeReasyService, IRoomReasyService{
    roomReasyService: RoomReasyService;
    applianceReasyService: ApplianceReasyService;
}


@BaseUrl('homes')
@ReasyInjectable('homeReasyService')
export class HomeReasyService extends ReasyService<HomeModel, HomeReasyItemService> implements IHomeReasyService, IRoomReasyService {

    @child({
        provide: 'roomReasyService',
        use: RoomReasyService
    })
    roomReasyService: RoomReasyService;

    @child({
        provide: 'applianceReasyService',
        use: ApplianceReasyService
    })
    applianceReasyService: ApplianceReasyService;
    
}
