import { Injectable } from '@angular/core';
import { User } from '../../../core/models/security/user/user.model';
import { decryptData } from '../../../shared/utils/helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userKey = '_uid';

  getUserType(): string {
    const encryptedData = localStorage.getItem(this.userKey);
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData) as User;
      return decryptedData.userType;
    }
    return '';
  }

  getCompanyId(): string[] {
    const encryptedData = localStorage.getItem(this.userKey);
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData) as User;
      return decryptedData.companyId;
    }
    return [];
  }

  getUserData(): Partial<User> {
    const encryptedData = localStorage.getItem(this.userKey);
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData) as User;
      return decryptedData;
    }
    return {};
  }
}
