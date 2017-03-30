import * as ng from 'angular';
import 'angular-mocks';
import { BaseUrl, ReasyItem , ReasyDataItem, ReasyDataCollection, NgReasy, child } from '../core';
import { ReasyStoreProvider, Reasy } from '../core/angular';

describe('init', () => {
    it('should have angular available', () => {
        expect(ng.version).toBeDefined();
    });
});

//Stand alone entity

interface EntityModel {
    foo: string;
}

class EntityReasyServiceItem extends ReasyDataItem<EntityModel> {}

@BaseUrl('mock-entity')
@ReasyItem(EntityReasyServiceItem)
class EntityReasyService extends ReasyDataCollection<EntityModel, EntityReasyServiceItem> {}

// One to many case scenario

interface Address {
    street: string;
    city: string;
    country: string;
}

class AddressReasyItem extends ReasyDataItem<Address> {
    methodShouldReturnTheNameOfTheService(): string {
        return 'AddressReasyItem';
    }
}

@BaseUrl('addresses')
@ReasyItem(AddressReasyItem)
class AddressReasyService extends ReasyDataCollection<Address, AddressReasyItem> {}

interface  Customer {
    name: string;
    age: number;
}

class CustomerReasyItem extends ReasyDataItem<Customer> {
    // TODO: if property is not available, do not create child item
    addressReasyService: AddressReasyService;
}

@BaseUrl('customers')
@ReasyItem(CustomerReasyItem)
class CustomerReasyService extends ReasyDataCollection<Customer, CustomerReasyItem> {

    @child({
        provide: 'addressReasyService',
        use: AddressReasyService
    })
    addressReasyService: AddressReasyService;
    // NOTE: property name must be the same as the provide name
}

// Angular mocks

ng.module('reasy.tests', [Reasy.Module.name])
    .config(function(reasyStoreProvider: NgReasy.IReasyStore) {

        reasyStoreProvider.addResources([
            { provide: 'entityReasyService', use: EntityReasyService },
            { provide: 'addressReasyService', use: AddressReasyService },
            { provide: 'customerReasyService', use: CustomerReasyService },
        ]);

});

describe('Simple entity', () => {
    let entityReasyService: EntityReasyService,
        customerReasyService: CustomerReasyService,
        addressReasyService: AddressReasyService,
        $httpBackend: ng.IHttpBackendService;
    

    beforeEach(() => {
        ng.mock.module('reasy.tests');
        ng.mock.inject(function(_entityReasyService_: EntityReasyService,
                                _customerReasyService_: CustomerReasyService,
                                _addressReasyService_: AddressReasyService,
                                _$httpBackend_: ng.IHttpBackendService) {
            entityReasyService = _entityReasyService_;
            customerReasyService = _customerReasyService_;
            addressReasyService = _addressReasyService_;
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
                
                
            });

            describe('FAIL', () => {
                it('should GET entity item with params and fail', () => {
                    const mockParams = {what: 'the'};
                    $httpBackend.expectGET('/mock-entity/not-a-real-id?what=the').respond(500, {message: 'fail'});
                    entityReasyService.id('not-a-real-id').get(mockParams)
                        .catch((reason: ng.IHttpPromiseCallbackArg<any>) => {
                            expect(reason.status).toBe(500);
                            expect(reason.data).toEqual({message: 'fail'});
                        });
                    $httpBackend.flush();
                });
            });
            
        });


        describe('PUT', () => {
            it('should PUT a list of mock data to entity', () => {
                $httpBackend.expectPUT('/mock-entity/', [{ updated: 'data' }]).respond(200, entityMockList);
                entityReasyService.put([{updated: 'data'}]).then(results => {
                    expect(results).toEqual(entityMockList);
                });
                $httpBackend.flush();
            });

            it('should PUT mock data to entity', () => {
                $httpBackend.expectPUT('/mock-entity/id', { updated: 'data'}).respond(200, entityMockItem);
                entityReasyService.id('id').put({ updated: 'data' }).then(result => {
                    expect(result).toEqual(entityMockItem);
                });
                $httpBackend.flush();
            });
        });
            
    });

    describe('One to many entities', () => {
        let addressEntity: Address;
        let addressEntityList: Array<Address>;
        let customerEntity: Customer;
        let customerEntityList: Array<Customer>;
        beforeEach(() => {
            addressEntity = {
                street: 'str',
                city: 'cty',
                country: 'AZ'
            };
            addressEntityList = [addressEntity];
            customerEntity = {
                name: 'Alice',
                age: 18
            };
            customerEntityList = [customerEntity, {
                name: 'Bob',
                age: 19
            }];
        });

        it('should GET standalone entity', () => {
            $httpBackend.expectGET('/customers/10').respond(200, customerEntity);
            customerReasyService.id(10).get().then(result => {
                expect(result).toEqual(customerEntity);
            });
            $httpBackend.flush();
        });

        it('should GET standalone entity list', () => {
            $httpBackend.expectGET('/customers/').respond(200, customerEntityList);
            customerReasyService.get().then(results => {
                expect(results).toEqual(customerEntityList);
            });
            $httpBackend.flush();
        });
        

        it('should GET standalone sub-entity', () => {
            $httpBackend.expectGET('/addresses/6').respond(200, addressEntity);
            addressReasyService.id(6).get().then(result => {
                expect(result).toEqual(addressEntity);
            });
            $httpBackend.flush();
        });

        it('should GET standalone sub-entity list', () => {
            $httpBackend.expectGET('/addresses/').respond(200, addressEntityList);
            addressReasyService.get().then(results => {
                expect(results).toEqual(addressEntityList);
            });
            $httpBackend.flush();
        });

        it('should GET sub entities of entities', () => {
            $httpBackend.expectGET('/customers/addresses/').respond(200, addressEntityList);
            customerReasyService.addressReasyService.get().then(results => {
                expect(results[0]).toEqual(addressEntity);
            });
            $httpBackend.flush();
        });

        it('should GET sub entities of entity', () => {
            $httpBackend.expectGET('/customers/4/addresses/').respond(200, addressEntityList);
            customerReasyService.id(4).addressReasyService.get().then(results => {
                expect(results).toEqual(addressEntityList);
            });
            $httpBackend.flush();
        });

        it('should GET sub entity of entities', () => {
            $httpBackend.expectGET('/customers/addresses/8').respond(200, addressEntity);
            customerReasyService.addressReasyService.id(8).get().then(result => {
                expect(result).toEqual(addressEntity);
            });
            $httpBackend.flush();
        });

        it('should GET sub entity of entity', () => {
            $httpBackend.expectGET('/customers/15/addresses/16').respond(200, addressEntity);
            customerReasyService.id(15).addressReasyService.id(16).get().then(result => {
                expect(result.city).toEqual(addressEntity.city);
                expect(result.country).toEqual(addressEntity.country);
                expect(result.street).toEqual(addressEntity.street);
            });
            $httpBackend.flush();
        });

        it('should have access to a custom function in sub-entity service', () => {
            const serviceName = 'AddressReasyItem';
            expect(customerReasyService.addressReasyService.id(3).methodShouldReturnTheNameOfTheService()).toBe(serviceName);
            expect(addressReasyService.id(4).methodShouldReturnTheNameOfTheService()).toBe(serviceName);
        });
    });
});