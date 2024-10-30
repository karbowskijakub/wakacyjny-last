export interface Post {
    id: number;
    holidayImage: string; // Assuming this is a base64 string
    hotelRating: number;
    travelAgencyOpinions: number;
    tripAdvisorOpinions: number;
    googleOpinions: number;
    url: string;
    cityOfDeparture: string;
    numberOfPerson: number;
    price: number;
    travelAgency: string;
    regionHolidaysName: string;
    cityHolidaysName: string;
    countryHolidaysName: string;
    hotelHolidaysName: string;
    food: string;
    isPremium: boolean;
    dateOffer: string; // or Date, depending on your response structure
    startDate: string; // or Date
    endDate: string; 
    comments: string;
    userId: string; 
  }
  