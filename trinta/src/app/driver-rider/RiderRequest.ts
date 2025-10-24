export interface RiderRequest {
  id: string;
  latitude: number;
  longitude: number;
  passengerCount: number;
  specialNeeds?: string;
  urgencyLevel: string;
  maxWaitTime: number;
}



