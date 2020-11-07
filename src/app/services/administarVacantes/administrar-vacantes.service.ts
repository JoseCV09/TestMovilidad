import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Escuela } from "../../Models/Escuela";
import { Observable } from "rxjs";
import { UniversidadConvenio } from "../../Models/UniversidadConvenio";
import { Convocatoria } from "../../Models/Convocatoria";

@Injectable({
  providedIn: "root",
})
export class AdministrarVacantesService {
  constructor(private http: HttpClient) {}
  vacantes = "http://localhost:8081/vacantes/";

  getEscuela(idfacultad: number) {
    return this.http.get<Escuela[]>(this.vacantes + "escuela/" + idfacultad);
  }

  getUniversidadConvenio(): Observable<UniversidadConvenio[]> {
    return this.http.get<UniversidadConvenio[]>(this.vacantes + "universidad");
  }

  findIdFacultad( id_persona: number) {
    return this.http.get<object[]>(this.vacantes + 'facultad/' + id_persona );
  }

  findUniversidadConvenio(id: number) {
    return this.http.get<UniversidadConvenio[]>(
      this.vacantes + "universidad/" + id
    );
  }

  getConvocatorias(idescuela: number) {
    return this.http.get<object[]>(this.vacantes + 'convocatoriagen/' + idescuela);
  }

  getIdConvocatoria(id: number) {
    return this.http.get<object[]>(this.vacantes + "convocatoria/" + id);
  }

  createConvocatoria(convocatoria: Convocatoria) {
    return this.http.post<Convocatoria[]>(
      this.vacantes + "convocatoria",
      convocatoria
    );
  }

  deleteConovocatoria(convocatoria: Convocatoria) {
    return this.http.delete<Convocatoria>(
      this.vacantes + "convocatoria/" + convocatoria.id_convocatoria
    );
  }

  updateConvocatoria(convocatoria: Convocatoria) {
    return this.http.put<Convocatoria[]>(
      this.vacantes + "convocatoria/",
      convocatoria
    );
  }
}
