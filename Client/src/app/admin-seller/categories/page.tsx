"use client";
import { useState, useEffect } from "react";

import React from "react";
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import AdminSidebarLayout from "@/components/AdminSidebarLayout";
import { useAppSelector } from "@/Redux/hooks";
import toast from "react-hot-toast";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import {
  useGetAllClassificationsQuery,
  useAddClassificationMutation,
  useDeleteClassificationMutation,
  useUpdateClassificationMutation,
} from "@/Redux/Services/ClassificationApi";
import { Classification } from "@/lib/DatabaseTypes";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AdminDataTableSkeleton from "@/components/AdminDataTableSkeleton";

export default function AdminCategories() {
  const { data: categoriesData, isLoading } = useGetAllClassificationsQuery();
  const categories = categoriesData?.content || [];
  console.log("categories", categoriesData);

  useEffect(() => {
    if (categoriesData?.content) {
      setData(categoriesData.content);
    }
  }, [categoriesData]);



  const [data, setData] = useState(categories);
  const [editMode, setEditMode] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Classification | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const [deleteCategory] = useDeleteClassificationMutation();
  const [createCategory] = useAddClassificationMutation();
  const [updateCategory] = useUpdateClassificationMutation();


  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Creating category with title:", title, "and description:", description);
  
    try {
      const newCategory = await createCategory({ name: title, desc: description }).unwrap();
      setData((prev) => [...prev, newCategory]);
      toast.success("Category created successfully");
      setOpen(false);
      setTitle("");
      setDescription("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create category");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: string) => {


    e.preventDefault();
     if (!selectedCategory) return;

    try{
      console.log("updated data is " , title , description);
      
      const updated = await updateCategory({ id: selectedCategory.id, name: title, desc: description }).unwrap();

      setData((prev) =>
        prev.map((category) =>
          category.id === id ? { ...category, ...updated } : category,
        ),
      );
      setTitle("");
      setDescription("");

      toast.success("Category updated successfully");
      setSelectedCategory(null);
      setEditSheetOpen(false);
      setEditMode(false);

    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update category");
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId).unwrap();
      setData((prev) => prev.filter((c) => c.id !== categoryId));
      toast.success("Category deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  const user = useAppSelector((state) => state.auth.user);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="cursor-pointer"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="cursor-pointer"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "desc",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("desc")}
        </div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="lg" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={""} align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className={""} />
              <DropdownMenuItem
                className="cursor-pointer"
                inset=""
                onClick={() => {
                  setSelectedCategory(category);
                  setTitle(category.name);
                  setDescription(category.desc);
                  setEditMode(true);
                  setEditSheetOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                inset=""
                onClick={() => handleDelete(category.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
    <AdminSidebarLayout breadcrumbTitle="Categories">
      <h1 className="text-2xl font-bold">Categories</h1>
      <p className="text-gray-700 dark:text-gray-400 mb-4">
        View & Organize All Categories.
      </p>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="primary" size="lg" className="">
                Create a new category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleCreate}>
                <DialogHeader className="">
                  <DialogTitle className="">
                    {editMode ? "Edit Category" : "Create Category"}
                  </DialogTitle>
                  <DialogDescription className="mb-3">
                    {editMode
                      ? "Edit category. Click save when you are done."
                      : "Create a new category. Click save when you are done."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label className="" htmlFor="title">
                      Name
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-5">
                  <DialogClose asChild>
                    <Button variant="outline" size="lg">
                      Cancel
                    </Button>
                  </DialogClose>
                  {isLoading ? (
                    <ButtonLoading />
                  ) : (
                    <Button
                      type="submit"
                      className={""}
                      variant="primary"
                      size="lg"
                    >
                      Save changes
                    </Button>
                  )}
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="ml-auto cursor-pointer"
              >
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
          <SheetContent className="">
            <form onSubmit={handleUpdate}>
              <SheetHeader className="">
                <SheetTitle className="">Edit Category</SheetTitle>
                <SheetDescription className="">
                  Edit category. Click save when done.
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 py-4 px-6">
                <div className="grid gap-3">
                  <Label className="" htmlFor="title">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label className="" htmlFor="description">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <SheetFooter className="space-y-2">
                <SheetClose asChild>
                  <Button className="" variant="outline">
                    Cancel
                  </Button>
                </SheetClose>
                {isLoading ? (
                  <ButtonLoading />
                ) : (
                  <Button
                    className=""
                    type="submit"
                    size="lg"
                    variant="primary"
                  >
                    Save changes
                  </Button>
                )}
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>

        <div className="rounded-md border">
          <Table className="">
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead className="" key={header.id}>
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
                    className=""
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="" key={cell.id}>
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
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="primary"
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
