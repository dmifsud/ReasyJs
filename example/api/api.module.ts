import * as ng from 'angular';
import { ReasyJsModuleName } from '../../lib/ng-module/reasy.module';
import { HomeReasyService, RoomReasyService } from './api.service';
import { IReasyStore } from '../../lib/services/reasy-store.service';

export const ApiModule = ng.module('api.module', [ReasyJsModuleName])
    .config(function(reasyStoreProvider: IReasyStore) {
        reasyStoreProvider.addResources([
            { provide: 'homeReasyService', use: HomeReasyService },
            { provide: 'roomReasyService', use: RoomReasyService }
        ]);
    });