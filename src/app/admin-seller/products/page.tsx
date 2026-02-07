"use client";

import { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import AdminSidebarLayout from "@/components/AdminSidebarLayout";
import toast from "react-hot-toast";
import AdminDataTableSkeleton from "@/components/AdminDataTableSkeleton";
import { createProductColumns } from "@/components/ProductRow";
import UpdateProductUi from "@/components/UpdateProductUi";
import CreateProductUi from "@/components/CreateProductUi";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} from "@/Redux/Services/ProductsApi";

export default function AdminProducts() {
  // ✅ RTK Query Hooks
  
  
  const { data: productsData, isLoading } = useGetAllProductsQuery(undefined);
  const { data: categories = [] } = useGetCategoriesQuery(undefined);
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();

  const products = productsData?.products || [];
  const loading = isLoading || isCreating || isUpdating || isDeleting;

  // UI State
  const [editMode, setEditMode] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const [categoryId, setCategoryId] = useState("");
  const [bestSelling, setBestSelling] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  
  
  
  const handleStatusChange = async (productId: string, newStatus: string) => {
    try {
      await updateProductStatus({
        id: productId,
        active: newStatus === "active",
      }).unwrap();
      toast.success("Status updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("bestSelling", bestSelling ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      if (editMode && selectedProduct) {
        await updateProduct({
          id: (selectedProduct as any).id,
          formData,
        }).unwrap();
        toast.success("Product updated successfully");
      } else {
        await createProduct(formData).unwrap();
        toast.success("Product created successfully");
      }

      // Reset form
      setOpen(false);
      setEditMode(false);
      setEditSheetOpen(false);
      setSelectedProduct(null);
      setName("");
      setPrice("");
      setDescription("");
      setImages([null, null, null, null]);
      setImagePreviews([null, null, null, null]);
      setCategoryId("");
      setBestSelling(false);
      setSizes([]);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  const [sorting, setSorting] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<any>({});
  const [rowSelection, setRowSelection] = useState<any>({});

  const columns = createProductColumns({
    handleStatusChange,
    handleDelete,
    setSelectedProduct,
    setEditMode,
    setEditSheetOpen,
    setName,
    setPrice,
    setDescription,
    setCategoryId,
    setBestSelling,
    setSizes,
    setImages,
    setImagePreviews,
  });

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <AdminSidebarLayout breadcrumbTitle="Products">
      <h1 className="text-2xl font-bold">Products</h1>
      <p className="text-gray-700 dark:text-gray-400 mb-4">
        View & Create and Organize All Products.
      </p>
      <div className="w-full">
        <div className="flex items-center py-4 gap-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event: any) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <CreateProductUi
            open={open}
            setOpen={setOpen}
            handleSubmit={handleCreateProduct}
            editMode={editMode}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            images={images}
            setImages={setImages}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            categories={categories}
            sizes={sizes}
            setSizes={setSizes}
            loading={loading}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto cursor-pointer"
              >
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <UpdateProductUi
          editSheetOpen={editSheetOpen}
          setEditSheetOpen={setEditSheetOpen}
          handleSubmit={handleCreateProduct}
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          images={images}
          setImages={setImages}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
          selectedProduct={selectedProduct}
          description={description}
          setDescription={setDescription}
          editMode={editMode}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
          sizes={sizes}
          setSizes={setSizes}
          loading={loading}
        />

        <div className="rounded-md border">
          <Table className="">
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="">
              {isLoading ? (
                <AdminDataTableSkeleton />
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className=""
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
