import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';
import { PartyComponent } from './party/party.component';
import Swal from 'sweetalert2';

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
    const ref = this.dialogService.open(PartyComponent, {
      header: 'Lista de partidos políticos',
      width: '70%',
      data: {
        id, isEditing
      }
    });

    // actualización de lista de partido políticos
    ref.onClose.subscribe((response: any) => {
      if (response) {
        Swal.fire({
          title: `Ahora el partido político se llame ${response?.name || '--'}`,
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        });
        this.parties.map((party: any) => {
          if (party._id == response.id) return { ...party, name: response.name };
          return party;
        })
      }
    });
  }

}
