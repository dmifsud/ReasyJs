import * as ng from 'angular';
import { ReasyTs } from '../index';

export class ReasyItem<T> implements ReasyTs.IReasyItem<T> {

    constructor(private id, private url: string, private $http: ng.IHttpService) { }

    protected get baseUrl(): string {
        return this.url + this.id;
    }
    
    get(params?: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.$http.get(this.baseUrl, params);
    }
    put(params: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.$http.put(this.baseUrl, params);
    }
    delete(params?: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.$http.delete(this.baseUrl, params);
    }
    patch(params: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.$http.patch(this.baseUrl, params);
    }
}

export abstract class ReasyService<T, R extends ReasyItem<T>> implements ReasyTs.IReasy {
    // @Injectable
    private $http: ng.IHttpService;
    protected __children: Array<ReasyTs.IReasyChild>;
    constructor() {
        this.$http = ng.injector(['ng']).get('$http');
    }

    id(resourceId: any): R {
        const reasyItem: R = <R>new ReasyItem<T>(resourceId, this.getBaseUrl(), this.$http);
        // Create instances of all children
        ng.forEach(this.__children, child => {
            reasyItem[child.provide] = new child.use();
            let childUrl = reasyItem[child.provide]['getBaseUrl']();
            let parentUrl = `${this.getBaseUrl()}${resourceId}`;
            reasyItem[child.provide]['getBaseUrl'] = function() {
                return `${parentUrl}${childUrl}`;
            };
        });
        return reasyItem;
    }

    get(params?: Object): ng.IPromise<Array<T>> {
        return this.$http.get(this.getBaseUrl(), {
            params: params
        });
    }

    // TODO: add other methods such as patch, put and delete

    protected getBaseUrl() : string{
        throw Error("@BaseUrl annotation not found");
    }

}