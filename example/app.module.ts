import * as ng from 'angular';
import * as uiRouter from 'angular-ui-router';
import { HomeComponent } from './home/home.component';
import { ApiModule } from './api/api.module';

ng.module('app.module', [`${uiRouter}`, ApiModule.name])
    .component('home', HomeComponent)
    .config(function($stateProvider: uiRouter.IStateProvider) {
        $stateProvider.state('root', {
            url: '',
            template: '<home></home>'
        })
        .state('sameAsRoot', {
            url: '/',
            template: 'hey there'
        });
    });


console.info('app started', ng.version);