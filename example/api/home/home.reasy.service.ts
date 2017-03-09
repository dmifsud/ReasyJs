import { BaseUrl, child, ReasyDataCollection, ReasyDataItem, ReasyItem } from '../../../core';
import { ReasyInjectable } from '../../../core/angular';

import { RoomReasyService, IRoomReasyService } from '../room/room.reasy.service';
import { ApplianceReasyService } from '../appliances/appliance.reasy.service';
import { HomeModel } from './home.model';
// HOME SERVICE

interface IHomeReasyService {
    roomReasyService: RoomReasyService;
    applianceReasyService: ApplianceReasyService;
}

class HomeReasyItemService extends ReasyDataItem<HomeModel> implements IHomeReasyService, IRoomReasyService{
    roomReasyService: RoomReasyService;
    applianceReasyService: ApplianceReasyService;
}


@BaseUrl('homes')
@ReasyItem(HomeReasyItemService)
@ReasyInjectable('homeReasyService')
export class HomeReasyService extends ReasyDataCollection<HomeModel, HomeReasyItemService> implements IHomeReasyService, IRoomReasyService {

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