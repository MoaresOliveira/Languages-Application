import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from '../../models/language';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit {

  @Input() language!: Language;
  @Output() onVote: EventEmitter<Language> = new EventEmitter();
  @Output() onDelete: EventEmitter<Language> = new EventEmitter();
  voted!: boolean;

  constructor() { }

  ngOnInit(): void {

  }

  remove(){
    this.onDelete.emit(this.language)
  }

  ngAfterViewInit(): void {
    this.linguagensVotadas()
  }

  linguagensVotadas(){
    let linguagensVotadas: Language[] = JSON.parse(localStorage.getItem("linguagensVotadas") ?? '[]');
    if(linguagensVotadas.some(item => item.name == this.language.name)){
      this.voted = true;
    }else{
      this.voted = false;
    }
  }

  vote(){
    this.onVote.emit(this.language)
  }

}
