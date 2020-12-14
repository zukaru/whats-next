import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-status-form-modal',
  templateUrl: './status-form-modal.component.html',
  styleUrls: ['./status-form-modal.component.scss']
})
export class StatusFormModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  taskSubmitted = false;
  @Output() closeModal = new EventEmitter<boolean>();
  

  // date: string;
  // notes: string;
  // status: string;
  // whoIs: string;
  // deadline: string;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.document.body, 'overflow', 'hidden')
    this.renderer.setStyle(this.document.body, 'height', '100%')

    fromEvent(window, 'scroll')
    .subscribe(e => e.preventDefault())

  }

  ngOnDestroy() {
    this.renderer.removeStyle(this.document.body, 'overflow')
    this.renderer.removeStyle(this.document.body, 'height')
  }

  statusFormSubmit() {
  }

  emitCloseModal() {
    this.closeModal.emit(false);
  }

  

  preventScroll() {

  }

}
