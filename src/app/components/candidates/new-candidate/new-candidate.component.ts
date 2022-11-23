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
      name: [null, Validators.required],
      identification: [null, Validators.required],
      party: [null, Validators.required],
    });
    this.shared.get('parties').subscribe({
      next: ((response: any) => {
        this.parties = response.parties;
        console.log(this.parties);
      })
    });
  }

  create() {
    const data = {
      ...this.form.value,
      party: {
        id: this.form.value.party._id
      }
    };
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
