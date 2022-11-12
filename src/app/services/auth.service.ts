import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private url = environment.urlServerAPI;

  login(body: any) {
    return this.http.post<any>(`${this.url}/authentication/login`, body)
    .pipe(
      catchError(this.handleError),
      tap((response: any) => {
        this.handleAuthentication(response);
      })
    )
  }

  private handleAuthentication(response: any) {
    console.log(response);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    if (error.error && typeof(error.error)) errorMessage = error.error;
    return throwError(errorMessage);
  }
}
