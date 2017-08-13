import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {AppConfigService} from "./app-config.service";
import {PlatformLocation} from "@angular/common";
import {Http} from "@angular/http";
import * as FileSaver from 'file-saver';

@Injectable()
export class PdfService {

  private pdfAPI: string;
  private pdfPath: string;
  private previewPath: string;
  private hash: string;

  constructor(private api: ApiService,
              private config: AppConfigService,
              private location: PlatformLocation, private http: Http) {
    this.pdfAPI = config.get('host.api.endpoint');
    this.pdfPath = config.get('host.api.pdf');
    this.previewPath = config.get('host.api.preview');
    this.hash = config.get('hash');
  }

  getPdf(data) {

    return this.api.postBlob(`${this.pdfAPI}${this.pdfPath}/${this.hash}`,
      {base_href: this.location.getBaseHrefFromDOM(), data: data})
      .subscribe(
        data => {
          FileSaver.saveAs(new Blob([data], {type: 'application/pdf'}), "BusinessCard.pdf");
        },
        err => console.error(err)
      );
  }

  getPreview(data) {
    return this.api.postBlob(`${this.pdfAPI}${this.previewPath}/${this.hash}`,
      {base_href: this.location.getBaseHrefFromDOM(), data: data})
      .subscribe(
        data => {
          FileSaver.saveAs(new Blob([data], {type: 'image/jpeg'}), "Preview.jpg");
        },
        err => console.error(err)
      );
  }

}
