import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEPError, NgxViacepService } from '@brunoc/ngx-viacep';
import { EMPTY, catchError } from 'rxjs';
import { Header } from 'src/app/components/table/header';
import { Contato } from 'src/app/models/contato/contato';
import { Endereco, EnderecoInterface } from 'src/app/models/endereco/endereco';

import { Genero } from 'src/app/models/enums/genero';
import { Tutor } from 'src/app/models/tutor/tutor';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { TutorService } from 'src/app/services/tutor/tutor.service';

@Component({
  selector: 'app-tutor-details',
  templateUrl: './tutor-details.component.html',
  styleUrls: ['./tutor-details.component.scss'],
})
export class TutorDetailsComponent implements OnInit {
  tutor = new Tutor();
  keys = Object.keys;
  generos = Genero;

  id!: string;
  url!: string;
  isErro: boolean = false;
  modoRegister!: boolean;
  disabled = false;
  mensagem!: string;

  router = inject(Router);
  service = inject(TutorService);
  animalService = inject(AnimalService)

  constructor(private route: ActivatedRoute, private viacep: NgxViacepService) {
    this.tutor.enderecos = [];
    this.tutor.telefones = [];
    this.url = this.router.url;
  }
  ngOnInit(): void {
    if (!this.url.includes('register')) {
      this.modoRegister = false;
      this.id = this.route.snapshot.paramMap.get('id') as string;
      if (Number(this.id)) {
        this.getById(Number(this.id));
        if (this.url.includes('edit')) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      } else {
        this.isErro = true;
        this.mensagem = 'ID informado é inválido!';
        this.tutor.enderecos.push(new Endereco());
      }
    } else {
      this.modoRegister = true;
      this.tutor.enderecos.push(new Endereco());
      this.tutor.telefones.push(new Contato());
    }
  }

  getById(id: number) {
    this.service.getById(id).subscribe({
      next: (tutor) => {
        this.tutor = tutor;
        console.log(this.tutor.enderecos);
      },
      error: (error) => {
        this.isErro = true;
        this.mensagem = error.error;
      },
    });
  }
  confirmar() {
    if(this.modoRegister){
      this.register()
    }else if(!this.disabled){
      this.edit();
    }else{
      this.router.navigate(['/web/tutores'])
    }
  }
  register() {
    console.log('ok');
    this.service.create(this.tutor).subscribe({
      next: (tutor) => {
        this.isErro = false;
        this.mensagem = 'Tutor cadastrado com sucesso!';
        this.moveTo();
        this.router.navigate(["['/web/tutor']", tutor.id]);
      },
      error: (error) => {
        console.log(error);
        this.isErro = true;
        this.mensagem = error.error;
        this.moveTo();
      },
    });
  }
  edit() {
    this.service.update(Number(this.id), this.tutor).subscribe({
      next: (tutor) => {
        this.isErro = false;
        this.mensagem = 'Tutor editado com sucesso!';
        this.voltar(800);
      },
      error: (error) => {
        this.isErro = true;
        this.mensagem = error.mensagem;
        this.moveTo();
      },
    });
  }

  addTelefone() {
    this.tutor.telefones.push(new Contato());
  }
  addEndereco() {
    this.tutor.enderecos.push(new Endereco());
  }
  removeEndereco(index: number) {
    this.tutor.enderecos.splice(index, 1);
  }
  removeTelefone(index: number) {
    this.tutor.telefones.splice(index, 1);
  }
  removeAnimal(id: number){

  }
  mensagemBtn(): string {
    if (this.modoRegister) {
      return 'Cadastrar';
    } else if (this.disabled) {
      return 'Voltar';
    } else {
      return 'Editar';
    }
  }
  getUrlAnimais(){
    if(Number(this.id)){
      return `http://npvet.duckdns.org:8080/animal/tutor/${Number(this.id)}`
    }else{
      return 'null'
    }
  }
  //utils
  voltar(ms: number) {
    this.moveTo();
    setTimeout(() => {
      this.router.navigate(['/web/tutores']);
    }, ms);
  }
  moveTo() {
    window.scrollTo(0, 0);
  }
  pesquisaCep(index: number) {
    this.viacep
      .buscarPorCep(this.tutor.enderecos[index].cep)
      .pipe(
        catchError((error: CEPError) => {
          return EMPTY;
        })
      )
      .subscribe((endereco: EnderecoInterface) => {
        // Endereço retornado :)
        console.log(endereco);
        this.tutor.enderecos[index].logradouro = endereco.logradouro;
        this.tutor.enderecos[index].bairro = endereco.bairro;
        this.tutor.enderecos[index].cep = endereco.cep;
        this.tutor.enderecos[index].pais = "Brasil";
        this.tutor.enderecos[index].estado = endereco.uf;
        this.tutor.enderecos[index].cidade = endereco.localidade;
      });
  }
  callHeaders(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Espécie', 'especie'));
    tableHeaders.push(new Header('Raça','raca'));    
    return tableHeaders;
  }

}
