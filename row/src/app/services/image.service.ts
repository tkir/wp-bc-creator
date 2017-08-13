import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {ImageResult} from "../utils/image/interfaces";
import {ImageUpload} from "../utils/image/image-upload";
import {Subscription} from "rxjs/Subscription";
import {AppConfigService} from "./app-config.service";

@Injectable()
export class ImageService implements OnDestroy {

  private item;
  private imageUpload: ImageUpload;
  private subscription: Subscription = null;
  private resizeQuality: number;
  private resizeType: string;
  private allowedExtensions: string[] = [];

  constructor(private config: AppConfigService) {
    this.imageUpload = new ImageUpload();
    this.subscription = this.imageUpload.imageSelected
      .subscribe((res: ImageResult) => {
        if (this.item.instanceOf == 'Logo') this.updateLogo(res);
        else if (this.item.instanceOf == 'Background') this.updateBg(res)
      });

    this.resizeQuality = this.config.get('imageUpload.resizeQuality');
    this.resizeType = this.config.get('imageUpload.resizeType');
    this.allowedExtensions = this.config.get('imageUpload.allowedExtensions');
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = null;
  }

  uploadImage(item, image: File) {
    this.item = item;

    let resizeOptions = {
      resizeMaxHeight: item.maxHeight,
      resizeMaxWidth: item.maxWidth,
      resizeQuality: this.resizeQuality,
      resizeType: this.resizeType
    };

    this.imageUpload.readFiles(image, resizeOptions, this.allowedExtensions);

  }

  private updateLogo(imageResult: ImageResult) {
    if (imageResult.resized) {
      this.item.width = imageResult.resized.width;
      this.item.height = imageResult.resized.height;
      this.item.dataType = imageResult.resized.type;
      this.item.src = imageResult.resized.dataURL;
    }

    //TODO обработать ошибки загрузки файлов
    if (imageResult.error) console.error(imageResult.error);
  }

  private updateBg(imageResult: ImageResult) {
    if (imageResult.resized) {
        this.item.src = imageResult.resized.dataURL;
    }

    //TODO обработать ошибки загрузки файлов
    if (imageResult.error) console.error(imageResult.error);
  }

}
