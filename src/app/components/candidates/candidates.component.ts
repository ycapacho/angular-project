import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';
import { NewCandidateComponent } from './new-candidate/new-candidate.component';
import Swal from 'sweetalert2';

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
    const ref = this.dialogService.open(NewCandidateComponent, {
      header: 'Crear candidato',
      width: '70%',
      height: '50%'
    });

    // acción una vez se cree un nuevo candidato
    ref.onClose.subscribe((response: any) => {
      if (response) {
        Swal.fire({
          title: `Candidato creado`,
          text: `${response.message}`,
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        });
        this.candidates.push(response.candidate);
      }
    })

  }

  delete(id: string) {

  }

}
