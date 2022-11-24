import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';
import { NewCandidateComponent } from './new-candidate/new-candidate.component';
import { CandidateComponent } from './candidate/candidate.component';
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
  display = false;
  idSelected: string;
  isEditing = false;

  ngOnInit(): void {
    this.shared.get('candidates').subscribe({
      next: ((response: any) => {
        this.candidates = response
      })
    })
  }

  delete(id: string) {
    Swal.fire({
      title: '¿Está seguro de que desea borrar el candidato?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
      }
    })
  }


  showDialog(id: string, isEditing: boolean) {
    const ref = this.dialogService.open(CandidateComponent, {
      header: 'Detalle de Candidato',
      width: '70%',
      data: {
        id, isEditing
      }
    });
  ref.onClose.subscribe((response: any) => {
    if (response) {
      Swal.fire({
        title: `${response.message || '--'}`,
        showCancelButton: false,
        confirmButtonText: 'Aceptar'
      });
      this.candidates.map((candidate: any) => {
        if (candidate._id == response.id) return { ...candidate, name: response.nameCandidato };
        return candidate;
      })
    }
  });
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
}
