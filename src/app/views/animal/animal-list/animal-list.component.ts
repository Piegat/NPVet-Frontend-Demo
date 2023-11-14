import { Component, Input, inject } from '@angular/core';
import { Animal } from 'src/app/models/animal/animal';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from 'src/app/components/table/header';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent {
  @Input() isModal = false  
  isErro!: boolean
  mensagem!: string
  animais: Animal[] = [];
  service = inject(AnimalService);

  data: any[] = [];


  constructor() {
    this.getAll();
  }
  getAll() {
    this.service.getAll().subscribe({
      next: (animais: any) => {
        this.animais = animais;
      },
      error: (erro: any) => {
        this.isErro = true;
        this.mensagem = erro.error
      },
    });
  }

  apiUrlPath(){
    return 'http://npvet.duckdns.org:8080/animal';  
  }
  callHeaders(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Tutor', 'tutorId.nome'));
    tableHeaders.push(new Header('Raça', 'raca'));
    tableHeaders.push(new Header('Espécie', 'especie'));
    tableHeaders.push(new Header('Sexo', 'sexo'));
    tableHeaders.push(new Header('Data de Criação','createdAt'));    
    return tableHeaders;
  }
}