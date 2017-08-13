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
  max: { x: number, y: number };
  min: { x: number, y: number };
}

export function updateOffset(it: MovEl, event) {

  let pageX = event.pageX - it.dev.x;
  let pageY = event.pageY - it.dev.y;

  if (pageX < it.min.x || pageX > it.max.x) {
    pageX = pageX < it.min.x ? it.min.x : it.max.x;
  }

  if (pageY < it.min.y || pageY > it.max.y) {
    pageY = pageY < it.min.y ? it.min.y : it.max.y;
  }

  if (it.item.left != pageX) it.item.left = pageX;
  if (it.item.top != pageY) it.item.top = pageY;
}

//return min & max element position
export function getMax(instanceOf:string, element, bg:{width:number, height:number, indent:number}): { x: number, y: number } {
  switch (instanceOf) {
    case 'Logo':
    case 'Text':
      return {
        x: bg.width - bg.indent - parseInt(getComputedStyle(element).width),
        y: bg.height - bg.indent - parseInt(getComputedStyle(element).height)
      };
    case 'Line':
      return {
        x: bg.width - parseInt(getComputedStyle(element).width),
        y: bg.height - parseInt(getComputedStyle(element).height)
      }
  }
}
export function getMin(instanceOf, element, bg:{width:number, height:number, indent:number}): { x: number, y: number } {
  switch (instanceOf) {
    case 'Logo':
    case 'Text':
      return {
        x: bg.indent,
        y: bg.indent
      };
    case 'Line':
      return {
        x: 0,
        y: 0
      }
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
    case 'Logo':
    case 'Text':
      return {
        x: bg.width - bg.indent - el.width,
        y: bg.height - bg.indent - el.height
      };
    case 'Line':
      return {
        x: bg.width - el.width,
        y: bg.height - el.height
      }
  }
}
