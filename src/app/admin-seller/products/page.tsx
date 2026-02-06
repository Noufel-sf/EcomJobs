'use client';

import { useState, useEffect } from "react";
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
import Api from "@/lib/Api";
import toast from "react-hot-toast";
import AdminDataTableSkeleton from "@/components/AdminDataTableSkeleton";
import { createProductColumns } from "@/components/ProductRow";
import UpdateProductUi from "@/components/UpdateProductUi";
import CreateProductUi from "@/components/CreateProductUi";

export default function AdminProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const handleStatusChange = async (productId: string, newStatus: string) => {
    try {
      await Api.patch(`/product/${productId}`, {
        active: newStatus === "active",
      });
      toast.success("Status updated successfully");
      await fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await Api.get("/product");
      setData(data?.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await Api.get("/category");
      setCategories(res.data.categories);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("bestSelling", bestSelling ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));
      
      // Append all images
      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      let res;
      if (editMode && selectedProduct) {
        res = await Api.patch(`/product/${(selectedProduct as any).id}`, formData);
      } else {
        res = await Api.post("/product", formData);
      }

      toast.success(res.data.message);
      await fetchProducts();
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
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    setLoading(true);
    try {
      const res = await Api.delete(`/product/${productId}`);
      toast.success(res.data.message);
      await fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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
    data,
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
              <Button variant="outline" size="sm" className="ml-auto cursor-pointer">
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
              {loading ? (
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
