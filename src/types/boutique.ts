export interface Product {
  id: string;
  name: string;
  frenchTitle: string;
  subtitle?: string;
  category: 'outerwear' | 'eveningwear' | 'leather' | 'tailoring' | 'footwear' | 'accessories';
  price: number;
  description: string;
  fabric: string;
  origin: string;
  image: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  serialNumber: string;
  sustainability: string;
  details: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface AppointmentBooking {
  salonLocation: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  consultationType: string;
  specialRequests?: string;
}

export interface Chapter {
  id: string;
  index: number;
  number: string;
  title: string;
  subtitle: string;
  kicker: string;
}
