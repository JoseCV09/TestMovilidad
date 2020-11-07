import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { PrincipalRoutingModule } from './principal-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PrincipalModule { }
