import { User } from './user.model';

export class Data {
  accessToken: string;
  refreshToken: string;
  user: User;

  constructor(accessToken: string, refreshToken: string, user: User) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}
