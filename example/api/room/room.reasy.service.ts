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
    
    testClass() {
        // Showing off custom methods
        let $timeout: ng.ITimeoutService = this.$injector.get('$timeout');
        $timeout(function() {
            console.log('it works');
        }, 1000);
    }
    
    @child({
        provide: 'applianceReasyService',
        use: ApplianceReasyService
    })
    applianceReasyService: ApplianceReasyService;
}