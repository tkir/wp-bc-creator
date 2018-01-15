import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {ApiService} from "./api.service";
import {OptionsService, Preview} from "./options.service";
import {DesignService} from "./design.service";

@Injectable()
export class PreviewService {
  public modalPreview: { front: string, back: string } = null;
  public isModalOpen: boolean = false;

  constructor(private api: ApiService,
              private options: OptionsService,
              private designService: DesignService) {
  }

  setModalPreview(data) {
    return this.api.post<{ file: { front: string, back: string }, err: string }>('/preview', {
      front: data.front.json,
      back: data.back.json,
      isDoubleSide: this.options.isDoubleSide
    })
      .map((res: { file: { front: string, back: string }, err: string }) => res.file)
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
    return this.api.get<Preview[]>('/previews')
      .do((res: Preview[]) => {
        this.options.previews = res;
        this.designService.updateDesigns(res);
      })
  }
}
