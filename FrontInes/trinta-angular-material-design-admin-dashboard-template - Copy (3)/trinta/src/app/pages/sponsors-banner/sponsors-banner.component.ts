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
  private backendUrl = 'http://localhost:8081'; // ✅ URL du backend

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

  // ✅ Méthode pour obtenir l'URL complète de l'image
  getImageUrl(partnership: Partnership): string {
    // Vérifier d'abord si l'objet a image_url (snake_case du backend)
    const backendImageUrl = (partnership as any).image_url;
    if (backendImageUrl && typeof backendImageUrl === 'string') {
      if (backendImageUrl.startsWith('/uploads')) {
        return this.backendUrl + backendImageUrl;
      }
      return backendImageUrl;
    }
    
    // Si imageUrl est une chaîne directement
    if (partnership.imageUrl && typeof partnership.imageUrl === 'string') {
      if (partnership.imageUrl.startsWith('/uploads')) {
        return this.backendUrl + partnership.imageUrl;
      }
      return partnership.imageUrl;
    }
    
    // Si images est un tableau
    if (partnership.images && partnership.images.length > 0) {
      const imgUrl = partnership.images[0];
      if (imgUrl.startsWith('/uploads')) {
        return this.backendUrl + imgUrl;
      }
      return imgUrl;
    }
    
    // Image par défaut si aucune image n'est disponible
    return 'https://via.placeholder.com/200x100/667eea/ffffff?text=Sponsor';
  }

  // ✅ Méthode pour gérer les erreurs de chargement d'image
  onImageError(event: any): void {
    if (event.target) {
      event.target.src = 'https://via.placeholder.com/200x100/667eea/ffffff?text=Sponsor';
    }
  }
}