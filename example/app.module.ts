import * as ng from 'angular';
import * as uiRouter from 'angular-ui-router';
import { HomeComponent } from './home/home.component';

ng.module('app.module', [`${uiRouter}`])
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




console.log('app started', ng.version);