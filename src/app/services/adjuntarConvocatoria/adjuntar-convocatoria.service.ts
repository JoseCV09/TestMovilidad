import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../../Models/FileItem';
import { HttpClient } from '@angular/common/http';
import { PresentacionDocumentos } from '../../Models/PresentacionDocumentos';
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class AdjuntarConvocatoriaService {
  private CARPETA_FILES = 'files';
  presentacion = new PresentacionDocumentos();

  constructor(private db: AngularFirestore, private http: HttpClient) { }
  adjuntar = 'http://localhost:8081/adjuntar/';
   // "getalumno/{idalumno}"

  cargarArchivos(archivo: FileItem[], idalumno: number, idconvocatoria: number ) {
    console.log(archivo);

    const storageRef = firebase.storage().ref();
    let i = 0;
    for (const item of archivo) {
      console.log(item.archivo);
      item.estadoSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_FILES}/${item.nombreArchivo}`).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {
          console.error(' Error al subir ', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Se ha producido en error al postular a esta convocatoria!' + error,
            footer: '<a href>Why do I have this issue?</a>'
          });
        },
        () => {
          console.log('Archivo Subido correctamente');

          uploadTask.snapshot.ref.getDownloadURL()
            .then((url) => {
              i++;
              if (item.tipoDocumento === 'carta') {
                this.presentacion.carta_motivacion = url;
              }
              if (item.tipoDocumento === 'solicitud') {
                this.presentacion.solicitud_mae = url;
              }
              if (i === 2) {
                console.log( 'numbero = ' + i );
                this.create(idalumno, idconvocatoria).subscribe( (data) => {
                  console.log('he creado');
                  Swal.fire({
                    title: '<strong>Usted ha postulado a esta       convocatoria satisfactoriamente</strong>',
                    icon: 'success',
                    focusConfirm: false,
                    confirmButtonText:
                      '<i class="fa fa-thumbs-up"></i> Great!',
                    confirmButtonAriaLabel: 'Thumbs up, great!'
                  });
                });
              }

              item.url = url;
              item.estadoSubiendo = false;
              this.guardarArcchivo({
                nombre: item.nombreArchivo,
                url: item.url
              });
            });

        });

    }

  }

  private guardarArcchivo(archivo: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_FILES}`).add(archivo);
  }


  getAlumno(idalumno: number) {
    console.log('service');
    console.log(idalumno);
    return this.http.get<object[]>(this.adjuntar + 'getalumno/' + idalumno);
  }


  create(idalumno: number, idconvocatoria: number) {
    console.log('cuantas veces');
    console.log('idalumno ' + idalumno);
    console.log('idconvocatoria ' + idconvocatoria);
    this.presentacion.id_alumno = idalumno;
    this.presentacion.id_convocatoria = idconvocatoria;

    console.log(this.presentacion);

    return this.http.post<PresentacionDocumentos[]>(this.adjuntar + 'create', this.presentacion);
    //  this.service.put<>("fdf", this.presentacion);

  }

  getPostulaciones(idalumno: number , idconvocatoria: number) {
    return this.http.get<object[]>(this.adjuntar + 'getpostulaciones/' + idalumno + '/' + idconvocatoria );
  }


}
