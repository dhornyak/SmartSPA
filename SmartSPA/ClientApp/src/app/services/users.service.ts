import { User } from '../model/User';

export class UsersService {
  private readonly users: Array<User> = [
    new User(0, 'Adam', 'West', 'adamwest@comedycentral.com', '999F757D'),
    new User(1, 'Peter', 'Griffin', 'petergriffin@comedycentral.com', '9DABDE30'),
    new User(2, 'Lois', 'Griffin', 'loisgriffin@comedycentral.com', '71502D48'),
    new User(3, 'Stewie', 'Griffin', 'stewiegriffin@comedycentral.com', '59E8996D'),
    new User(4, 'Joe', 'Swanson', 'joeswanson@comedycentral.com', '92144D47')
  ];

  public getUsers(): Array<User> {
    return this.users;
  }

  public getUser(id: number): User {
    return this.users[id];
  }

  public updateUser(user: User) {
    const i = this.users.findIndex(u => u.id === user.id);

    if (i === -1) {
      return;
    }

    this.users[i].firstName = user.firstName;
    this.users[i].lastName = user.lastName;
    this.users[i].email = user.email;
    this.users[i].hisIdentifier = user.hisIdentifier;
  }
}
