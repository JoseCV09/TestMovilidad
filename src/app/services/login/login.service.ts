import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UsuarioDatos } from '../../Models/UsuarioDatos';
import { Usuario } from '../../Models/Usuario';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string;
  private userDatos: UsuarioDatos;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'Authorization'});
  constructor( private http: HttpClient) {  }

  //


  public get usuarioDato(): UsuarioDatos {
  if ( this.userDatos != null) {
    return this.userDatos;
  } else if (this.userDatos === null && sessionStorage.getItem('usuario') != null) {
        this.userDatos = JSON.parse(sessionStorage.getItem('usuario')) as UsuarioDatos;
        return this.userDatos;
  }
  return new UsuarioDatos();
  }

  login(usuario: Usuario) {
    const UrlEndpoint = 'http://localhost:8081/oauth/token';
    // const credenciales = btoa('movilidad' + ':' + '123456' );

    const httpHeaders_ = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic bW92aWxpZGFkOjEyMzQ1Njc='});

    let params = new URLSearchParams();
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    params.set('grant_type', 'password');


    return this.http.post<any>(UrlEndpoint, params.toString(), {headers: httpHeaders_});

  }


  getUsuario(accessToken: string): void {
    const datos = this.obtenerToken(accessToken);

    this.userDatos = new UsuarioDatos();
    this.userDatos.username = datos.USERNAME;
    this.userDatos.nombre_persona = datos.NOMBRE_PERSONA;
    this.userDatos.apellido_persona = datos.APELLIDO_PERSONA;
    this.userDatos.id_usuario = datos.ID_USUARIO;
    this.userDatos.id_persona = datos.ID_PERSONA;
    this.userDatos.foto = datos.FOTO;

    sessionStorage.setItem('usuario', JSON.stringify(this.userDatos));
  }


  guardarToken(accessToken: string) {
    this.token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }


  obtenerToken(accessToken: string): any {
    if (accessToken != null) {
      console.log('hola :( token');
      // console.log(JSON.parse(atob(accessToken.split('.')[1])));
      return JSON.parse(atob(accessToken.split('.')[1]));
    }

  }


  isAuthenticated(): boolean {
    // console.log(this.token);
    // let payload = this.obtenerToken(sessionStorage.getItem('token'));
    if ( sessionStorage.getItem('token') != null) {
      return true;
    }

    return false;
  }

  logout(): void {
    this.token = null;
    sessionStorage.clear();
   // sessionStorage.removeItem('token');
  }

}
