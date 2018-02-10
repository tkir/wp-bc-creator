import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "../../services/store";
import {Subscription} from "rxjs/Subscription";
import {CardData} from "../../data/CardData";
import {ImageService} from "../../services/image.service";
import {ImageResult} from "../../utils/image/interfaces";
import {ItemService} from "../../services/item.service";
import {I18nService} from "../../services/i18n.service";

@Component({
  selector: 'card-logo-editor',
  templateUrl: './logo-editor.component.html',
  styleUrls: ['./logo-editor.component.css']
})
export class LogoEditorComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  model: CardData = null;

  constructor(private store: Store,
              public i18n: I18nService,
              private itemService: ItemService,
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
          this.itemService.addLogo(res.resized.dataURL, res.resized.width, res.resized.height);
        })
        .catch(err => console.log(err));
  }

  removeItem(logo) {
    this.itemService.removeItem(logo);
  }

}
