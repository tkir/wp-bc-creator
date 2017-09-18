import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
declare const bc_creator_config: any;

@Injectable()
export class PreviewService {
  public modalPreview: string = null;
  public isModalOpen: boolean = false;

  constructor(private api: ApiService) {
  }

  getPreview(data) {
    return this.api.post('/preview', data)
      .map(res => res.file)
      .subscribe(data => this.modalPreview = "data:image/png;base64," + data);
  }

  modalClosed() {
    this.modalPreview = null;
    this.isModalOpen = false;
  }
}
