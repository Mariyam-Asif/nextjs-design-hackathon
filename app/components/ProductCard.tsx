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

  return (
    <article className="relative flex flex-col items-start group">
      <div className="w-full lg:w-[260px] h-[250px] lg:h-[300px] overflow-hidden relative">
        <Link
          href={`/shop/${slug}`}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded"
        >
          <Image
            src={imageUrl}
            alt={title}
            width={305}
            height={375}
            className="img"
          />
        </Link>
        {discountPercentage && (
          <div className="absolute top-6 right-6 bg-[#E97171] text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-medium">
            {discountPercentage}
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute top-6 left-6 bg-red-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-xs">
            Out of Stock
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-6 left-6 bg-amber-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow-xs">
            Low Stock
          </div>
        )}
      </div>
      <div className="bg-[#F4F5F7] p-3 lg:p-4 w-full lg:w-[260px]">
        <Link
          href={`/shop/${slug}`}
          className="font-semibold text-xl text-[#3A3A3A] hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded inline-block"
        >
          {title}
        </Link>
        <p className="font-medium text-sm text-[#898989]">{description}</p>
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

      {/* Hover section with add to cart button - now keyboard accessible via focus-within */}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full lg:w-[260px] flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 group-focus-within:opacity-80 transition-opacity duration-300 bg-[#3A3A3A] p-4 space-y-3 z-10">
        <button
          className={`font-semibold text-base px-7 py-3 transition-transform duration-300 ease-in-out transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3A3A3A] rounded ${
            stockStatus === 'outOfStock'
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-white text-[#B88E2F] hover:scale-x-105 hover:bg-[#B88E2F] hover:text-white hover:scale-105'
          }`}
          onClick={handleAddToCart}
          disabled={stockStatus === 'outOfStock'}
          aria-label={stockStatus === 'outOfStock' ? `${title} is out of stock` : `Add ${title} to cart`}
        >
          {stockStatus === 'outOfStock' ? 'Out of Stock' : 'Add To Cart'}
        </button>
        <div className="flex flex-row gap-5 text-white">
          <button
            className="flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3A3A3A] rounded px-2 py-1"
            aria-label={`Share ${title}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Share functionality placeholder
            }}
          >
            <Image src={share} alt="" className="w-4 h-4" aria-hidden="true" />
            <span className="text-base font-semibold">
              Share
            </span>
          </button>
          <button
            className={`flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3A3A3A] rounded px-2 py-1 ${
              isCompared ? 'text-[#B88E2F]' : 'text-white'
            }`}
            aria-label={isCompared ? `Remove ${title} from comparison` : `Compare ${title}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleComparison(id, title);
            }}
          >
            <Image src={compare} alt="" className="w-4 h-4" aria-hidden="true" />
            <span className="text-base font-semibold">
              {isCompared ? 'Compared' : 'Compare'}
            </span>
          </button>
          <button
            className={`flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3A3A3A] rounded px-2 py-1 ${
              isWishlisted ? 'text-[#E97171]' : 'text-white'
            }`}
            aria-label={isWishlisted ? `Remove ${title} from wishlist` : `Like ${title}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(id, title);
            }}
          >
            <Image src={like} alt="" className="w-4 h-4" aria-hidden="true" />
            <span className="text-base font-semibold">{isWishlisted ? 'Liked' : 'Like'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
