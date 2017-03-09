import { BaseUrl, child, ReasyItem, ReasyDataCollection, ReasyDataItem } from '../../../core';


import { ApplianceReasyService } from '../appliances/appliance.reasy.service';
import { RoomModel } from './room.model';
// ROOM SERVICE ;)

export interface IRoomReasyService {
    applianceReasyService: ApplianceReasyService;
}

export class RoomReasyServiceItem extends ReasyDataItem<RoomModel> implements IRoomReasyService { 
    applianceReasyService: ApplianceReasyService;
}

@BaseUrl('room')
@ReasyItem(RoomReasyServiceItem)
export class RoomReasyService extends ReasyDataCollection<RoomModel, RoomReasyServiceItem> implements IRoomReasyService {
    @child({
        provide: 'applianceReasyService',
        use: ApplianceReasyService
    })
    applianceReasyService: ApplianceReasyService;
}