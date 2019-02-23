import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/User';
import { Observable } from 'rxjs';

export class UsersService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'api/users');
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'api/users/' + id);
  }

  updateUser(user: User): Observable<Object> {
    return this.http.put(this.baseUrl + 'api/users', user);
  }

  deleteUser(id: string): Observable<Object> {
    return this.http.delete(this.baseUrl + 'api/users/' + id);
  }
}
