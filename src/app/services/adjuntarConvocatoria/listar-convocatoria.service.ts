import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListarConvocatoriaService {

  constructor(private http: HttpClient) { }
  adjuntar = 'http://localhost:8081/adjuntar/';


  getIdEscuela(idpersona: number) {
    console.log(this.adjuntar);
    return this.http.get<object[]>(this.adjuntar + 'getid/' + idpersona);
  }

  getConvocatorias(idescuela: number) {
    return this.http.get<object[]>(this.adjuntar + 'getconvocatoria/' + idescuela);
  }

}
