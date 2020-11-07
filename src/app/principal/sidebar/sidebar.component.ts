import { Component, OnInit } from "@angular/core";
import { UsuarioDatos } from '../../Models/UsuarioDatos';
import { PrincipalService } from '../../services/principal/principal.service';
import { Opciones } from '../../Models/Opciones';
import * as $ from 'jquery';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {

  private user: UsuarioDatos;

   opcionesU: Opciones[];

  variable: string;

  dataIcon: string;
  constructor(private service: PrincipalService, private servicelogin: LoginService, private router: Router) {}

  ngOnInit( ) {
    this.getlog();
    // this.prueba();
    this.validar();
    this.mini();
  }


    prueba(quitar: boolean) {
      this.user = JSON.parse(sessionStorage.getItem('usuario')) as UsuarioDatos;
      this.service.getOpciones(this.user.username).subscribe( (data) => {
        this.opcionesU = data[`opciones`];
        // console.log(this.opcionesU);
        if (quitar) {
          // console.log('te voy a quitar :)');
          this.opcionesU.pop();
          // console.log(this.opcionesU.slice(1, 1));
          // console.log('he quitado algo :{');
          // console.log(this.opcionesU);
        }

      });
    }

    validar() {
        this.service.now(JSON.parse(sessionStorage.getItem('usuario')).id_persona).subscribe((data) => {
          // console.log(data[`return`]);

          if ((Object.entries(data[`return`]).length)) {
              // console.log('exite :)');
              // console.log(data[`return`][0].id_alumno);
              this.service.filtrar(data[`return`][0].id_alumno).subscribe( (data1) => {
                // console.log(data1[`return`]);
                if (!(Object.entries(data1[`return`]).length)) {
                  // console.log('se le debe quitar');
                  // alumno 1 //
                  this.prueba(true);
                } else {
                  this.prueba(false);

                }
              });
          } else {
            this.prueba(false);
          }

        });
    }

    mini() {
        $(document).ready(function() {
            $('#sidebarCollapse').on('click', function() {
                $('#sidebar').toggleClass('active');
            });
        });
    }


    getlog() {
      if (!this.servicelogin.isAuthenticated()) {
        this.router.navigate(['/']);
        Swal.fire(
          "Logout",
          "</b>No esta autenticado!",
          "warning",
         ).then(() => {
          this.router.navigate(['/']);
         });
      }
    }




}
