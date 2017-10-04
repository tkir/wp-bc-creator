import {Component, OnDestroy} from '@angular/core';
import {UpdateService} from '../services/update.service';
import {OptionsService} from '../services/options.service';
import {ApiService} from '../services/api.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'menu-tab-design',
  templateUrl: './tab-design.component.html',
  styleUrls: ['./tab-design.component.css']
})
export class TabDesignComponent implements OnDestroy {

  private subscription: Subscription = null;

  constructor(public options: OptionsService,
              private updateService: UpdateService) {
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  public updatePreviews() {
    this.subscription = this.updateService.previewsUpdate()
      .subscribe(prevs => this.options.previews = prevs);
  }

  public toggleActive(preview) {
    this.updateService.toggleActive(preview.id)
      .subscribe(res => {
        if (res) preview.isActive = !preview.isActive;
      });
  }
}
