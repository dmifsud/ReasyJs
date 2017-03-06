import * as ng from 'angular';
// Library
import { Reasy, ReasyProvide } from '../../lib/ng-module/reasy.module';
import { ReasyTs } from '../../lib';
// Example
import { HomeReasyService } from './home/home.reasy.service';
import { ApplianceReasyService } from './appliances/appliance.reasy.service';
import { RoomReasyService } from './room/room.reasy.service';

/*
    Reasy Services Can be injected in three ways

    1)  The Old fashioned way
        =====================
        yourNgModuleReference.service('yourReasyService', yourReasyService);

    2)  Reasy Store Provider
        =====================
        yourNgModuleReference.config(function(reasyStoreProvider: ReasyTs.IReasyStore) {
            reasyStoreProvider.addResources([
                { provide: 'yourReasyService', use: YourReasyService }
            ]);
        });

    3)  Decorators
        =====================
        When declaring a ReasyService, attach the ReasyInjectable decorator like:

        @BaseUrl('your')
        @ReasyInjectable('yourReasyService')
        export class YourReasyService extends Reasy<YourModel, YourReasyItemService> { }

        Then, in your main service or main model, attach the ReasyProvide decorator:

        @ReasyProvide([
            YourReasyService
        ])
        class MainModuleOrService {

        }

        Note: it only needs to be provided once

*/

@ReasyProvide([
    HomeReasyService
])
class MainClass {

}

export const ApiModule = ng.module('api.module', [Reasy.Module.name])
    .config(function(reasyStoreProvider: ReasyTs.IReasyStore) {
        // resyStoreProvider marks the following as injectable
        reasyStoreProvider.addResources([
            // { provide: 'homeReasyService', use: HomeReasyService },
            { provide: 'roomReasyService', use: RoomReasyService },
            { provide: 'applianceReasyService', use: ApplianceReasyService }
        ]);
    });
    