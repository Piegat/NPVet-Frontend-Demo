import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnamnesePergunta } from 'src/app/models/anamnese-pergunta/anamnese-pergunta';
import { ProgressoMedico } from 'src/app/models/progresso-medico/progresso-medico';
import { Anamnese } from 'src/app/models/anamnese/anamnese';

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {

  private baseUrl = 'http://npvet.duckdns.org:8080/anamnese';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Anamnese> {
    return this.http.get<Anamnese>(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<Anamnese[]> {
    return this.http.get<Anamnese[]>(`${this.baseUrl}/all`);
  }

  getByTutorCpf(cpf: string): Observable<Anamnese[]> {
    return this.http.get<Anamnese[]>(`${this.baseUrl}/tutor/${cpf}`);
  }

  getByTutorCpfAndAnimal(cpf: string, nome: string): Observable<Anamnese[]> {
    return this.http.get<Anamnese[]>(`${this.baseUrl}/tutor/${cpf}/animal/${nome}`);
  }

  create(anamnese: Anamnese): Observable<Anamnese> {
    return this.http.post<Anamnese>(`${this.baseUrl}/post`, anamnese);
  }

  addQuestionAnswerToAnamnese(anamneseId: number, request: AnamnesePergunta): Observable<AnamnesePergunta> {
    return this.http.post<AnamnesePergunta>(`${this.baseUrl}/adicionar/pergunta/${anamneseId}`, request);
  }

  addProgressoMedico(progressoMedico: ProgressoMedico): Observable<ProgressoMedico> {
    return this.http.post<ProgressoMedico>(`${this.baseUrl}/atualizar/progresso-medico`, progressoMedico);
  }

  update(id: number, anamneseDTO: Anamnese): Observable<Anamnese> {
    return this.http.put<Anamnese>(`${this.baseUrl}/update/${id}`, anamneseDTO);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`);
  }
}
