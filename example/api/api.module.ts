import * as ng from 'angular';
// Library
import { Reasy, ReasyProvide } from '../../core/angular';
import { NgReasy } from '../../lib';
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
        yourNgModuleReference.config(function(reasyStoreProvider: NgReasy.IReasyStore) {
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

// @ReasyProvide([
//     HomeReasyService
// ])
// class MainClass {

// }

class CustomApiService implements NgReasy.IRestProvider {

    post(url: string, data: any) {
        return;
    }
    
    get(url: string, params?: any) {
        console.log('Getting from ma class', url, params);
        return;
    }

    put(url: string, params?: any) {
        return;
    }

    delete(url: string, params?: any) {
        return;
    }

    patch(url: string, params?: any) {
        return;
    }
}
export const ApiModule = ng.module('api.module', [Reasy.Module.name])
    .config(function(reasyStoreProvider: NgReasy.IReasyStore) {
        // resyStoreProvider marks the following as injectable
        // console.log('configuring custom api service');
        // reasyStoreProvider.configureDataService(CustomApiService);

        reasyStoreProvider.addResources([
            { provide: 'homeReasyService', use: HomeReasyService },
            { provide: 'roomReasyService', use: RoomReasyService },
            { provide: 'applianceReasyService', use: ApplianceReasyService }
        ]);

    });
    