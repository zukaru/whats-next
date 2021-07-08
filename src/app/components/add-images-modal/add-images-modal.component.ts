import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-images-modal',
  templateUrl: './add-images-modal.component.html',
  styleUrls: ['./add-images-modal.component.scss']
})
export class AddImagesModalComponent implements OnInit, OnDestroy {

  taskSubmitted = false;
  @Input() isOpen = true;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter();
  @Output() filesAdded = new EventEmitter<File | FileList>();




  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.document.body, 'overflow', 'hidden')
    this.renderer.setStyle(this.document.body, 'height', '100%')

  }

  ngOnDestroy() {
    this.renderer.removeStyle(this.document.body, 'overflow')
    this.renderer.removeStyle(this.document.body, 'height')
  }

  emitCloseModal() {
    this.closeModal.emit(false);
  }

  onFormSubmit(e: NgForm) {
    this.submitForm.emit(e.value);
  }

  onFileChange(files: FileList) {
    this.filesAdded.emit(files);
  }

}
