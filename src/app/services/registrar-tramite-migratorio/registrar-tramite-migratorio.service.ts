import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tramite } from "../../Models/Tramite";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../../Models/FileItem';
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
export class RegistrarTramiteMigratorioService {
  private CARPETA_FILES = 'files';
  tramite = new Tramite();
  constructor(private http: HttpClient, private db: AngularFirestore) { }

  tramites = "http://localhost:8081/tramite/";

  getTramite(): Observable<Tramite[]> {
    return this.http.get<Tramite[]>(this.tramites + 'listar');
  }

  cargarArchivos(archivo: FileItem[], iddocente: number, idplan: number ) {

    const storageRef = firebase.storage().ref();
    let i = 0;
    for (const item of archivo) {
      item.estadoSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_FILES}/${item.nombreArchivo}`).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error(' Error al subir ', error),
        () => {

          uploadTask.snapshot.ref.getDownloadURL()
            .then((url) => {
              i++;
              if (item.tipoDocumento === 'visa') {
                this.tramite.visa = url;
              }
              if (item.tipoDocumento === 'pasaporte') {
                this.tramite.pasaporte = url;
              }
              if (item.tipoDocumento === 'seguro') {
                this.tramite.seguro_internacional = url;
              }
              if (item.tipoDocumento === 'ticket') {
                this.tramite.ticket_avion = url;
              }
              if (i === 4) {

                this.create(iddocente, idplan).subscribe( (data) => {
                  Swal.fire({
                    title: '<strong>Registro del Tramite Correctamente</strong>',
                    icon: 'info',
                    focusConfirm: false,
                    confirmButtonText:
                      '<i class="fa fa-thumbs-up"></i> Great!',
                    confirmButtonAriaLabel: 'Thumbs up, great!'
                  })
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

  create(iddocente: number, idplan: number) {
    this.tramite.id_docente = iddocente;
    this.tramite.id_plan = idplan;
    return this.http.post<Tramite[]>(this.tramites + 'add',this.tramite);

  }

  deleteTramite(tramit: Tramite) {
    return this.http.delete<Tramite>(this.tramites + 'eliminar_tramite/' + tramit.id_tramite);
  }
}
