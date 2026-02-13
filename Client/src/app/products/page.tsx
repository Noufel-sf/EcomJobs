'use client';

import { useState, useMemo, memo,  useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { ProductDisplay } from "@/lib/DatabaseTypes";
import { useAddToCartMutation } from "@/Redux/Services/CartApi";
import { useGetAllProductsQuery, useGetCategoriesQuery } from "@/Redux/Services/ProductsApi";
import toast from "react-hot-toast";


import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



import hero1 from "@assets/hero1.png";
import hero2 from "@assets/hero2.png";
import hero3 from "@assets/hero3.png";
import hero4 from "@assets/hero4.png";
import { useGetAllClassificationsQuery } from "@/Redux/Services/ClassificationApi";

const ITEMS_PER_PAGE = 8;

function AllProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange] = useState([0, 1000000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const heroImages = [hero1, hero2, hero3, hero4];

  // RTK Query hooks
  const { data: productsData, isLoading } = useGetAllProductsQuery(undefined);
  const { data: categoriesData } = useGetAllClassificationsQuery(undefined);
  console.log("categories" , categoriesData);
  
  const [addToCartMutation] = useAddToCartMutation();

  const products = productsData?.content || [];
  const categories = categoriesData?.content || [];
  
  const addToCart = useCallback((id: string) => {
    addToCartMutation(id)
      .unwrap()
      .then(() => {
        toast.success("Added to cart");
      })
      .catch((error: any) => {
        toast.error(error?.data?.message || "Failed to add to cart");
      });
  }, [addToCartMutation]);




  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= (priceRange[0] ?? 0) && product.price <= (priceRange[1] ?? 1000000),
    );

    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }


    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "newest":
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategories, priceRange, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange, searchQuery, sortBy]);

  const handleCategoryToggle = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSearchQuery("");
    setSortBy("featured");
  }, []);

  const FilterSidebar = () => (
    <div className="space-y-6 px-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-sm font-semibold mb-2 block">
          Search Products
        </Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className=""
          aria-label="Search products by name"
        />
      </div>

      <Separator className="" />

      {/* Categories */}
      <fieldset className="px-6 lg:px-0" aria-label="Product categories">
        <div className="flex items-center justify-between mb-3">
          <legend className="text-sm font-semibold">Categories</legend>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategories([])}
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => handleCategoryToggle(category.name)}
                className=""
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm flex-1 cursor-pointer flex items-center justify-between"
              >
                <span>{category.name}</span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <Separator className="" />

      {/* Clear All Filters */}
      <Button
        variant="primary"
        size="sm"
        onClick={clearFilters}
        className="w-full"
      >
        <X className="w-4 h-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <main>
      {/* Hero Ad Section */}
      <section className="px-4 sm:px-6 py-6 sm:py-12 mx-auto container flex items-stretch gap-5 min-h-[300px] sm:min-h-[500px]" aria-label="Promotional banners">
        <Swiper
          navigation={{
            prevEl: ".custom-prev-all",
            nextEl: ".custom-next-all",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper rounded-sm shadow-lg flex-1"
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`Promotional banner ${index + 1}`}
                className="w-full h-full cursor-pointer object-cover"
                width={1200}
                height={500}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </SwiperSlide>
          ))}

          <button
            className="custom-prev-all absolute cursor-pointer left-4 top-1/2 z-20 -translate-y-1/2 bg-white dark:bg-zinc-800 shadow-md p-2 rounded-full text-xl hover:bg-red-500 hover:text-white transition"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>

          <button
            className="custom-next-all cursor-pointer absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white dark:bg-zinc-800 shadow-md p-2 rounded-full text-xl hover:bg-red-500 hover:text-white transition"
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>
        </Swiper>
        <div className="hidden lg:flex max-w-[20%] items-center cursor-pointer">
          <Image
            src="/sp2.png"
            alt="Sponsored advertisement"
              width={400}
              height={500}  
            className="w-full h-full object-cover rounded-sm shadow-lg"
            loading="lazy"
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0" aria-label="Product filters">
            <div className="sticky top-4 bg-card border rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5" aria-hidden="true" />
                <h2 className="text-lg font-bold">Filters</h2>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Products Section */}
          <section className="flex-1 min-w-0" aria-label="Products listing">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                  All Products
                </h1>
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedProducts.length} of{" "}
                  {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-2 ">
                {/* Mobile Filter Button */}
                <Sheet
                  open={mobileFiltersOpen}
                  onOpenChange={setMobileFiltersOpen}
                >
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden" size="" aria-label="Open filters menu">
                      <SlidersHorizontal className="w-4 h-4 mr-2" aria-hidden="true" />
                      Filters
                      {(selectedCategories.length > 0 || searchQuery) && (
                        <Badge
                          variant="destructive"
                          className="ml-2 px-1.5 py-0.5 text-xs"
                          aria-label={`${selectedCategories.length + (searchQuery ? 1 : 0)} active filters`}
                        >
                          {selectedCategories.length + (searchQuery ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader className="">
                      <SheetTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" aria-hidden="true" />
                        Filters
                      </SheetTitle>
                      <SheetDescription className="">
                        Filter products by category, price, and more
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]" aria-label="Sort products by">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="featured" className="">Featured</SelectItem>
                    <SelectItem value="newest" className="">Newest</SelectItem>
                    <SelectItem value="price-asc" className="">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc" className="">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating" className="">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </header>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6" role="region" aria-label="Active filters">
                <span className="text-sm font-medium" id="active-filters-label">Active filters:</span>
                <div className="flex flex-wrap gap-2" aria-labelledby="active-filters-label">
                  {selectedCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary transition duration-300"
                      onClick={() => handleCategoryToggle(category)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCategoryToggle(category);
                        }
                      }}
                      aria-label={`Remove ${category} filter`}
                    >
                      {category}
                      <X className="w-3 h-3 ml-1" aria-hidden="true" />
                    </Badge>
                  ))}
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition duration-200"
                      onClick={() => setSearchQuery("")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSearchQuery("");
                        }
                      }}
                      aria-label="Remove search filter"
                    >
                      Search: "{searchQuery}"
                      <X className="w-3 h-3 ml-1" aria-hidden="true" />
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-auto p-0 text-xs"
                    aria-label="Clear all filters"
                  >
                    Clear all
                  </Button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="status" aria-label="Loading products">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <ProductCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" role="list" aria-label={`Showing ${paginatedProducts.length} products`}>
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16" role="status" aria-live="polite">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4" aria-hidden="true">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={clearFilters} variant="" className="" size="" type="button">Clear all filters</Button>
              </div>
            )}

            {/* Pagination */}
            {paginatedProducts.length > 0 && (
              <nav aria-label="Products pagination">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </nav>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default memo(AllProductsPage);
