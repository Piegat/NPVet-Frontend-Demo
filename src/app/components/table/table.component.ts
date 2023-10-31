import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  PipeTransform,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Header } from './header';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DatePipe, DecimalPipe],
})
export class TableComponent implements OnInit {
  @Input() headers: Header[] = [];
  @Input() apiUrl: string = '';
  @Input() editPath: string = '';
  @Input() detailsPath: string = '';
  @Input() entidade: string = '';
  @Input() title: string = 'Tabela';
  @Input() showToggle: boolean = true;
  @Output() buttonClick = new EventEmitter<string>();
  switchEstado = new FormControl(false);
  filter = new FormControl('');
  dados: any[] = [];
  dadosFiltrados: any[] = [];
  carregando: boolean = true;
  isErro = false;
  mensagem!: string;
  toggleEntidade!: any;
  decimalPipe = inject(DecimalPipe);

  // injects
  modalService = inject(NgbModal);
  datePipe = inject(DatePipe);
  constructor(private http: HttpClient, private router: Router) {}

  async ngOnInit() {
    this.switchEstado.setValue(true);
    await this.getAll();
    this.filter.valueChanges
      .pipe(
        startWith(''),
        map((text) => this.search(text as string, this.decimalPipe))
      )
      .subscribe({
        next: (dadosFiltrados: any) => {
          this.dadosFiltrados = dadosFiltrados;
        },
      });
    this.carregando = false;
  }

  filtrarEstado() {
    this.filter.setValue(this.filter.value);
  }

  isData(valor: any): boolean {
    let isData = new Date(valor);
    return isData.toString() != 'Invalid Date' ? true : false;
  }

  retornarValor(tableHeader: Header, item: any): string {
    const campo = tableHeader.campo.split('.');
    let valor = item;
    for (const p of campo) {
      if (valor != null) {
        valor = valor[p];
      }
    }
    try {
      let formatedDate = new Date(valor);
      if (formatedDate.toString() != 'Invalid Date') {
        valor = this.datePipe.transform(valor, 'dd/MM/yyyy');
      }
    } catch (error) {}
    return valor;
  }
  // ====================== SEARCH  ======================
  // search(pesquisa?: string){
  //   if(pesquisa){

  //     this.dadosFiltrados = this.dados.filter((entidade) => {
  //       const term = pesquisa.toLowerCase();
  //       this.headers.forEach(header => {
  //         let campo = header.campo.split('.');
  //         campo.forEach(p => {
  //           console.log(entidade[p])
  //           return (entidade[p].includes(term))
  //           &&
  //           (!this.switchEstado.value || (entidade.deletedAt === null && this.switchEstado.value))
  //         });
  //       });
  //     });
  //   }else{
  //     this.dadosFiltrados = this.dados
  //   }
  // }
  // search(text?: string, pipe?: PipeTransform): any[] {
  //   console.log(text);
  //   if(text){
  //     return this.dados.filter((dado) => {
  //       const term = text.toLowerCase();
  //       this.headers.forEach((header) => {
  //         let campo = header.campo;
  //         return (
  //           dado[campo].toLowerCase().includes(term) &&
  //           (!this.switchEstado.value ||
  //             (dado.deletedAt === null && this.switchEstado.value))
  //         );
  //       });
  //     });
  //   }else{
  //     return this.dados
  //   }
  // }
  search(text: string, pipe: PipeTransform): any[] {
    return this.dados.filter((item) => {
      const term = text.toLowerCase();

      // Verifique se alguma das colunas contém o termo pesquisado
      for (const header of this.headers) {
        const campo = header.campo.split('.');
        let valor = item;

        for (const p of campo) {
          if (valor != null) {
            valor = valor[p];
          }
        }

        // Verifique se o valor corresponde ao termo pesquisado
        if (valor != null) {
          let formattedValue!: string;
          if (typeof valor != 'string') {
            formattedValue = pipe.transform(valor).toLowerCase();
          } else {
            formattedValue = valor.toLowerCase();
          }
          if (formattedValue.includes(term)) {
            if (
              !this.switchEstado.value ||
              (valor.deletedAt === null && this.switchEstado.value)
            )
              return true;
          }
        }
      }

      return false;
    });
  }
  // ====================== AÇÕES DA TABELA ======================
  onEditClick(entidade: any) {
    const id = entidade.id;
    this.router.navigate([`/${this.editPath}`, id]);
  }
  onDetailsClick(entidade: any) {
    this.router.navigate([`/${this.detailsPath}`, entidade.id]);
  }
  onToggleClick(template: any, toggleEntidade: number) {
    this.toggleEntidade = toggleEntidade;
    this.modalService.open(template, {
      size: 'md',
      centered: true,
      windowClass: 'modal-principal',
    });
  }

  // ====================== SERVICES ======================
  async getAll() {
    this.http.get<any[]>(`${this.apiUrl}/all`).subscribe({
      next: (entidades) => {
        this.dados = entidades;
        this.dadosFiltrados = entidades;
      },
      error: (error) => {
        this.isErro = true;
        this.mensagem = error.error;
      },
    });
  }
  toggleBtn(entidade: any) {
    if (!entidade.deletedAt) {
      this.http.delete<any>(`${this.apiUrl}/delete/${entidade.id}`).subscribe({
        next: (entidades) => {
          this.getAll();
          this.modalService.dismissAll();
          this.carregando = false;
        },
        error: (error) => {
          this.isErro = true;
          this.mensagem = error.error;
          this.modalService.dismissAll();
        },
      });
    } else {
      this.http
        .post<any>(`${this.apiUrl}/activate/${entidade.id}`, null)
        .subscribe({
          next: (entidades) => {
            this.getAll();
            this.carregando = false;
            this.modalService.dismissAll();
          },
          error: (error) => {
            this.isErro = true;
            this.mensagem = error.error;
            this.modalService.dismissAll();
          },
        });
    }
  }
}
