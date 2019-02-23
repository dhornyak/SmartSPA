import { Component, OnInit } from '@angular/core';

import { User } from '../model/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  private users: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  onDelete(id: string) {
    const indexInArray = this.users.findIndex(user => user.id === id);

    if (indexInArray === -1)
      return;

    this.users.splice(indexInArray, 1);
    this.usersService.deleteUser(id).subscribe(result => { }, error => console.log(error));
  }
}
