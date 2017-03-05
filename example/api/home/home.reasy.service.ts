import { RoomReasyService, IRoomReasyService } from '../room/room.reasy.service';
import { ReasyItem, Reasy, BaseUrl, child } from '../../../lib/services/reasy.service';
import { ApplianceReasyService } from '../appliances/appliance.reasy.service';
import { HomeModel } from './home.model';
// HOME SERVICE

interface IHomeReasyService {
    roomReasyService: RoomReasyService;
}

class HomeReasyItemService extends ReasyItem<HomeModel> implements IHomeReasyService, IRoomReasyService{
    roomReasyService: RoomReasyService;
    applianceReasyService: ApplianceReasyService;
}


@BaseUrl('home')
export class HomeReasyService extends Reasy<HomeModel, HomeReasyItemService> implements IHomeReasyService, IRoomReasyService {

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
