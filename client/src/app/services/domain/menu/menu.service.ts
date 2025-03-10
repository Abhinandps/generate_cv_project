import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { decryptData } from '../../../shared/utils/helper';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  navItems = [
    { name: 'Manual', path: '/manual' },
    { name: 'Automated', path: '/automated' },
    { name: 'ListView', path: '/listview' },
    { name: 'Security', path: '/user' },
    { name: 'Masters', path: '/product' },
  ];

  getMenuIdByName(name: string): Observable<string> {
    const mainMenu = localStorage.getItem('_mnp');
    if (mainMenu) {
      const menuData = decryptData(mainMenu);
      const menuItem = menuData.find((item: any) => item.menu.component === name);
      if (menuItem) {
        return of(menuItem.menu._id);
      } else {
        throw new Error(`Menu item not found: ${name}`);
      }
    } else {
      throw new Error('Main menu not found in local storage');
    }
  }

  pathPermission(permissions: any) {
    for (const item of this.navItems) {
      for (const permission of permissions) {
        if (item.name === permission.menu.name && permission.canView) {
          return item.path;
        }
      }
    }
    return '';
  }
}
