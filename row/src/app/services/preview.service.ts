import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {OptionsService} from "./options.service";
import {DesignService} from "./design.service";

@Injectable()
export class PreviewService {
  public modalPreview: { front: string, back: string } = null;
  public isModalOpen: boolean = false;

  constructor(private api: ApiService,
              private options: OptionsService,
              private designService: DesignService) {
  }

  seModalPreview(data) {
    return this.api.post('/preview', {
      front: data.front.json,
      back: data.back.json,
      isDoubleSide: this.options.isDoubleSide
    })
      .map(res => res.file)
      .subscribe(data => this.modalPreview = {
        front: "data:image/png;base64," + data.front,
        back: "data:image/png;base64," + data.back
      });
  }

  modalClosed() {
    this.modalPreview = null;
    this.isModalOpen = false;
  }

  updatePreviews() {
    return this.api.get('/previews')
      .do(res => {
        this.options.previews = res;
        this.designService.updateDesigns(res);
      })
  }
}
