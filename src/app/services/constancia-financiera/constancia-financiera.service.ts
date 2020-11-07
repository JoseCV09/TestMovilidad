import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstanciaFinanciera } from "../../Models/ConstanciaFinanciera";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../../Models/FileItem';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ConstanciaFinancieraService {
  private CARPETA_FILES = 'files';
  constancia = new ConstanciaFinanciera();

  constructor(private http: HttpClient, private db: AngularFirestore) { }

  constancia_financiera = "http://localhost:8081/constancia_fin/";
  planes = "http://localhost:8081/planes/";

  getConstanciaFinanciera(): Observable<ConstanciaFinanciera[]> {
    return this.http.get<ConstanciaFinanciera[]>(this.constancia_financiera + 'constancia_financiera');
  }

  getId_Docente(idpersona: number):Observable<ConstanciaFinanciera[]>{
    return this.http.get<ConstanciaFinanciera[]>(this.planes + 'get_docente/'+idpersona);
  }

  getFacultad(): Observable<ConstanciaFinanciera[]> {
    return this.http.get<ConstanciaFinanciera[]>(this.constancia_financiera + 'get_facultad');
  }

  getEscuelaFacultad(id_facultad:number): Observable<ConstanciaFinanciera[]> {
    return this.http.get<ConstanciaFinanciera[]>(this.constancia_financiera + 'get_escuela_facultad/'+id_facultad);
  }

  getPlan(id_escuela:number): Observable<ConstanciaFinanciera[]> {
    return this.http.get<ConstanciaFinanciera[]>(this.constancia_financiera + 'get_plan_escuela/'+id_escuela);
  }

  cargarArchivos(archivo: FileItem[], idplan: number, iddocente: number) {

    const storageRef = firebase.storage().ref();
    
      archivo[0].estadoSubiendo = true;

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_FILES}/${archivo[0].nombreArchivo}`).put(archivo[0].archivo);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => archivo[0].progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error(' Error al subir ', error),
        () => {
          console.log('Archivo Subido correctamente');
          uploadTask.snapshot.ref.getDownloadURL()
            .then((url) => {     
              
              this.constancia.doc_financiero = url;
              
                this.create(idplan, iddocente).subscribe((data) => {
                  Swal.fire({
                    title: '<strong>Se Registro Correctamente el Documento Financiero</strong>',
                    icon: 'info',
                    focusConfirm: false,
                    confirmButtonText:
                      '<i class="fa fa-thumbs-up"></i> Great!',
                    confirmButtonAriaLabel: 'Thumbs up, great!'
                  })
                });
              
              
              archivo[0].url = url;
              archivo[0].estadoSubiendo = false;
              this.guardarArcchivo({
                nombre: archivo[0].nombreArchivo,
                url: archivo[0].url
              });
            });

        });
  }

  private guardarArcchivo(archivo: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_FILES}`).add(archivo);
  }

  create(idplan: number, iddocente: number) {
    this.constancia.id_plan = idplan;
    this.constancia.id_docente = iddocente;
    return this.http.post<ConstanciaFinanciera[]>(this.constancia_financiera + 'add',this.constancia);
  }

  deleteConstancia(constancia: ConstanciaFinanciera) {
    return this.http.delete<ConstanciaFinanciera>(this.constancia_financiera + 'eliminar_constancia/' + constancia.id_constancia_financiera);
  }
}
