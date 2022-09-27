import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../entity/User';

@Injectable({
  providedIn: 'root',
})
export class ApiUsersService {
  //service select user
  sendUser = new Subject<User>();
  sendUser$ = this.sendUser.asObservable();

  //service handle plus
  handlePlusNbr = new Subject<number>();
  handlePlusNbr$ = this.handlePlusNbr.asObservable();
  //service handle minus
  handleMinusNbr = new Subject<number>();
  handleMinusNbr$ = this.handleMinusNbr.asObservable();
  //handle nom input
  handleNomInput = new Subject<string>();
  handleNomInput$ = this.handleNomInput.asObservable();
  handlePrenomInput = new Subject<string>();
  handlePrenomInput$ = this.handlePrenomInput.asObservable();
  //handlePrenomInput
  private UrlListUsers = '/assets/List-users.json';
  constructor(private httpUser: HttpClient) {}
  loadListOfUsers() {
    return this.httpUser.get<User[]>(this.UrlListUsers);
  }
}
