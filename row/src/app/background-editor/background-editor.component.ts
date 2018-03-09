import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {Store} from "../services/store";
import {ImageService} from "../services/image.service";
import {Background} from "../data/Background";
import {OptionsService} from "../services/options.service";

@Component({
  selector: 'card-background-editor',
  templateUrl: './background-editor.component.html',
  styleUrls: ['./background-editor.component.css', '../css/btn.css']
})
export class BackgroundEditorComponent implements OnInit, OnDestroy {

  private subscription: Subscription = null;
  background: Background;

  constructor(public options: OptionsService,
              private store: Store,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {
        this.background = cardData.background;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = null;
  }

  setColor(color: string) {
    this.background._backgroundColor = color;
  }

  uploadImage(event) {
    if (event.target.files.length)
      this.imageService.uploadImage(event.target.files[0], false)
        .then(res => this.background.src = res.resized.dataURL)
  }

  removeBeckgroundImage() {
    this.background.src = '';
    this.background.dataType = '';
  }

}
