import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { decryptData } from '../../shared/utils/helper';

interface Permission {
  canSave?: boolean;
  canUpdate?: boolean;
  canView?: boolean;
  canDelete?: boolean;
  _id: string;
  menu?: {
    _id: string;
    name: string;
    component: string;
    parentId: string | null;
    label: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private _eventSubject = new BehaviorSubject<Permission[]>([]);
  public event$: Observable<Permission[]> = this._eventSubject.asObservable();

  constructor() {
    this.loadPermissions();
  }

  public loadPermissions(): void {
    const encryptedData = localStorage.getItem('_mnp');
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData) as Permission[];
      this.emitChangeEvent(decryptedData);
    } else {
      this.emitChangeEvent([]);
    }
  }

  public emitChangeEvent(permissionOptions: Permission[]): void {
    this._eventSubject.next(permissionOptions);
  }

  public clearPermissions(): void {
    this.emitChangeEvent([]);
  }
}
