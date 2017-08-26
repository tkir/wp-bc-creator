import {Injectable, OnDestroy} from '@angular/core';
import {ImageResult} from "../utils/image/interfaces";
import {ImageUpload} from "../utils/image/image-upload";
import {Subscription} from "rxjs/Subscription";
declare const bc_creator_config: any;

@Injectable()
export class ImageService implements OnDestroy {

  private item;
  private imageUpload: ImageUpload;
  private subscription: Subscription = null;
  private resizeQuality: number;
  private resizeType: string;
  private allowedExtensions: string[] = [];

  constructor() {
    this.imageUpload = new ImageUpload();
    this.subscription = this.imageUpload.imageSelected
      .subscribe((res: ImageResult) => {
        if (this.item.instanceOf == 'Logo') this.updateLogo(res);
        else if (this.item.instanceOf == 'Background') this.updateBg(res)
      });

    this.resizeQuality = bc_creator_config['settings']['imageUpload']['resizeQuality'];
    this.resizeType = bc_creator_config['settings']['imageUpload']['resizeType'];
    this.allowedExtensions = bc_creator_config['settings']['imageUpload']['allowedExtensions'];
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
