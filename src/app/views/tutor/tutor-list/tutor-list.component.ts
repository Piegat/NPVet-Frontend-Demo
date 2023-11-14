import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from 'src/app/components/table/header';
import { Tutor } from 'src/app/models/tutor/tutor';
import { TutorService } from 'src/app/services/tutor/tutor.service';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss'],
})
export class TutorListComponent {
  @Input() isModal = false  
  isErro!: boolean
  mensagem!: string
  title = 'Tutores';
  tutores: Tutor[] = [];
  service = inject(TutorService);
  router = inject(Router)

  data: any[] = [];


  constructor() {
    this.getAll();
  }
  getAll() {
    this.service.getAll().subscribe({
      next: (tutores: any) => {
        this.tutores = tutores;
      },
      error: (erro: any) => {
        this.isErro = true;
        this.mensagem = erro.error
      },
    });
  }

  apiUrlPath(){
    return 'http://npvet.duckdns.org:8080/tutor';  
  }
  callHeaders(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('CPF', 'cpf'));
    tableHeaders.push(new Header('Data de Criação','createdAt'));    
    return tableHeaders;
  }

  register(){
    this.router.navigate(['tutor/register'])
  }
}
