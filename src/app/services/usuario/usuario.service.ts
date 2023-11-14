import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API: string = 'http://npvet.duckdns.org:8080/usuario';
  http = inject(HttpClient);

  
  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/${id}`);
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/all`);
  }

  getUsuarioByName(nome: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/nome/${nome}`);
  }

  getSecretaria(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/secretaria`);
  }

  getAdm(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/adm`);
  }

  getVeterinarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/veterinarios`);
  }

  getUsername(username: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/username/${username}`);
  }

  getUsuarioByCpf(cpf: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/cpf/${cpf}`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API}/post`, usuario);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API}/update/${id}`, usuario);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/delete/${id}`);
  }
  
}
