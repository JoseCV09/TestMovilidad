import { Component, OnInit } from "@angular/core";
import { RecepcionarDocumentosService } from "../../../services/recepcionarDocumentos/recepcionar-documentos.service";

import { PresentacionDocumentos } from "../../../Models/PresentacionDocumentos";
import Swal from "sweetalert2";

@Component({
  selector: "app-recepcionar-documentos-direscuela",
  templateUrl: "./recepcionar-documentos-direscuela.component.html",
  styleUrls: ["./recepcionar-documentos-direscuela.component.css"],
})
export class RecepcionarDocumentosDirescuelaComponent implements OnInit {
  presentacionDocumento: PresentacionDocumentos = new PresentacionDocumentos();
  presentacionDocumentos: "Object"[];

  constructor(private service: RecepcionarDocumentosService) {}
  documentosOcniPost = "";
  p: number = 1;

  ngOnInit() {
    this.loadRecepcionarDocumentos();
  }

  loadRecepcionarDocumentos() {
    this.service
      .getDocumentosDirector(
        JSON.parse(sessionStorage.getItem("usuario")).id_persona
      )
      .subscribe((data) => {
        this.presentacionDocumentos = data["return"];
        console.log(data);
        console.log("Hola palta");
      });
  }
  positivo(presdoc: PresentacionDocumentos): void {
    Swal.fire({
      title: "¿Aprobar?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#17A2B8",
      cancelButtonColor: "#E89A00",
      confirmButtonText: "Sí, aprobar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        presdoc.estado_evaluado = 3;
        this.service.updateValidar(presdoc).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Aprobado con exito",
          showConfirmButton: false,
          timer: 1100,
        });
      }
    });
  }
  negativo(presdoc: PresentacionDocumentos) {
    Swal.fire({
      title: "¿No aprobar?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#17A2B8",
      cancelButtonColor: "#E89A00",
      confirmButtonText: "Sí, no aprobar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        presdoc.estado_evaluado = 0;
        this.service.updateValidar(presdoc).subscribe((data) => {
          this.ngOnInit();
        });
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No aprobado con exito",
          showConfirmButton: false,
          timer: 1100,
        });
      }
    });
  }
}
