import {Injectable} from '@angular/core';
import {ImageUpload} from "../utils/image/image-upload";
import {OptionsService} from "./options.service";

@Injectable()
export class ImageService {

  private item;
  private imageUpload: ImageUpload;
  private resizeQuality: number;
  private resizeType: string;
  private allowedExtensions: string[] = [];

  constructor(private options: OptionsService) {
    this.imageUpload = new ImageUpload();

    this.resizeQuality = this.options.settings.imageUpload.resizeQuality;
    this.resizeType = this.options.settings.imageUpload.resizeType;
    this.allowedExtensions = this.options.settings.imageUpload.allowedExtensions;
  }

  uploadImage(image: File, isLogo) {

    let resizeOptions = {
      resizeMaxHeight: (isLogo) ? this.options.cardHeight * 0.8 : this.options.cardHeight,
      resizeMaxWidth: (isLogo) ? this.options.cardWidth * 0.8 : this.options.cardWidth,
      resizeQuality: this.resizeQuality,
      resizeType: this.resizeType
    };

    return this.imageUpload.readFiles(image, resizeOptions, this.allowedExtensions);
  }

}
