export interface Spot {}

export class CreateSpotDto {
    name: string;
    description: string;
    location: string;
    price: number;
  }

  export class UpdateSpotDto {
    name?: string;
    description?: string;
    location?: string;
    price?: number;
  }
  