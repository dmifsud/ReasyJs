import { ReasyTs } from '../';
import * as ng from 'angular';

export function ReasyItem(service: ReasyTs.IReasyItemService) {
    return function <D extends Function>(Target: D): D {
        // let Service: { new() : service };
        
        Target.prototype.ReasyDataItemRef = service;
        return Target;
    }
}

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


export function child(child: ReasyTs.IReasyChild) {
    return function <T extends ReasyTs.IReasy>(Target: T, propertyName: string) {
        
        const reasyChild = new child.use();
        reasyChild['getParent'] = function() {
            return Target;
        };

        // Include it as an instantiated property within the parent 
        Target[child.provide] = reasyChild;
        // Also keep a reference to all children
        if (ng.isArray(Target['__children'])) {
            (<Array<ReasyTs.IReasyChild>>Target['__children']).push(child);
        } else {
            Target['__children'] = [child];
        }
    };
}