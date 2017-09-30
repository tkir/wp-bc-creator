import {Injectable} from '@angular/core';
import {Headers, Http, Response, ResponseContentType} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {OptionsService} from "./options.service";

@Injectable()
export class ApiService {

  constructor(private http: Http,
              private options: OptionsService
  ) {
  }

  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-WP-Nonce': this.options.nonce,
    responseType: ResponseContentType.Blob
  });

  private getRes(resp: Response): any {
    if (~resp.headers.get('content-type').indexOf('application/pdf')) {
      return new Blob([resp['_body']], {type: 'application/pdf'});
    }
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
}
