import {Component, OnDestroy, OnInit} from '@angular/core';
import {Logo} from "../../data/Logo";
import {Store} from "../../services/store";
import {Subscription} from "rxjs/Subscription";
import {OptionsService} from "../../services/options.service";
import {DataService} from "../../services/data.service";
import {CardData} from "../../data/CardData";
import {ImageService} from "../../services/image.service";
import {ImageResult} from "../../utils/image/interfaces";

@Component({
  selector: 'card-logo-editor',
  templateUrl: './logo-editor.component.html',
  styleUrls: ['./logo-editor.component.css']
})
export class LogoEditorComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  model: CardData = null;

  constructor(private store: Store,
              private options: OptionsService,
              private dataService: DataService,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  uploadImage(event) {
    if (event.target.files.length)
      this.imageService.uploadImage(event.target.files[0], true)
        .then((res: ImageResult) => {
          this.model.addLogo(res.resized.dataURL, res.resized.width, res.resized.height);
          this.dataService.updateCard(this.model);
        });
  }

  addLogo() {
    let newLogo: Logo = new Logo('',
      {
        width_mm: 22,
        height_mm: 10,
        left_mm: 5,
        top_mm: 5
      }, this.options);

    this.model.logos.push(newLogo);
    this.dataService.updateCard(this.model);
  }

  removeItem(i) {
    this.model.logos.splice(i, 1);
    this.dataService.updateCard(this.model);
  }

}
