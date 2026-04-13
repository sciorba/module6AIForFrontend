import { Link } from "react-router-dom";
import { ProductCard } from "../modules/module-1/exercise-1/components/features";
import type { Product } from "../modules/module-1/exercise-1/types/product";

const sampleProducts: { product: Product; label: string }[] = [
  {
    label: "Standard Product",
    product: {
      id: "1",
      name: "Wireless Noise-Cancelling Headphones",
      description:
        "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and comfortable memory foam ear cushions.",
      price: 249.99,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 2847,
      category: "Electronics",
      inStock: true,
    },
  },
  {
    label: "Perfect 5-Star Rating",
    product: {
      id: "2",
      name: "Ergonomic Mechanical Keyboard",
      description:
        "Split-layout mechanical keyboard with hot-swappable switches, RGB backlighting, and programmable macros for developers.",
      price: 189.0,
      imageUrl:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      rating: 5,
      reviewCount: 1203,
      category: "Accessories",
      inStock: true,
    },
  },
  {
    label: "Out of Stock",
    product: {
      id: "3",
      name: "Ultra-Wide Curved Monitor",
      description:
        "34-inch ultra-wide QHD curved monitor with 144Hz refresh rate, HDR400, and USB-C connectivity.",
      price: 599.99,
      imageUrl:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      rating: 4,
      reviewCount: 456,
      category: "Monitors",
      inStock: false,
    },
  },
  {
    label: "No Image (Fallback)",
    product: {
      id: "4",
      name: "USB-C Hub Adapter",
      description:
        "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and 100W power delivery pass-through.",
      price: 34.99,
      rating: 3.5,
      reviewCount: 892,
      category: "Accessories",
      inStock: true,
    },
  },
  {
    label: "Low Rating / Budget Item",
    product: {
      id: "5",
      name: "Basic Wired Mouse",
      description: "Simple plug-and-play USB wired mouse with optical sensor.",
      price: 7.99,
      imageUrl:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 2.5,
      reviewCount: 34,
      category: "Accessories",
      inStock: true,
    },
  },
  {
    label: "Long Title & Description (Truncation)",
    product: {
      id: "6",
      name: "Professional Studio Reference Monitor Speakers with Bluetooth 5.0 Connectivity",
      description:
        "High-fidelity bi-amplified studio monitors featuring 5-inch Kevlar woofers, 1-inch silk dome tweeters, room correction DSP, and multiple input options including XLR, TRS, and RCA. Perfect for music production, mixing, and mastering.",
      price: 449.0,
      imageUrl:
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
      rating: 4,
      reviewCount: 178,
      category: "Audio",
      inStock: true,
    },
  },
];

export default function Module1Exercise1() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6"
        >
          &larr; Back to modules
        </Link>

        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Module 1 &mdash; Exercise 1: ProductCard
          </h1>
          <p className="mt-2 text-gray-500">
            E-commerce product card component showcasing different states and
            configurations
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleProducts.map(({ product, label }) => (
            <section key={product.id}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
              </h2>
              <ProductCard
                product={product}
                onAddToCart={(id) => console.log("Add to cart", id)}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
