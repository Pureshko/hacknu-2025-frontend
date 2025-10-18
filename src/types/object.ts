export type ObjectStatus = "new" | "verified" | "in_progress";
export type ObjectCategory = "luxury_glamping" | "family_guesthouse" | "ecotourism" | "ethno_yurt" | "mountain_house";
export type LeadPriority = "hot" | "warm" | "cold";

export interface TouristObject {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  category: ObjectCategory;
  contacts: {
    phone?: string;
    email?: string;
    whatsapp?: string;
    instagram?: string;
    telegram?: string;
  };
  website?: string;
  description: string;
  capacity: number;
  priceRange: {
    min: number;
    max: number;
  };
  photos: string[];
  rating?: number;
  reviewsCount?: number;
  infrastructure: string[];
  status: ObjectStatus;
  lastUpdated: string;
  
  // Analytics fields
  priorityScore: number;
  leadPriority: LeadPriority;
  activityScore: number;
  dataCompleteness: number;
  popularity: number;
  commercialPotential: number;
}

export const categoryLabels: Record<ObjectCategory, string> = {
  luxury_glamping: "Люкс глэмпинг",
  family_guesthouse: "Семейный дом",
  ecotourism: "Экотуризм",
  ethno_yurt: "Этно-туризм (юрта)",
  mountain_house: "Горный домик"
};

export const statusLabels: Record<ObjectStatus, string> = {
  new: "Новый",
  verified: "Проверен",
  in_progress: "В разработке"
};

export const priorityLabels: Record<LeadPriority, string> = {
  hot: "Горячий",
  warm: "Теплый",
  cold: "Холодный"
};
