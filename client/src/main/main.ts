import {Component, provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Auth, JwtHttp, Config} from 'ng2-ui-auth';
import {Shared} from 'ng2-ui-auth/src/shared';
import {Observable} from 'rxjs/Observable';
import {RequestOptions, XHRBackend, Http} from 'angular2/http';
/**
 * Created by ronze on 2/17/2016.
 */

@Component({
    selector: 'app-overview',
    template: '<p>{{helloWorld | async}}</p><p>{{helloWorldError}}</p><button type="button" (click)="signout()">signout</button> ',
    directives: [ROUTER_DIRECTIVES]
})
class Overview {
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
            this.router.navigate(['/Login']);
        })
    }
}

@Component({
    selector: 'app-main',
    template: '<router-outlet></router-outlet>',
    providers: [provide(JwtHttp, {
        useFactory: (xhrBackend, requestOptions, shared, config, router) =>
            new JwtHttp(xhrBackend, requestOptions, shared, config),
        deps: [XHRBackend, RequestOptions, Shared, Config],
    })],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: 'overview', name: 'Overview', component: Overview, useAsDefault: true},
])
export class Main {
}