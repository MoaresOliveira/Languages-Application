import { Component, OnInit } from '@angular/core';
import { Language } from './models/language';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  languages!: Language[];

  constructor(private languageService: LanguageService){}

  ngOnInit(): void {
    this.listLanguages();
  }

  listLanguages(){
    this.languageService.getAllLanguages()
          .subscribe(
            response => {
              console.log(response)
              this.languages = response;
            }
          )
  }

  vote(language: Language){
    let linguagensVotadas: Language[] = JSON.parse(localStorage.getItem("linguagensVotadas") ?? '[]');

    if(!linguagensVotadas.some(item => item.name == language.name)){
      this.languageService.voteLanguageByName(language.name).subscribe((response)=> {
        linguagensVotadas.push(response)
        localStorage.setItem("linguagensVotadas",JSON.stringify(linguagensVotadas))
        this.listLanguages()
      })
    }
  }

  action(language: Language){
    language.name = language.name.trim();
    language.logo = language.logo.trim();
    this.languageService.addLanguage(language).subscribe((response)=> {
      this.listLanguages()
    })
  }

  remove(language: Language){
    let senha = prompt("Insira a senha pra deletar " + language.name)
    if(senha === "deletar/"+language.name){
      this.languageService.deleteLanguageByName(language.name).subscribe((response)=> {
        this.listLanguages()
      })
    }else {
      alert("Senha incorreta")
    }
  }

}
