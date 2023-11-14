import { Component, Input, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Header } from 'src/app/components/table/header';
import { Consulta } from 'src/app/models/consulta/consulta';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.component.html',
  styleUrls: ['./consulta-list.component.scss']
})
export class ConsultaListComponent {
  @Input() isModal = false  
  isErro!: boolean
  mensagem!: string
  consultas: Consulta[] = [];
  service = inject(ConsultaService);
  modalService = inject(NgbModal)
  data: any[] = [];
  consultaSelecionada!: Consulta


  constructor() {
    this.getAll();
  }
  getAll() {
    this.service.getAll().subscribe({
      next: (consultas: any) => {
        this.consultas = consultas;
      },
      error: (erro: any) => {
        this.isErro = true;
        this.mensagem = erro.error
      },
    });
  }

  apiUrlPath(){
    return 'http://npvet.duckdns.org:8080/consulta';  
  }
  callHeaders(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Animal', 'animal.nome'));
    tableHeaders.push(new Header('Tutor', 'tutor.nome'));
    tableHeaders.push(new Header('CPF', 'tutor.cpf'));
    tableHeaders.push(new Header('Veterinario', 'veterinario.nome'));
    tableHeaders.push(new Header('Data de Consulta','data'));    
    return tableHeaders; 
  }
  modal(template: any, consulta?: Consulta){
    if(consulta){
      console.log(consulta)
      this.consultaSelecionada = consulta
    }
    this.modalService.open(template, {size: "lg", windowClass:"marcar-consulta"})
  }
  confirmar(consulta: Consulta){
    if(consulta.id){
      this.modalService.dismissAll()
      this.isErro = false
      this.mensagem ="Consulta criada com sucesso!"
    }
  }
}

