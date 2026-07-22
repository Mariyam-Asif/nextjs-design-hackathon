import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import share from "@/public/share-icon.svg";
import compare from "@/public/compare-icon.svg";
import like from "@/public/like-icon.svg";
import { useWishlist } from "../contexts/WishlistContext";
import { useComparison } from "../contexts/ComparisonContext";


interface ProductCardProps {
  id: string;
  slug: string;
  imageUrl: StaticImageData | string;
  title: string;
  description: string;
  price: string;
  currency: string;
  oldPrice?: string;
  discountPercentage?: string;
  stockStatus: string;
  stockQuantity?: number;
  onAddToCart: (item: { id: string; title: string; price: string; currency: string; imageUrl: string; stockQuantity?: number; stockStatus?: string }) => void;
}
const ProductCard = ({
  id,
  slug,
  imageUrl,
  title,
  description,
  price,
  currency,
  oldPrice,
  discountPercentage,
  stockStatus,
  stockQuantity,
  onAddToCart,
}: ProductCardProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleComparison, isInComparison } = useComparison();

  const isWishlisted = isInWishlist(id);
  const isCompared = isInComparison(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent adding out of stock items
    if (stockStatus === 'outOfStock') {
      return;
    }

    onAddToCart({
      id,
      title,
      price,
      currency,
      imageUrl: typeof imageUrl === 'string' ? imageUrl : imageUrl.src,
      stockQuantity,
      stockStatus,
    });
  };
  const isLowStock = stockStatus === "lowStock" || (stockQuantity !== undefined && stockQuantity > 0 && stockQuantity <= 5);
  const isOutOfStock = stockStatus === "outOfStock" || stockQuantity === 0;

  const stockTitle = isOutOfStock
    ? "Out of Stock"
    : isLowStock
      ? (stockQuantity ? `Only ${stockQuantity} left` : "Low Stock")
      : "In Stock";

  const targetSlug = typeof slug === 'string' && slug.trim() !== '' && slug !== '[object Object]' ? slug : id;

  return (
    <article className="relative flex flex-col items-start group rounded-lg overflow-hidden">
      {/* Background card link */}
      <Link
        href={`/shop/${targetSlug}`}
        className="absolute inset-0 z-0"
        aria-label={`View details for ${title}`}
      />

      <div className="w-full lg:w-[260px] h-[250px] lg:h-[300px] overflow-hidden relative pointer-events-none">
        <Image
          src={imageUrl}
          alt={title}
          width={305}
          height={375}
          className="img"
        />
        {discountPercentage && (
          <div className="absolute top-6 right-6 bg-[#E97171] text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium z-1">
            {discountPercentage}
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute top-6 left-6 bg-red-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-xs z-1">
            Out of Stock
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-6 left-6 bg-amber-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow-xs z-1">
            Low Stock
          </div>
        )}
      </div>

      <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[260px] pointer-events-none">
        <h3 className="font-semibold text-xl text-[#3A3A3A] group-hover:text-[#B88E2F] transition-colors">
          {title}
        </h3>
        <p className="font-medium text-sm text-[#898989] truncate">{description}</p>
        <div className="flex flex-row justify-between items-center mt-2">
          <div className="flex flex-row gap-2 items-center">
            <p className="font-semibold text-lg text-[#3A3A3A]">{currency} {price}</p>
            {oldPrice && (
              <p className="text-[#B0B0B0] text-sm font-normal line-through">
                {currency} {oldPrice}
              </p>
            )}
          </div>
          <p
            className={`text-xs font-semibold ${isOutOfStock ? "text-red-500" : isLowStock ? "text-amber-600" : "text-emerald-600"}`}
          >
            {stockTitle}
          </p>
        </div>
      </div>

      {/* Hover overlay section */}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[260px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-90 group-focus-within:opacity-90 transition-opacity duration-300 bg-[#3A3A3A]/85 p-4 space-y-3 z-10">
        {/* Clickable overlay backdrop */}
        <Link
          href={`/shop/${targetSlug}`}
          className="absolute inset-0 z-0 cursor-pointer"
          aria-label={`View ${title} product page`}
        />

        <Link
          href={`/shop/${targetSlug}`}
          className="relative z-10 font-semibold text-sm px-6 py-2.5 bg-[#B88E2F] text-white hover:bg-[#a87726] rounded transition-all duration-300 transform hover:scale-105 shadow-md text-center w-3/4"
        >
          View Details
        </Link>

        <button
          className={`relative z-10 font-semibold text-sm px-6 py-2.5 transition-all duration-300 transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded w-3/4 ${
            stockStatus === 'outOfStock'
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-white text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white hover:scale-105 shadow-md'
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart(e);
          }}
          disabled={stockStatus === 'outOfStock'}
          aria-label={stockStatus === 'outOfStock' ? `${title} is out of stock` : `Add ${title} to cart`}
        >
          {stockStatus === 'outOfStock' ? 'Out of Stock' : 'Add To Cart'}
        </button>

        <div className="relative z-10 flex flex-row gap-4 text-white pt-1">
          <button
            className="flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-2 py-1 hover:text-[#B88E2F] transition-colors"
            aria-label={`Share ${title}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Image src={share} alt="" className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-semibold">Share</span>
          </button>

          <button
            className={`flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-2 py-1 transition-colors ${
              isCompared ? 'text-[#B88E2F]' : 'hover:text-[#B88E2F]'
            }`}
            aria-label={isCompared ? `Remove ${title} from comparison` : `Compare ${title}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleComparison(id, title);
            }}
          >
            <Image src={compare} alt="" className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-semibold">{isCompared ? 'Compared' : 'Compare'}</span>
          </button>

          <button
            className={`flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-2 py-1 transition-colors ${
              isWishlisted ? 'text-[#E97171]' : 'hover:text-[#E97171]'
            }`}
            aria-label={isWishlisted ? `Remove ${title} from wishlist` : `Like ${title}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(id, title);
            }}
          >
            <Image src={like} alt="" className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-semibold">{isWishlisted ? 'Liked' : 'Like'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
