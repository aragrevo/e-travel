export interface Flight {
  company: string;
  dates: {
    date: string;
    data: {
      passengers: number;
      price: number;
    }[];
  }[];
}
