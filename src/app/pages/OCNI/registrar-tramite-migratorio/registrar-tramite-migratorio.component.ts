import { Component, OnInit } from '@angular/core';
import { ConstanciaFinancieraService } from "src/app/services/constancia-financiera/constancia-financiera.service";
import { RegistrarTramiteMigratorioService } from "src/app/services/registrar-tramite-migratorio/registrar-tramite-migratorio.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FileItem } from '../../../Models/FileItem';
import { Tramite } from 'src/app/Models/Tramite';

@Component({
  selector: 'app-registrar-tramite-migratorio',
  templateUrl: './registrar-tramite-migratorio.component.html',
  styleUrls: ['./registrar-tramite-migratorio.component.css']
})
export class RegistrarTramiteMigratorioComponent implements OnInit {
  p: number = 1;

  visa: any;
  pasaporte: any;
  seguro: any;
  ticket: any;
  listTramites: [];
  listConstanciaFinanciera: [];
  listFacultades: [];
  listEscuelaFacultades: [];
  listAlumnoPlan: [];
  selectedIdFacultad: number = null;
  selectedIdEscuela: number = null;
  selectedIdPlan: number = null;
  newDocente: number;
  archivos: FileItem[] = [];
  cargados = false;


  constructor(private serviceConstancia: ConstanciaFinancieraService, private serviceTramite: RegistrarTramiteMigratorioService ,private router: Router) { }

  ngOnInit() {
      this.serviceTramite.getTramite().subscribe((data) => {
        this.listTramites = data["LISTA_TRAMITE"];
      });

    this.getFacultades();
    this.getDocente(parseInt(JSON.parse(sessionStorage.getItem('usuario')).id_persona));
  }

  getFacultades() {
    this.serviceConstancia.getFacultad().subscribe((data) => {
      this.listFacultades = data["FACU"];
    });
  }

  selectIdFacultad(event: any) {
    this.selectedIdFacultad = event.target.value;
    this.serviceConstancia.getEscuelaFacultad(this.selectedIdFacultad).subscribe((data) => {
      this.listEscuelaFacultades = data["LISTAR_ESCUELA"];
    });
  }

  selectIdEscuela(event: any){
    this.selectedIdEscuela = event.target.value;
    this.serviceConstancia.getPlan(this.selectedIdEscuela).subscribe((data) => {
      this.listAlumnoPlan = data["LISTA_PLANES_APROB"];
    });
  }

  selectIdPlan(event: any){
    this.selectedIdPlan = event.target.value;
  }

  getDocente(idpersona:number) {
    return this.serviceConstancia.getId_Docente(idpersona).subscribe((data) => {
      this.newDocente = data["IDDOCENTE"][0].id_docente;
    });
  }


  onFileVisa(event) {
    this.visa = new FileItem(event.target.files[0], 'visa');
  }

  onFilePasaporte(event) {
    this.pasaporte = new FileItem(event.target.files[0], 'pasaporte');
  }

  onFileSeguro(event) {
    this.seguro = new FileItem(event.target.files[0], 'seguro');
  }

  onFileTicket(event) {
    this.ticket = new FileItem(event.target.files[0], 'ticket');
  }

  Guardar() {
    this.archivos.push(this.visa);
    this.archivos.push(this.pasaporte);
    this.archivos.push(this.seguro);
    this.archivos.push(this.ticket);
    this.serviceTramite.cargarArchivos(this.archivos,this.newDocente,this.selectedIdPlan);
    this.cargados = true;
    setTimeout(() => (this.cargados = false),  3000);
  }
  
  eliminar_tramite(tramite: Tramite): void {
    Swal.fire({
      title: "¿Seguro de Eliminar el Tramite permanentemente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar permanentemente",
    }).then((result) => {
      if (result.value) {
        this.serviceTramite.deleteTramite(tramite).subscribe(data => {
          this.ngOnInit();
        })
        Swal.fire("Tramite Eliminado Permanentemente!");
      }
    });
  }


}
