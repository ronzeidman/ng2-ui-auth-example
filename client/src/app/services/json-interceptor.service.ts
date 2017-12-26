import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JsonInterceptorService {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = !req.headers.has('Content-Type')
      ? req.clone({ setHeaders: { 'Content-Type': 'application/json' } })
      : req;
    return next.handle(newReq);
  }
}
