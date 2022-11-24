import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) { }

  form: FormGroup;
  isEditing = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_partido: [null, Validators.required],
      lema_partido: [null, Validators.required]
    });

    const id = this.config.data.id;
    this.isEditing = this.config.data.isEditing;
    this.shared.get(`parties/${id}`).subscribe({
      next: ((response: any) => {
        if (this.form) this.form.get('nombre_partido').setValue(response?.nombre_partido || '');
        if (this.form) this.form.get('lema_partido').setValue(response?.lema_partido || '');
      })
    })
    if (this.form) this.form.get('nombre_partido')[this.isEditing ? 'enable': 'disable']();
    if (this.form) this.form.get('lema_partido')[this.isEditing ? 'enable': 'disable']();
  }

  onSubmit() {
    const id = this.config.data.id;
    this.shared.put(`parties/${id}`, this.form.value).subscribe({
      next: ((response: any) => {
        this.ref.close(response);
      })
    })

  }

  close() {
    this.ref.close();
  }
}
