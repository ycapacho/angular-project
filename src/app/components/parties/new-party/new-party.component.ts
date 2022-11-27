import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-new-party',
  templateUrl: './new-party.component.html',
  styleUrls: ['./new-party.component.css']
})
export class NewPartyComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    public ref: DynamicDialogRef
  ) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_partido: [null, Validators.required],
      lema_partido: [null, Validators.required],
    });
  }

  create() {
    const data = {
      ...this.form.value
    };
    console.log(data);
    this.shared.post('parties', data).subscribe({
      next: ((response: any) => {
        this.ref.close(response);
      })
    })
  }

  close() {
    this.ref.close();
  }

}
