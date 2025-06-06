interface Image {
  url: string;
  description: string;
}

interface Resort {
  id: string;
  name: string;
  regionName: string;
  countryName: string;
  starRating: number;
  overview: string;
  image: Image;
}

interface FlightDetails {
  departureAirport: string;
  departureDate: string;
}

interface Party {
  adults: number;
  children?: number;
  infants?: number;
}

interface Price {
  amount: number;
  currency: string;
}

interface BookingDetails {
  party: Party;
  lengthOfStay: number;
  price: Price;
}

interface Holiday {
  resort: Resort;
  flightDetails: FlightDetails;
  bookingDetails: BookingDetails;
}

export type { BookingDetails, FlightDetails, Holiday, Party, Price, Resort };
