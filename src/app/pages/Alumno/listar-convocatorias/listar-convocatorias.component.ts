import { Component, OnInit } from '@angular/core';
import { ListarConvocatoriaService } from '../../../services/adjuntarConvocatoria/listar-convocatoria.service';
import { Convocatoria } from '../../../Models/Convocatoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-convocatorias',
  templateUrl: './listar-convocatorias.component.html',
  styleUrls: ['./listar-convocatorias.component.css']
})
export class ListarConvocatoriasComponent implements OnInit {

  escuelaAlumno: any;

  convocatorias: any;
  convocarioapostular = new Convocatoria();
  existe = true;

  loading = true;

  constructor(private service: ListarConvocatoriaService, private router: Router) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.service.getIdEscuela(JSON.parse(sessionStorage.getItem('usuario')).id_persona).subscribe( (data) => {
        this.escuelaAlumno = data[`return`];
        // console.log(this.escuelaAlumno);
        this.getConvocatorias(this.escuelaAlumno[0].id_escuela);
    });

  }

  getConvocatorias(idescuela: number) {
    // console.log(idescuela);
    this.service.getConvocatorias(idescuela).subscribe( (data) => {
    this.convocatorias = data[`return`];
    //  console.log(this.convocatorias);
    if (data[`return`].length === 0) {
      this.existe = true;
      this.loading = false;
     } else {
       this.existe = false;
     }
  });

  }

  postular(convocatoria: any ) {

    localStorage.setItem('id_convocatoria', convocatoria.id_convocatoria);
    localStorage.setItem('nombre_convocatoria', convocatoria.nombre_convocatoria);
    localStorage.setItem('universidad', convocatoria.nombre_universidad_convenio);
    localStorage.setItem('fecha_convocatoria', convocatoria.fecha_presentacion);
    localStorage.setItem('idalumno', this.escuelaAlumno[0].id_alumno);

    this.router.navigate(['/principal/pages/adjuntarConvocatoria']);

  }

}
