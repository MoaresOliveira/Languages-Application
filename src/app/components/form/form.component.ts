import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Language } from '../../models/language';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  option: string = 'Add';
  name!: string;
  logo!: string;

  @Output() onAction: EventEmitter<Language> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  call(){
    if(this.validate(this.name) && this.validate(this.logo)){
      let language = {
        name: this.name,
        logo: this.logo
      }
      this.onAction.emit(language)
    }

  }

  validate(value: string){
    if(value == null || value.trim().length == 0){
      return false;
    }
    return true;
  }

}
