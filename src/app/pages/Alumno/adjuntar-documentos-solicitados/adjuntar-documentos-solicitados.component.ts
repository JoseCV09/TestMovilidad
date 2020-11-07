import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AdjuntarSolicitadosService } from 'src/app/services/adjuntarSolicitados/adjuntar-solicitados.service';
import { FileItem } from '../../../Models/FileItem';
import { SolicitarDocumentos } from '../../../Models/SolicitarDocumentos';

@Component({
  selector: 'app-adjuntar-documentos-solicitados',
  templateUrl: './adjuntar-documentos-solicitados.component.html',
  styleUrls: ['./adjuntar-documentos-solicitados.component.css']
})
export class AdjuntarDocumentosSolicitadosComponent implements OnInit {

  constructor( private service: AdjuntarSolicitadosService, private render: Renderer2) { }

  nombre = '';
  universidad = '';
  list: object;
  pendiente = false;

  listadjuntar: any[] = [];
  file: any;

  solicitardocumento: SolicitarDocumentos;

  archivos: FileItem[] = [];
  ngOnInit() {
    this.get();
  }


  get() {
    this.service.gerDocumentosSolictados(JSON.parse(sessionStorage.getItem('usuario')).id_persona).subscribe( (data) => {
      console.log(data[`return`]);
      this.list = data[`return`];

      this.nombre = this.list[0].nombre_convocatoria;
      this.universidad = this.list[0].nombre_universidad_convenio;

      for (let i = 0; i < (Object.entries(this.list).length); i++) {
        if (this.list[i].estado === '1') {
          this.listadjuntar.push(this.list[i]);
        }
      }

      if (this.listadjuntar.length === 0) {
        this.pendiente = true;
      }
    } );
  }

  onFile(event, lista: any) {
    console.log(event.target.files);
    this.file = new FileItem(event.target.files[0], lista.nombre_documento);
    // console.log(this.file);
    let match = false;
    console.log(this.archivos);
    console.log('taño del arreglo ' + this.archivos.length);

    for (let i = 0; i < this.archivos.length; i++) {
      console.log('i ' + i);
      console.log(this.archivos[i].tipoDocumento);
      console.log(this.file.tipoDocumento);
      if (this.archivos[i].tipoDocumento === this.file.tipoDocumento ) {
          console.log('match');
          match = true;
          this.archivos[i] = this.file;
          console.log(this.archivos);
          return;
        }
      }

    if (!match) {
      this.archivos.push(this.file);
      console.log('insertar');
    }


  }

  Guardar(dato) {
    console.log('Guardar');
    console.log(dato);
    this.solicitardocumento = new SolicitarDocumentos();
    this.solicitardocumento.id_solicitar_documentos = dato.id_solicitar_documentos;

    for (let i = 0; i < this.archivos.length; i++) {
      if (this.archivos[i].tipoDocumento === dato.nombre_documento) {
        this.listo(this.archivos[i], this.solicitardocumento);
        return;
      }
    }
  }


  listo(archivo: FileItem, solicitar: SolicitarDocumentos) {
    console.log('estamos listos');
    console.log(archivo);
    console.log(solicitar);
    this.service.cargarArchivos(archivo, solicitar);


  }

}
