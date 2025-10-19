export interface Accommodation {
  id: number;
  name: string;
  accommodation_type: string;
  region: string;
  address: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  telegram?: string;
  whatsapp?: string;
  description?: string;
  ai_generated_description?: string;
  priority_score: number;
  lead_status: 'hot' | 'warm' | 'cold';
  rating?: number;
  review_count?: number;
  price_min?: number;
  price_max?: number;
  photos?: string[];
  amenities?: string[];
  data_sources?: string[];
  online_activity_score?: number;
  data_completeness_score?: number;
  popularity_score?: number;
  commercial_potential_score?: number;
  created_at?: string;
}

export interface AccommodationListResponse {
  total: number;
  skip: number;
  limit: number;
  items: Accommodation[];
}

export interface DashboardStats {
  total_accommodations: number;
  hot_leads: number;
  average_priority_score: number;
  by_region: Record<string, number>;
  by_type: Record<string, number>;
}