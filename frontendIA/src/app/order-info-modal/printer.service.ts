import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  constructor() {}

  // Mock function to check if a printer is available
  isPrinterAvailable(): boolean {
    // Logic to check for printer availability
    // For now, we return false to simulate no printer
    return false;
  }
}
