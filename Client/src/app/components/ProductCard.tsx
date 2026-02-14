'use client';

import Link from "next/link";
import Image from "next/image";
import { memo, useTransition } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import type { Product } from "@/lib/DatabaseTypes";

export const ProductCard = memo(function ProductCard({
  product,
  // addToCart,
}: {
  product: Product;
  addToCart: (product: { id: string; name: string; image: string; price: number }) => void | Promise<void>;
}) {
  // const [isPending, startTransition] = useTransition();

  // const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   startTransition(async () => {
  //     await addToCart({ id: product.id, name: product.name, image: product.mainImage, price: product.price  });
  //   });
  // };

  return (
    <Card className="h-full border-0 w-full mx-auto overflow-hidden shadow-none">
      <Link href={`/productdetails/${product.id}`} className="block">
        <CardHeader className="p-0 relative">
          {/* Product Image */}
          <Image
            src={product.mainImage}
            alt={product.mainImage}
            className="w-full h-38 object-contain"
            width={400}
            height={300}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </CardHeader>

        <CardContent className="p-4 space-y-1">

        
          <h3 className="text-sm font-medium line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-500 truncate text-sm">
            {product.smallDesc}
          </p>

          <div className="flex items-center">
            <span className="text-lg font-bold text-primary">
              {product.price} {"Dz"}   
            </span>
             
          </div>
        </CardContent>
      </Link>

      <div className="px-4 flex items-center w-full  gap-2">
        <Link href={`/productdetails/${product.id}`} className="w-full">
        <Button
          variant="default"
          size="sm"
          className="flex-1 bg-primary w-full hover:bg-primary/20"
          disabled={false}
        >
         view details
        </Button>
        </Link>


      </div>
    </Card>
  );
});

export default ProductCard;
