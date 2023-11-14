import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ExameFisico } from 'src/app/models/exame-fisico/exame-fisico';


@Injectable({
  providedIn: 'root'
})
export class ExameFisicoService {
  baseURL: string = 'http://npvet.duckdns.org:8080/examefisico'
  http = inject(HttpClient);

  constructor() { }

  getById(id: number): Observable<ExameFisico>{
    return this.http.get<ExameFisico>(`${this.baseURL}/id/${id}`);
  }

  getByAnimalNome(nome: string): Observable<ExameFisico[]>{
    return this.http.get<ExameFisico[]>(`${this.baseURL}/animal/nome/${nome}`);
  }

  getByAnimalId(id: number): Observable<ExameFisico[]>{
    return this.http.get<ExameFisico[]>(`${this.baseURL}/animal/id/${id}`);
  }

  getAll(): Observable<ExameFisico[]>{
    return this.http.get<ExameFisico[]>(`${this.baseURL}/all`);
  }

  save(exameFisico: ExameFisico): Observable<ExameFisico>{
    return this.http.post<ExameFisico>(`${this.baseURL}/post`, exameFisico);
  }


  update(exameFisico: ExameFisico): Observable<ExameFisico>{
    return this.http.put<ExameFisico>(`${this.baseURL}/update/${exameFisico.id}`, exameFisico);
  }

  delete(id: number): Observable<HttpStatusCode>{
    return this.http.delete<HttpStatusCode>(`${this.baseURL}/delete/${id}`);
  }

}
