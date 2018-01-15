import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Observable} from "rxjs/Observable";

import {OptionsService} from "./options.service";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient,
              private options: OptionsService) {
  }

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-WP-Nonce': this.options.nonce,
    'Accept': 'application/json'
  });

  get<T>(path: string): Observable<string | T> {
    return this.http.get<T>(`${this.options.path}${path}`, {headers: this.headers})
      .pipe(
        catchError(this.handleError('get', ''))
      );
  }

  post<T>(path: string, body: any): Observable<string | T> {
    return this.http.post<T>(`${this.options.path}${path}`, JSON.stringify(body), {headers: this.headers})
      .pipe(
        catchError(this.handleError('post', ''))
      );
  }

  delete<T>(path: string): Observable<string | T> {
    return this.http.delete<T>(`${this.options.path}${path}`, {headers: this.headers})
      .pipe(
        catchError(this.handleError('delete', ''))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
