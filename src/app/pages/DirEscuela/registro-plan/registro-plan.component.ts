import { Component, OnInit } from "@angular/core";
import { PlanesService } from "src/app/services/planes/planes.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FileItem } from "../../../Models/FileItem";
import { Planes } from "src/app/Models/Planes";
@Component({
  selector: "app-registro-plan",
  templateUrl: "./registro-plan.component.html",
  styleUrls: ["./registro-plan.component.css"],
})
export class RegistroPlanComponent implements OnInit {
  p: number = 1;
  p1: number = 1;
  p2: number = 1;
  p3: number = 1;
  listPlanesEspera: [];
  listPlanesAprobado: [];
  listPlanesDenegado: [];
  listPlanesEliminado: [];
  listAlumnoGanador: [];
  loadPlanData: Planes[] = [];

  newDocente: number;
  selectedAlumnoGanador: number = null;
  datos: any;
  opcionSeleccionado: string = "0";
  verSeleccion: string;
  espera: boolean = true;
  aprobados: boolean = false;
  denegados: boolean = false;
  eliminados: boolean = false;
  planes: Planes = new Planes();
  idpredoc: number;

  solicitudMae: boolean;
  removableInput: boolean;
  cargados = false;
  archivos: FileItem[] = [];
  documentoPlan: any;
  solicitud: any;

  url: string;

  constructor(private service: PlanesService, private router: Router) {
    this.datos = ["En espera", "Aprobados", "Denegados", "Eliminados"];
    this.opcionSeleccionado = this.datos[0];
  }

  ngOnInit() {
    this.service
      .getPlanesEspera(
        parseInt(JSON.parse(sessionStorage.getItem("usuario")).id_persona)
      )
      .subscribe((data) => {
        this.listPlanesEspera = data["PLAN_DIRESCUELA_ESPERA"];
      });
    this.getDocente(
      parseInt(JSON.parse(sessionStorage.getItem("usuario")).id_persona)
    );
    this.selectAlumnoGanador(
      parseInt(JSON.parse(sessionStorage.getItem("usuario")).id_persona)
    );
    this.getPlanAprobados(
      parseInt(JSON.parse(sessionStorage.getItem("usuario")).id_persona)
    );
    this.getPlanDenegados(
      parseInt(JSON.parse(sessionStorage.getItem("usuario")).id_persona)
    );
    this.getPlanEliminados(
      parseInt(JSON.parse(sessionStorage.getItem("usuario")).id_persona)
    );
  }
  getPlanAprobados(id: number) {
    this.service.getPlanesAprobado(id).subscribe((data) => {
      this.listPlanesAprobado = data["PLAN_DIRESCUELA_APROBADO"];
    });
  }

  getPlanDenegados(id: number) {
    this.service.getPlanesDenegado(id).subscribe((data) => {
      this.listPlanesDenegado = data["PLAN_DIRESCUELA_DENEGADO"];
    });
  }

  getPlanEliminados(id: number) {
    this.service.getPlanesEliminado(id).subscribe((data) => {
      this.listPlanesEliminado = data["PLAN_DIRESCUELA_ELIMINADO"];
    });
  }
  selectAlumnoGanador(id:number) {
    this.service.getAlumnosGanadores(id).subscribe((data) => {
      this.listAlumnoGanador = data["SALIDA_ALUMNO_GANADOR"];
      console.log(this.listAlumnoGanador);
    });
  }
  selectIdAlumnoGanador(event: any) {
    this.selectedAlumnoGanador = event.target.value;
   
  }

  loadPlan(plan: string): void {
 
    this.url =
      "https://firebasestorage.googleapis.com/v0/b/fir-files-512e9.appspot.com/o/Solitud%20Mae%20Pantilla.pdf?alt=media&token=de390b4f-a089-49b3-8199-66eec51205a8";
 
  }

