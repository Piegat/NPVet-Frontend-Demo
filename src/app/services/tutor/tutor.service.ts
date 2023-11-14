import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from 'src/app/models/tutor/tutor';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  API: string = 'http://npvet.duckdns.org:8080/tutor' ;
  http = inject(HttpClient);
  constructor() {}
  getById(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.API}/id/${id}`);
  }
  getByNome(nome: string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.API}/nome/${nome}`);
  }
  getAll(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${this.API}/all`);
  }
  getAllAtivados(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${this.API}/all/ativos`);
  }
  getAllDesativados(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${this.API}/all/desativados`);
  }
  getByCpf(cpf: string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.API}/cpf/${cpf}`);
  }
  getByRg(rg: string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.API}/rg/${rg}`);
  }
  create(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(`${this.API}/post`, tutor);
  }
  update(id: number, tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.API}/update/${id}`, tutor);
  }
  delete(id: number): Observable<Tutor> {
    return this.http.delete<any>(`${this.API}/delete/${id}`);
  }
  activate(id: number): Observable<Tutor> {
    return this.http.post<any>(`${this.API}/activate/${id}`, null);
  }
}
