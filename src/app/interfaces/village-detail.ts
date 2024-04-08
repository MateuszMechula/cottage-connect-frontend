export interface VillageDetail {
  villageId: number;
  name: string;
  description: string;
  addressDTO: Address;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  voivodeship: string;
  country: string;
}
