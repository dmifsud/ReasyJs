import * as ng from 'angular';
import { HomeReasyService } from '../api/home/home.reasy.service';
import { RoomReasyService } from '../api/room/room.reasy.service';
import { ApplianceReasyService } from '../api/appliances/appliance.reasy.service';
import { ReasyProvide } from '../../lib/ng-module/reasy.module';


class HomeComponentCtrl {
    text: string;
    constructor(private homeReasyService: HomeReasyService,
                private roomReasyService: RoomReasyService,
                private applianceReasyService: ApplianceReasyService) { }

    $onInit() {
        this.text = 'Check your logs';
        // this.homeReasyService.get()
        //     .then(results => {
        //     })
        //     .catch((err) => {
        //         console.error(err.data);
        //     });
        // this.homeReasyService.id(2).roomReasyService.testClass();
        // TODO: for some reason. not generating full url
        // the problem lies with the initialize children - happening in constructor
        // this.homeReasyService.roomReasyService.applianceReasyService.get();
        // this.homeReasyService.id(4).roomReasyService.applianceReasyService.get();
        this.homeReasyService.roomReasyService.id(3).applianceReasyService.get();

        // this.homeReasyService.id(21).get({optional: 'param'})
        //     .then(() => {
        //         this.homeReasyService.get({other: 'options'});
        //     })
        //     .then(() => {
                
        //         this.homeReasyService.roomReasyService.id('{roomId}')
        //             .get({room: 'is in home'});
        //     })
        //     .then(() => {
        //         this.homeReasyService.id(3).roomReasyService.get();
        //         this.roomReasyService.id(32).get();
        //     });
        
        //     // Awesome scenario to GET /home/3/room/34/appliances
            this.homeReasyService.id(3).roomReasyService.id(34).applianceReasyService.id(3).get({appliances: 'params'});

    }
}

export const HomeComponent: ng.IComponentOptions = {
    template: `
        <p>{{$ctrl.text}}&hellip;</p>
    `,
    controller: HomeComponentCtrl
};