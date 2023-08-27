import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-custom-confirm-dialog',
  template: `
    <div class="overlay">
      <div class="dialog">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <button class="btn btn-danger" (click)="onConfirm()">Yes, Delete</button>
        <button class="btn btn-primary" (click)="onCancel()">No, Cancel</button>
      </div>
    </div>
  `,
  styles: [
    `
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dialog {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      text-align: center;
    }
    `,
  ],
})
export class CustomConfirmDialogComponent {
  @Input() title: string = 'Confirmation';
  @Input() message: string = 'Are you sure?';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
