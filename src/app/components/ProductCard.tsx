'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { memo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart} from "lucide-react";

export const ProductCard = memo(function ProductCard({
  product,
  addToCart,
}: {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number; // crossed-out price
    currency?: string;
    discountPercent?: number;
    averageRating?: number;
    numOfReviews?: number;
  };
  addToCart: (id: string) => void;
}) {

  return (
    <Card className="h-full w-full mx-auto overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/productdetails/${product.id}`} className="block">
        <CardHeader className="p-0 relative">
          {/* Product Image */}
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-38 object-contain"
            width={400}
            height={300}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {typeof product.discountPercent === "number" && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 text-xs font-semibold"
            >
              %{product.discountPercent}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-4 space-y-1">

         

          <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>

          <div className="flex items-center">
            <span className="text-lg font-bold text-primary">
              {product.price} {"Dz"}   
            </span>
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice}
              </span>
          </div>
        </CardContent>
      </Link>

      <div className="px-4 flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          className="flex-1 bg-primary hover:bg-primary/20"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
          
            addToCart(product.id);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to cart
        </Button>


      </div>
    </Card>
  );
});

export default ProductCard;
