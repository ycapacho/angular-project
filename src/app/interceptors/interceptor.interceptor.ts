import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    if (!request.url.includes('/login')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getItemFromLocalStorage('token')}`
        }
      });
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
  }
}
