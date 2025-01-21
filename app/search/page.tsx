"use client";

import { client } from "@/sanity/lib/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  _id: string;
  imageUrl: string;
  productImage: {
    asset: {
      _ref: string;
    };
  };
  title: string;
  description: string;
  price: string;
  stockStatus: string;
}

const fetchProducts = async (query: string) => {
  const groqQuery = `*[_type == "product" && title match "${query}*"]{
    _id,
    "imageUrl": productImage.asset->url,
    title,
    description,
    price,
    stockStatus
    }`;
  const res = await client.fetch(groqQuery);
  return res;
};
const truncateDescription = (description:string)=>{
    return description.length > 100 ? description.substring(0,100) + "..." : description;
}
export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetchProducts(query)
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [query]);
const handleAddToCart = (item:{id:string; title:string; price:string})=>{
    console.log("Added to cart:", item);
}
  return (
    <div>
      <h1 className="font-bold text-2xl text-[#333333] ml-4 mb-4 mt-2">Search Results for &quot;{query}&quot;</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center">
          {products.length ? (
              products.map((product) => (
                <ProductCard
                key={product._id}
                imageUrl={product.imageUrl}
                title={product.title}
                description={truncateDescription(product.description)}
                price={`Rs ${product.price}`}
                stockStatus={product.stockStatus}
                onAddToCart={handleAddToCart}
                />
              ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
