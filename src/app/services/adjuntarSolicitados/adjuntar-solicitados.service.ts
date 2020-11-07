import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { SolicitarDocumentos } from '../../Models/SolicitarDocumentos';
import Swal from "sweetalert2";
import { FileItem } from '../../Models/FileItem';

@Injectable({
  providedIn: 'root'
})
export class AdjuntarSolicitadosService {
  private CARPETA_FILES = 'files';

  constructor(private db: AngularFirestore, private http: HttpClient) { }
  adjuntar = 'http://localhost:8081/solicitar/';


  gerDocumentosSolictados(idpersona: number) {
    return this.http.get<object[]>(this.adjuntar + 'getdocumentos/ '  + idpersona );
  }


  cargarArchivos(archivo: FileItem, solicitardocumento: SolicitarDocumentos ) {
    console.log(archivo);

    const storageRef = firebase.storage().ref();
      

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_FILES}/${archivo.nombreArchivo}`).put(archivo.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => archivo.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {
          console.error(' Error al subir ', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Se ha producido en error al subir el archivo :(!' + error,
            footer: '<a href>Why do I have this issue?</a>'
          });
        },
        () => {
          console.log('Archivo Subido correctamente');

          uploadTask.snapshot.ref.getDownloadURL()
            .then((url) => {

                solicitardocumento.link = url;

                this.updateFiles(solicitardocumento).subscribe( (data) => {
                  console.log('he creado');
                  Swal.fire({
                    title: '<strong>Se ha enviado el archivo satisfactoriamente</strong>',
                    icon: 'success',
                    focusConfirm: false,
                    confirmButtonText:
                      '<i class="fa fa-thumbs-up"></i> Great!',
                    confirmButtonAriaLabel: 'Thumbs up, great!'
                  });
                });
              
              archivo.url = url;
              archivo.estadoSubiendo = false;
              this.guardarArcchivo({
                nombre: archivo.nombreArchivo,
                url: archivo.url
              });
            });

        });

    

  }




  private guardarArcchivo(archivo: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_FILES}`).add(archivo);
  }


  updateFiles(solicitarDocumentos: SolicitarDocumentos) {
    console.log('he llegado hasta aqui');
    console.log(solicitarDocumentos);
    return this.http.put<SolicitarDocumentos>(this.adjuntar + 'update', solicitarDocumentos);
  }
}
