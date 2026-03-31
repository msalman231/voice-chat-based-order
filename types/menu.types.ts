export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface Variation {
  id: string;
  name: string;
  price: number;
  is_default: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  category_name: string;
  sub_category: string;
  type: string;
  image: string;
  is_available: boolean;
  is_online_enabled: boolean;
  variations: Variation[];
  has_variations: boolean;
  has_addons: boolean;
}

export interface FormattedMenu {
  categories: Category[];
  items: MenuItem[];
}
