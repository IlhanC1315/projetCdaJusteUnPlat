import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { Injectable } from '@angular/core';
import { Auth } from '../service/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [Header, CommonModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit {
  user: any;

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.auth.getProfile().subscribe({
      next: (data: any) => {
        this.user = data.user;
      },
      error: (err) => console.error(err)
    });
  };
}
