import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-btn',
  templateUrl: './register-btn.component.html',
  styleUrls: ['./register-btn.component.scss']
})
export class RegisterBtnComponent {
  @Input() registerLink!: string
  @Input() text: string = "Cadastrar novo"
  @Output() clickEvent = new EventEmitter<boolean>()
  router = inject(Router)
  constructor(){}

  register(){
    if(!this.registerLink){
      this.clickEvent.emit(true)
    }else{
      this.router.navigate([`${this.registerLink}`])
    }
  }
}
