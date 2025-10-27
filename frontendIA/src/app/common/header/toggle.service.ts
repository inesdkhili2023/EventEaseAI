import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToggleService {

    private isToggled = new BehaviorSubject<boolean>(false);

    get isToggled$() {
        return this.isToggled.asObservable();
    }

    toggle() {
        this.isToggled.next(!this.isToggled.value);
    }

    // Dark Mode
    private isDarkTheme: boolean;

    constructor() {
        // Dark Mode
        this.isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme')!);
    }

    // Dark Mode
    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        localStorage.setItem('isDarkTheme', JSON.stringify(this.isDarkTheme));
    }
    isDark() {
        return this.isDarkTheme;
    }

}