import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './entity/User';
import { ApiUsersService } from './services/api-users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'test-technique';
  showDetails: boolean = false;
  slideSideBar: boolean = false;
  sideBarOpen = false;
  UrlListUsers = '/assets/List-users.json';
  listUsers: User[] = [];

  constructor(
    private serviceUser: ApiUsersService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.LoadListUsersFromJson();
  }

  LoadListUsersFromJson() {
    this.serviceUser.loadListOfUsers().subscribe((res) => {
      this.listUsers = res;
    });
    this._snackBar.open('Loading List Users !!', 'LOADING', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  SaveListUsersInJson() {}
  toggleSidebar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  onClickUser(u: User) {
    this.slideSideBar = true;
    this.showDetails = true;
    this.serviceUser.sendUser.next(u);
    this.sideBarOpen = true;
  }
}
