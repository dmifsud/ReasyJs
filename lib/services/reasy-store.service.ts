import * as ng from 'angular';
import { NgReasy } from '../';

export class ReasyStoreProvider implements ng.IServiceProvider, NgReasy.IReasyStore {
    public static $inject: string[] = ['$provide'];

    constructor(private $provide) {}
        addResource(resource: NgReasy.IReasyProvider) {
            this.$provide.service(resource.provide, resource.use);
        }

        addResources(resources: Array<NgReasy.IReasyProvider>) {
            ng.forEach(resources, resource => {
                this.addResource(resource);
            });
        }

        configureDataService(ReasyDataService: NgReasy.IRestProvider) {
            this.$provide('ReasyDataProviderService', ReasyDataService);
        }

        // TODO: provide an abstract data class that handles the actual data part
        // by default it will use a default Reasy abstract class that uses $http

    $get = class ReasyStore {
    }
}
