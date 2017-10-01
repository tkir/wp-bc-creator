import {Component, OnInit} from '@angular/core';
import {OptionsService} from '../services/options.service';
import {UpdateService} from '../services/update.service';

@Component({
  selector: 'menu-tab-general',
  templateUrl: './tab-general.component.html',
  styleUrls: ['./tab-general.component.css']
})
export class TabGeneralComponent implements OnInit {
  public model: { page_url: string, hash: string, email: string };

  ngOnInit(): void {
    this.model = {page_url: this.options.page_url, hash: this.options.hash, email: this.options.email};
  }

  constructor(public options: OptionsService,
              private updateService: UpdateService) {
  }

  public onGeneralUpdate(pageUrl, hash, email, templIndex) {
    this.updateService.generalUpdate(pageUrl, hash, email, this.options.allowedTemplates[+templIndex].value);
  }

}
