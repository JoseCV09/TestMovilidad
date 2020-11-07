import { Component, OnInit } from '@angular/core';
import { UsuarioDatos } from '../../Models/UsuarioDatos';
import { Console } from 'console';
import { PrincipalService } from '../../services/principal/principal.service';
import * as $ from 'jquery';
import { LoginService } from '../../services/login/login.service';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UsuarioDatos;
  escuela: string;
  constructor(private service: PrincipalService, private logout: LoginService, private router: Router) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    this.user = JSON.parse(sessionStorage.getItem('usuario')) as UsuarioDatos;
 

    this.service.now(JSON.parse(sessionStorage.getItem('usuario')).id_persona).subscribe((data) => {
      // console.log(data[`return`]);
      if ((Object.entries(data[`return`]).length)) {
          // console.log('exite :)');
          // console.log(data[`return`][0].id_alumno);
          this.service.getNameEscuela(JSON.parse(sessionStorage.getItem('usuario')).id_persona, 1).subscribe( (dataa) => {
            if ((Object.entries(dataa[`return`]).length) > 0) {
              this.escuela = dataa[`return`][0].NOMBRE_ESCUELA;
            } else {
              this.escuela = '';
            }

          });
      } else {
        console.log('docente')
        this.service.getNameEscuela(JSON.parse(sessionStorage.getItem('usuario')).id_persona, 0).subscribe( (datad) => {
          if ((Object.entries(datad[`return`]).length) > 0) {
            this.escuela = datad[`return`][0].nombre_escuela;
          } else {
            this.escuela = '';
          }
        });
      }
    });
  }


  ejecutar() {

     Swal.fire(
      "Logout",
      "</b> Has cerrado sesión con Exito!",
      "success",
     ).then(() => {
      this.logout.logout();
      this.router.navigate(['/']);
     });

  }


}
