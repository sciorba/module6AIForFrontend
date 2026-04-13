export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  category: string;
  inStock: boolean;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  className?: string;
}
