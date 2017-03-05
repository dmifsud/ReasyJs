import * as ng from 'angular';
import { ReasyJsModuleName } from '../ng-module/reasy.module';

interface NgReasyProvider {
    provide: string;
    use: any;
}

export interface IReasyStore {
    addResource(resource: NgReasyProvider);
    addResources(resources: Array<NgReasyProvider>);
}

export class ReasyStoreProvider implements ng.IServiceProvider, IReasyStore {
    public static $inject: string[] = ['$provide'];

    constructor(private $provide) {}
        addResource(resource: NgReasyProvider) {
            this.$provide.service(resource.provide, resource.use);
        }

        addResources(resources: Array<NgReasyProvider>) {
            ng.forEach(resources, resource => {
                this.addResource(resource);
            });
        }

        // TODO: provide an abstract data class that handles the actual data part
        // by default it will use a default Reasy abstract class that uses $http

    $get = class ReasyStore {
    }
}
