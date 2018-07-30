import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WordPressApiInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log('WordpressApiInterceptor was called');

        const clonedRequest = request.clone({
            headers: request.headers.set('Content-Type', 'BLABLUB')
        });
        return next.handle(clonedRequest).pipe(map(event => {
            if (request.method === 'GET' && event instanceof HttpResponse) {
                 console.log('Response Interceptor for GET');
                 return event.clone({ body: event.body['posts']});
            }
         }));
    }
}
