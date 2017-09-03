import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import * as FileSaver from 'file-saver';
declare const bc_creator_config: any;
declare const Base64:any;

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
}
