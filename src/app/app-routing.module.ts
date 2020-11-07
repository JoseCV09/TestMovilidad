import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'home', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'principal', loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule)},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
