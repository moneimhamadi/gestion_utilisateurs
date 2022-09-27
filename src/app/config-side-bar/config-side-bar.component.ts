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
    console.log(this.userSelected?._nombre_enfants);
    this.userService.sendUser$.subscribe((data) => {
      this.userSelected = data;
      console.log('user received', this.userSelected);
    });

    this.userService.handleMinusNbr$.subscribe((data) => {
      console.log('after minus', data);
      this.userSelected._nombre_enfants = data;
    });
    this.userService.handlePlusNbr$.subscribe((data) => {
      console.log('after plus', data);
      this.userSelected._nombre_enfants = data;
    });

    //inputs get values
    var inputNom = document.getElementById('inputnom');
    inputNom.addEventListener('input', (event) => {
      console.log((<HTMLInputElement>inputNom).value);
      let nameTosend = (<HTMLInputElement>inputNom).value;
      this.userService.handleNomInput.next(nameTosend);
    });
    var inputPrenom = document.getElementById('inputprenom');
    inputPrenom.addEventListener('input', (event) => {
      console.log((<HTMLInputElement>inputPrenom).value);
      let prenameTosend = (<HTMLInputElement>inputPrenom).value;
      this.userService.handlePrenomInput.next(prenameTosend);
    });
  }
}
