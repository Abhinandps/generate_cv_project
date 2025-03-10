import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { PermissionService } from './permission.service';
import { Subscription } from 'rxjs';
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
@Directive({
  selector: '[appHasPermissions]',
})
export class HasPermissionsDirective implements OnDestroy {
  private subscription = new Subscription();

  @Input() set appHasPermissions(requiredPermissions: string[]) {
    this.subscription.add(
      this.permissionService.event$.subscribe((userPermissions) => {
        this.decideView(userPermissions, requiredPermissions);
      }),
    );
    // Initial check
    this.subscription.add(
      this.permissionService.event$.subscribe((userPermissions) => {
        this.decideView(userPermissions, requiredPermissions);
      }),
    );
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private permissionService: PermissionService,
  ) {}

  private decideView(userPermissions: Permission[], requiredPermissions: string[]): void {
    const [menuId, permission] = requiredPermissions;
    const hasPermission = userPermissions.some((item) => {
      if (item.menu?.name === menuId) {
        return item[permission as keyof Permission] === true;
      }
      return false;
    });

    if (hasPermission) {
      this.showComponent();
    } else {
      this.hideComponent();
    }
  }

  private showComponent(): void {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  private hideComponent(): void {
    this.viewContainerRef.clear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
