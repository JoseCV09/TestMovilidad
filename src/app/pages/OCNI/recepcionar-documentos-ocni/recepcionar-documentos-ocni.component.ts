import { Component, OnInit } from "@angular/core";
import { RecepcionarDocumentosService } from "../../../services/recepcionarDocumentos/recepcionar-documentos.service";

import { PresentacionDocumentos } from "../../../Models/PresentacionDocumentos";
import Swal from "sweetalert2";

@Component({
  selector: "app-recepcionar-documentos-ocni",
  templateUrl: "./recepcionar-documentos-ocni.component.html",
  styleUrls: ["./recepcionar-documentos-ocni.component.css"],
})
export class RecepcionarDocumentosOcniComponent implements OnInit {
  presentacionDocumento: PresentacionDocumentos = new PresentacionDocumentos();
  presentacionDocumentos: "Object"[];

  carta: String;

  constructor(private service: RecepcionarDocumentosService) {}
  p: number = 1;

  documentosOcniPost = "";
  ngOnInit() {
    this.loadRecepcionarDocumentos();
  }
  getCarta(carta: string) {
    console.log(carta);
    this.carta = carta;
  }
  loadRecepcionarDocumentos() {
    this.service.getDocumentosConvocatoria().subscribe((data) => {
      this.presentacionDocumentos = data["return"];
      console.log(data);
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
        presdoc.estado_evaluado = 2;
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
