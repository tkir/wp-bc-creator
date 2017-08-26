import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {PlatformLocation} from "@angular/common";
declare var businessCardCreatorOptions: any;

@Injectable()
export class AppConfigService {

  private config: any = null;
  private env: Object = null;

  private base: string;
  private configPath: string;
  private envPath: string;
  public imagePath: string;
  private headers: Headers;

  constructor(private http: Http,
              private location: PlatformLocation) {
    this.base = this.location.getBaseHrefFromDOM();
    this.configPath = `${this.base}assets/config.`;
    this.envPath = `${this.base}assets/env.json`;
    this.imagePath = `${this.base}assets/img`;
    this.headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  }

  public post(key, value): boolean {
    let res: any = this.config;
    key.split('.')
      .forEach(k => res = res[k]);

    if (!Array.isArray(res) || res.indexOf(value) != -1)return false;
    res.push(value);
    this.save();
    return true;
  }

  public get(key: any) {
    let res: any = this.config;
    key.split('.')
      .forEach(k => res = res[k]);
    return res;
  }

  public getEnv(key: any) {
    return this.env[key];
  }

  public load() {
    return new Promise((resolve, reject) => {

      //TODO wordpress plugin
      this.configPath = '';
      this.config = businessCardCreatorOptions;
      resolve(true);

      // this.http.get(this.envPath, {headers: this.headers})
      //   .map(res => res.json())
      //   .catch((error: any): any => {
      //     console.log('Configuration file "env.json" could not be read');
      //     resolve(true);
      //     return Observable.throw(error.json().error || 'Server error');
      //   }).subscribe((envResponse) => {
      //   this.env = envResponse;
      //   let request: any = null;
      //
      //
      //   switch (envResponse.env) {
      //     case 'production': {
      //       this.configPath = '';
      //       this.config = businessCardCreatorOptions;
      //       resolve(true);
      //     }
      //       break;
      //
      //     case 'development': {
      //       this.configPath += envResponse.env + '.json';
      //       request = this.http.get(this.configPath);
      //     }
      //
      //       if (request) {
      //         request
      //           .map(res => res.json())
      //           .catch((error: any) => {
      //             console.error('Error reading ' + envResponse.env + ' configuration file');
      //             resolve(error);
      //             return Observable.throw(error.json().error || 'Server error');
      //           })
      //           .subscribe((responseData) => {
      //             this.config = responseData;
      //             this.config.imagePath = this.imagePath;
      //             resolve(true);
      //           });
      //       } else {
      //         console.error('Env config file "env.json" is not valid');
      //         resolve(true);
      //       }
      //
      //       break;
      //
      //     case 'default': {
      //       console.error('Environment file is not set or invalid');
      //       resolve(true);
      //     }
      //       break;
      //   }


      // });

    });
  }

  private save() {
    console.log(this.location.getBaseHrefFromDOM());
  }

}
