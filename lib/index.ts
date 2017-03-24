
export namespace NgReasy {

    export interface IRestProvider {
        post(url: string, data: any);
        get(url: string, params?: any);
        put(url: string, params?: any);
        delete(url: string, params?: any);
        patch(url: string, params?: any);
    }

    export interface IData {
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
        configureDataService(ReasyDataService: { new(): NgReasy.IRestProvider });
    }

    export interface IReasy extends IData {
        id(resourceId: any);
    }

    export interface IReasyChild {
        provide: string;
        use: { new(dataProvider: IRestProvider, $injector): IDataCollection<any> };
    }
}

interface testInterface {
    hello: string;
}