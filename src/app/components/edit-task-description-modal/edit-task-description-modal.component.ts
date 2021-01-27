import { DOCUMENT } from '@angular/common';
import { Component, Input, Inject, OnInit, Output, Renderer2, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-edit-task-description-modal',
  templateUrl: './edit-task-description-modal.component.html',
  styleUrls: ['./edit-task-description-modal.component.scss']
})
export class EditTaskDescriptionModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  taskSubmitted = false;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() submitForm = new EventEmitter();
  @Input() textAreaVal: string;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
  }

  onFormSubmit(e) {
    this.submitForm.emit(e.value);
  }
  

}
