import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Documentos } from '../../Models/Documentos';
import { SolicitarDocumentos } from '../../Models/SolicitarDocumentos';

@Injectable({
  providedIn: 'root'
})
export class SolicitarDocumentosService {

  constructor(private http: HttpClient) { }
  solicitar = 'http://localhost:8081/solicitar/';

  getDocumentos() {
     return this.http.get<Documentos[]>(this.solicitar + 'documentos');
  }

  create(solicitarDocumentos: SolicitarDocumentos) {
    console.log('listo');
    console.log(solicitarDocumentos);
    return this.http.post<SolicitarDocumentos[]>(this.solicitar + 'create', solicitarDocumentos);
  }

  validar(idpresentacion: number) {
    return this.http.get<SolicitarDocumentos[]>(this.solicitar + 'validar/' + idpresentacion );
  }
}
