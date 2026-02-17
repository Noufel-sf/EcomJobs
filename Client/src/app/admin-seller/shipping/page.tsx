"use client";

import { useState, useMemo, useEffect } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronDown,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  Edit,
  AlertCircle,
} from "lucide-react";
import AdminSidebarLayout from "@/components/AdminSidebarLayout";
import toast from "react-hot-toast";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import AdminDataTableSkeleton from "@/components/AdminDataTableSkeleton";
import {
  useGetAllShippingSellerStatesQuery,
  useUpdateShippingsMutation,
  ShippingState,
} from "@/Redux/Services/ShippingApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400";
    case "Inactive":
      return "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400";
    default:
      return "";
  }
};

export default function ShippingManagement() {
  const ownerId = "019c52df-1e7a-7006-ac12-aa2be28f77b4";

  const { data: statesData, isLoading } =
    useGetAllShippingSellerStatesQuery(ownerId);

  const [updatePrice, { isLoading: isUpdating }] = useUpdateShippingsMutation();

  // 🔥 Editable Local State
  const [editableStates, setEditableStates] = useState<ShippingState[]>([]);

  useEffect(() => {
    if (statesData) {
      setEditableStates(statesData);
    }
  }, [statesData]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<ShippingState | null>(
    null,
  );
  const [priceInput, setPriceInput] = useState("");

  const statistics = useMemo(() => {
    const total = editableStates.length;
    const active = editableStates.filter((s) => s.available).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [editableStates]);

  // 🔥 Update price locally
  const handleUpdatePrice = (e: React.FormEvent) => {
    e.preventDefault();

    setEditableStates((prev) =>
      prev.map((s) =>
        s.id === selectedState?.id
          ? { ...s, price: parseFloat(priceInput) }
          : s,
      ),
    );

    toast.success("Price updated locally");

    setEditDialogOpen(false);
    setPriceInput("");
    setSelectedState(null);
  };

  // 🔥 Save ALL states to backend
  const handleUpdateStates = async () => {
    try {
      const payload = editableStates.map((state) => ({
        stateID: state.id,
        price: state.price,
        available: state.availavle,
      }));
      console.log(payload);

      await updatePrice({
        ownerId,
        payload,
      }).unwrap();

      toast.success("All states updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  const columns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          className="cursor-pointer"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="cursor-pointer"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Code",
    },
    {
      accessorKey: "name",
      header: "State Name",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.nameAr}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Shipping Price",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-green-600">
            {row.original.price.toFixed(2)} DA
          </span>
        </div>
      ),
    },
    {
      accessorKey: "availavle",
      header: "Status",
      cell: ({ row }: any) => {
        const state = row.original;
        const status = state.availavle ? "Active" : "Inactive";

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="default" className="h-8 px-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(
                    status,
                  )}`}
                >
                  {status}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setEditableStates((prev) =>
                    prev.map((s) =>
                      s.id === state.id ? { ...s, availavle: true } : s,
                    ),
                  )
                }
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setEditableStates((prev) =>
                    prev.map((s) =>
                      s.id === state.id ? { ...s, available: false } : s,
                    ),
                  )
                }
              >
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setSelectedState(row.original);
            setPriceInput(row.original.price.toString());
            setEditDialogOpen(true);
          }}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Price
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: editableStates,
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
    <AdminSidebarLayout breadcrumbTitle="Shipping Management">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Shipping States</h1>
        <p className="text-gray-700 dark:text-gray-400 mb-4">
          View & Track All User shipping states.
        </p>


        <div className="flex justify-end">
          <Button
            size={"lg"}
            className={""}
            variant="primary"
            onClick={handleUpdateStates}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* TABLE DESIGN UNTOUCHED */}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <AdminDataTableSkeleton />
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No states found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* DIALOG UNTOUCHED */}

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <form onSubmit={handleUpdatePrice}>
              <DialogHeader>
                <DialogTitle>Update Shipping Price</DialogTitle>
                <DialogDescription>
                  Set the shipping price for {selectedState?.name}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <Label htmlFor="price">Shipping Price (DA)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  required
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

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
    </AdminSidebarLayout>
  );
}
