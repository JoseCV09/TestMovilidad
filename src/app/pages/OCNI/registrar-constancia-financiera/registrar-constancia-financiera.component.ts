import { Component, OnInit } from "@angular/core";
import { ConstanciaFinancieraService } from "src/app/services/constancia-financiera/constancia-financiera.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FileItem } from '../../../Models/FileItem';
import { ConstanciaFinanciera } from 'src/app/Models/ConstanciaFinanciera';
@Component({
  selector: 'app-registrar-constancia-financiera',
  templateUrl: './registrar-constancia-financiera.component.html',
  styleUrls: ['./registrar-constancia-financiera.component.css']
})
export class RegistrarConstanciaFinancieraComponent implements OnInit {
  p: number = 1;

  listConstanciaFinanciera: [];
  listFacultades: [];
  listEscuelaFacultades: [];
  listAlumnoPlan: [];
  selectedIdFacultad: number = null;
  selectedIdEscuela: number = null;
  selectedIdPlan: number = null;
  newDocente: number;
  documentoFinanciero: any;
  archivos: FileItem[] = [];
  idplan: number;
  cargados = false;





  constructor(private service: ConstanciaFinancieraService, private router: Router) { }

  ngOnInit() {
    this.service.getConstanciaFinanciera().subscribe((data) => {
      this.listConstanciaFinanciera = data["LISTA_CONS_FINANCIERO"];
    });
    this.getFacultades();
    this.getDocente(parseInt(JSON.parse(sessionStorage.getItem('usuario')).id_persona));
  }

  getFacultades() {
    this.service.getFacultad().subscribe((data) => {
      this.listFacultades = data["FACU"];
    });
  }

  getDocente(idpersona:number) {
    return this.service.getId_Docente(idpersona).subscribe((data) => {
      this.newDocente = data["IDDOCENTE"][0].id_docente;
    });
  }

  selectIdFacultad(event: any) {
    this.selectedIdFacultad = event.target.value;
    this.service.getEscuelaFacultad(this.selectedIdFacultad).subscribe((data) => {
      this.listEscuelaFacultades = data["LISTAR_ESCUELA"];
    });
  }

  selectIdEscuela(event: any){
    this.selectedIdEscuela = event.target.value;
    this.service.getPlan(this.selectedIdEscuela).subscribe((data) => {
      this.listAlumnoPlan = data["LISTA_PLANES_APROB"];
    });
  }

  selectIdPlan(event: any){
    this.selectedIdPlan = event.target.value;
  }

  onFileFinanciero(event) {
    this.documentoFinanciero = new FileItem(event.target.files[0], 'doc_financiero');
  }

  Guardar() {
    this.archivos.push(this.documentoFinanciero);
    this.idplan = this.selectedIdPlan;
    this.service.cargarArchivos(this.archivos,this.selectedIdPlan,this.newDocente);
    
    this.cargados = true;
    setTimeout(() => (this.cargados = false), 3000);
  }

  eliminar_constancia(constancia: ConstanciaFinanciera): void {
    Swal.fire({
      title: "¿Seguro de Eliminar la Constancia permanentemente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar permanentemente",
    }).then((result) => {
      if (result.value) {
        this.service.deleteConstancia(constancia).subscribe(data => {
          this.ngOnInit();
        })
        Swal.fire("Constancia Eliminado Permanentemente!");
      }
    });
  }

  
}
