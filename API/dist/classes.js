"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextField {
    constructor(obj) {
        for (let prop in obj)
            this[prop] = obj[prop];
    }
    getTextOptions(k) {
        return {
            font: this.fontFamily.replace(' ', ''),
            fontSize: this.fontSize_mm * k,
            bold: this.fontWeight == 'bold',
            italic: this.fontStyle == 'italic',
            color: this.color
        };
    }
    getDivStyle(k, z) {
        return `
      position: absolute;
      left: ${this.left_mm * k}px;
      top: ${this.top_mm * k}px;
      z-index: ${z};`;
    }
}
exports.TextField = TextField;
class IconField {
    constructor(obj) {
        for (let prop in obj)
            this[prop] = obj[prop];
    }
    getIconOptions(k) {
        return {
            font: this.fontFamily.replace(' ', ''),
            fontSize: this.fontSize_mm * k,
            color: this.color
        };
    }
    getDivStyle(k, z) {
        return `
      position: absolute;
      left: ${this.left_mm * k}px;
      top: ${this.top_mm * k}px;
      z-index: ${z};`;
    }
}
exports.IconField = IconField;
class Logo {
    constructor(obj) {
        for (var prop in obj)
            this[prop] = obj[prop];
    }
    getDivStyle(k, z) {
        return `
      background-color: ${this.backgroundColor},
      opacity: ${this.opacity},
      transform: rotate(${this.rotate}deg),
      width: ${this.width_mm * k}px;
      height: ${this.height_mm * k}px;
      background-image: url('${this.src}');
      background-size: cover;
      left: ${this.left_mm * k}px;
      top: ${this.top_mm * k}px;
      position: absolute;
      z-index: ${z};`;
    }
}
exports.Logo = Logo;
class Line {
    constructor(obj) {
        for (var prop in obj)
            this[prop] = obj[prop];
    }
    getDivStyle(k, z) {
        let direction = this.isHorizontal ? 'top' : 'right';
        let style = `
      position: absolute;
      left: ${this.left_mm * k}px;
      top: ${this.top_mm * k}px;
      border-${direction}-style: ${this.design};
      border-${direction}-width: ${this.thickness}px;
      border-${direction}-color: ${this.color};      
      margin: 0;
    `;
        if (this.isHorizontal)
            style += `width: ${Math.round(this.length_mm) * k}px;`;
        else
            style += `height: ${Math.round(this.length_mm) * k}px;`;
        return style;
    }
}
exports.Line = Line;
class Background {
    constructor(obj) {
        for (var prop in obj)
            this[prop] = obj[prop];
    }
    getDivStyle(k, z) {
        let bgImg = this.src == '' ? '' :
            `background-image: url('${this.src}');
      background-size: cover;`;
        return `
      position: relative;
      background-color: ${this.backgroundColor};
      ${bgImg}
      margin: 0;
      padding: 0;
      overflow: hidden;
      width: ${Math.round(this.width_mm * k)}px;
      height: ${Math.round(this.height_mm * k)}px;`;
    }
}
exports.Background = Background;
//# sourceMappingURL=classes.js.map