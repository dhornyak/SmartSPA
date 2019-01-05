import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { User } from '../../model/User';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  private user: User;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService) { }

  ngOnInit() {
    this.resolveUser();
    this.initUserForm();
  }

  public onSubmit() {
    if (!this.userForm.valid) {
      alert('Form has invalid values. Please fix them first before submitting.');
    }

    this.user.firstName = this.userForm.get('userData.firstName').value;
    this.user.lastName = this.userForm.get('userData.lastName').value;
    this.user.email = this.userForm.get('userData.email').value;
    this.user.hisIdentifier = this.userForm.get('userData.hisIdentifier').value;

    this.usersService.updateUser(this.user);

    this.navigateToUsersPage();
  }

  public onCancel() {
    this.navigateToUsersPage();
  }

  private resolveUser() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.user = data['user'];
        }
      );
  }

  private initUserForm() {
    this.userForm = new FormGroup({
      'userData': new FormGroup({
        'firstName': new FormControl(this.user.firstName, [Validators.required]),
        'lastName': new FormControl(this.user.lastName, [Validators.required]),
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'hisIdentifier': new FormControl(this.user.hisIdentifier, [Validators.required]),
      })
    });
  }

  private navigateToUsersPage() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
