import { ApplianceReasyService } from '../appliances/appliance.reasy.service';
import { ReasyItem, BaseUrl, Reasy, child } from '../../../lib/services/reasy.service';
import { RoomModel } from './room.model';
// ROOM SERVICE ;)

export interface IRoomReasyService {
    applianceReasyService: ApplianceReasyService;
}

export class RoomReasyServiceItem extends ReasyItem<RoomModel> implements IRoomReasyService { 
    applianceReasyService: ApplianceReasyService;
}

@BaseUrl('room')
export class RoomReasyService extends Reasy<RoomModel, RoomReasyServiceItem> implements IRoomReasyService {
    @child({
        provide: 'applianceReasyService',
        use: ApplianceReasyService
    })
    applianceReasyService: ApplianceReasyService;
}