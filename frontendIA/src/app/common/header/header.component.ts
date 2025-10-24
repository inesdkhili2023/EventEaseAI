import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { RouterLink } from '@angular/router';
import { ToggleService } from './toggle.service';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from '../../services/supabase.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [FeathericonsModule, MatButtonModule, MatMenuModule, RouterLink, NgClass,CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    providers: [
        DatePipe,SupabaseService
    ]
})
export class HeaderComponent {
  connectedUser: User | null = null;
  user: any = null;

    constructor(
        public toggleService: ToggleService,
        private datePipe: DatePipe,
        private supabase: SupabaseService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Toggle Service
    isToggled = false;
    toggle() {
        this.toggleService.toggle();
    }

    // Dark Mode
    toggleTheme() {
        this.toggleService.toggleTheme();
    }

    // Current Date
    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');
ngOnInit(): void {
    const user = localStorage.getItem('connectedUser');
    if (user) {
      this.connectedUser = JSON.parse(user);
    }
  }

  logout() {
    localStorage.removeItem('connectedUser');
    this.connectedUser = null;
  }
}