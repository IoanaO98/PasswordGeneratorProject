import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
@Injectable({
  providedIn: 'root'
})
export class PasswordGeneratorService {

   constructor(private _httpClient: HttpClient) {}

  getPassword(length: number): Observable<string> {
      return this._httpClient.get<string>(`${environment.api.baseUrl}/api/GeneratePassword?length=${length}`)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An error occurred while generating the password.';
            if (error.error instanceof ErrorEvent) {
              // Client-side error
              errorMessage = error.error.message;
            } else {
              // Server-side error
              errorMessage = error.error || errorMessage;
            }
            return throwError(errorMessage);
          })
        );
   }
}
