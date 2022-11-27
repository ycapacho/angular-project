import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';
import { PartyComponent } from './party/party.component';
import { NewPartyComponent } from './new-party/new-party.component';
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
        this.parties = response
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
        console.log(id);
      }
    })
  }

  showDialog(id: string, isEditing: boolean) {
    const ref = this.dialogService.open(PartyComponent, {
      header: 'Detalle de Partido',
      width: '70%',
      data: {
        id, isEditing
      }
    });

    // actualización de lista de partido políticos
    ref.onClose.subscribe((response: any) => {
      if (response) {
        Swal.fire({
          title: `${response.message || '--'}`,
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        });
        this.parties.map((party: any) => {
          if (party._id == response.id) return { ...party, name: response.nombre_partido };
          return party;
        })
      }
    });
  }
  
  create() {
    const ref = this.dialogService.open(NewPartyComponent, {
      header: 'Crear partido',
      width: '70%',
      height: '70%'
    });

    ref.onClose.subscribe((response: any) => {
      if (response) {
        Swal.fire({
          title: `Partido creado`,
          text: `${response.message}`,
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        });
        this.parties.push(response.party);
      }
    })
  }
}
