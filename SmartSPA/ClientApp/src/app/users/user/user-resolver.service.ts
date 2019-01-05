import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { User } from '../../model/User';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    return this.usersService.getUser(+route.params['id']);
  }
}
