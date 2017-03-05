import * as ng from 'angular';
import { HomeReasyService, RoomReasyService } from '../api/api.service';

class HomeComponentCtrl {
    text: string;
    constructor(private homeReasyService: HomeReasyService,
                private roomReasyService: RoomReasyService) { }

    $onInit() {
        this.text = 'Check your logs';
        //WORKING

        this.homeReasyService.id(21).get({optional: 'param'})
            .then(result => {
                console.log(result);
                console.groupEnd();
            })
            .then(() => {
                this.homeReasyService.get({other: 'options'})
                    .then(results => {
                        console.log(results);
                        console.groupEnd();
                    });
            })
            .then(() => {
                this.homeReasyService.roomReasyService.id('{roomId}')
                    .get({room: 'is in home'})
                    .then(room => {
                        console.log('rooms', room);
                        console.groupEnd();
                    });
            })
            .then(() => {
                // WORKING
                this.homeReasyService.id(3).roomReasyService.get();
            });


        

        
    }
}

export const HomeComponent: ng.IComponentOptions = {
    template: `
        <p>{{$ctrl.text}}&hellip;</p>
    `,
    controller: HomeComponentCtrl
};