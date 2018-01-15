import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';

import {OptionsService} from "./options.service";

@Injectable()
export class ApiService {

  constructor(private http: Http,
              private options: OptionsService) {
  }

  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'X-WP-Nonce': this.options.nonce,
    'Accept': 'application/json'
  });

  private getRes(resp: Response): any {
    return resp.json();
  }

  private checkForError(resp: Response): Response {
    if (resp.status >= 200 && resp.status < 300)return resp;
    else {
      const err = new Error(resp.statusText);
      err['response'] = resp;
      console.error(err);
      throw err;
    }
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.options.path}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getRes);
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${this.options.path}${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getRes);
  }

  delete(path:string):Observable<any>{
    return this.http.delete(`${this.options.path}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getRes);
  }
}
