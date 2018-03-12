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

  private getResizeOptions(isLogo:boolean){
    return {
      resizeMaxHeight: (isLogo) ? this.options.cardHeight * 0.8 : this.options.cardHeight,
      resizeMaxWidth: (isLogo) ? this.options.cardWidth * 0.8 : this.options.cardWidth,
      resizeQuality: this.resizeQuality,
      resizeType: this.resizeType
    }
  }

  uploadImage(image: File, isLogo) {
    return this.imageUpload.readFiles(image, this.getResizeOptions(isLogo), this.allowedExtensions);
  }

  // getBlobFromURL(url:string, isLogo:boolean){
  //   return this.imageUpload.getBlobFromURL(url, this.getResizeOptions(isLogo), this.allowedExtensions);
  // }

  // getBase64FromImageUrl(URL:string) {
    // let img = new Image();
    // img.setAttribute('crossOrigin', 'anonymous');
    // img.setAttribute('Access-Control-Allow-Origin', 'http://localhost');
    // img.src = URL;
    // img.onload = () => {
    //
    //   let canvas = document.createElement("canvas");
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //
    //   let ctx = canvas.getContext("2d");
    //   ctx.drawImage(img, 0, 0);
    //
    //   let dataURL = canvas.toDataURL("image/png");
    //
    //   alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    //
    // };


  //   var canvas = document.createElement('canvas');
  //   document.body.appendChild(canvas);
  //   var context = canvas.getContext('2d');
  //   var img = new Image;
  //   img.setAttribute('crossOrigin', 'anonymous');
  //   img.src = URL;
  //   img.onload = function() {
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     context.drawImage(img, 0, 0);// at this point the image is drawn to the canvas
  //     console.log(canvas.toDataURL("image/png")); // throws error - see console
  //   };
  //
  // }
}
