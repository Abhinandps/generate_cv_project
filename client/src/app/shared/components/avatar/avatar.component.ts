import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  standalone: false
})
export class AvatarComponent {
  @Input() userName: string | undefined;
  avatarLetter: string = '';
  backgroundColor: string = '';

  ngOnInit(): void {
    this.avatarLetter = this.userName ? this.userName.charAt(0).toUpperCase() : '';
    this.backgroundColor = this.getRandomColor();
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
