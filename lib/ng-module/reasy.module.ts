import * as ng from 'angular';
import { ReasyStoreProvider } from '../services/reasy-store.service';

export const ReasyJsModuleName = 'ng.reasy';

export const ReasyJs = ng.module(ReasyJsModuleName, [])
    .provider('reasyStore', ReasyStoreProvider);