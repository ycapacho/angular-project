import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit, OnChanges {

  constructor(
    private fb: FormBuilder,
    private shared: SharedService
  ) { }

  form: FormGroup;
  @Input() id: string = null;
  @Input() isEditing = false;
  @Output() closeModal = new EventEmitter<Boolean>();

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    let id: any = changes['id'];
    let isEditing: any = changes['isEditing'];

    if (id && !id.firstChange) {
      this.shared.getAll(`parties/${this.id}`).subscribe({
        next: ((response: any) => {
          if (this.form) this.form.get('name').setValue(response?.party?.name || '');
        })
      })
    }

    if (isEditing && !isEditing.firstChange) {
      if (this.form) {
        if (isEditing.currentValue) { // true -> desde el componente padre se da click en editar
          this.form.get('name').enable();
        } else { // true -> desde el componente padre se da click en visualizar
          this.form.get('name').disable();
        }
      }
    }
  }

  onSubmit() {

  }

  close() {
    this.closeModal.emit(false);
  }
}
