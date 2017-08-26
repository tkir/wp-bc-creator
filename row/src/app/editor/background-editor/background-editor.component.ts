import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {Store} from "../../services/store";
import {ImageService} from "../../services/image.service";
import {Background} from "../../data/Background";
declare const bc_creator_config: any;

@Component({
  selector: 'card-background-editor',
  templateUrl: './background-editor.component.html',
  styleUrls: ['./background-editor.component.css']
})
export class BackgroundEditorComponent implements OnInit, OnDestroy {

  private subscription: Subscription = null;
  background: Background;
  cardData: any = null;
  allowedSizes: { width: number, height: number }[] = [];

  constructor(private store: Store,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {
        this.cardData = cardData;
        this.background = cardData.background;
      });

    this.allowedSizes = bc_creator_config['settings']['allowedSizes'];
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = null;
  }

  updateCardSize(i) {
    this.background.width_mm = this.allowedSizes[i].width;
    this.background.height_mm = this.allowedSizes[i].height;

    this.cardData.onChangeBgSize();
  }

  setColor(color: string) {
    this.background._backgroundColor = color;
  }

  uploadImage(event) {
    if (event.target.files.length)
      this.imageService.uploadImage(this.background, event.target.files[0]);
  }

  removeBeckgroundImage() {
    this.background.src = '';
    this.background.dataType = '';
  }

}
