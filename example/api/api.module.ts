import * as ng from 'angular';
// Library
import { ReasyJsModuleName } from '../../lib/ng-module/reasy.module';
import { IReasyStore } from '../../lib/services/reasy-store.service';

// Example
import { HomeReasyService } from './home/home.reasy.service';
import { ApplianceReasyService } from './appliances/appliance.reasy.service';
import { RoomReasyService } from './room/room.reasy.service';

export const ApiModule = ng.module('api.module', [ReasyJsModuleName])
    .config(function(reasyStoreProvider: IReasyStore) {
        // resyStoreProvider marks the following as injectable
        reasyStoreProvider.addResources([
            { provide: 'homeReasyService', use: HomeReasyService },
            { provide: 'roomReasyService', use: RoomReasyService },
            { provide: 'applianceReasyService', use: ApplianceReasyService }
        ]);
    });