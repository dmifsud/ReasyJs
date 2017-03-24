import * as ng from 'angular';
import 'angular-mocks';
import { BaseUrl, ReasyItem , ReasyDataItem, ReasyDataCollection, NgReasy } from '../core';
import { ReasyStoreProvider, Reasy } from '../core/angular';

describe('init', () => {
    it('should have angular available', () => {
        expect(ng.version).toBeDefined();
    });
});

//Class mocks

interface EntityModel {
    foo: string;
}

class EntityReasyServiceItem extends ReasyDataItem<EntityModel> {}

@BaseUrl('mock-entity')
@ReasyItem(EntityReasyServiceItem)
class EntityReasyService extends ReasyDataCollection<EntityModel, EntityReasyServiceItem> {}

// Angular mocks

ng.module('reasy.tests', [Reasy.Module.name])
    .config(function(reasyStoreProvider: NgReasy.IReasyStore) {

        reasyStoreProvider.addResources([
            { provide: 'entityReasyService', use: EntityReasyService }
        ]);

});

describe('Simple entity', () => {
    let entityReasyService: EntityReasyService,
        $httpBackend: ng.IHttpBackendService;
    

    beforeEach(() => {
        ng.mock.module('reasy.tests');
        ng.mock.inject(function(_entityReasyService_: EntityReasyService, _$httpBackend_: ng.IHttpBackendService) {
            entityReasyService = _entityReasyService_;
            $httpBackend = _$httpBackend_;
        });
    });

    describe('Default http REST', () => {
        const entityMockItem: EntityModel = {foo: 'bar'};
        const entityMockList: Array<EntityModel> = [entityMockItem];

        describe('GET', () => {

            describe('SUCCESS', () => {

                it('should GET entity list', () => {
                    $httpBackend.whenGET('/mock-entity/').respond(entityMockList);
                    entityReasyService.get().then(responseList => {
                        expect(responseList[0].foo).toEqual(entityMockItem.foo);  
                    });
                    $httpBackend.flush();
                });

                it('should GET entity item', () => {
                    $httpBackend.whenGET('/mock-entity/42').respond(entityMockItem);
                    entityReasyService.id(42).get().then(response => {
                        expect(response.foo).toEqual(entityMockItem.foo);
                    });
                    $httpBackend.flush();
                });

                // WITH PARAMS
                it('should GET entity list with params', () => {
                    const mockParams = {some: 'param', with: 'data'};
                    $httpBackend.expectGET('/mock-entity/?some=param&with=data').respond(200, entityMockList);
                    entityReasyService.get(mockParams).then(responseList => {
                        expect(responseList[0].foo).toEqual(entityMockItem.foo);  
                    });
                    $httpBackend.flush();
                });

                it('should GET entity item with params', () => {
                    const mockParams = {what: 'the'};
                    $httpBackend.expectGET('/mock-entity/32?what=the').respond(entityMockItem);
                    entityReasyService.id(32).get(mockParams).then(response => {
                        expect(response.foo).toEqual(entityMockItem.foo);
                    });
                    $httpBackend.flush();
                });
                
            })

            
        });

            
    });
});