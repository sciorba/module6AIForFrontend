import type { ProductCardProps } from "../../types/product";
import { ProductImage } from "../ui/ProductImage";
import { RatingStars } from "../ui/RatingStars";
import { formatPrice } from "../../lib/format";

export function ProductCard({ product, onAddToCart, className = "" }: ProductCardProps) {
  return (
    <article
      aria-label={`Product: ${product.name}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      {/* Product image */}
      <div className="aspect-square overflow-hidden">
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category badge */}
        <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-3">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        {/* Price + Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span
            className="text-xl font-bold text-gray-900"
            aria-label={`Price: ${formatPrice(product.price)}`}
          >
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => onAddToCart?.(product.id)}
            disabled={!product.inStock}
            aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is out of stock`}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </article>
  );
}
