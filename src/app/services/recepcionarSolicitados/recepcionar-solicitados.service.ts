import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecepcionarSolicitadosService {

  constructor(private http: HttpClient) { }
  recepcionar = 'http://localhost:8081/recepcionar/';




  get(idpersona: number) {
    return this.http.get<object[]>(this.recepcionar + 'get/' + idpersona);
  }

  getDocumentos(idpresentacion: number) {
    return this.http.get<object[]>(this.recepcionar + 'documento/' + idpresentacion);
  }
}
