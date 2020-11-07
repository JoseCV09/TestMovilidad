import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {path: '', component: SidebarComponent,
  children: [ {path: 'pages', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
