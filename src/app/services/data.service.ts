import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private newGame = new Subject<any>();
  public newGame$ = this.newGame.asObservable();

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Array<string>> {
    return this.http.get<Array<string>>('assets/answers.json');
  }

  sendAction(): void {
    this.newGame.next();
  }
}
