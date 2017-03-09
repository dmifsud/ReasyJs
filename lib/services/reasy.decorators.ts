import { NgReasy } from '../';
import * as ng from 'angular';

export function ReasyItem(service: NgReasy.IReasyItemService) {
    return function <D extends Function>(Target: D): D {
        // let Service: { new() : service };
        console.log('ReasyDataItemRef');
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


export function child(child: NgReasy.IReasyChild) {
    return function <T extends NgReasy.IReasyItemService>(Target: T, propertyName: string) {
        
        Target['__initializeChild'] = function(dataProvider) {
            
            if (ng.isArray(Target['__children'])) {
                ng.forEach(Target['__children'], function(aChild: NgReasy.IReasyChild) {
                    const reasyChild = new aChild.use(dataProvider);
                    console.log(reasyChild);
                    reasyChild['getParent'] = function() {
                        return Target;
                    };
                    // Include it as an instantiated property within the parent 
                    Target[aChild.provide] = reasyChild;
                });
            }
            
        };
        
        // Also keep a reference to all children
        if (ng.isArray(Target['__children'])) {
            (<Array<NgReasy.IReasyChild>>Target['__children']).push(child);
        } else {
            Target['__children'] = [child];
        }
    };
}