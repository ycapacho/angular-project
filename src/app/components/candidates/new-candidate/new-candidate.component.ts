import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.css']
})
export class NewCandidateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    public ref: DynamicDialogRef
  ) { }

  form: FormGroup;
  parties: any[];

  ngOnInit(): void {
    this.form = this.fb.group({
      nameCandidato: [null, Validators.required],
      apellidoCandidato: [null, Validators.required],
      numberCedula: [null, Validators.required],
      partido: [null, Validators.required],
      numberResolucion: [null, Validators.required]
    });
    this.shared.get('parties').subscribe({
      next: ((response: any) => {
        this.parties = response;
        console.log(this.parties);
      })
    });
  }

  create() {
    const data = {
      ...this.form.value,
      id_partido: this.form.value.partido._id.$oid
    };
    console.log(data);
    this.shared.post('candidates', data).subscribe({
      next: ((response: any) => {
        this.ref.close(response);
      })
    })
  }

  close() {
    this.ref.close();
  }

}
