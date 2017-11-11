const TextToSVG = require('text-to-svg');
const fs = require('fs');
let config = require('config');

export interface Options {
    color: string;
    font: string;
    fontSize: number;
    bold: boolean;
    italic: boolean;
}

export class SVG_Creator {

    private static instance: SVG_Creator;

    public static get Instance() {
        if (!SVG_Creator.instance) {
            SVG_Creator.instance = new SVG_Creator();
        }
        return SVG_Creator.instance;
    }

    private constructor() {
    }

    private fonts: { font: string, textToSVG: any }[] = [];

    private getFontFileName(font: string, italic: boolean, bold: boolean): string {
        if (!italic && !bold)return `${font}-Regular.ttf`;
        return `${font}-${bold ? 'Bold' : ''}${italic ? 'Italic' : ''}.ttf`;
    }

    private getConverter(font: string, italic: boolean, bold: boolean): any {

        if (fs.readdirSync('./fonts').indexOf(font) == -1) {
            font = config.get('defaultFont');
        }

        let fileName = this.getFontFileName(font, italic, bold);
        let i = this.fonts.findIndex(f => f.font == fileName);

        if (i == -1) {
            this.fonts.push({
                font: fileName,
                textToSVG: TextToSVG.loadSync(`./fonts/${font}/${fileName}`)
            });
            i = this.fonts.length - 1;
        }

        return this.fonts[i].textToSVG;
    }

    public textToSVG(text: string, options: Options): string {
        let params = {
            x: 0,
            y: 0,
            fontSize: options.fontSize,
            anchor: 'top',
            attributes: {fill: options.color}
        };

        return this.getConverter(options.font, options.italic, options.bold)
            .getSVG(text, params);
    }


}