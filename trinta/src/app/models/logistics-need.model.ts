export enum NeedType {
    MATERIAL = 'MATERIAL',
    CATERING = 'CATERING',
    TRANSPORT = 'TRANSPORT',
    SANITARY = 'SANITARY'
}

export enum NeedStatus {
    PLANNED = 'PLANNED',
    CONFIRMED = 'CONFIRMED',
    ACQUIRED = 'ACQUIRED'
}

export interface LogisticsNeed {
    id?: number;
    eventId: number;
    type: NeedType;
    itemName: string;
    quantity: number;
    unit: string;
    status: NeedStatus;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}