import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../entity/User';
import { ApiUsersService } from '../services/api-users.service';

@Component({
  selector: 'app-config-side-bar',
  templateUrl: './config-side-bar.component.html',
  styleUrls: ['./config-side-bar.component.css'],
})
export class ConfigSideBarComponent implements OnInit {
  public sidebarShow: boolean = false;
  userSelected: User;

  sideBarOpen = true;
  constructor(private userService: ApiUsersService) {}

  ngOnInit(): void {
    this.userService.sendUser$.subscribe((data) => {
      this.userSelected = data;
    });

    this.userService.handleMinusNbr$.subscribe((data) => {
      this.userSelected._nombre_enfants = data;
    });
    this.userService.handlePlusNbr$.subscribe((data) => {
      this.userSelected._nombre_enfants = data;
    });

    //inputs get values
    var inputNom = document.getElementById('inputnom');
    inputNom.addEventListener('input', (event) => {
      let nameTosend = (<HTMLInputElement>inputNom).value;
      this.userService.handleNomInput.next(nameTosend);
    });
    var inputPrenom = document.getElementById('inputprenom');
    inputPrenom.addEventListener('input', (event) => {
      let prenameTosend = (<HTMLInputElement>inputPrenom).value;
      this.userService.handlePrenomInput.next(prenameTosend);
    });
  }
}
