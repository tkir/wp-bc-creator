import {ImageResult, ResizeOptions} from './interfaces';
import {createImage, resizeImage} from './utils';

export class ImageUpload {

  // resizeOptions: ResizeOptions;
  private _allowedExtensions: string[];

  get allowedExtensions() {
    return this._allowedExtensions;
  }

  set allowedExtensions(allowed: string[]) {
    this._allowedExtensions = allowed && allowed.map(a => a.toLowerCase());
  }


  constructor() {
  }

  readFiles(file, resizeOptions: ResizeOptions, allowedExtensions) {
    this.allowedExtensions = allowedExtensions;

    let result: ImageResult = {
      file: file,
      url: URL.createObjectURL(file)
    };
    let ext: string = file.name.split('.').pop();
    ext = ext && ext.toLowerCase();
    if (ext && this.allowedExtensions && this.allowedExtensions.length && this.allowedExtensions.indexOf(ext) === -1) {
      return new Promise<ImageResult>(resolve => {
        result.error = 'Extension Not Allowed';
        resolve(result);
      });
    } else {
      return this.fileToDataURL(file, result)
        .then(r => this.resize(r, resizeOptions));
    }
  }

  private resize(result: ImageResult, resizeOptions: ResizeOptions): Promise<ImageResult> {
    if (!resizeOptions) return Promise.resolve(result);
    return createImage(result.url)
      .then(image => {
      let dataUrl = resizeImage(image, resizeOptions);
      result.resized = {
        dataURL: dataUrl,
        type: dataUrl.match(/:(.+\/.+;)/)[1],
        width: resizeOptions.resizedToWidth,
        height: resizeOptions.resizedToHeight
      };
      return result;
    });
  }

  private fileToDataURL(file: File, result: ImageResult): Promise<ImageResult> {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = function (e) {
        result.dataURL = reader.result;
        resolve(result);
      };
      reader.readAsDataURL(file);
    });
  }


  //пока не работает
  // public getBlobFromURL(url:string, resizeOptions: ResizeOptions, allowedExtensions){
  //   this.allowedExtensions = allowedExtensions;
  //
  //   return createImage(url)
  //     .then(image => {
  //     let dataUrl = resizeImage(image, this.resizeOptions);
  //     let result:ImageResult;
  //     result.resized = {
  //       dataURL: dataUrl,
  //       type: dataUrl.match(/:(.+\/.+;)/)[1],
  //       width: resizeOptions.resizedToWidth,
  //       height: resizeOptions.resizedToHeight
  //     };
  //     return result;
  //   });
  // }
}


