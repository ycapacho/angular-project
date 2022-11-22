import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';
import { NewCandidateComponent } from './new-candidate/new-candidate.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  providers: [DialogService]
})
export class CandidatesComponent implements OnInit {

  constructor(
    private shared: SharedService,
    public dialogService: DialogService
  ) { }

  candidates: any[];

  ngOnInit(): void {
    this.shared.get('candidates').subscribe({
      next: ((response: any) => {
        // { count, candidates }
        this.candidates = response?.candidates;
      })
    })
  }

  showDialog(id: string, isEditing: boolean) {

  }

  create() {
    this.dialogService.open(NewCandidateComponent, {
      header: 'Crear candidato',
      width: '70%',
      height: '50%'
    })
  }

  delete(id: string) {

  }

}
