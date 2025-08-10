import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Auth } from '../service/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  showUserMenu = false

  @ViewChild('userMenu') userMenuRef?: ElementRef;

  constructor(private auth: Auth, private eRef: ElementRef) {}

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.auth.logout()
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    //si clic en dehors de l'icone et du menu la pop up se ferme
    const clickedInside = this.eRef.nativeElement.contains(target) ||
      this.userMenuRef?.nativeElement.contains(target);

      if (!clickedInside) {
      this.showUserMenu = false;
    }
}
}
