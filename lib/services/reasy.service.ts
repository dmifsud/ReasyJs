import * as ng from 'angular';
import { ReasyJs, ReasyJsModuleName } from '../ng-module/reasy.module';
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

    constructor(private id, private url: string, private $q: ng.IQService) { }

    protected get baseUrl(): string {
        return this.url + this.id;
    }
    
    get(params?: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.$q.resolve(<T><any>{one: 'item'});
    }
    put(params: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.$q.resolve({});
    }
    delete(params?: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.$q.resolve({});
    }
    patch(params: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.$q.resolve({});
    }
}


export abstract class Reasy<T, R extends ReasyItem<T>> implements ReasyTs.IReasy {
    // @Injectable
    private $q: ng.IQService;
    protected __children: Array<IReasyChild>;
    constructor() { 
        this.$q = ng.injector(['ng']).get('$q');
    }

    id(resourceId: any): R {
        const reasyItem: R = <R>new ReasyItem<T>(resourceId, this.getBaseUrl(), this.$q);
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
        console.group('[GET]');
        console.log(this.getBaseUrl() + JSON.stringify(params || {}));
        return this.$q.resolve([<T><any>{many: 'items'}]);
    }

    protected getBaseUrl() : string{
        throw Error("@BaseUrl annotation not found");
    }

}