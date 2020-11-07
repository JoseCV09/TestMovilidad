import { Component, OnInit } from "@angular/core";
import { ConstanciaFinancieraService } from "src/app/services/constancia-financiera/constancia-financiera.service";
import { RegistrarPresentacionService } from "src/app/services/registrar-presentacion/registrar-presentacion.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FileItem } from "../../../Models/FileItem";
import { PresentacionAlumno } from "src/app/Models/PresentacionAlumno";

@Component({
  selector: "app-registrar-presentacion",
  templateUrl: "./registrar-presentacion.component.html",
  styleUrls: ["./registrar-presentacion.component.css"],
})
export class RegistrarPresentacionComponent implements OnInit {
  p: number = 1;

  tramite: string;
  ppt: any;
  listPresentaciones: [];
  listConstanciaFinanciera: [];
  listFacultades: [];
  listEscuelaFacultades: [];
  listAlumnoPlan: [];
  selectedIdFacultad: number = null;
  selectedIdEscuela: number = null;
  selectedIdPlan: number = null;
  newDocente: number;
  archivos: FileItem[] = [];
  cargados = false;

  constructor(
    private serviceConstancia: ConstanciaFinancieraService,
    private servicePresentacion: RegistrarPresentacionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.servicePresentacion.getPresentacion().subscribe((data) => {
      this.listPresentaciones = data["LISTA_PRESENTACION"];
    });
    this.getFacultades();
    this.getDocente(
      parseInt(JSON.parse(sessionStorage.getItem("usuario")).id_persona)
    );
  }
  getFacultades() {
    this.serviceConstancia.getFacultad().subscribe((data) => {
      this.listFacultades = data["FACU"];
    });
  }

  selectIdFacultad(event: any) {
    this.selectedIdFacultad = event.target.value;
    console.log(this.selectedIdFacultad);
    this.serviceConstancia
      .getEscuelaFacultad(this.selectedIdFacultad)
      .subscribe((data) => {
        this.listEscuelaFacultades = data["LISTAR_ESCUELA"];
      });
  }

  selectIdEscuela(event: any) {
    this.selectedIdEscuela = event.target.value;
    this.serviceConstancia.getPlan(this.selectedIdEscuela).subscribe((data) => {
      this.listAlumnoPlan = data["LISTA_PLANES_APROB"];
    });
  }

  selectIdPlan(event: any) {
    this.selectedIdPlan = event.target.value;
  }

  getDocente(idpersona: number) {
    return this.serviceConstancia.getId_Docente(idpersona).subscribe((data) => {
      this.newDocente = data["IDDOCENTE"][0].id_docente;
      console.log("Este es el ID del DOCENTE REGRESADO " + this.newDocente);
    });
  }

  onFilePPT(event) {
    this.ppt = new FileItem(event.target.files[0], "ppt");
    console.log(this.ppt);
  }

  Guardar() {
    this.archivos.push(this.ppt);
    let invertido: any;
    invertido = (cadenas: any) => this.tramite.split("-").reverse().join("-");
    this.tramite = invertido();
    this.servicePresentacion.cargarArchivos(
      this.archivos,
      this.tramite,
      this.selectedIdPlan,
      this.newDocente
    );
    console.log(this.archivos);
    this.cargados = true;
    setTimeout(() => (this.cargados = false), 3000);
  }

  eliminar_presentacion(presentacion: PresentacionAlumno): void {
    Swal.fire({
      title: "¿Seguro de Eliminar la Presentacion permanentemente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar permanentemente",
    }).then((result) => {
      if (result.value) {
        this.servicePresentacion
          .deletePresentacion(presentacion)
          .subscribe((data) => {
            this.ngOnInit();
          });
        Swal.fire("Presentación Eliminada Permanentemente!");
      }
    });
  }
}
