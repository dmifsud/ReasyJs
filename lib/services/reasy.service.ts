import * as ng from 'angular';
import { ReasyTs } from '../index';

export class ReasyItemService implements ReasyTs.IReasyItemService {

    constructor(private id: any, private url: string, protected dataProvider: ReasyTs.IRestProvider) { }

    protected get baseUrl(): string {
        return this.url + this.id;
    }
}

export abstract class ReasyService<Item extends ReasyTs.IData, Collection extends ReasyTs.IData> implements ReasyTs.IReasyService {
    // @Injectable
    protected __children: Array<ReasyTs.IReasyChild>;
    protected dataProvider: ReasyTs.IRestProvider;
    private ReasyDataItemRef: { new(id, url: string, dataProvider: ReasyTs.IRestProvider): Item };
    constructor() {
        this.dataProvider = <ReasyTs.IRestProvider><any>ng.injector(['ng']).get('$http'); // TODO: change to dataProvider
    }

    id(resourceId: any): Item {
        if (this.ReasyDataItemRef) {
            const reasyItem: Item = <Item>new this.ReasyDataItemRef(resourceId, this.getBaseUrl(), this.dataProvider);
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
        } else {
            throw Error("@ReasyItem annotation not found");
        }
        
    }

    protected getBaseUrl() : string{
        throw Error("@BaseUrl annotation not found");
    }

}