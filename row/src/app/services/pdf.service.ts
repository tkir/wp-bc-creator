import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import * as FileSaver from 'file-saver';
declare const bc_creator_config: any;

@Injectable()
export class PdfService {

  constructor(private api: ApiService) {
  }

  getPdf(data) {
    return this.api.post('/pdf', data)
      .map(res => res.file)
      .subscribe(
        data => {
          FileSaver.saveAs(new Blob([data], {type: 'application/pdf'}), "BusinessCard.pdf");
        },
        err => console.error(err)
      );
  }

  getPreview(data) {
    return this.api.post('/preview', data)
      .map(res => res.file)
      .subscribe(
        data => {

        },
        err => console.error(err)
      );
  }
}
