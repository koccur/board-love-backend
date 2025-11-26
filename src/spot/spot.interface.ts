export interface Spot {}

export class CreateSpotDto {
    name: string;
    description: string;
    locationLat: string;
    locationLng: string;
    price: number;
  }

  export class UpdateSpotDto {
    name?: string;
    description?: string;
    locationLat?: string;
    locationLng?: string;
    price?: number;
  }
  