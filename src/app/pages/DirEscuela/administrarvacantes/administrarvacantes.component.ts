import { Component, OnInit, ViewChild } from "@angular/core";
import { AdministrarVacantesService } from "../../../services/administarVacantes/administrar-vacantes.service";
import { Escuela } from "../../../Models/Escuela";
import { UniversidadConvenio } from "../../../Models/UniversidadConvenio";
import { Convocatoria } from "../../../Models/Convocatoria";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'

import Swal from "sweetalert2";
import { PrincipalService } from '../../../services/principal/principal.service';
import { Console } from 'console';
@Component({
  selector: "app-administrarvacantes",
  templateUrl: "./administrarvacantes.component.html",
  styleUrls: ["./administrarvacantes.component.css"],
})
export class AdministrarvacantesComponent implements OnInit {

  // Tablas
  displayedColumns: string[] = ['Item', 'Universidad Anfitriona', 'Convocatoria', 'Nro Vacantes',
                     'Escuela Profesional', 'Requisitos', 'Fecha de Presentacion', 'Contacto',
                      'Universidad' , 'Accion'];

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  // fin

  dataSource: MatTableDataSource<object>;

  universidades: UniversidadConvenio[];
  universidadSelect: UniversidadConvenio[];
  idUniversidadConvenio: number;
  idEscuela: number;
  idFacultad: any;
  escuelas: Escuela[];

  nombreescuela = 'Ing. Sistemas';

  vacio = false;
  validar = false;
  validedit = false;
  validgua = true;
  loading = false;

  validarnom = "";
  validarvac = "";
  message: string;

  requisito: string;


  convocatoria: Convocatoria = new Convocatoria();
  convocatoriaSelect: Convocatoria[];

  convocatorias: Convocatoria[];
  constructor(private service: AdministrarVacantesService, private serviceEscuela: PrincipalService) {}

  ngOnInit() {
    // this.loadFacultad();
    this.loadEscuela();
    this.loadUniversidadConvenio();
    //  this.loadConvocatoria();
  }

/*
  loadFacultad() {
    console.log( 'id_persona' +
    JSON.parse(sessionStorage.getItem('usuario')).id_persona
    );

    this.service.findIdFacultad(JSON.parse(sessionStorage.getItem('usuario')).id_persona).subscribe( (data) =>{
      this.idFacultad = data[`id_facultad`][0].id_facultad;
      // console.log(this.idFacultad[0].id_facultad);
      this.loadEscuela(this.idFacultad);

    });
  }
*/
  // opcion 2 docente
  loadEscuela() {

    this.serviceEscuela.getNameEscuela(JSON.parse(sessionStorage.getItem('usuario')).id_persona , 2).subscribe((data) => {
      console.log('escuela');
      console.log(data[`return`]);
      this.idEscuela = data[`return`][0].id_escuela;
      this.nombreescuela = data[`return`][0].nombre_escuela;
      console.log(this.idEscuela);
      this.loadConvocatoria();
    });
    // this.service.getEscuela(id_facultad).subscribe((data) => {
    //   this.escuelas = data["return"];
    // });
  }

  loadUniversidadConvenio() {
    this.service.getUniversidadConvenio().subscribe((data) => {
      this.universidades = data["return"];
      console.log(this.universidades);
    });
  }

  loadConvocatoria() {
    this.service.getConvocatorias(this.idEscuela).subscribe((data) => {
      this.convocatorias = data["return"];

    this.dataSource = new MatTableDataSource<object>(data[`return`]);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;

  });
  }

