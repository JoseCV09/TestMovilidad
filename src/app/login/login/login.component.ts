import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Usuario } from '../../Models/Usuario';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor(private router: Router, private service: LoginService) {
    this.usuario = new Usuario();
   }

  ngOnInit() { }
  click() {
    console.log(this.usuario.password);
    if (this.usuario.username === undefined || this.usuario.password === undefined ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Password or Username!',
      });
      return;
    }

    this.service.login(this.usuario).subscribe ( response => {
      this.service.getUsuario(response.access_token);
      this.service.guardarToken(response.acces_token);

      const usuario = this.service.usuarioDato;

      console.log(usuario);
      this.router.navigateByUrl("/principal");
      this.messange(usuario.nombre_persona, usuario.apellido_persona);


    }, error => {
      if (error.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Password or Username!',
        });

      }
    }
    );

    // this.messange();
//   this.router.navigateByUrl("/principal");
  }

  messange(nombre: string, apellido: string) {
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,


      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }

    });

    Toast.fire({
      html: '<div class="flexContainer" style="display:flex;align-items:center;"><div><span style="width:47px; height:47px; color:rgb(40, 38, 53 );" class="iconify" data-icon="bi:check-square-fill" data-inline="false"></span> </div><div class="customSpan" style="margin-top:15px;"><strong style="font-size:16px;color: white; float:left; margin-left:20px;" >Auth<br></strong><p style="color:white; float:inherit; margin-left:20px;"><br>Usted ha sido autentificado como ' + nombre +' ' + apellido + ' exitosamente.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div></div>',
      text: "You won't be able to revert this!",
      background: '#e3c767',
      width: '100%',

    });
  }



}

