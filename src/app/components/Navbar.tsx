'use client';

import { memo, useEffect, useState } from "react";
import { Moon, Sun, Search, ShoppingCart, User, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";
import Api from "@/lib/Api";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface ListItemProps {
  title: string;
  children: React.ReactNode;
  href: string;
}

function ListItem({ title, children, href }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild className="">
        <Link href={href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <div className="text-sm font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

const Navbar = memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();
  const [categories, setCategories] = useState<any[]>([]);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const fetchCategories = async () => {
    try {
      const { data } = await Api.get("/category");
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }

    try {
      const { data } = await Api.get(`/product/search?name=${value}`);
      setSearchResults(data.products || []);
      setSearchOpen(true);
    } catch (error: any) {
      setSearchResults([]);
      setSearchOpen(true);
      toast.error(error?.response?.data?.message || "Search failed");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" aria-label="Go to homepage">
            <Image src="/logo.png" alt="ShoppingJobs Logo" className="h-10 w-auto" width={120} height={40} />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:block w-full max-w-md relative">
          <label htmlFor="product-search" className="sr-only">Search products</label>
          <input
            id="product-search"
            type="search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-expanded={searchOpen}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg" aria-hidden="true" />

          {/* Search Dropdown */}
          {searchOpen && (
            <div 
              id="search-results"
              className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-zinc-900 border border-border rounded-md shadow-md z-50 max-h-96 overflow-y-auto"
              role="listbox"
              aria-label="Search results"
            >
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => {
                      setSearchTerm("");
                      setSearchOpen(false);
                    }}
                    role="option"
                  >
                    <Image
                      src={product.image}
                      alt=""
                      className="w-10 h-10 object-contain"
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {product.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground" role="status">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <div className="flex">
              <NavigationMenu className="">
                <NavigationMenuList className="">
                  <Link href="/about" className="mx-2">
                    <span className="font-semibold cursor-pointer capitalize hover:text-primary transition-colors">
                      About Us
                    </span>
                  </Link>
                  <Link href="/help" className="mx-2">
                    <span className="font-semibold cursor-pointer capitalize hover:text-primary transition-colors">
                      Help Center
                    </span>
                  </Link>
                  <NavigationMenuItem className="">
                    <NavigationMenuTrigger className="text-base px-3 mx-2 cursor-pointer bg-transparent hover:text-purple-700 dark:hover:text-purple-300">
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="">
                      <ul className="grid md:w-[400px] md:grid-cols-2 gap-3 p-4">
                        {categories.map((category) => (
                          <ListItem
                            key={category.title}
                            title={category.title}
                            href={category.href}
                          >
                            {category.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="text-base border-none cursor-pointer"
                      variant="outline"
                      size="default"
                      aria-label="User account menu"
                    >
                      <User className="text-sm" aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white dark:bg-zinc-900 shadow-lg border border-border rounded-md"
                  >
                    <Link href="/my-account">
                      <DropdownMenuItem className="cursor-pointer" inset={false}>
                        My Account
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="cursor-pointer hover:text-red-400 transition duration-300"
                      onClick={logout}
                      inset={false}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="text-base border-none cursor-pointer"
                      variant="outline"
                      size="default"
                      aria-label="Account options"
                    >
                      My Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white dark:bg-zinc-900 shadow-lg border border-border rounded-md"
                  >
                    <Link href="/login">
                      <DropdownMenuItem className="cursor-pointer" inset={false}>
                        Login
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem className="cursor-pointer" inset={false}>
                        Register
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          {/* Icons */}
          <Link href="/cart" className="relative" aria-label={`Shopping cart with ${totalItems} items`}>
            <Button variant="ghost" size="icon" className="">
              <ShoppingCart className="text-xl" aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" aria-label={`${totalItems} items in cart`}>
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Theme Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-zinc-900 shadow-lg border border-border rounded-md"
            >
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTheme("light")}
                inset={false}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTheme("dark")}
                inset={false}
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTheme("system")}
                inset={false}
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu For Mobile */}
          <Button
            variant="ghost"
            size="default"
            className="block md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            <Menu aria-hidden="true" />
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 py-3 pb-4 flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in duration-200 shadow-sm border-t border-border">
          <div className="flex flex-col gap-1">
            <div className="px-3 py-1 text-sm font-semibold text-muted-foreground">
              Categories
            </div>
            {categories.map((category) => (
              <Button
                key={category.title}
                variant="ghost"
                size="default"
                className="justify-start px-3 w-full text-left"
                onClick={() => setIsOpen(false)}
              >
                <Link href={category.href} className="flex flex-col w-full">
                  <span className="text-base font-medium text-zinc-900 dark:text-white">
                    {category.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {category.description}
                  </span>
                </Link>
              </Button>
            ))}
          </div>

          <hr className="my-2" />

          <div className="flex flex-col gap-1">
            <div className="px-3 py-1 text-sm font-semibold text-muted-foreground">
              My Account
            </div>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="default"
                  className="justify-start px-3 w-full text-left"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/my-account" className="flex flex-col w-full">
                    <span className="text-base font-medium text-zinc-900 dark:text-white">
                      My Account
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Access your orders, wishlist, and more.
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  className="justify-start px-3 w-full text-left"
                  onClick={logout}
                >
                  <span className="text-base font-medium text-zinc-900 dark:text-white">
                    Logout
                  </span>
                </Button>
                <Link href="/about" className="px-3 py-2">
                  <span className="font-semibold cursor-pointer capitalize hover:text-primary transition-colors">
                    About Us
                  </span>
                </Link>
                <Link href="/help" className="px-3 py-2">
                  <span className="font-semibold cursor-pointer capitalize hover:text-primary transition-colors">
                    Help Center
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="default"
                  className="justify-start px-3 w-full text-left"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/login" className="flex flex-col w-full">
                    <span className="text-base font-medium text-zinc-900 dark:text-white">
                      Login
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Access your orders, wishlist, and more.
                    </span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="default"
                  className="justify-start px-3 w-full text-left"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/register" className="flex flex-col w-full">
                    <span className="text-base font-medium text-zinc-900 dark:text-white">
                      Register
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Create a new account to start shopping.
                    </span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
});

export default Navbar;
