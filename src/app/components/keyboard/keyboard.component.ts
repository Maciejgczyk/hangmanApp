import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Output() letter = new EventEmitter<string>();

  allLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  usedLetters = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.newGame$.subscribe(() => this.usedLetters = [])
  }

  sendLetter(value: string): void {
    this.letter.emit(value.toLowerCase());
    this.usedLetters.push(value);
  }

}
