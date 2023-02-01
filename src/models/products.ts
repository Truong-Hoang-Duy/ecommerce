interface objectRate {
  count: number;
  rate: number;
}

export interface Products {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: objectRate;
  title: string;
}
