import {CardField} from "../data/interfaces";

export function getCoords(item, elem: Element) {
  return {
    left: elem.getBoundingClientRect().left + pageXOffset,
    top: elem.getBoundingClientRect().top + pageYOffset,
    right: elem.getBoundingClientRect().left + pageXOffset + item.width,
    bottom: elem.getBoundingClientRect().top + pageYOffset+ item.height
  }
}

export interface MovEl {
  item: CardField;
  elem: Element;
  dev: { x: number, y: number };
}

export function updateOffset(it: MovEl, event) {

  let pageX = event.pageX - it.dev.x;
  let pageY = event.pageY - it.dev.y;

  if (it.item.left != pageX) it.item.left = pageX;
  if (it.item.top != pageY) it.item.top = pageY;
}

//return min & max element position
export function getMax(instanceOf:string, element, bg:{width:number, height:number, indent:number}): { x: number, y: number } {
  switch (instanceOf) {
    case 'Line':
      return {
        x: bg.width - parseInt(getComputedStyle(element).width),
        y: bg.height - parseInt(getComputedStyle(element).height)
      };

    case 'Logo':
    case 'Icon':
    case 'Text':
    default:
      return {
        x: bg.width - bg.indent - parseInt(getComputedStyle(element).width),
        y: bg.height - bg.indent - parseInt(getComputedStyle(element).height)
      };
  }
}
export function getMin(instanceOf, element, bg:{width:number, height:number, indent:number}): { x: number, y: number } {
  switch (instanceOf) {
    case 'Line':
      return {
        x: 0,
        y: 0
      };
    case 'Logo':
    case 'Icon':
    case 'Text':
    default:
      return {
        x: bg.indent,
        y: bg.indent
      };
  }
}

export function getMaxSize(instanceOf:string, bgSize:{width:number, height:number, indent:number}): { x: number, y: number } {
  switch (instanceOf) {
    case 'Line':
      return {
        x: bgSize.width,
        y: bgSize.height
      };
    case 'Logo':
    default:
      return {
        x: bgSize.width - bgSize.indent,
        y: bgSize.height - bgSize.indent
      };
  }
}

export function getMaxPosition(instanceOf:string,
                               el:{width:number, height:number},
                               bg:{width:number, height:number, indent:number}): { x: number, y: number } {
  switch (instanceOf) {
    case 'Line':
      return {
        x: bg.width - el.width,
        y: bg.height - el.height
      };
    case 'Logo':
    case 'Text':
    default:
      return {
        x: bg.width - bg.indent - el.width,
        y: bg.height - bg.indent - el.height
      };
  }
}

/**
 * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
export function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

  let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth*ratio, height: srcHeight*ratio };
}

export function getElemCoords(elem: HTMLElement) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    bottom: box.bottom+pageYOffset,
    right: box.right+pageXOffset
  };

}
