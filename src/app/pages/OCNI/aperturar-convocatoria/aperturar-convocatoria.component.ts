import { Component, OnInit, ViewChild } from "@angular/core";
import { AperturarConvocatoriaService } from "../../../services/aperturarConvocatoria/aperturar-convocatoria.service";

import { Convocatoria } from "../../../Models/Convocatoria";
import Swal from "sweetalert2";
import { MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-aperturar-convocatoria",
  templateUrl: "./aperturar-convocatoria.component.html",
  styleUrls: ["./aperturar-convocatoria.component.css"],
})
export class AperturarConvocatoriaComponent implements OnInit {
  convocatoria: Convocatoria = new Convocatoria();
  convocatorias: `Object`[];
  convocatorias_aperturadas: [];
  convocatorias_desaperturadas: [];

  datos: any;
  opcionSeleccionado: string = "0";
  verSeleccion: string = "";

  espera: boolean = true;
  aperturada: boolean = false;
  desaperturada: boolean = false;
  requisitos: String;

  displayColumns: string[] = ["universidad_anfitriona", "nro_vacantes"];
  dataSource: MatTableDataSource<Convocatoria>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service2: AperturarConvocatoriaService) {
    this.datos = ["En espera", "Aperturados", "No aperturados"];
    this.opcionSeleccionado = this.datos[0];
  }
  p: number = 1;
  p2: number = 1;
  p3: number = 1;

  filterPost = "";

  ngOnInit() {
    this.loadConvocatoriaEspera();
    this.loadConvocatoriaAperturada();
    this.get();
  }
  get() {
    this.service2.getConvocatoriasEspera().subscribe((data) => {
      this.dataSource = data[`return`];
      this.dataSource = new MatTableDataSource<Convocatoria>(data[`return`]);
      this.dataSource.paginator = this.paginator;
    });
  }

  getRequisitos(requisitos: string) {
    this.requisitos = requisitos;
  }

  vacio: boolean = false;

  loadConvocatoriaEspera() {
    this.service2.getConvocatoriasEspera().subscribe((data) => {
      this.convocatorias = data["return"];
    });
  }
  /*getPlanAprobados() {
    this.service.getPlanesAprobado().subscribe((data) => {
      this.listPlanesAprobado = data["PLAN_DIRESCUELA_APROBADO"];
    });
  } */
  loadConvocatoriaAperturada() {
    this.service2.getConvocatoriasAperturadas().subscribe((data) => {
      this.convocatorias_aperturadas = data["return"];
    });
  }

  loadConvocatoriaDesaperturada() {
    this.service2.getConvocatoriasNoAperturadas().subscribe((data) => {
      this.convocatorias_desaperturadas = data["return"];
    });
  }

  positivo(convo: Convocatoria): void {
    console.log(convo.id_convocatoria);
    console.log(convo.estado_evaluado);
    Swal.fire({
      title: "¿Aperturar?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#17A2B8",
      cancelButtonColor: "#E89A00",
      confirmButtonText: "Sí, aperturar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        convo.estado_evaluado = 2;
        this.service2.updateValidar(convo).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Aperturado con exito",
          showConfirmButton: false,
          timer: 1100,
        });
      }
    });
  }
  negativo(convo: Convocatoria) {
    Swal.fire({
      title: "¿No perturar?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#17A2B8",
      cancelButtonColor: "#E89A00",
      confirmButtonText: "Sí, no aperturar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        convo.estado_evaluado = 3;
        this.service2.updateValidar(convo).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No perturado con exito",
          showConfirmButton: false,
          timer: 1100,
        });
      }
    });
  }
  finalizar(convo: Convocatoria) {
    Swal.fire({
      title: "¿Finalizar Convocatoria?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#17A2B8",
      cancelButtonColor: "#E89A00",
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        convo.estado_evaluado = 0;
        this.service2.updateValidar(convo).subscribe((data) => {
          this.ngOnInit();
          /*this.convocatorias = this.convocatorias.filter((c) => c !== convocatoria); */
        });
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Convocatoria finalizada",
          showConfirmButton: false,
          timer: 1100,
        });
      }
    });
  }

  FiltrarTablas() {
    this.verSeleccion = this.opcionSeleccionado;
    if (this.verSeleccion == "En espera") {
      this.espera = true;
      this.aperturada = false;
      this.desaperturada = false;
    }
    if (this.verSeleccion == "Aperturados") {
      this.espera = false;
      this.aperturada = true;
      this.desaperturada = false;
      this.loadConvocatoriaAperturada();
    }
    if (this.verSeleccion == "No aperturados") {
      this.espera = false;
      this.aperturada = false;
      this.desaperturada = true;
      this.loadConvocatoriaDesaperturada();
    }
  }
}
