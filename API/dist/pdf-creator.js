"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
let pdf = require('html-pdf');
let fs = require('fs');
let config = require('config');
class PdfCreator {
    static getHTML(obj, k) {
        let z = config.get('zIndex');
        let textArr = [];
        let logoArr = [];
        let lineArr = [];
        let bg = '';
        Object.keys(obj)
            .forEach(key => {
            if (obj[key])
                obj[key].forEach(it => {
                    let item;
                    switch (key) {
                        case 'Text':
                            item = new classes_1.TextField(it);
                            textArr.push(`
<div style="${item.getDivStyle(k, ++z)}">
  <span style="${item.getSpanStyle(k)}">${item.text}</span>
</div>
              `);
                            break;
                        case 'Logo':
                            item = new classes_1.Logo(it);
                            logoArr.push(`<div style="${item.getDivStyle(k, ++z - 60)}"></div>`);
                            break;
                        case 'Line':
                            item = new classes_1.Line(it);
                            lineArr.push(`<div style="${item.getDivStyle(k, ++z - 50)}"></div>`);
                            break;
                        case 'Background':
                            item = new classes_1.Background(it);
                            bg = `<body style="${item.getDivStyle(k, 0)}">`;
                            break;
                    }
                });
        });
        if (bg != '') {
            logoArr.forEach(logo => bg += logo);
            lineArr.forEach(line => bg += line);
            textArr.forEach(txt => bg += txt);
            bg += '</body>';
        }
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    ${bg}
    </html>`;
    }
    static getPDF(obj, cb) {
        let options = {
            "height": `${obj.Background[0].height_mm}mm`,
            "width": `${obj.Background[0].width_mm}mm`,
            "phantomPath": config.get('html-pdf.phantomPath')
        };
        let html = PdfCreator.getHTML(obj, config.get('html-pdf.pdf.rate'));
        pdf.create(html, options)
            .toBuffer((err, buffer) => {
            cb(err, buffer);
        });
    }
    static getPreview(obj, cb) {
        let options = {
            "type": config.get('html-pdf.preview.type'),
            "quality": config.get('html-pdf.preview.quality'),
            "viewportSize": config.get('html-pdf.preview.viewportSize'),
            "phantomPath": config.get('html-pdf.phantomPath')
        };
        let html = PdfCreator.getHTML(obj, config.get('html-pdf.preview.rate'));
        pdf.create(html, options)
            .toBuffer((err, buffer) => {
            cb(err, buffer);
        });
    }
}
exports.PdfCreator = PdfCreator;
//# sourceMappingURL=pdf-creator.js.map