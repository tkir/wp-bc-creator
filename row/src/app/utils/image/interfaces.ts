export interface ImageResult {
    file?: File;
    url: string;
    dataURL?: string;
    error?: string;
    resized?: {
        dataURL: string;
        type: string;
        width:number;
        height:number;
    }
}

export interface ResizeOptions {
    resizeMaxHeight?: number;
    resizeMaxWidth?: number;
    resizeQuality?: number;
    resizeType?: string;
    resizedToWidth?:number;
    resizedToHeight?:number;
}
