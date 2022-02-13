import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  allWords: Array<string> = [];
  answerArray: Array<string> = [];
  randomWord: string = null;
  count: number = 0;
  timeSpent: number = 0;
  mistakesMade: number = 0;
  isLost: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAnswers().subscribe(el => this.allWords = el);
    setInterval(() => {
      this.timeSpent += 1;
    }, 1000)
  }

  startGame(isNewGame?: boolean): void {
    if (isNewGame) {
      this.timeSpent = 0;
      this.mistakesMade = 0;
      this.count = 0;
      this.clearData();
    }

    this.dataService.sendAction();

    this.randomWord = this.allWords[Math.floor(Math.random() * this.allWords.length)];
    console.log(this.randomWord);

    for (let i = 0; i < this.randomWord.length; i++) {
      this.answerArray[i] = "_";
    }
  }

  nextGame(): void {
    this.clearData();
    this.count += 1;
    this.mistakesMade = 0;

    if (this.count === 5) {
      alert(`Congratulations, you won! 5/5, You spent: ${this.timeSpent} seconds`);
      this.clearData();
      this.count = 0;
    } else {
      this.startGame();
    }
  }

  getLetter(value: string): void {
    for (let j = 0; j < this.answerArray.length; j++) {
      if (this.randomWord[j] == value) {
        this.answerArray[j] = value;
      }
    }
    if (!this.randomWord?.includes(value)) {
      if (this.mistakesMade == 5) {
        alert("Game over :)");
        this.isLost = true;
      }
      this.mistakesMade += 1;
    }
  }

  clearData(): void {
    this.answerArray = [];
    this.randomWord = null;
    this.isLost = false;
  }
}
