import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnershipService, Partnership } from '../../services/partnership.service';

@Component({
  selector: 'app-sponsors-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors-banner.component.html',
  styleUrls: ['./sponsors-banner.component.scss']
})
export class SponsorsBannerComponent implements OnInit {
  activeSponsors: Partnership[] = [];
  animationDuration = '30s';

  constructor(private partnershipService: PartnershipService) {}

  ngOnInit(): void {
    this.loadActiveSponsors();
  }

  loadActiveSponsors(): void {
    this.partnershipService.getAll().subscribe({
      next: (partnerships) => {
        // Filtrer uniquement les partenaires actifs
        this.activeSponsors = partnerships.filter(p => p.active);
        
        // Ajuster la vitesse selon le nombre de sponsors
        const baseSpeed = 30; // secondes
        this.animationDuration = `${baseSpeed + (this.activeSponsors.length * 2)}s`;
      },
      error: (error) => {
        console.error('Error loading sponsors:', error);
      }
    });
  }
}