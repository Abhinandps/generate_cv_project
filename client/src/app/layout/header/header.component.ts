/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { PermissionService } from '../../services/permission/permission.service';
import { UserService } from '../../services/common/user/userService';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state(
        'closed',
        style({
          transform: 'translateX(-150%)',
          left: '0',
        }),
      ),
      state(
        'open',
        style({
          transform: 'translateX(0)',
        }),
      ),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
  standalone: false
})
export class HeaderComponent implements OnDestroy, OnInit {
  navItems = [
    { link: '/manual', title: 'Manual', permission: ['Manual', 'canView'], isActive: false },
    { link: '/automated', title: 'Automated', permission: ['Automated', 'canView'], isActive: false },
    { link: '/listview', title: 'List View', permission: ['ListView', 'canView'], isActive: false },

    {
      link: '',
      title: 'Masters',
      permission: ['Masters', 'canView'],
      submenu: [
        { link: '/company', title: 'Company Master', isActive: false },
        { link: '/product', title: 'Product Master', isActive: false },
        { link: '/unit', title: 'Unit Master', isActive: false },
        { link: '/currency', title: 'Currency Master', isActive: false },
      ],
      isOpen: false,
      isActive: false,
    },
    {
      link: '',
      title: 'Security',
      permission: ['Security', 'canView'],
      submenu: [
        { link: '/user', title: 'User Master', isActive: false },
        { link: '/role', title: 'Role Master', isActive: false },
        { link: '/region', title: 'Region Master', isActive: false },
      ],
      isOpen: false,
      isActive: false,
    },
  ];

  private subscription!: Subscription;
  userName!: string;

  customMenuStyles = {
    position: 'absolute',
    right: '2em',
    zIndex: '-1',
  };

  menuState = 'closed';
  isSmallDevice = false;

  constructor(
    private router: Router,
    private userService: UserService,
    public permissionService: PermissionService,
    private eRef: ElementRef,
  ) {
    this.checkViewportSize();
  }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.setActiveSubmenu();
    });
    this.userName = this.userService.getUserData().username || '';
    this.setActiveSubmenu();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isActive(link: string): boolean {
    return this.router.isActive(link, true);
  }

  logout(): void {
    localStorage.clear();
    this.permissionService.clearPermissions();
    this.router.navigate(['/']);
  }

  toggleDropdown(item: any): void {
    this.navItems.forEach((navItem) => {
      if (navItem !== item) {
        navItem.isOpen = false;
      }
    });
    item.isOpen = !item.isOpen;
  }

  private setActiveSubmenu(): void {
    this.navItems.forEach((item) => {
      if (item.submenu) {
        const isSubmenuActive = item.submenu.some((subItem) => this.isActive(subItem.link));

        item.isOpen = isSubmenuActive;
        item.isActive = isSubmenuActive;

        item.submenu.forEach((subItem) => {
          subItem.isActive = this.isActive(subItem.link);
          if (subItem.isActive) {
            item.isOpen = false;
          }
        });
      } else {
        item.isActive = this.isActive(item.link);
      }
    });
  }

  triggerMenu(): void {
    const moreBtn = document.getElementById('more-btn');
    if (moreBtn) {
      moreBtn.click();
    }
  }

  handleMenuAction(index: number): void {
    switch (index) {
      case 0:
        this.logout();
        break;

      default:
        console.error('Unknown action');
    }
  }

  toggleMenu() {
    this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
  }

  checkViewportSize() {
    this.isSmallDevice = window.innerWidth < 992;
    if (!this.isSmallDevice) {
      this.menuState = 'closed';
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside && this.menuState === 'open' && this.isSmallDevice) {
      this.menuState = 'closed';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewportSize();
  }
}
