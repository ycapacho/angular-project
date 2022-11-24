import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

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
      Nmesa: [null, Validators.required],
      Ncedulas: [null, Validators.required]
    });

    const id = this.config.data.id;
    this.isEditing = this.config.data.isEditing;
    this.shared.get(`stations/${id}`).subscribe({
      next: ((response: any) => {
        if (this.form) this.form.get('Nmesa').setValue(response?.Nmesa || '');
        if (this.form) this.form.get('Ncedulas').setValue(response?.Ncedulas || '');
      })
    })
    if (this.form) this.form.get('Nmesa')[this.isEditing ? 'enable': 'disable']();
    if (this.form) this.form.get('Ncedulas')[this.isEditing ? 'enable': 'disable']();
  }

  onSubmit() {
    const id = this.config.data.id;
    this.shared.put(`stations/${id}`, this.form.value).subscribe({
      next: ((response: any) => {
        this.ref.close(response);
      })
    })

  }

  close() {
    this.ref.close();
  }
}
