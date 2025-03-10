/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { SecurityService } from '../../../../../services/domain/security/security.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../../../services/common/toaster/toaster.service';
import { ModalService } from '../../../../../services/common/modal/modal.service';
import { Subject, takeUntil } from 'rxjs';
import { ERROR_MESSAGES } from '../../../../../constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: false
})
export class UserListComponent implements OnInit, OnDestroy {
  users: any[] = [];
  formattedUsers: any[] = [];
  selectedUser: any;
  isModalOpen = false;
  modalTitle = '';
  modalContent = '';
  confirmBtn = '';
  data: any;
  searchQuery = '';
  totalItems = 0;
  templateHtml="";
  
  private subscription = new Subject<void>();

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private toasterService: ToasterService,
    private modalService: ModalService,
  ) {}
  itemsPerPage = 10;
  currentPage = 1;
  itemsPerPage1 = 0;
  onSearch(query: string): void {
    this.searchQuery = query;
    this.fetchUsers();
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchUsers();
  }
  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {

    this.securityService
      .getUsers()
      .pipe(takeUntil(this.subscription))
      .subscribe(
        (response: any) => {
          this.users = response.data;
          this.totalItems = response.itemCount;
          this.formatUser(this.users);
        },
        (error) => {
          const errorMessage = error?.error?.message || error.message || ERROR_MESSAGES.UNEXPECTED_ERROR;
          this.toasterService.error(errorMessage);
        },
      );
  }

  openDeleteConfirmationModal(user: any) {
    this.data = user;
    this.modalTitle = 'Confirm User Deletion';
    this.modalContent = `Are you sure you want to delete the user "${user['Name']}"?`;
    this.confirmBtn = 'Yes, Delete it.';
    this.isModalOpen = true;

    const confirmAction = new EventEmitter<any>();
    confirmAction.subscribe((data: any) => {
      const { userToDelete } = data;
      const { _id } = userToDelete;
      this.deleteUser(_id);
    });

    this.modalService.openModal(
      {
        title: this.modalTitle,
        content: this.modalContent,
        btn: this.confirmBtn,
        userToDelete: user,
      },
      confirmAction,
    );
  }

  openEditConfirmationModal(user: any) {
    this.data = user;
    this.modalTitle = 'Confirm User Update';
    this.modalContent = `Are you sure you want to edit the user "${user['Name']}"?`;
    this.confirmBtn = 'Yes, Edit it.';
    this.isModalOpen = true;

    const confirmAction = new EventEmitter<any>();
    confirmAction.subscribe((data: any) => {
      const { userToEdit } = data;
      const { _id } = userToEdit;
      this.editUser(_id);
    });

    this.modalService.openModal(
      {
        title: this.modalTitle,
        content: this.modalContent,
        btn: this.confirmBtn,
        userToEdit: user,
      },
      confirmAction,
    );
  }
  handleOkClicked() {
    if (this.data) {
      this.modalService.confirmAction.emit(this.data);
    }
    this.isModalOpen = false;
  }

  formatUser(users: any[]) {
    this.formattedUsers = users.map((user, index) => {
      return {
        index: index + 1,
        _id: user.id,
        'Name': user.name,
        'Email': user.email,
        Status: user.active ? 'Active' : 'Inactive',
      };
    });

    return this.formattedUsers;
  }

  handleModalClosed() {
    this.isModalOpen = false;
  }

  deleteUser(userId: string) {
    this.securityService
      .deleteUser(userId)
      .pipe(takeUntil(this.subscription))
      .subscribe(
        (response: any) => {
          setTimeout(() => {
            this.toasterService.success('User deleted successfully.');
          }, 0);
          this.fetchUsers();
          this.router.navigate(['user']);
        },
        (error: any) => {
          this.toasterService.error('User deletetion Failed.');
          console.error('Error fetching users', error);
        },
      );
  }
  viewUser(userId: string) {
    this.securityService
      .generateResume(userId)
      .pipe(takeUntil(this.subscription))
      .subscribe(
        (response: any) => {
          this.templateHtml = response.data;
          setTimeout(() => {
            this.toasterService.success('User Resume Generated successfully.');
          }, 0);
        },
        (error: any) => {
        },
      );
  }
  editUser(userId: string) {
    console.log(userId);
    this.router.navigate(['user/edit-user', userId]);
  }
  addUser() {
    this.router.navigate(['user/register']);
  }

  closeModal(){
    this.templateHtml = "";
  }
  onItemsPerPageChanged(itemsPerPage1: number): void {
    this.itemsPerPage = itemsPerPage1;
    this.fetchUsers();
  }
  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
