import { RoomReasyService, IRoomReasyService } from '../room/room.reasy.service';
import { ReasyItem, ReasyService, BaseUrl, child } from '../../../lib/services/reasy.service';
import { ApplianceReasyService } from '../appliances/appliance.reasy.service';
import { HomeModel } from './home.model';
import { ReasyInjectable } from '../../../lib/ng-module/reasy.module';
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
