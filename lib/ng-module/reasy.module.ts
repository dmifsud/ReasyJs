import * as ng from 'angular';
import { ReasyStoreProvider } from '../services/reasy-store.service';
import { ReasyTs } from '../';
let reasyModule;

export class Reasy {
    static Name: string = 'ng.reasy'

    static get Module(): ng.IModule {
        if (reasyModule) {
            return reasyModule;
        } else {
            reasyModule = ng.module(Reasy.Name, []);
            return reasyModule;
        }
    }
}

export function ReasyInjectable(provide: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        console.log('actual inject', provide);
        Reasy.Module.service(provide, Target);
        return Target;
    };
}

export function ReasyProvide(reasyServices: Array<any>) {
    return function <NgController extends Function>(Target: NgController): NgController {
        //inject directly in controller
        return Target;
    };
}

Reasy.Module
    .provider('reasyStore', ReasyStoreProvider);
