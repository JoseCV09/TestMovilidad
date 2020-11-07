import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@Angular/common/http";
import { FormsModule } from "@angular/forms";
import { FilterPipe } from "../pipes/filter.pipe";
import { DocumentosOcniPipe } from "../pipes/documentosOcni/documentos-ocni.pipe";
import { AlumfilterPipe } from "../pipes/documentosDirec/alumfilter.pipe";

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";

// error
import { MaterialFileInputModule } from "ngx-material-file-input";
// FireBase
// import { AngularFireModule } from '@angular/fire';
// import { environment } from '../../environments/environment';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

import { PagesRoutingModule } from "./pages-routing.module";
import { AdministrarvacantesComponent } from "./DirEscuela/administrarvacantes/administrarvacantes.component";
import { AdjuntarConvocatoriaComponent } from "./Alumno/adjuntar-convocatoria/adjuntar-convocatoria.component";
import { AperturarConvocatoriaComponent } from "./OCNI/aperturar-convocatoria/aperturar-convocatoria.component";
import { RecepcionarDocumentosOcniComponent } from "./OCNI/recepcionar-documentos-ocni/recepcionar-documentos-ocni.component";
import { RecepcionarDocumentosDirescuelaComponent } from "./DirEscuela/recepcionar-documentos-direscuela/recepcionar-documentos-direscuela.component";
import { SeleccionarDocumentosComponent } from "./DirEscuela/seleccionar-documentos/seleccionar-documentos.component";
import { AdjuntarDocumentosSolicitadosComponent } from "./Alumno/adjuntar-documentos-solicitados/adjuntar-documentos-solicitados.component";
import { RecepcionarDocumentosSolicitadosComponent } from "./DirEscuela/recepcionar-documentos-solicitados/recepcionar-documentos-solicitados.component";
import { RegistroPlanComponent } from "./DirEscuela/registro-plan/registro-plan.component";
import { VerPlanAprobadoOcniComponent } from "./OCNI/ver-plan-aprobado-ocni/ver-plan-aprobado-ocni.component";
import { AprobarPlanConsejoUnivComponent } from "./ConsejoUniversitario/aprobar-plan-consejo-univ/aprobar-plan-consejo-univ.component";
import { RegistrarConstanciaFinancieraComponent } from "./OCNI/registrar-constancia-financiera/registrar-constancia-financiera.component";
import { ListarConvocatoriasComponent } from "./Alumno/listar-convocatorias/listar-convocatorias.component";
import { RegistrarTramiteMigratorioComponent } from "./OCNI/registrar-tramite-migratorio/registrar-tramite-migratorio.component";
import { RegistrarPresentacionComponent } from "./OCNI/registrar-presentacion/registrar-presentacion.component";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    AdministrarvacantesComponent,
    AdjuntarConvocatoriaComponent,
    AperturarConvocatoriaComponent,
    RecepcionarDocumentosOcniComponent,
    RecepcionarDocumentosDirescuelaComponent,
    SeleccionarDocumentosComponent,
    AdjuntarDocumentosSolicitadosComponent,
    RecepcionarDocumentosSolicitadosComponent,
    FilterPipe,
    AlumfilterPipe,
    DocumentosOcniPipe,
    RegistroPlanComponent,
    VerPlanAprobadoOcniComponent,
    AprobarPlanConsejoUnivComponent,
    RegistrarConstanciaFinancieraComponent,
    ListarConvocatoriasComponent,
    RegistrarTramiteMigratorioComponent,
    RegistrarPresentacionComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MaterialFileInputModule,
    MatIconModule,
    MatFormFieldModule,
    NgxPaginationModule,
  ],
})
export class PagesModule {}
