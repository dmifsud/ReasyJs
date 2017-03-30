import { NgReasy } from '../';
import * as ng from 'angular';
import { ReasyService, ReasyItemService } from './reasy.service';

export class ReasyDataProviderService implements NgReasy.IRestProvider {

    public static $inject: string[] = ['$http'];
    constructor(private $http: ng.IHttpService) { }

    post(url: string, data: any) {
        return this.$http.post(url, data);
    }
    
    get(url: string, params?: any) {
        return this.$http.get(url, {
            params: params
        }).then((res: ng.IHttpPromiseCallbackArg<any>) => res.data);
    }

    put(url: string, params?: any) {
        return this.$http.put(url, params).then((res: ng.IHttpPromiseCallbackArg<any>) => res.data);
    }

    delete(url: string, params?: any) {
        return this.$http.delete(url, {
            params: params
        }).then((res: ng.IHttpPromiseCallbackArg<any>) => res.data);
    }

    patch(url: string, params?: any) {
        return this.$http.patch(url, {
            params: params
        }).then((res: ng.IHttpPromiseCallbackArg<any>) => res.data);
    }
}

export abstract class ReasyDataItem<T> extends ReasyItemService implements NgReasy.IDataItem<ng.IPromise<T>> {
    
    get(params?: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.dataProvider.get(this.baseUrl, params);
    }
    put(params: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.dataProvider.put(this.baseUrl, params);
    }
    delete(params?: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.dataProvider.delete(this.baseUrl, params);
    }
    patch(params: Object): ng.IPromise<T> {
        console.log(this.baseUrl + ' ' + JSON.stringify(params || {}));
        return this.dataProvider.patch(this.baseUrl, params);
    }

}

export abstract class ReasyDataCollection<T, R extends ReasyDataItem<T>> extends ReasyService<R, ReasyDataCollection<T, R>> implements NgReasy.IDataCollection<ng.IPromise<Array<T>>>{
    
    get(params?: Object): ng.IPromise<Array<T>> {
        return this.dataProvider.get(this.getBaseUrl(), params);
    }

    post(data: Array<Object>): ng.IPromise<Array<T>> {
        return this.dataProvider.post(this.getBaseUrl(), data);
    }

    put(data: Array<Object>): ng.IPromise<Array<T>> {
        return this.dataProvider.put(this.getBaseUrl(), data);
    }

    patch(data: Array<Object>): ng.IPromise<Array<T>> {
        return this.dataProvider.patch(this.getBaseUrl(), data);
    }

    delete(params?: Object): ng.IPromise<Array<T>> {
        return this.dataProvider.delete(this.getBaseUrl(), params);
    }
}