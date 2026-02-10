"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import type { Categorie } from "@/lib/DatabaseTypes";

interface CreateProductUiProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Categorie[];
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
}

export default function CreateProductUi({
  open,
  onOpenChange,
  categories,
  onSubmit,
  loading,
}: CreateProductUiProps) {
  // Internal state management - matching database Product schema
  const [name, setName] = useState("");
  const [ownerId, setOwnerId] = useState("019c4452-fa9c-7786-8914-d7292191dcd8"); // This will be set to the current seller's ID in the parent component  
  const [smallDesc, setSmallDesc] = useState("");
  const [bigDesc, setBigDesc] = useState("");
  const [price, setPrice] = useState("");
  const [classification, setClassification] = useState("");
  const [available, setAvailable] = useState(true);
  const [sponsored, setSponsored] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [extraImages, setExtraImages] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [extraImagePreviews, setExtraImagePreviews] = useState<
    (string | null)[]
  >([null, null, null]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState("");

  const resetForm = () => {
    setName("");
    setSmallDesc("");
    setBigDesc("");
    setPrice("");
    setClassification("");
    setAvailable(true);
    setSponsored(false);
    setMainImage(null);
    setMainImagePreview(null);
    setExtraImages([null, null, null]);
    setExtraImagePreviews([null, null, null]);
    setSizes([]);
    setColors([]);
    setNewColor("");
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("smallDesc", smallDesc);
    formData.append("bigDesc", bigDesc);
    formData.append("price", price);
    formData.append("prod_class", classification);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("colors", JSON.stringify(colors));
    formData.append("owner", ownerId);

    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    extraImages.forEach((image) => {
      if (image) {
        formData.append("extraImages", image);
      }
    });

    console.log("product data:");
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value);
    }

    await onSubmit(formData);
    resetForm();
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  const toggleSize = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors([...colors, newColor.trim()]);
      setNewColor("");
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="" variant="primary" size="sm">
          Create a new product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleCreateProduct}>
          <DialogHeader className="">
            <DialogTitle className="">Create Product</DialogTitle>
            <DialogDescription className="mb-3">
              Create a new product. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid gap-3">
                <Label className="" htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label className="" htmlFor="smallDesc">Short Description</Label>
                <Input
                  id="smallDesc"
                  value={smallDesc}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSmallDesc(e.target.value)
                  }
                  placeholder="Brief product description"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label className="" htmlFor="bigDesc">Full Description</Label>
                <textarea
                  id="bigDesc"
                  value={bigDesc}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setBigDesc(e.target.value)
                  }
                  placeholder="Detailed product description (optional)"
                  rows={4}
                  className="border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-3">
                <Label className="" htmlFor="price">Price</Label>
                <Input
                  className={""}
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPrice(e.target.value)
                  }
                  required
                />
              </div>

              {/* Toggles for available and sponsored */}
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    className={""}
                    id="available"
                    checked={available}
                    onCheckedChange={(checked) =>
                      setAvailable(checked === true)
                    }
                  />
                  <Label htmlFor="available">Available</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="sponsored"
                    className=""
                    checked={sponsored}
                    onCheckedChange={(checked) =>
                      setSponsored(checked === true)
                    }
                  />
                  <Label className="" htmlFor="sponsored">Sponsored</Label>
                </div>
              </div>

              {/* Main Image */}
              <div className="grid gap-3">
                <Label className="" htmlFor="mainImage">Main Product Image</Label>
                <Input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleMainImageChange(e.target.files?.[0])
                  }
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
              </div>

              <div className="grid gap-3">
                <Label className="">Extra Images (Up to 3)</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="space-y-2">
                      <Label
                        htmlFor={`extra-image-${index}`}
                        className="text-sm text-muted-foreground"
                      >
                        Image {index + 1}
                      </Label>
                      <Input
                        id={`extra-image-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleExtraImageChange(index, e.target.files?.[0])
                        }
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Classification/Category */}
              <div className="grid gap-3">
                <Label className="">Category</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between cursor-pointer"
                    >
                      {classification
                        ? categories.find((cat) => cat.id === classification)
                            ?.name
                        : "Select category"}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className="" inset={true}>
                      Categories
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="" />
                    {categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat.id}
                        className="cursor-pointer"
                        inset={true}
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
                <Label className="">Available Sizes</Label>
                <div className="border rounded-lg p-4 space-y-2 max-h-[500px] overflow-y-auto">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Clothing Sizes
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <Button
                          key={size}
                          type="button"
                          variant="secondary"
                          size="lg"
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-2 text-sm rounded border transition-colors ${
                            sizes.includes(size)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background hover:bg-accent border-border"
                          }`}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Shoe Sizes
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "36",
                        "37",
                        "38",
                        "39",
                        "40",
                        "41",
                        "42",
                        "43",
                        "44",
                        "45",
                      ].map((size) => (
                        <Button
                          key={size}
                          size="lg"
                          variant="secondary"
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-2 text-sm rounded border transition-colors ${
                            sizes.includes(size)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background hover:bg-accent border-border"
                          }`}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {sizes.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium mb-2">
                        Selected: {sizes.length} sizes
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {sizes.map((size) => (
                          <span
                            key={size}
                            className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-3">
                <Label className="">Product Colors</Label>
                <div className="border rounded-lg p-4 space-y-3">
                  {/* Add new color */}
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={newColor || "#000000"}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewColor(e.target.value)
                      }
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      type="text"
                      placeholder="#000000"
                      value={newColor}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewColor(e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      className=""
                      variant="secondary"
                      size="icon"
                      onClick={addColor}
                      disabled={!newColor.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

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
                              className="text-red-500 hover:text-red-600"
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

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button size="lg" className="" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            {loading ? (
              <ButtonLoading />
            ) : (
              <Button size="lg" className="" variant="primary" type="submit">
                Save changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
