import * as ng from 'angular';
import { ReasyTs } from '../index';

export function BaseUrl(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        
        Target.prototype.getBaseUrl = function() {
            let parent,
                parentUrl = '';
            if (typeof this['getParent'] === 'function') {
                parent = this['getParent']();
                if (parent) {
                    parentUrl = parent.getBaseUrl();
                }
            }
            return `${parentUrl}/${url}/`.replace('//', '/');
        };
        return Target;
    };
}

interface IReasyChild {
    provide: string;
    use: { new(): ReasyTs.IReasy };
}
export function child(child: IReasyChild) {
    return function <T extends ReasyTs.IReasy>(Target: T, propertyName: string) {
        
        const reasyChild = new child.use();
        reasyChild['getParent'] = function() {
            return Target;
        };

        // Include it as an instantiated property within the parent 
        Target[child.provide] = reasyChild;
        // Also keep a reference to all children
        if (ng.isArray(Target['__children'])) {
            (<Array<IReasyChild>>Target['__children']).push(child);
        } else {
            Target['__children'] = [child];
        }
    };
}


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
    protected __children: Array<IReasyChild>;
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