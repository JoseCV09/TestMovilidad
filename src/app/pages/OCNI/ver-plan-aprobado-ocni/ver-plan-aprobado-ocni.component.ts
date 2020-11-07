import { Component, OnInit } from "@angular/core";
import { PlanesService } from "src/app/services/planes/planes.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Planes } from "src/app/Models/Planes";
@Component({
  selector: 'app-ver-plan-aprobado-ocni',
  templateUrl: './ver-plan-aprobado-ocni.component.html',
  styleUrls: ['./ver-plan-aprobado-ocni.component.css']
})
export class VerPlanAprobadoOcniComponent implements OnInit {
  p: number = 1;
  p1: number = 1;
  p2: number = 1;
  listPlanesOcniEspera: [];
  listPlanesOcniAprobados: [];
  listPlanesOcniDenegados: [];
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
    this.service.getPlanesOcniEspera().subscribe((data) => {
      this.listPlanesOcniEspera = data["PLAN_OCNI_ESPERA"];
    });
    this.getPlanAprobadosOcni();
    this.getPlanDenegadosOcni();
  }

  getPlanAprobadosOcni() {
    this.service.getPlanesOcniAprobado().subscribe((data) => {
      this.listPlanesOcniAprobados = data["PLAN_OCNI_APROBADO"];
    });
  }

  getPlanDenegadosOcni() {
    this.service.getPlanesOcniDenegado().subscribe((data) => {
      this.listPlanesOcniDenegados = data["PLAN_OCNI_DENEGADO"];
    });
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
  }

  ocni_espera_positivo(plan: Planes): void {
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
        plan.estado_ocni = "2";
        this.service.update_estado_ocni(plan).subscribe(data => {
          this.ngOnInit();
        })
        Swal.fire("Plan Aprobado!", "Puede verlo en la bandeja de Aprobados");
      }
    });
  }
  ocni_espera_negativo(plan: Planes): void {
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
        plan.estado_ocni = "0";
        this.service.update_estado_ocni(plan).subscribe(data => {
          this.ngOnInit();
        })
        Swal.fire("Plan Denegado!", "Puede verlo en la bandea de Denegados");
      }
    });
  }

  ocni_habilitar(plan: Planes): void {
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
        plan.estado_ocni = "1";
        this.service.update_estado_ocni(plan).subscribe(data => {
          this.ngOnInit();
        })
        Swal.fire("Plan Habilitado!", "Puede verlo en la bandeja de Espera");
      }
    });
  }

}
