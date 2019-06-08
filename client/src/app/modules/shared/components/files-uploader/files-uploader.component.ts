import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FilesUploaderChange } from './models/filesUploaderChange';

@Component({
  selector: 'files-uploader',
  templateUrl: './files-uploader.component.html',
  styleUrls: ['./files-uploader.component.scss']
})
export class FilesUploaderComponent implements OnInit {

  @Input() id: string;
  @Output() files: EventEmitter<FilesUploaderChange> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onFileSelected(event) {
    const selectedFiles: File[] = event.target.files;
    this.files.emit({
      source : { id: this.id },
      value : selectedFiles
    });
  }
}
