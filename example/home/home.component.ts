import * as ng from 'angular';
import { HomeReasyService } from '../api/home/home.reasy.service';
import { RoomReasyService } from '../api/room/room.reasy.service';
import { ApplianceReasyService } from '../api/appliances/appliance.reasy.service';

class HomeComponentCtrl {
    text: string;
    constructor(private homeReasyService: HomeReasyService,
                private roomReasyService: RoomReasyService,
                private applianceReasyService: ApplianceReasyService) { }

    $onInit() {
        this.text = 'Check your logs';


        this.homeReasyService.id(21).get({optional: 'param'})
            .then(() => {
                this.homeReasyService.get({other: 'options'});
            })
            .then(() => {
                this.homeReasyService.roomReasyService.id('{roomId}')
                    .get({room: 'is in home'});
            })
            .then(() => {
                this.homeReasyService.id(3).roomReasyService.get();
                this.roomReasyService.id(32).get();
            });
        
            // Awesome scenario to GET /home/3/room/34/appliances
            this.homeReasyService.id(3).roomReasyService.id(34).applianceReasyService.get({appliances: 'params'});
    }
}

export const HomeComponent: ng.IComponentOptions = {
    template: `
        <p>{{$ctrl.text}}&hellip;</p>
    `,
    controller: HomeComponentCtrl
};