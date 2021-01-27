import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-status-form-modal',
  templateUrl: './status-form-modal.component.html',
  styleUrls: ['./status-form-modal.component.scss']
})
export class StatusFormModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  taskSubmitted = false;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter();

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


}
