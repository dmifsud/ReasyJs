import * as ng from 'angular';
import { ReasyStoreProvider } from '../services/reasy-store.service';

let reasyModule;

export class Reasy {
    static Name: string = 'ng.reasy'

    static get Module(): ng.IModule {
        if (reasyModule) {
            return reasyModule;
        } else {
            reasyModule = ng.module(Reasy.name, []);
            return reasyModule;
        }
    }
}

Reasy.Module
    .provider('reasyStore', ReasyStoreProvider);