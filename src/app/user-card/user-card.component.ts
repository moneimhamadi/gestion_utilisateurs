import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../entity/User';
import { ApiUsersService } from '../services/api-users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() _nom: string;
  @Input() _prenom: string;
  @Input() _nombre_enfants: number;
  @Input() showDetails: boolean;
  constructor(
    private serviceUser: ApiUsersService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.serviceUser.handleNomInput$.subscribe((data) => {
      console.log('received _nom', data);
      this._nom = data;
    });
    this.serviceUser.handlePrenomInput$.subscribe((data) => {
      console.log('received _prenom', data);
      this._prenom = data;
    });
  }
  handleMinus() {
    console.log(this._nombre_enfants);
    if (this._nombre_enfants == 0) {
      this._snackBar.open('Impossible operation !!', 'ERROR', {
        duration: 500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    } else {
      this._nombre_enfants--;
      this.serviceUser.handleMinusNbr.next(this._nombre_enfants);
    }
  }
  handlePlus() {
    this._nombre_enfants++;
    this.serviceUser.handlePlusNbr.next(this._nombre_enfants);
  }
}
