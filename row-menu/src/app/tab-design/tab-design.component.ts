import {Component} from '@angular/core';
import {UpdateService} from '../services/update.service';
import {OptionsService} from '../services/options.service';

@Component({
  selector: 'menu-tab-design',
  templateUrl: './tab-design.component.html',
  styleUrls: ['./tab-design.component.css']
})
export class TabDesignComponent {

  public defaultDesign: any;

  constructor(public options: OptionsService,
              private updateService: UpdateService) {
  }

  public updatePreviews() {
    this.updateService.previewsUpdate()
      .subscribe(prevs => this.options.previews = prevs);
  }

  public toggleActive(preview) {
    this.updateService.toggleActive(preview.id)
      .subscribe(res => {
        if (res) preview.isActive = !preview.isActive;
      });
  }

  updateDefault(slug) {
    if (this.options.defaultDesign == slug) return;

    this.updateService.defaultSelected(slug)
      .subscribe(res => {
        if (res == slug) this.options.defaultDesign = res;
      });
  }
}
