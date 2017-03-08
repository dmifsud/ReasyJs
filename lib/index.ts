
export namespace ReasyTs {

    export interface IData {
        post(data: Object);
        get(params?: Object);
        put(params?: Object);
        delete(params?: Object);
        patch(params?: Object);
    }

    export interface IDataItem<TReturn> extends IData {
        get(params?: Object): TReturn;
        put(params?: Object): TReturn;
        delete(params?: Object): TReturn;
        patch(params?: Object): TReturn;
    }

    export interface IDataCollection<TReturn> extends IData {
        get(params?: Object): TReturn;
        put(params?: Object): TReturn;
        delete(params?: Object): TReturn;
        patch(params?: Object): TReturn;
    }

    export interface IReasyProvider {
        provide: string;
        use: any;
    }

    export interface IReasyStore {
        addResource(resource: IReasyProvider);
        addResources(resources: Array<IReasyProvider>);
    }

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

    export interface IReasyChild {
        provide: string;
        use: { new(): ReasyTs.IReasy };
    }
}

interface testInterface {
    hello: string;
}