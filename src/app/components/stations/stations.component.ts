import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/services/shared.service';
import { StationComponent } from './station/station.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
  providers: [DialogService]
})
export class StationsComponent implements OnInit {

  constructor(
    private shared: SharedService,
    public dialogService: DialogService
  ) { }

  stations: any[];
  display = false;
  idSelected: string;
  isEditing = false;

  ngOnInit(): void {
    this.shared.get('stations').subscribe({
      next: ((response: any) => {
        this.stations = response
      })
    })
  }

  delete(id: string) {
    Swal.fire({
      title: '¿Está seguro de que desea borrar la mesa?',
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
    const ref = this.dialogService.open(StationComponent, {
      header: 'Detalle de la Mesa',
      width: '70%',
      data: {
        id, isEditing
      }
    });

    // actualización de lista de mesas
    ref.onClose.subscribe((response: any) => {
      if (response) {
        Swal.fire({
          title: `${response.message || '--'}`,
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        });
        this.stations.map((station: any) => {
          if (station._id == response.id) return { ...station, name: response.Nmesa };
          return station;
        })
      }
    });
  }

}
