import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-new-station',
  templateUrl: './new-station.component.html',
  styleUrls: ['./new-station.component.css']
})
export class NewStationComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    public ref: DynamicDialogRef
  ) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      Nmesa: [null, Validators.required],
      Ncedulas: [null, Validators.required],
    });
  }

  create() {
    const data = {
      ...this.form.value
    };
    console.log(data);
    this.shared.post('stations', data).subscribe({
      next: ((response: any) => {
        this.ref.close(response);
      })
    })
  }

  close() {
    this.ref.close();
  }

}
