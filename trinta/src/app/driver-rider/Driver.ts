export interface Driver {
  id: string;
  latitude: number;
  longitude: number;
  vehicleType: string;
  capacity: number;
  rating: number;
  pricePerKm: number;
  experienceYears: number;
  responseTime: number;
  available: boolean;
  name: string;
  phone: string;
  profilePicture: string;
}