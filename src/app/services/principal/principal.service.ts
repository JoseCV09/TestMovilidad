import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Opciones } from '../../Models/Opciones';


@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(private http: HttpClient ) { }
  principal = 'http://localhost:8081/principal/';

  getOpciones(username: string) {
    return this.http.get<Opciones[]>(this.principal + 'opciones/' + username);

  }

  now( idpersona: number ) {
    return this.http.get<object[]>(this.principal + 'now/' + idpersona );
  }

  filtrar( idalumno: number ) {
    return this.http.get<object[]>(this.principal + 'filtrar/' + idalumno);
  }

  getNameEscuela(idpersona: number, opcion: number) {
    return this.http.get<object[]>(this.principal + 'name/' + idpersona + '/' + opcion);
  }

}
