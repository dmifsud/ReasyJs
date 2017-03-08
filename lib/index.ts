
export namespace ReasyTs {

    export interface IRestProvider {
        post(url: string, data: Object);
        get(url: string, params?: Object);
        put(url: string, params?: Object);
        delete(url: string, params?: Object);
        patch(url: string, params?: Object);
    }

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

    export class IReasyItemService { // TODO: convert to an interface
        constructor (id: any, url: string, dataProvider: IRestProvider) {};
    }
    
    export interface IReasyService {}

    export interface IReasyProvider {
        provide: string;
        use: any;
    }

    export interface IReasyStore {
        addResource(resource: IReasyProvider);
        addResources(resources: Array<IReasyProvider>);
    }

    export interface IReasy extends IData {
        id(resourceId: any);
    }

    export interface IReasyChild {
        provide: string;
        use: { new(): ReasyTs.IReasy };
    }
}

interface testInterface {
    hello: string;
}