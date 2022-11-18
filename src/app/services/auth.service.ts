import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Session } from '../models/session.model';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends SharedService {

  constructor(
    private router: Router,
    http: HttpClient
  ) {
    super(http)
  }
  session = new BehaviorSubject<Session>(null);
  private expirationTimer: any;

  login(body: any) {
    return this.post(`authentication/login`, body)
    .pipe(
      catchError(this.handleError),
      tap((response: any) => {
        this.handleAuthentication(response);
      })
    )
  }
  
  private handleAuthentication({ access_token, expires_in, user }) {
    const expirationDate = new Date(new Date().getTime() + expires_in * 1000);
    const session = new Session(access_token, expirationDate, user);
    this.session.next(session);
    this.setItemInLocalStorage('token', access_token);
    this.setItemInLocalStorage('expirationDate', expirationDate);
    this.setItemInLocalStorage('user', user);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    if (error.error && typeof(error.error)) errorMessage = error.error;
    return throwError(errorMessage);
  }

  autoLogin() {
    const token = this.getItemFromLocalStorage('token');
    const expirationDate = this.getItemFromLocalStorage('expirationDate');
    const user = this.getItemFromLocalStorage('user');
    if (!token || !expirationDate || !user) return;
    else {
      const session = new Session(token, new Date(expirationDate), user);
      this.session.next(session);
      const expirationDuration = new Date(expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    localStorage.clear();
    this.session.next(null);
    this.router.navigate(['/signin']);
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }
}
