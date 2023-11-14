import { Component } from '@angular/core';
import { Header } from 'src/app/components/table/header';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.scss']
})
export class UsuarioListarComponent {
  isErro!: boolean
  mensagem!: string

  // Table Configuarations
  apiUrlPath(){
    return 'http://npvet.duckdns.org:8080/usuario';  
  }
  callHeaders(){
    let tableHeaders : Header[] = [];
    tableHeaders.push(new Header('Nome', 'nome'));
    tableHeaders.push(new Header('Username', 'username')); 
    tableHeaders.push(new Header('CPF', 'cpf'));
    tableHeaders.push(new Header('Tipo Usuario','tipoUsuario'));   
    return tableHeaders;
  }
}
