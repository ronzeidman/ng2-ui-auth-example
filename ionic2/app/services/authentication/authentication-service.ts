import {Injectable} from '@angular/core';
import {AuthenticationApi} from './authentication-api';
import {Observable} from 'rxjs/Rx';
import {Response} from '@angular/http';
import {Auth} from 'ng2-ui-auth';

@Injectable()
export class AuthenticationService {

  constructor(private api: AuthenticationApi, private auth: Auth) {
  }

  login(credentials): Observable<Response> {
    return Observable.create(observable => {
      this.api.login(credentials).subscribe(user => {
        this.onLoginSuccess(user);
        observable.next(user);
        observable.complete();
      },
        err =>  observable.error(err.json())
      );
    });
  }

  signup(params) {
    return Observable.create(observable => {
      this.api.signup(params).subscribe(user => {
        this.auth.setToken(user.access_token);
        this.onLoginSuccess(user);
        observable.next(user);
        observable.complete();
      });
    });
  }


  authenticate(provider: string): Observable<any> {
    return Observable.create(observable => {
      return this.api.authenticate(provider).subscribe(user => {
        this.onLoginSuccess(user);
        observable.next(user);
        observable.complete();
      });
    });
  }

  private onLoginSuccess(user) {
    // Do What ever you like with the user object
    return user;
  }
}
