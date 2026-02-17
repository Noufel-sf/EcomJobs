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
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} from "@/Redux/Services/ProductsApi";

import { useGetAllClassificationsQuery } from "@/Redux/Services/ClassificationApi";
import { Product } from "@/lib/DatabaseTypes";

export default function AdminProducts() {
  const { data: categoriesData } = useGetAllClassificationsQuery(undefined);
  const categories = categoriesData?.content || [];

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();

  const [data, setData] = useState<Product[]>([]);
  const { data: productsData, isLoading } = useGetAllProductsQuery(undefined);
  console.log("data", productsData);
  const products = productsData?.content || [];
  console.log("products", products);

  const [sorting, setSorting] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<any>({});
  const [rowSelection, setRowSelection] = useState<any>({});

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCreate = async (formData: FormData) => {
    try {
      const newProduct = await createProduct(formData).unwrap();
      setData((prev) => [...prev, newProduct]);
      toast.success("Product created successfully");
      setOpenCreate(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    try {
      const updated = await updateProduct({ id, formData }).unwrap();

      setData((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updated } : product,
        ),
      );

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
      setData((prev) => prev.filter((p) => p.id !== productId));
      toast.success("Product deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  const handleStatusChange = async (productId: string, newStatus: string) => {
    const previousData = [...data];

    setData((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, available: newStatus === "active" }
          : product,
      ),
    );

    try {
      await updateProductStatus({
        id: productId,
        available: newStatus === "active",
      }).unwrap();

      toast.success("Status updated successfully");
    } catch (error: any) {
      setData(previousData);
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
        {/* Top Controls */}
        <div className="flex items-center justify-between py-4">
          <Input
            type="text"
            placeholder="Search by name..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event: any) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <div className="flex items-center gap-3">
            <CreateProductUi
              open={openCreate}
              onOpenChange={setOpenCreate}
              categories={categories}
              onSubmit={handleCreate}
              loading={isCreating}
              ownerId={"019c52df-1e7a-7006-ac12-aa2be28f77b4"}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={""} align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
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
        </div>

        <UpdateProductUi
          open={openEdit}
          onOpenChange={setOpenEdit}
          ownerId={"019c52df-1e7a-7006-ac12-aa2be28f77b4"}
          categories={categories}
          initialProduct={selectedProduct}
          onSubmit={handleUpdate}
          loading={isUpdating}
        />

        <div className="rounded-md border">
          <Table className="">
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="" key={headerGroup.id}>
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
                  <TableRow className="" key={row.id}>
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
                <TableRow className={""}>
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
              variant="primary"
              size="lg"
              className={""}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              size="lg"
              variant="primary"
              className={""}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </AdminSidebarLayout>
  );
}
