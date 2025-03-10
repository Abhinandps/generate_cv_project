import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrl: './error500.component.scss',
  standalone: false
})
export class Error500Component {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
