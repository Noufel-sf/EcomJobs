'use client';

import { useState } from 'react';
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
import { Plus, X } from "lucide-react";
import Image from "next/image";

interface Category {
  id: string;
  title: string;
}

interface ProductColor {
  name: string;
  hex: string;
}

interface CreateProductUiProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
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
  // Internal state management
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null, null]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setOriginalPrice('');
    setCategoryId('');
    setImages([null, null, null, null]);
    setImagePreviews([null, null, null, null]);
    setSizes([]);
    setColors([]);
    setNewColorName('');
    setNewColorHex('#000000');
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('originalPrice', originalPrice);
    formData.append('categoryId', categoryId);
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('colors', JSON.stringify(colors));
    
    images.forEach((image) => {
      if (image) {
        formData.append('images', image);
      }
    });

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
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const addColor = () => {
    if (newColorName.trim() && newColorHex) {
      setColors([...colors, { name: newColorName.trim(), hex: newColorHex }]);
      setNewColorName('');
      setNewColorHex('#000000');
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, file: File | undefined) => {
    const newImages = [...images];
    newImages[index] = file || null;
    setImages(newImages);

    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    } else {
      const newPreviews = [...imagePreviews];
      newPreviews[index] = null;
      setImagePreviews(newPreviews);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = null;
    setImagePreviews(newPreviews);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm">Create a new product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleCreateProduct}>
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription className="mb-3">
              Create a new product. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="originalPrice">Original price</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="images">Product Images (Up to 4)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`image-${index}`} className="text-sm text-muted-foreground">
                        Image {index + 1}
                      </Label>
                      <Input
                        id={`image-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                        className="cursor-pointer"
                      />
                      {imagePreviews[index] && (
                        <div className="relative">
                          <Image
                            width={400}
                            height={300}
                            src={imagePreviews[index]}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="border px-4 py-2 rounded"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            
            </div>

            {/* Right Column - Sizes */}
            <div className="space-y-4">
              <div className="grid gap-3">
                <Label>Available Sizes</Label>
                <div className="border rounded-lg p-4 space-y-2 max-h-[500px] overflow-y-auto">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Clothing Sizes</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <Button
                          key={size}
                          type="button"
                          variant="secondary"
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-2 text-sm rounded border transition-colors ${
                            sizes.includes(size)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background hover:bg-accent border-border'
                          }`}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Shoe Sizes</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'].map((size) => (
                        <Button
                          key={size}
                          variant="secondary"
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-2 text-sm rounded border transition-colors ${
                            sizes.includes(size)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background hover:bg-accent border-border'
                          }`}
                        >
                          {size}
                        </Button>
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
                <Label>Product Colors</Label>
                <div className="border rounded-lg p-4 space-y-3">
                  {/* Add new color */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={newColorHex}
                        onChange={(e) => setNewColorHex(e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        placeholder="Color name"
                        value={newColorName}
                        onChange={(e) => setNewColorName(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        onClick={addColor}
                        disabled={!newColorName.trim()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Selected: {newColorHex}
                    </p>
                  </div>

                  {/* Color list */}
                  {colors.length > 0 && (
                    <div className="space-y-2 pt-3 border-t">
                      <p className="text-sm font-medium text-muted-foreground">
                        Added Colors ({colors.length})
                      </p>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded bg-muted/50"
                          >
                            <div
                              className="w-8 h-8 rounded-full border-2 border-border shrink-0"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{color.name}</p>
                              <p className="text-xs text-muted-foreground">{color.hex}</p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => removeColor(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {loading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Save changes</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
