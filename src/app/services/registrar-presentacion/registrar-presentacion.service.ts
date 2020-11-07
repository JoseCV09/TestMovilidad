import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PresentacionAlumno } from "../../Models/PresentacionAlumno";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../../Models/FileItem';
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
export class RegistrarPresentacionService {
  private CARPETA_FILES = 'files';
  presentacion = new PresentacionAlumno();

  constructor(private http: HttpClient, private db: AngularFirestore) { }
  presentacion_alumnos = "http://localhost:8081/presentacion_alumno/";

  getPresentacion(): Observable<PresentacionAlumno[]> {
    return this.http.get<PresentacionAlumno[]>(this.presentacion_alumnos + 'listar');
  }
  cargarArchivos(archivo: FileItem[], fecha: string, idplan: number, iddocente: number) {


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
              
              this.presentacion.ppt = url;
              
                this.create(fecha, idplan, iddocente).subscribe((data) => {
                  Swal.fire({
                    title: '<strong>Presentacion Creada Correctamente.!</strong>',
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

  create(fecha: string, idplan: number, iddocente: number) {
    this.presentacion.fecha = fecha;
    this.presentacion.id_plan = idplan;
    this.presentacion.id_docente = iddocente;
    return this.http.post<PresentacionAlumno[]>(this.presentacion_alumnos + 'add',this.presentacion);
    
  }

  deletePresentacion(presec: PresentacionAlumno) {
    return this.http.delete<PresentacionAlumno>(this.presentacion_alumnos + 'eliminar_presentacion/' + presec.id_presentacion_alumno);
  }
}
