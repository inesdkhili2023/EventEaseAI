import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">
          🎫 Event Tickets
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/events">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#about">About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="py-4">
      <router-outlet></router-outlet>
    </main>

    <footer class="bg-dark text-white text-center py-4 mt-5">
      <p>&copy; 2025 Event Tickets System. All rights reserved.</p>
    </footer>
    `,
    styles: [
        `:host { display: flex; flex-direction: column; min-height: 100vh; }`,
        `main { flex: 1; }`
    ]
})
export class AppComponent {
    title = 'Event Tickets App';
}