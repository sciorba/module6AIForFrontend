import type { Product } from "../types/product";

export const products: Product[] = [
  { id: "1", name: "Wireless Headphones", description: "Premium noise-cancelling over-ear headphones.", price: 249.99, category: "electronics", rating: 4.5, inStock: true },
  { id: "2", name: "Running Shoes", description: "Lightweight performance running shoes.", price: 89.99, category: "sports", rating: 4.2, inStock: true },
  { id: "3", name: "Cotton T-Shirt", description: "Soft cotton blend casual t-shirt.", price: 19.99, category: "clothing", rating: 3.8, inStock: true },
  { id: "4", name: "Smart Home Hub", description: "Central hub for all your smart devices.", price: 129.99, category: "electronics", rating: 4.0, inStock: false },
  { id: "5", name: "Desk Lamp", description: "Adjustable LED desk lamp with dimmer.", price: 34.99, category: "home", rating: 4.3, inStock: true },
  { id: "6", name: "Yoga Mat", description: "Non-slip premium yoga mat.", price: 29.99, category: "sports", rating: 4.6, inStock: true },
  { id: "7", name: "Winter Jacket", description: "Warm insulated winter jacket.", price: 149.99, category: "clothing", rating: 4.1, inStock: true },
  { id: "8", name: "Bluetooth Speaker", description: "Portable waterproof bluetooth speaker.", price: 59.99, category: "electronics", rating: 4.4, inStock: true },
  { id: "9", name: "Bookshelf", description: "Modern 5-tier wooden bookshelf.", price: 79.99, category: "home", rating: 3.9, inStock: true },
  { id: "10", name: "Science Fiction Novel", description: "Bestselling sci-fi adventure novel.", price: 14.99, category: "books", rating: 4.7, inStock: true },
  { id: "11", name: "Fitness Tracker", description: "Waterproof fitness tracker with heart rate.", price: 49.99, category: "electronics", rating: 4.1, inStock: true },
  { id: "12", name: "Throw Pillow Set", description: "Decorative throw pillow set of 2.", price: 24.99, category: "home", rating: 4.0, inStock: true },
  { id: "13", name: "Programming Guide", description: "Comprehensive TypeScript programming guide.", price: 39.99, category: "books", rating: 4.8, inStock: true },
  { id: "14", name: "Tennis Racket", description: "Professional grade tennis racket.", price: 119.99, category: "sports", rating: 4.3, inStock: false },
  { id: "15", name: "Silk Scarf", description: "Elegant silk scarf with floral print.", price: 44.99, category: "clothing", rating: 4.5, inStock: true },
  { id: "16", name: "USB-C Hub", description: "7-in-1 USB-C adapter hub.", price: 34.99, category: "electronics", rating: 3.5, inStock: true },
];

export const ITEMS_PER_PAGE = 6;
