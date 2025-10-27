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
  email: string;
  password?: string; // Ajouté optionnellement
  experienceYears: number;
  date_naissance: string;
  adresse?: string;
  responseTime: number;
  available: boolean;
  num_tel: string;     // Changé de 'phone' à 'numTel'
  image_url: string;   // Changé de 'profilePicture' à 'imageUrl'
}