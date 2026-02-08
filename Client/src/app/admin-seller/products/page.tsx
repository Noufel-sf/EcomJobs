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

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  categoryId?: string;
  bestSelling?: boolean;
  sizes?: string[];
  active?: boolean;
  images?: string[];
  originalPrice?: number;
  colors?: { name: string; hex: string }[];
}

export default function AdminProducts() {
  // RTK Query
  const { data: productsData, isLoading } = useGetAllProductsQuery(undefined);
  const { data: categories = [] } = useGetCategoriesQuery(undefined);

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();

  const products = productsData?.products || [];

  // UI state only
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handlers
  const handleCreate = async (formData: FormData) => {
    try {
      await createProduct(formData).unwrap();
      toast.success("Product created successfully");
      setOpenCreate(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    try {
      await updateProduct({ id, formData }).unwrap();
      toast.success("Product updated successfully");
      setOpenEdit(false);
      setSelectedProduct(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update product");
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

  const columns = createProductColumns({
    handleStatusChange,
    handleDelete,
    onEdit: (product: Product) => {
      setSelectedProduct(product);
      setOpenEdit(true);
    },
  });

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <CreateProductUi
            open={openCreate}
            onOpenChange={setOpenCreate}
            categories={categories}
            onSubmit={handleCreate}
            loading={isCreating}
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
          open={openEdit}
          onOpenChange={setOpenEdit}
          categories={categories}
          initialProduct={selectedProduct}
          onSubmit={handleUpdate}
          loading={isUpdating}
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
