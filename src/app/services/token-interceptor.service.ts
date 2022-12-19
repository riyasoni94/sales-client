import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): any {

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    req = this.addAuthenticationToken(req);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError(error => {
        if (error.status === 401 || error.status === 403) {
          // handle error
        }
        return throwError(error);
      })
    );

  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.

    var authToken = localStorage.getItem('access_token')
    if (!authToken) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + authToken)
    });
  }
}
