import * as ng from 'angular';

export interface IReasyItem<ResourceType> {
    get(params?: Object): ng.IPromise<ResourceType>;
    put(params: Object): ng.IPromise<ResourceType>;
    delete(params?: Object): ng.IPromise<ResourceType>;
    patch(params: Object): ng.IPromise<ResourceType>;
}

export interface IReasy {
    // an id can return a series of functionality
    // such as:
    // get(params?) that returns a specific resource
    // delete(params?) that deletes a specific resource
    // update(params?) that updates a specific resource
    id(resourceId: any);
    // this get returns all data based on optional params
    get(params?: Object);
}