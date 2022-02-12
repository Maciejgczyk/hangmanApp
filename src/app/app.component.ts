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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAnswers().subscribe(el => this.allWords = el);
  }

  startGame(isNewGame?: boolean): void {
    if (isNewGame) {
      this.timer();
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

    if (this.count === 5) {
      alert(`Congratulations, you won! 5/5, You spent: ${this.timeSpent} seconds`);
      clearInterval()
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
  }

  clearData(): void {
    this.answerArray = [];
    this.randomWord = null;
  }

  timer(): void {
    const test = setInterval(() => {
      this.timeSpent += 1;
    }, 1000)
    if (this.count == 5) {
      clearInterval(test);
    }
  }
}
