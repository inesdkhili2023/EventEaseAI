export interface Driver {
  id: string;
  nom: string;        // Changé de 'name' à 'nom'
  prenom: string;     // Ajouté
  vehicleType: string;
  capacity: number;
  latitude: number;
  longitude: number;
  rating: number;
  pricePerKm: number;
  experienceYears: number;
  responseTime: number;
  available: boolean;
  numTel: string;     // Changé de 'phone' à 'numTel'
  imageUrl: string;   // Changé de 'profilePicture' à 'imageUrl'
}