import { Component, OnInit } from "@angular/core";
import { PlanesService } from "src/app/services/planes/planes.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Planes } from "src/app/Models/Planes";
@Component({
  selector: 'app-aprobar-plan-consejo-univ',
  templateUrl: './aprobar-plan-consejo-univ.component.html',
  styleUrls: ['./aprobar-plan-consejo-univ.component.css']
})
export class AprobarPlanConsejoUnivComponent implements OnInit {
  p: number = 1;
  p1: number = 1;
  p2: number = 1;
  listPlanesConsejoEspera: [];
  listPlanesConsejoAprobados: [];
  listPlanesConsejoDenegados: [];
  datos: any;
  opcionSeleccionado: string = "0";
  verSeleccion: string = "";
  espera: boolean = true;
  aprobados: boolean = false;
  denegados: boolean = false;
  eliminados: boolean = false;

  constructor(private service: PlanesService, private router: Router) { 
    this.datos = ["En espera", "Aprobados", "Denegados"];
    this.opcionSeleccionado = this.datos[0];

  }

  ngOnInit() {
    this.service.getPlanesConsejoEspera().subscribe((data) => {
      this.listPlanesConsejoEspera = data["PLAN_CONSEJO_ESPERA"];
    });
    this.getPlanAprobadosConsejo();
    this.getPlanDenegadosConsejo();
  }

  getPlanAprobadosConsejo() {
    this.service.getPlanesConsejoAprobado().subscribe((data) => {
      this.listPlanesConsejoAprobados = data["PLAN_CONSEJO_APROBADO"];
    });
  }

  getPlanDenegadosConsejo() {
    this.service.getPlanesConsejoDenegado().subscribe((data) => {
      this.listPlanesConsejoDenegados = data["PLAN_CONSEJO_DENEGADO"];
    });
  }

  FiltrarTablas() {
    this.verSeleccion = this.opcionSeleccionado;
    if (this.verSeleccion == "En espera") {
      this.espera = true;
      this.denegados = false;
      this.aprobados = false;
    }
    if (this.verSeleccion == "Aprobados") {
      this.espera = false;
      this.aprobados = true;
      this.denegados = false;
    }
    if (this.verSeleccion == "Denegados") {
      this.espera = false;
      this.aprobados = false;
      this.denegados = true;
    }
  }


  consejo_espera_positivo(plan: Planes): void {
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
        plan.estado_consejo_univ = "2";
        this.service.update_estado_consejo_univ(plan).subscribe(data => {
          this.ngOnInit();
        })
        Swal.fire("Plan Aprobado!", "Puede verlo en la bandeja de Aprobados");
      }
    });
  }

  consejo_espera_negativo(plan: Planes): void {
    Swal.fire({
      title: "¿Seguro de Denegar el Plan?",
      text: "No podra revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, denegar",
    }).then((result) => {
      if (result.value) {
        plan.estado_consejo_univ = "0";
        this.service.update_estado_consejo_univ(plan).subscribe(data => {
          this.ngOnInit();
        })
        Swal.fire("Plan Denegado!", "Puede verlo en la bandeja de Denegados");
      }
    });
  }
  
  consejo_habilitar(plan: Planes): void {
    Swal.fire({
      title: "¿Seguro de habilitar el Plan?",
      text: "No podra revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, habilitar",
    }).then((result) => {
      if (result.value) {
        plan.estado_consejo_univ = "1";
        this.service.update_estado_consejo_univ(plan).subscribe(data => {
          this.ngOnInit();
        })
        Swal.fire("Plan Habilitado!", "Puede verlo en la bandeja de Espera");
      }
    });
  }

}