  onChange($event) {
    this.idUniversidadConvenio = $event.target.value;
    if (!this.idUniversidadConvenio || this.idUniversidadConvenio < 0) {
      this.vacio = false;
    } else {
      this.fillUniversidad(this.idUniversidadConvenio);
    }
    console.log(this.universidadSelect);
  }
  fillUniversidad(id: number) {
    this.service.findUniversidadConvenio(id).subscribe((data) => {
      this.universidadSelect = data["return"];
      this.vacio = true;
    });
  }
/*
  onChangeEscuela($event) {
    // this.idEscuela = $event.target.value;
  }
*/
  Guardar() {
    this.convocatoria.id_universidad_convenio = this.idUniversidadConvenio;
    this.convocatoria.id_escuela = this.idEscuela;

    if (!this.idUniversidadConvenio || this.idUniversidadConvenio < 0) {
      this.validar = true;
      this.message = "Selecciones una universidad Destino";
    } else {
      if (!this.idEscuela || this.idEscuela < 0) {
        this.validar = true;
        this.message = "Seleccione una Escuela";
      } else {
        if (!this.convocatoria.fecha_presentacion) {
          this.validar = true;
          this.message = "Seleccione una fecha valida";
        } else {
          if (!this.convocatoria.nombre_convocatoria) {
            this.validarnom = "is-invalid";
            this.validar = true;
            this.message = "Ingrese un nombre de convocatoria";
          } else {
            this.validarnom = "";
            if (
              !this.convocatoria.nro_vacantes ||
              this.convocatoria.nro_vacantes < 1
            ) {
              this.validarvac = "is-invalid";
              this.validar = true;
              this.message = "Ingrese un cantidad de vacantes";
            } else {
              this.validarvac = "";
              this.validar = false;

              this.invertir();

              this.service
                .createConvocatoria(this.convocatoria)
                .subscribe((data) => {
                  this.loading = true;
                  setTimeout(() => (this.loading = false), 2000);

                  this.Limpiar();
                  this.ngOnInit();
                });
            }
          }
        }
      }
    }
  }

  invertir() {
    let invertido: any;
    invertido = (cadenas) =>
      this.convocatoria.fecha_presentacion.split("-").reverse().join("-");
    this.convocatoria.fecha_presentacion = invertido();
  }

  Eliminar(convocatoria: any) {


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.service.deleteConovocatoria(convocatoria).subscribe((data) => {
          //this.loadConvocatoria();
          this.convocatorias = this.convocatorias.filter((c) => c !== convocatoria);
          this.dataSource = new MatTableDataSource<object>(this.convocatorias);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  Editar(convocatoria: any) {
  
    console.log(convocatoria);
    this.fillUniversidad(convocatoria.id_universidad_convenio);
    this.findIdConvocatoria(convocatoria.id_convocatoria);
    // console.log(this.universidadSelect);
    this.validedit = true;
    this.validgua = false;
  }

  Actualizar() {

    Swal.fire({
      title: '¿Desea modificar esta Convocatoria?',
      text: "No podra revertir esta accion!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#17A2B8",
      cancelButtonColor: "#E89A00",
      confirmButtonText: "Sí, modificar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {

        if (
          this.convocatoria.fecha_presentacion !==
          this.convocatoriaSelect[0].fecha_presentacion
        ) {
          this.invertir();
        }
        this.convocatoria.id_universidad_convenio = this.idUniversidadConvenio;
        this.convocatoria.id_escuela = this.idEscuela;
        this.service.updateConvocatoria(this.convocatoria).subscribe((data) => {
          alert("Se ha actualizado");
          this.ngOnInit();
          //this.convocatorias = this.convocatorias.filter( c => c !== this.convocatoria);
          this.Limpiar();
        });

        Swal.fire(
          'Modificado!',
          'Se ha modificado con exito!!!.',
          'success'
        );


      }
    });




    
  }

  findIdConvocatoria(id: number) {
    this.service.getIdConvocatoria(id).subscribe((data) => {
      this.convocatoriaSelect = data[`return`];
      this.convocatoria.id_convocatoria = this.convocatoriaSelect[0].id_convocatoria;
      this.convocatoria.nombre_convocatoria = this.convocatoriaSelect[0].nombre_convocatoria;
      this.convocatoria.nro_vacantes = this.convocatoriaSelect[0].nro_vacantes;
      this.convocatoria.requisitos = this.convocatoriaSelect[0].requisitos;
      this.convocatoria.fecha_presentacion = this.convocatoriaSelect[0].fecha_presentacion;

      this.invertir();
      this.idUniversidadConvenio = this.convocatoriaSelect[0].id_universidad_convenio;
      this.idEscuela = this.convocatoriaSelect[0].id_escuela;
    });
  }

  Limpiar() {
    this.convocatoria.nombre_convocatoria = "";
    this.convocatoria.nro_vacantes = null;
    this.vacio = false;
    this.idUniversidadConvenio = -1;
    this.idEscuela = -1;
    this.convocatoria.fecha_presentacion = "";
    this.convocatoria.requisitos = "";
  }

  Cancelar() {
    this.validedit = false;
    this.validgua = true;
    this.Limpiar();
  }

  requisitos(requisito: any ) {
    this.requisito = requisito;
  }

  filter(filtervalue: string) {
    // alert(filtervalue);
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

}
