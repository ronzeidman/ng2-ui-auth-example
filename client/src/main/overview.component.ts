import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Auth, JwtHttp} from 'ng2-ui-auth';
import {Http} from '@angular/http';
/**
 * Created by Ron on 02/07/2016.
 */
@Component({
    selector: 'app-overview',
    template: '<p>{{helloWorld | async}}</p><p>{{helloWorldError}}</p><button type="button" (click)="signout()">signout</button> ',
    directives: [ROUTER_DIRECTIVES]
})
export class OverviewComponent {
    helloWorld: Observable<string>;
    helloWorldError: string = 'sdf';

    constructor(private auth: Auth,
                private router: Router,
                private jwtHttp: JwtHttp,
                private http: Http) {
        this.helloWorld = jwtHttp.get('/api/helloWorld').map((response) => response.text());
        http.get('/api/helloWorld')
            .subscribe(
                (response) => {
                    this.helloWorldError = response.text();
                },
                (response) => {
                    this.helloWorldError = response.text();
                });
    }

    signout() {
        this.auth.logout().subscribe(() => {
            this.router.navigate(['/login']);
        })
    }
}