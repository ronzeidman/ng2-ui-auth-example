import {ROUTER_DIRECTIVES} from '@angular/router';
import {Component} from '@angular/core';
/**
 * Created by ronze on 2/17/2016.
 */



@Component({
    selector: 'app-main',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
export class MainComponent {
}