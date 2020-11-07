import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Convocatoria } from "../../Models/Convocatoria";
import { observable, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AperturarConvocatoriaService {
  constructor(private http: HttpClient) {}
  convocatorias = "http://localhost:8081/convocatoria/";

  updateValidar(convocatoria: Convocatoria) {
    return this.http.put<Convocatoria>(
      this.convocatorias + "estado/" + convocatoria.id_convocatoria,
      convocatoria
    );
  }
  getConvocatoriasEspera() {
    return this.http.get<object[]>(this.convocatorias + "espera");
  }
  getConvocatoriasAperturadas() {
    return this.http.get<object[]>(this.convocatorias + "aperturada");
  }
  getConvocatoriasNoAperturadas() {
    return this.http.get<object[]>(this.convocatorias + "desaperturada");
  }

  /*getRequisito(id_convocatoria: number): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(this.convocatorias + id_convocatoria);
  }*/
}
