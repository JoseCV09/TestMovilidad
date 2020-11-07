import { Component, OnInit, ViewChild } from '@angular/core';
import { AdministrarVacantesService } from '../../../services/administarVacantes/administrar-vacantes.service';
import { Escuela } from '../../../Models/Escuela';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PlanesService } from '../../../services/planes/planes.service';
import { element } from 'protractor';
import { SolicitarDocumentosService } from '../../../services/solicitarDocumentos/solicitar-documentos.service';
import { Documentos } from '../../../Models/Documentos';
import { SolicitarDocumentos } from '../../../Models/SolicitarDocumentos';


@Component({
  selector: 'app-seleccionar-documentos',
  templateUrl: './seleccionar-documentos.component.html',
  styleUrls: ['./seleccionar-documentos.component.css']
})
export class SeleccionarDocumentosComponent   implements OnInit {

  displayedColumns: string[] = ['Item', 'Convocatoria', 'Nombre y Apellido', 'Telefono', 'Ciclo', 'Docuementos Extra'];
  listAlumnoGanador: [];
  dataSource: MatTableDataSource<object>;

  listData: any;

  documentos: Documentos[];


  // :(
  curri = false;
  certi = false;
  ante = false;
  pasa = false;
  dni = false;
  fina = false;
  idi = false;

  validar = SolicitarDocumentos;
  solicitarDocumento = new SolicitarDocumentos();

  idpresentaciondocumentos: number;

  constructor( private service: PlanesService, private serviceSolicitar: SolicitarDocumentosService) {
  }

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  ngOnInit() {
    this.get();
  }



  get() {
    this.service.getAlumnosGanadores(JSON.parse(sessionStorage.getItem('usuario')).id_persona).subscribe((data) => {
      this.listAlumnoGanador = data["SALIDA_ALUMNO_GANADOR"];
      // console.log(this.listAlumnoGanador);
      this.dataSource = new MatTableDataSource<object>(this.listAlumnoGanador);
      this.dataSource.paginator = this.paginator;
    });
  }

  filter(filtervalue: string) {
    // alert(filtervalue);
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }


  modal(idpresentaciondocumentos: number) {
    this.curri = false;
    this.certi = false;
    this.ante = false;
    this.pasa = false;
    this.dni = false;
    this.fina = false;
    this.idi = false;
    this.idpresentaciondocumentos = idpresentaciondocumentos;

    this.serviceSolicitar.validar(idpresentaciondocumentos).subscribe( (data) => {
      this.validar = data[`return`];
      console.log(this.validar);


      for (let i = 0; i < this.validar.length; i++) {
        if (this.validar[i].id_documentos === 8 && this.validar[i].estado !== '0' ) {
          this.curri = true;
        } else {
          if (this.validar[i].id_documentos === 9 && this.validar[i].estado !== '0') {
            this.certi = true;
          } else {
            if (this.validar[i].id_documentos === 10 && this.validar[i].estado !== '0') {
              this.ante = true;
            } else {
              if (this.validar[i].id_documentos === 11 && this.validar[i].estado !== '0') {
                this.pasa = true;
              } else {
                if (this.validar[i].id_documentos === 12 && this.validar[i].estado !== '0') {
                  this.dni = true;
                } else {
                  if (this.validar[i].id_documentos === 13 && this.validar[i].estado !== '0') {
                    this.fina = true;
                  } else {
                    if (this.validar[i].id_documentos === 14 && this.validar[i].estado !== '0') {
                      this.idi = true;
                    }
                  }
                }
              }
            }
          }
        }
        
      }

    });

  }

  cambiar(iddocumento: number, opcion: string) {
    if (iddocumento === 8) {
      this.curri = !this.curri;
    } else {
      if (iddocumento === 9) {
        this.certi = !this.certi;
      } else {
        if (iddocumento === 10) {
          this.ante = !this.ante;
        } else {
          if (iddocumento === 11) {
            this.pasa = !this.pasa;
          } else {
            if (iddocumento === 12) {
              this.dni = !this.dni;
            } else {
              if (iddocumento === 13) {
                this.fina = !this.fina;
              } else {
                if (iddocumento === 14) {
                  this.idi = !this.idi;
                }
              }
            }
          }
        }
      }
    }
  // fin de los iconos :( //
    this.solicitarDocumento = new SolicitarDocumentos();
    this.solicitarDocumento.id_presentacion_documentos = this.idpresentaciondocumentos;
    this.solicitarDocumento.id_documentos = iddocumento;
    this.solicitarDocumento.estado = opcion;

    this.serviceSolicitar.create(this.solicitarDocumento).subscribe(data => {
      console.log('hecho');
    });
  }



}
