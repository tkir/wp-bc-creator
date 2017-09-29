import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {OptionsService} from "./options.service";

@Injectable()
export class PreviewService {
  public modalPreview: string = null;
  public isModalOpen: boolean = false;

  constructor(private api: ApiService,
              private options: OptionsService) {
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

  updatePreviews() {
    return this.api.get('/previews')
      .do(res => {
        this.options.previews = res;
      })
  }
}