  FiltrarTablas() {
    this.verSeleccion = this.opcionSeleccionado;
    if (this.verSeleccion == "En espera") {
      this.espera = true;
      this.denegados = false;
      this.aprobados = false;
      this.eliminados = false;
    }
    if (this.verSeleccion == "Aprobados") {
      this.espera = false;
      this.aprobados = true;
      this.denegados = false;
      this.eliminados = false;
    }
    if (this.verSeleccion == "Denegados") {
      this.espera = false;
      this.aprobados = false;
      this.denegados = true;
      this.eliminados = false;
    }
    if (this.verSeleccion == "Eliminados") {
      this.espera = false;
      this.aprobados = false;
      this.denegados = false;
      this.eliminados = true;
    }
  }

  decano_espera_positivo(plan: Planes): void {
    Swal.fire({
      title: "¿Seguro de aprobar el Plan?",
      text: "No podra revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, aprobar",
    }).then((result) => {
      if (result.value) {
        plan.estado_decano = "2";
        this.service.update_estado_decano(plan).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire({
          position: "center", icon: "success", title: "Aperturado con exito", showConfirmButton: false, timer: 1100

        }
        );
      }
    });
  }
  decano_espera_negativo(plan: Planes): void {
    Swal.fire({
      title: "¿Seguro de denegar?",
      text: "No podra revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, denegar",
    }).then((result) => {
      if (result.value) {
        plan.estado_decano = "0";
        this.service.update_estado_decano(plan).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire({
          position: "center", icon: "success", title: "Aperturado con exito", showConfirmButton: false, timer: 1100

        }
        );
      }
    });
  }
  general_espera_eliminar(plan: Planes): void {
    Swal.fire({
      title: "¿Seguro de Eliminar?",
      text: "No podra revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.value) {
        plan.estado_general = "0";
        this.service.update_estado_general(plan).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire(
          "Plan Eliminado!",
          "Puede usted revisar en su bandeja de Eliminados",
          "success"
        );
      }
    });
  }
  habilitar_denegados(plan: Planes): void {
    Swal.fire({
      title: "¿Seguro de Habilitar el Plan a Espera?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, habilitar a espera",
    }).then((result) => {
      if (result.value) {
        plan.estado_decano = "1";
        this.service.update_estado_decano(plan).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire(
          "Plan Habilitado en Espera!",
          "Puede usted revisar en su bandeja de Espera",
          "success"
        );
      }
    });
  }
  restaurar_eliminado(plan: Planes): void {
    Swal.fire({
      title: "¿Seguro de Restaurar el Plan a Espera?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, restaurar a espera",
    }).then((result) => {
      if (result.value) {
        plan.estado_general = "1";
        this.service.update_estado_general(plan).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire(
          "Plan Restaurado en Espera!",
          "Puede usted revisar en su bandeja de Espera"
        );
      }
    });
  }

  eliminar_plan(plan: Planes): void {
    Swal.fire({
      title: "¿Seguro de Eliminar el Plan permanentemente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar permanentemente",
    }).then((result) => {
      if (result.value) {
        this.service.deletePlan(plan).subscribe((data) => {
          this.getPlanEliminados(
            parseInt(JSON.parse(sessionStorage.getItem("usuario")).id_persona)
          );
        });
        Swal.fire("Plan Eliminado Permanentemente!");
      }
    });
  }

  onFilePlan(event) {
    this.documentoPlan = new FileItem(event.target.files[0], "plan");
  }

  Guardar() {

    this.archivos.push(this.documentoPlan);
    this.idpredoc = this.selectedAlumnoGanador;

    Swal.fire({
        title: "Registrar?",
        text: "", 
        icon: "warning",
        showCancelButton: true, 
        confirmButtonColor: "#17A2B8", 
        cancelButtonColor: "#E89A00", 
        confirmButtonText: "Sí, registrar", 
        cancelButtonText: "Cancelar",
       }).then((result) => {
          if (result.value) {
            this.service.cargarArchivos(
              this.archivos,
              this.selectedAlumnoGanador,
              this.newDocente
            ); }
        });



    
    this.recagar();
    this.cargados = true;
    // setTimeout(() => (this.cargados = false, this.ngOnInit()), 1000);
  }

  getDocente(idpersona: number) {
    return this.service.getId_Docente(idpersona).subscribe((data) => {
      this.newDocente = data["IDDOCENTE"][0].id_docente;
    });
  }

  recagar() {
    alert('recargar');
    this.ngOnInit();
  }


}
