import {JwtHttp} from 'ng2-ui-auth';
import {Observable} from 'rxjs/Rx';
import {RequestOptionsArgs, URLSearchParams}from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class JsonHttpGateway {

  constructor(private http: JwtHttp) {
  }

  post(url: string, data, options?: RequestOptionsArgs): Observable<any> {
    data = (typeof (data) === 'string') ? data : JSON.stringify(data);
    return this.http.post(url, data, options).map((res: any) => res.json());
  }

  get(url: string, args?: Object): Observable<any> {
    let params: URLSearchParams;
    if (args) {
      params = new URLSearchParams();
      for (let key in args) {
        params.set(key, args[key]);
      }
    }
    let searchParams = {search: params};
    return this.http.get(url, searchParams).map((res: any) => res.json());
  }

  put(url: string, data, options?: RequestOptionsArgs): Observable<any> {
    data = (typeof (data) === 'string') ? data : JSON.stringify(data);
    return this.http.put(url, data, options).map((res: any) => res.json());
  }
}
