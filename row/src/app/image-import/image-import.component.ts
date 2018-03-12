import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageService} from "../services/image.service";

@Component({
  selector: 'card-image-import',
  templateUrl: './image-import.component.html',
  styleUrls: ['./image-import.component.css']
})
export class ImageImportComponent {

  @Input() isLogo: boolean;
  @Output() dataUrlReady: EventEmitter<string> = new EventEmitter();

  constructor(private imageService: ImageService) {
  }


  blobFromFile(event) {
    if (event.target.files.length)
      this.imageService.uploadImage(event.target.files[0], false)
        .then(res => this.dataUrlReady.emit(res.resized.dataURL));
  }

  clearImage() {
    this.dataUrlReady.emit(null);
  }
}
