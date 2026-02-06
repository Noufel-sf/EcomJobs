'use client';

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
import { Checkbox } from "@/components/animate-ui/base/checkbox";
import { ButtonLoading } from "@/components/ui/ButtonLoading";

export default function CreateProductUi({
  open,
  setOpen,
  handleSubmit,
  editMode,
  name,
  setName,
  price,
  description,
  setDescription,
  setPrice,
  images,
  setImages,
  imagePreviews,
  setImagePreviews,
  categoryId,
  setCategoryId,
  categories,
  sizes,
  setSizes,
  loading,
}) {
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };
  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    } else {
      const newPreviews = [...imagePreviews];
      newPreviews[index] = null;
      setImagePreviews(newPreviews);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = null;
    setImagePreviews(newPreviews);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm"  >Create a new product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Product" : "Create Product"}
            </DialogTitle>
            <DialogDescription className="mb-3">
              {editMode
                ? "Edit product. Click save when you are done."
                : "Create a new product. Click save when you are done."}
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
                          <img
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
