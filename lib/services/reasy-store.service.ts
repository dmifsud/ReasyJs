import * as ng from 'angular';
import { ReasyTs } from '../';


export class ReasyStoreProvider implements ng.IServiceProvider, ReasyTs.IReasyStore {
    public static $inject: string[] = ['$provide'];

    constructor(private $provide) {}
        addResource(resource: ReasyTs.IReasyProvider) {
            this.$provide.service(resource.provide, resource.use);
        }

        addResources(resources: Array<ReasyTs.IReasyProvider>) {
            ng.forEach(resources, resource => {
                this.addResource(resource);
            });
        }

        // TODO: provide an abstract data class that handles the actual data part
        // by default it will use a default Reasy abstract class that uses $http

    $get = class ReasyStore {
    }
}
