import { Component, OnInit, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FileItem } from '../../../Models/FileItem';
import { AdjuntarConvocatoriaService } from '../../../services/adjuntarConvocatoria/adjuntar-convocatoria.service';
import { Convocatoria } from '../../../Models/Convocatoria';

import Swal from "sweetalert2";
@Component({
  selector: 'app-adjuntar-convocatoria',
  templateUrl: './adjuntar-convocatoria.component.html',
  styleUrls: ['./adjuntar-convocatoria.component.css']
})
export class AdjuntarConvocatoriaComponent implements OnInit {

  solicitudMae: boolean;
  removableInput: boolean;
  cargados = false;


  archivos: FileItem[] = [];
  cartaMae: any ;
  solicitud: any;

  concocatoria: Convocatoria;
  alumno: any;

  postular: boolean;
  // uploadedFiles: Array < File > ;

  constructor(private service: AdjuntarConvocatoriaService) { }

  ngOnInit() {
    this.get();
  }

  onFileCarta(event) {
    this.cartaMae = new FileItem(event.target.files[0], 'carta');
    //this.uploadedFiles = event.target.files;
    console.log(this.cartaMae);
  }

  onFileSolicitud(event) {
    // this.uploadedFiles = event.target.files;
    this.solicitud = new FileItem(event.target.files[0], 'solicitud');
    console.log(this.solicitud);
  }

  Guardar() {

    this.service.getPostulaciones(parseInt(localStorage.getItem('idalumno'), 10), parseInt(localStorage.getItem('id_convocatoria'), 10))
    .subscribe( (data) => {
      console.log('Cuantos datos hay :(');
      console.log(Object.entries(data[`return`]).length);


      if (Object.entries(data[`return`]).length !== 0 ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usted ya postulo a esta convocatoria!'
        });
      } else {
        Swal.fire({
          title: '¿Desea postular a esta Convocatoria?',
          text: "Una ves postulado no podra cacelar su postulacion ni modificar los archivos que esta adjuntando!!!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#17A2B8",
          cancelButtonColor: "#E89A00",
          confirmButtonText: "Sí, postular",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.value) {
            this.archivos.push(this.solicitud);
            this.archivos.push(this.cartaMae);
            this.service.cargarArchivos(this.archivos, parseInt(localStorage.getItem('idalumno'), 10) ,
                            parseInt(localStorage.getItem('id_convocatoria'), 10));
            console.log(this.archivos);
            this.cargados = true;
            setTimeout(() => (this.cargados = false),  3000);
          }
        });
// fin del else
      }
    });


   
  }


  get() {
    console.log('estoy aqui');
    console.log(localStorage.getItem('idalumno'));
    console.log(localStorage.getItem('fecha_convocatoria'));

    this.concocatoria = new Convocatoria();
    this.concocatoria.id_convocatoria = parseInt(localStorage.getItem('id_convocatoria'), 10);
    this.concocatoria.nombre_convocatoria = localStorage.getItem('nombre_convocatoria');
    this.concocatoria.universidad_anfitriona = localStorage.getItem('universidad');
    this.concocatoria.fecha_presentacion = localStorage.getItem('fecha_convocatoria');
    
    this.getAlumno(parseInt(localStorage.getItem('idalumno'), 10));
    console.log(this.concocatoria);

  }

  getAlumno(idalumno: number) {
    return this.service.getAlumno(idalumno).subscribe( (data) => {
      this.alumno = data[`return`];
      console.log(this.alumno);
    });
  }

  create() {
    this.service.create( parseInt(localStorage.getItem('idalumno'), 10) , parseInt(localStorage.getItem('id_convocatoria'), 10));

  }
  

}
