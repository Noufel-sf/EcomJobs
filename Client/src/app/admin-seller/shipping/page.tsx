"use client";

import { useState, useMemo } from "react";
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
import { Badge } from "@/components/ui/badge";
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
  useUpdateShippingPriceMutation,
  useActivateShippingStatesMutation,
  useDeactivateShippingStatesMutation,
  ShippingState,
} from "@/Redux/Services/ShippingApi";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShippingManagement() {
  const ownerId: string = "019c52df-1e7a-7006-ac12-aa2be28f77b4";
 
  const { data: statesData, isLoading } = useGetAllShippingSellerStatesQuery(ownerId);
  const states = statesData || [];

  const [updatePrice, { isLoading: isUpdating }] = useUpdateShippingPriceMutation();
  const [activateStates, { isLoading: isActivating }] = useActivateShippingStatesMutation();
  const [deactivateStates, { isLoading: isDeactivating }] = useDeactivateShippingStatesMutation();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<ShippingState | null>(null);
  const [priceInput, setPriceInput] = useState("");

  const statistics = useMemo(() => {
    const total = states.length;
    const active = states.filter((s) => s.available).length;
    const inactive = total - active;   

    return { total, active, inactive };
  }, [states]);

  const handleUpdatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState) return;
    console.log("selected state" , selectedState);
    

    const price = parseFloat(priceInput);
    if (isNaN(price) || price < 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      await updatePrice({
        ownerId: ownerId,
        stateID: selectedState.id,
        price,
      }).unwrap();
      toast.success(`Price updated for ${selectedState.name}`);
      setEditDialogOpen(false);
      setPriceInput("");
      setSelectedState(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update price");
    }
  };

  const handleBulkActivate = async () => {
    const selectedIds = Object.keys(rowSelection).filter(
      (key) => rowSelection[key as keyof typeof rowSelection]
    );

    if (selectedIds.length === 0) {
      toast.error("Please select at least one state");
      return;
    }

    try {
      await activateStates({ stateIds: selectedIds }).unwrap();
      toast.success(`${selectedIds.length} state(s) activated`);
      setRowSelection({});
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to activate states");
    }
  };

  const handleBulkDeactivate = async () => {
    const selectedIds = Object.keys(rowSelection).filter(
      (key) => rowSelection[key as keyof typeof rowSelection]
    );

    if (selectedIds.length === 0) {
      toast.error("Please select at least one state");
      return;
    }

    try {
      await deactivateStates({ stateIds: selectedIds }).unwrap();
      toast.success(`${selectedIds.length} state(s) deactivated`);
      setRowSelection({});
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to deactivate states");
    }
  };

  const columns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="cursor-pointer"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="cursor-pointer"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Code",
      cell: ({ row }: any) => (
        <div className="font-mono text-sm font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "State Name",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{row.getValue("name")}</div>
            <div className="text-sm text-muted-foreground">{row.original.nameAr}</div>
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
            {row.getValue("price").toFixed(2)} DA
          </span>
        </div>
      ),
    },
    {
      accessorKey: "available",
      header: "Status",
      cell: ({ row }: any) => {
        const available = row.getValue("available");
        return (
          <Badge
            variant={available ? "default" : "secondary"}
            className={
              available
                ? "text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                : "text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
            }
          >
            {available ? (
              <>
                Active
              </>
            ) : (
              <>
                Inactive
              </>
            )}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const state = row.original;
        return (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setSelectedState(state);
              setPriceInput(state.price.toString());
              setEditDialogOpen(true);
            }}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Price
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: states,
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

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <AdminSidebarLayout breadcrumbTitle="Shipping Management">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Shipping Management
          </h1>
          <p className="text-gray-700 dark:text-gray-400 mt-2">
            Manage shipping prices and availability for all 69 Algerian states
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className={""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total States</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className={""}>
              <div className="text-2xl font-bold">{statistics.total}</div>
              <p className="text-xs text-muted-foreground">All Algerian states</p>
            </CardContent>
          </Card>

          <Card className={""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active States</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className={""}>
              <div className="text-2xl font-bold text-green-600">
                {statistics.active}
              </div>
              <p className="text-xs text-muted-foreground">
                {((statistics.active / statistics.total) * 100).toFixed(0)}% coverage
              </p>
            </CardContent>
          </Card>

          <Card className={""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive States</CardTitle>
              <XCircle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent className={""}>
              <div className="text-2xl font-bold text-gray-600">
                {statistics.inactive}
              </div>
              <p className="text-xs text-muted-foreground">Not available</p>
            </CardContent>
          </Card>

          

       
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Input
            type="text"
            placeholder="Search by state name or code..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <div className="flex flex-wrap items-center gap-2">
            {selectedCount > 0 && (
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-md">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {selectedCount} selected
                </span>
              </div>
            )}

            {selectedCount > 0 && (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleBulkActivate}
                  disabled={isActivating}
                  className="cursor-pointer"
                >
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      save changes
                    </>
                </Button>

                
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize cursor-pointer"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
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

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected
          </div>
          <div className="flex items-center gap-2">
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

        {/* Edit Price Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className={""}>
            <form onSubmit={handleUpdatePrice}>
              <DialogHeader className={""}>
                <DialogTitle className={""}>Update Shipping Price</DialogTitle>
                <DialogDescription className={""}>
                  Set the shipping price for {selectedState?.name} (
                  {selectedState?.nameAr})
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label className={""} htmlFor="price">Shipping Price (DA)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={priceInput}
                      onChange={(e) => setPriceInput(e.target.value)}
                      className="pl-9"
                      placeholder="Enter price"
                      required
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className={"mt-4"}>
                <Button
                  type="button"
                  size={"lg"}
                  className={"cursor-pointer"}
                  variant="outline"
                  onClick={() => {
                    setEditDialogOpen(false);
                    setPriceInput("");
                    setSelectedState(null);
                  }}
                >
                  Cancel
                </Button>
                {isUpdating ? (
                  <ButtonLoading />
                ) : (
                  <Button size="lg" variant="primary" className="cursor-pointer" type="submit">Save Changes</Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminSidebarLayout>
  );
}