export type Product = {
  dateAndTimeOfProduction: string;
  productName: string;
  trackedProductCount?: string;
  weight: number;
  temperature: number;
  allowedForSale: string;
  responsiblePerson: string;
  organolepticProps:
  {
    appearance: number;
    color: number;
    smell: number;
    consistency: number;
  };
  shop: string;
};
