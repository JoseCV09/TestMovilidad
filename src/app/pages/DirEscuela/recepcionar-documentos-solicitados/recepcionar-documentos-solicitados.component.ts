import { Component, OnInit, ViewChild } from '@angular/core';
import { RecepcionarDocumentosService } from '../../../services/recepcionarDocumentos/recepcionar-documentos.service';
import { RecepcionarSolicitadosService } from 'src/app/services/recepcionarSolicitados/recepcionar-solicitados.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-recepcionar-documentos-solicitados',
  templateUrl: './recepcionar-documentos-solicitados.component.html',
  styleUrls: ['./recepcionar-documentos-solicitados.component.css']
})
export class RecepcionarDocumentosSolicitadosComponent implements OnInit {

  displayedColumns: string[] = ['Item', 'Nombre y Apellido', 'Telefono', 'Convocatoria', 'Universidad Destino', 'Documentos Solicitados'];

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  dataSource: MatTableDataSource<object>;
  constructor(private service: RecepcionarSolicitadosService) { }

  documentos: any;

  
  ngOnInit() {
    this.get();
  }

  get() {
    this.service.get(JSON.parse(sessionStorage.getItem('usuario')).id_persona).subscribe( (data) => {
      console.log(data[`return`]);
      this.dataSource = new MatTableDataSource<object>(data[`return`]);
      this.dataSource.paginator = this.paginator;
    });
  }

  modal(idpresentacion: number) {
      console.log(idpresentacion);
      this.service.getDocumentos(idpresentacion).subscribe( data => {
      console.log(data[`return`]);
      this.documentos = data[`return`];
      });
  }

  filter(filtervalue: string) {
    // alert(filtervalue);
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

}
