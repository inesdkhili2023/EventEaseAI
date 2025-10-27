export interface Partnership {
  id?: number;
  name: string;
  type: string;
  description: string;
  contractValue: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  images?: string[];
}
