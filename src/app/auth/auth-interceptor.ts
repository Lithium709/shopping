import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private $localStorage: LocalStorageService,
        private $sessionStorage: SessionStorageService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('Intercepting!' + req.url);
        if(req.url.search("nova")==-1){
            const token = this.getToken();
            if (!!token) {
                const authReq = req.clone({setHeaders: {
                    Authorization: 'Bearer ' + token
                }});
                return next.handle(authReq);
            }
        }
        return next.handle(req);
    }

    getToken() {

        return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    }

}
