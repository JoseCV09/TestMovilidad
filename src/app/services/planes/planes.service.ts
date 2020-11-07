import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planes } from "../../Models/Planes";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../../Models/FileItem';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  private CARPETA_FILES = 'files';
  plan = new Planes();
  constructor(private http: HttpClient, private db: AngularFirestore) { }

  planes = "http://localhost:8081/planes/";

  createPlan(plan: Planes) {
    return this.http.post<Planes[]>(this.planes + "add", plan);
  }
  
  getId_Docente(idpersona: number):Observable<Planes[]>{
    return this.http.get<Planes[]>(this.planes + 'get_docente/'+idpersona);
  }
  getPlanId(idplan: number): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes +'get_plan/'+idplan);
  }
  getAlumnosGanadores(id: number): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'alumno_ganador/'+id);
  }

  getPlanesEspera(id: number): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_direscuela_espera/'+id);
  }

  getPlanesAprobado(id: number): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_direscuela_aprobado/'+id);
  }

  getPlanesDenegado(id: number): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_direscuela_denegado/'+id);
  }

  getPlanesEliminado(id: number): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_direscuela_eliminado/'+id);
  }

  getPlanesOcniEspera(): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_ocni_espera');
  }

  getPlanesOcniAprobado(): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_ocni_aprobado');
  }

  getPlanesOcniDenegado(): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_ocni_denegado');
  }

  getPlanesConsejoEspera(): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_consejo_espera');
  }

  getPlanesConsejoAprobado(): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_consejo_aprobado');
  }

  getPlanesConsejoDenegado(): Observable<Planes[]> {
    return this.http.get<Planes[]>(this.planes + 'plan_consejo_denegado');
  }

  update_estado_decano(plan: Planes) {
    return this.http.put<Planes>(this.planes + 'estado_decano/' + plan.id_plan, plan
    );
  }
  update_estado_ocni(plan: Planes) {
    return this.http.put<Planes>(this.planes + 'estado_ocni/' + plan.id_plan, plan
    );
  }
  update_estado_consejo_univ(plan: Planes) {
    return this.http.put<Planes>(this.planes + 'estado_consejo_univ/' + plan.id_plan, plan
    );
  }
  update_estado_general(plan: Planes) {
    return this.http.put<Planes>(this.planes + 'estado_general/' + plan.id_plan, plan
    );
  }
  deletePlan(plan: Planes) {
    return this.http.delete<Planes>(this.planes + 'eliminar_plan/' + plan.id_plan);
  }


  cargarArchivos(archivo: FileItem[], idpresentaciondocumentos: number, iddocente: number) {

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
              
              this.plan.doc_plan = url;
              
                this.create(idpresentaciondocumentos, iddocente).subscribe((data) => {
                  Swal.fire({
                    title: '<strong>Se creó el Plan Correctamente</strong>',
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
  create(idpresentacion: number, iddocente: number) {
    this.plan.id_presentacion_documentos = idpresentacion;
    this.plan.id_docente = iddocente;
    return this.http.post<Planes[]>(this.planes + 'add', this.plan);
  }

}
