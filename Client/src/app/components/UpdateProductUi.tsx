'use client';

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import type { Categorie, Product } from "@/lib/DatabaseTypes";


interface ProductWithRelations extends Product {
  extraImages?: string[];
  sizes?: string[];
  colors?: string[];
  prod_class?: string;
}

interface UpdateProductUiProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ownerId: string;
  categories: Categorie[];
  initialProduct: ProductWithRelations | null;
  onSubmit: (id: string, formData: FormData) => Promise<void>;
  loading: boolean;
}

export default function UpdateProductUi({
  open,
  onOpenChange,
  categories,
  ownerId ,
  initialProduct,
  onSubmit,
  loading,
}: UpdateProductUiProps) {

  const [name, setName] = useState('');
  const [smallDesc, setSmallDesc] = useState('');
  const [bigDesc, setBigDesc] = useState('');
  const [price, setPrice] = useState('');
  const [classification, setClassification] = useState('');
  const [available, setAvailable] = useState(true);

  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState('');

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [currentMainImage, setCurrentMainImage] = useState<string | null>(null);

  const [extraImages, setExtraImages] = useState<(File | null)[]>([null, null, null]);
  const [extraImagePreviews, setExtraImagePreviews] = useState<(string | null)[]>([null, null, null]);
  const [currentExtraImages, setCurrentExtraImages] = useState<string[]>([]);



  useEffect(() => {
    if (open && initialProduct) {
      setName(initialProduct.name ?? '');
      setSmallDesc(initialProduct.smallDesc ?? '');
      setBigDesc(initialProduct.bigDesc ?? '');
      setPrice(initialProduct.price ? String(initialProduct.price) : '');
      setClassification(initialProduct.prod_class ?? '');
      setAvailable(initialProduct.available ?? true);
      setSizes(initialProduct.sizes ?? []);
      setColors(initialProduct.colors ?? []);
      setCurrentMainImage(initialProduct.mainImage ?? null);
      setCurrentExtraImages(initialProduct.extraImages ?? []);
    }
  }, [open, initialProduct]);


  
  const resetForm = () => {
    setName('');
    setSmallDesc('');
    setBigDesc('');
    setPrice('');
    setClassification('');
    setAvailable(true);
    setMainImage(null);
    setMainImagePreview(null);
    setCurrentMainImage(null);
    setExtraImages([null, null, null]);
    setExtraImagePreviews([null, null, null]);
    setCurrentExtraImages([]);
    setSizes([]);
    setColors([]);
    setNewColor('');
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!initialProduct?.id) return;
    
    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('small_desc', smallDesc);
    // formData.append('big_desc', bigDesc);
    // formData.append('price', price);
    // formData.append('classification', classification);
    // formData.append('available', String(available));
    // formData.append('sizes', JSON.stringify(sizes));
    // formData.append('colors', JSON.stringify(colors));
    
    // if (mainImage) {
    //   formData.append('main_img', mainImage);
    // }
    
    // extraImages.forEach((image) => {
    //   if (image) {
    //     formData.append('extra_images', image);
    //   }
    // });

    // // Debug: Log FormData contents properly
    // console.log("product data:");
    // for (const [key, value] of formData.entries()) {
    //   console.log(`  ${key}:`, value);
    // }
    
      const data = {
      name: name,
      smallDesc: smallDesc,
      bigDesc: bigDesc, 
      price: parseFloat(price),
      prod_class: classification,
      sizes: sizes,
      colors: colors,
      owner: ownerId,
      mainImage: "dsfsdfsdfsdfsdf",
      extraImages: ["sdfsdfsdfs" , "dsfsfsdfsdf"],
    };
    await onSubmit(initialProduct.id, data);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  const toggleSize = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors([...colors, newColor.trim()]);
      setNewColor('');
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleMainImageChange = (file: File | undefined) => {
    setMainImage(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setMainImagePreview(null);
    }
  };

  const handleExtraImageChange = (index: number, file: File | undefined) => {
    const newImages = [...extraImages];
    newImages[index] = file || null;
    setExtraImages(newImages);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...extraImagePreviews];
        newPreviews[index] = reader.result as string;
        setExtraImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    } else {
      const newPreviews = [...extraImagePreviews];
      newPreviews[index] = null;
      setExtraImagePreviews(newPreviews);
    }
  };

  const removeMainImage = () => {
    setMainImage(null);
    setMainImagePreview(null);
  };

  const removeExtraImage = (index: number) => {
    const newImages = [...extraImages];
    newImages[index] = null;
    setExtraImages(newImages);

    const newPreviews = [...extraImagePreviews];
    newPreviews[index] = null;
    setExtraImagePreviews(newPreviews);
  };



  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="sm:max-w-250 p-12 overflow-y-auto">
        <form onSubmit={handleUpdateProduct}>
          <SheetHeader className={""}>
            <SheetTitle className={""} >Edit Product</SheetTitle>
            <SheetDescription className={""}>
              Make changes to the product below.
            </SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {/* Left Column - Main Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid gap-3">
                <Label className={""} htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label className={""} htmlFor="smallDesc">Short Description</Label>
                <Input
                  id="smallDesc"
                  value={smallDesc}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSmallDesc(e.target.value)}
                  placeholder="Brief product description"
                />
              </div>
              <div className="grid gap-3">
                <Label className={""} htmlFor="bigDesc">Full Description</Label>
                <textarea
                  id="bigDesc"
                  value={bigDesc}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBigDesc(e.target.value)}
                  placeholder="Detailed product description (optional)"
                  rows={4}
                  className="border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-3">
                <Label className={""} htmlFor="price">Price</Label>
                <Input
                  className={""}
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                />
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    className={""}
                    id="available"
                    checked={available}
                    onCheckedChange={(checked) => setAvailable(checked === true)}
                  />
                  <Label className={""} htmlFor="available">Available</Label>
                </div>
              
              </div>

              {/* <div className="grid gap-3">
                <Label className={""} htmlFor="mainImage">Main Product Image</Label>
                <Input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMainImageChange(e.target.files?.[0])}
                  className="cursor-pointer"
                />
                {mainImagePreview && (
                  <div className="relative w-fit">
                    <Image
                      width={400}
                      height={300}
                      src={mainImagePreview}
                      alt="Main image preview"
                      className="w-48 h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={removeMainImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {currentMainImage && !mainImagePreview && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Current:</p>
                    <Image
                      width={400}
                      height={128}
                      src={currentMainImage}
                      alt="Current main image"
                      className="w-48 h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-3">
                <Label className={""} >Extra Images (Up to 3)</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`extra-image-${index}`} className="text-sm text-muted-foreground">
                        Image {index + 1}
                      </Label>
                      <Input
                        id={`extra-image-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleExtraImageChange(index, e.target.files?.[0])}
                        className="cursor-pointer"
                      />
                      {extraImagePreviews[index] && (
                        <div className="relative">
                          <Image
                            width={400}
                            height={300}
                            src={extraImagePreviews[index] as string}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeExtraImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      {currentExtraImages[index] && !extraImagePreviews[index] && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Current:</p>
                          <Image
                            width={400}
                            height={128}
                            src={currentExtraImages[index]}
                            alt={`Current ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Classification/Category */}
              <div className="grid gap-3">
                <Label className={""} >Category</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="w-full justify-between cursor-pointer">
                      {classification
                        ? categories.find((cat) => cat.id === classification)?.name
                        : "Select category"}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator className={""} />
                    {categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat.id}
                        inset
                        className="cursor-pointer"
                        onClick={() => setClassification(cat.id)}
                      >
                        {cat.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Right Column - Sizes */}
            <div className="space-y-4">
              <div className="grid gap-3">
                <Label className={""}>Available Sizes</Label>
                <div className="border rounded-lg p-4 space-y-2 max-h-[500px] overflow-y-auto">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Clothing Sizes</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-2 cursor-pointer text-sm rounded border transition-colors ${
                            sizes.includes(size)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background hover:bg-accent border-border'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Shoe Sizes</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`px-3 cursor-pointer py-2 text-sm rounded border transition-colors ${
                            sizes.includes(size)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background hover:bg-accent border-border'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  {sizes.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium mb-2">Selected: {sizes.length} sizes</p>
                      <div className="flex flex-wrap gap-1">
                        {sizes.map((size) => (
                          <span key={size} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Colors Section */}
              <div className="grid gap-3">
                <Label className="">Product Colors</Label>
                <div className="border rounded-lg p-4 space-y-3">
                  {/* Add new color */}
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={newColor || '#000000'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewColor(e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      type="text"
                      placeholder="#000000"
                      value={newColor}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewColor(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      className={"cursor-pointer"}
                      variant="primary"
                      size="icon"
                      onClick={addColor}
                      disabled={!newColor.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Color list */}
                  {colors.length > 0 && (
                    <div className="space-y-2 pt-3 border-t">
                      <p className="text-sm font-medium text-muted-foreground">
                        Added Colors ({colors.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border"
                          >
                            <div
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-sm">{color}</span>
                            <button
                              type="button"
                              className="text-red-500 cursor-pointer hover:text-red-600"
                              onClick={() => removeColor(index)}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {colors.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      No colors added yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="space-y-2">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            {loading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Save changes</Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
