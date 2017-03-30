import { NgReasy } from '../';
import * as ng from 'angular';
import { Reasy } from '../ng-module/reasy.module';

export function ReasyItem(service: NgReasy.IReasyItemService) {
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
            // if (typeof this['getParent'] === 'function') {
            //     parent = this['getParent']();
            //     if (parent) {
            //         parentUrl = parent.getBaseUrl();
            //     }
            // }
            return `${parentUrl}/${url}/`.replace('//', '/');
        };
        return Target;
    };
}


export function child(child: NgReasy.IReasyChild) {
    return function <T extends NgReasy.IReasyItemService>(Target: T, propertyName: string) {
        
        Target['__initializeChild'] = function(dataProvider, $injector) {
            
            if (ng.isArray(Target['__children'])) {
                ng.forEach(Target['__children'], function(aChild: NgReasy.IReasyChild) {
                    // inject instead of 
                    // let reasyChild = $injector.get(child.provide);
                    const reasyChild = new aChild.use(dataProvider, $injector);
                    let childUrl = reasyChild['getBaseUrl']();
                    let parentUrl = Target['getBaseUrl']();
                    console.group('resy service');
                    // reasyChild['getParent'] = function() {
                    //     return Target;
                    // };
                    reasyChild['getBaseUrl'] = function() {
                        let test= `${Target['getBaseUrl']()}${childUrl}`.replace('//','/');
                        console.log(test);
                        return test;
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