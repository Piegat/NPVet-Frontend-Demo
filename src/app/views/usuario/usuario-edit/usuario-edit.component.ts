import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { Header } from 'src/app/components/table/header';
import { TipoUsuario } from 'src/app/models/enums/tipo-usuario';
import { Usuario } from 'src/app/models/usuario/usuario';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss'],
  providers: [provideNgxMask()],
})
export class UsuarioEditComponent implements OnInit {
  usuario = new Usuario();
  tipoUsuarioEnum = TipoUsuario;
  editMode = false;
  data: any[] = [];
  hide = true;
  isErro!: boolean
  mensagem!: string
  showTable: boolean = true;
  usuarioForm: any;

  constructor(private uService: UsuarioService,
     private router: Router,
     private route: ActivatedRoute,
     private cService: ConsultaService) {}

  ngOnInit(): void {
    this.fetchUsuario();
    this.fetchConsultas();
  }

  fetchConsultas() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.cService.getConsultasByVeterinarioId(id).subscribe({
        next: (c) => {
          this.data = c;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  fetchUsuario() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.uService.getById(id).subscribe({
        next: (u) => {
          this.usuario = u;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  // Table Component Logic
  apiUrlPath() {
    return 'http://npvet.duckdns.org:8080/consulta';
  }

  callHeaders() {
    let tableHeaders: Header[] = [];
    tableHeaders.push(new Header('Data', 'data'));
    tableHeaders.push(new Header('Status', 'status'));
    tableHeaders.push(new Header('Animal', 'animal.nome'));
    tableHeaders.push(new Header('Tutor', 'tutor.nome'));
    return tableHeaders;
  }

  // Edit Mode Logic
  editarUsuario() {
    this.editMode = true;

  }
  saveEdits() {
    this.uService.update(this.usuario.id,this.usuario).subscribe({
      next: (u) => {
        this.usuario = u;
        this.editMode = false;
        this.isErro = false
        this.mensagem = "Usuário atualizado com sucesso!"
        this.router.navigate(['web/usuarios']);
      },
      error: (err) => {
        console.log(err);
        this.isErro = true
        this.mensagem = "Erro ao atualizar usuário!"
        if(err.status == 400){
          this.data = [];
        }
      },
    });
  }
  cancelarEdit() {
    this.editMode = false;
  }
}
