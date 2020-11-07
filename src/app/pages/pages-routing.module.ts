import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrarvacantesComponent } from './DirEscuela/administrarvacantes/administrarvacantes.component';
import { AdjuntarConvocatoriaComponent } from './Alumno/adjuntar-convocatoria/adjuntar-convocatoria.component';
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
import { ListarConvocatoriasComponent } from './Alumno/listar-convocatorias/listar-convocatorias.component';
import { RegistrarTramiteMigratorioComponent } from "./OCNI/registrar-tramite-migratorio/registrar-tramite-migratorio.component";
import { RegistrarPresentacionComponent } from "./OCNI/registrar-presentacion/registrar-presentacion.component";

const routes: Routes = [
  {path: 'administrarVacantes', component: AdministrarvacantesComponent},
  {path: 'adjuntarConvocatoria', component: AdjuntarConvocatoriaComponent},
  {path: 'aperturarConvocatoria', component: AperturarConvocatoriaComponent},
  {path: 'recepcionarDocumentosOCNI', component: RecepcionarDocumentosOcniComponent},
  {path: 'recepcionarDocumentosDirEscuela', component: RecepcionarDocumentosDirescuelaComponent},
  {path: 'seleccionarDocumentos', component: SeleccionarDocumentosComponent},
  {path: 'adjuntarDocumentosSolicitados', component: AdjuntarDocumentosSolicitadosComponent},
  {path: 'recepcionarDocumentosSolicitados', component: RecepcionarDocumentosSolicitadosComponent},
  {path: 'registroPlan', component: RegistroPlanComponent},
  {path: 'verPlanAprobadoOCNI', component: VerPlanAprobadoOcniComponent},
  {path: 'aprobarPlanConsejoUniversitario', component: AprobarPlanConsejoUnivComponent},
  {path: 'registrarConstanciaFinanciera', component: RegistrarConstanciaFinancieraComponent},
  {path: 'listarConvocatoria', component: ListarConvocatoriasComponent},
  {path: 'registrarTramiteMigratorio', component: RegistrarTramiteMigratorioComponent},
  {path: 'registrarPresentacion', component: RegistrarPresentacionComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
