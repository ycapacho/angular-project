import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

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
      nameCandidato: [null, Validators.required],
      apellidoCandidato: [null, Validators.required],
      numberCedula: [null, Validators.required],
      numberResolucion: [null, Validators.required],
      id_partido: [null, Validators.required],
    });

    const id = this.config.data.id;
    this.isEditing = this.config.data.isEditing;
    this.shared.get(`candidates/${id}`).subscribe({
      next: ((response: any) => {
        if (this.form) this.form.get('nameCandidato').setValue(response?.nameCandidato || '');
        if (this.form) this.form.get('apellidoCandidato').setValue(response?.apellidoCandidato || '');
        if (this.form) this.form.get('numberCedula').setValue(response?.numberCedula || '');
        if (this.form) this.form.get('numberResolucion').setValue(response?.numberResolucion || '');
      })
    })
    if (this.form) this.form.get('nameCandidato')[this.isEditing ? 'enable': 'disable']();
    if (this.form) this.form.get('apellidoCandidato')[this.isEditing ? 'enable': 'disable']();
    if (this.form) this.form.get('numberCedula')[this.isEditing ? 'enable': 'disable']();
    if (this.form) this.form.get('numberResolucion')[this.isEditing ? 'enable': 'disable']();
  }

  onSubmit() {
    const id = this.config.data.id;
    this.shared.put(`candidates/${id}`, this.form.value).subscribe({
      next: ((response: any) => {
        this.ref.close(response);
      })
    })

  }

  close() {
    this.ref.close();
  }

  }