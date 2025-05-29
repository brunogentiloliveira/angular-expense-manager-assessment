import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModules } from './shared/material.shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MaterialModules],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})

export class AppComponent {
  title = 'angular-expense-manager-assessment';
}
