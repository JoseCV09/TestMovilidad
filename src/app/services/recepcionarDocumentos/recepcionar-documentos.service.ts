import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PresentacionDocumentos } from "../../Models/PresentacionDocumentos";

@Injectable({
  providedIn: "root",
})
export class RecepcionarDocumentosService {
  constructor(private http: HttpClient) {}
  documentos = "http://localhost:8081/documentos/";

  getDocumentosConvocatoria() {
    return this.http.get<object[]>(this.documentos + "convocatoria");
  }

  getDocumentosDirector(id: number) {
    return this.http.get<object[]>(this.documentos + "convocatoria/" + id);
  }

  updateValidar(presentacionDocumentos: PresentacionDocumentos) {
    return this.http.put<PresentacionDocumentos>(
      this.documentos +
        "estado/" +
        presentacionDocumentos.id_presentacion_documentos,
      presentacionDocumentos
    );
  }
}
