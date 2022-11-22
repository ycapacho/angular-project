import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
import { PartyComponent } from './party/party.component';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css'],
  providers: [DialogService]
})
export class PartiesComponent implements OnInit {

  constructor(
    private shared: SharedService,
    public dialogService: DialogService
  ) { }

  parties: any[];
  display = false;
  idSelected: string;
  isEditing = false;

  ngOnInit(): void {
    this.shared.get('parties').subscribe({
      next: ((response: any) => {
        this.parties = response.parties;
        console.log(this.parties);
      })
    })
  }

  delete(id: string) {
    Swal.fire({
      title: '¿Está seguro de que desea borrar el partido político?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Borrar partido
        console.log(id);
      }
    })
  }

  showDialog(id: string, isEditing: boolean) {
    this.dialogService.open(PartyComponent, {
      header: 'Lista de partidos políticos',
      width: '70%',
      data: {
        id, isEditing
      }
    });
  }

}
