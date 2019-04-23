import {ResizeOptions} from './interfaces';

export function createImage(url: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const image = new Image();
    image.onload = () => res(image);
    image.onerror = rej;
    image.src = url;
  });
}

const resizeAreaId = 'imageupload-resize-area';

function getResizeArea() {
  let resizeArea = document.getElementById(resizeAreaId);
  if (!resizeArea) {
    let wrap = document.createElement('div');
    resizeArea = document.createElement('canvas');
    wrap.appendChild(resizeArea);
    wrap.id = 'wrap-' + resizeAreaId;
    wrap.style.position = 'relative';
    wrap.style.overflow = 'hidden';
    wrap.style.width = '0';
    wrap.style.height = '0';
    resizeArea.id = resizeAreaId;
    resizeArea.style.position = 'absolute';
    document.body.appendChild(wrap);
  }

  return <HTMLCanvasElement>resizeArea;
}

export function resizeImage(origImage: HTMLImageElement, resizeOptions: ResizeOptions = {}) {

  let canvas = getResizeArea();

  let height = origImage.height;
  let width = origImage.width;

  if (width > resizeOptions.resizeMaxWidth) {
    height = Math.round(height * resizeOptions.resizeMaxWidth / width);
    width = resizeOptions.resizeMaxWidth;
  }

  if (height > resizeOptions.resizeMaxHeight) {
    width = Math.round(width * resizeOptions.resizeMaxHeight / height);
    height = resizeOptions.resizeMaxHeight;
  }

  resizeOptions.resizedToHeight = height;
  resizeOptions.resizedToWidth = width;

  canvas.width = width;
  canvas.height = height;

  //draw image on canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(origImage, 0, 0, width, height);

  // get the data from canvas as 70% jpg (or specified type).
  return canvas.toDataURL(resizeOptions.resizeType, resizeOptions.resizeQuality);
}


