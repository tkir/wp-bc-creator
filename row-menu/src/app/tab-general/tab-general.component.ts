import {Component} from '@angular/core';
import {OptionsService} from '../services/options.service';
import {UpdateService} from '../services/update.service';

@Component({
  selector: 'menu-tab-general',
  templateUrl: './tab-general.component.html',
  styleUrls: ['./tab-general.component.css']
})
export class TabGeneralComponent {

  constructor(public options: OptionsService,
              private updateService: UpdateService) {
  }

  public onGeneralUpdate(pageUrl, hash, templIndex) {
    this.updateService.generalUpdate(pageUrl, hash, this.options.allowedTemplates[+templIndex].value);
  }

}
