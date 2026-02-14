'use client';

import { useState } from "react";
import { useGetSellerOrdersQuery,useUpdateOrderStatusMutation, useDeleteOrderMutation } from "@/Redux/Services/OrderApi";

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
import { ChevronDown, Download } from "lucide-react";
import AdminSidebarLayout from "@/components/AdminSidebarLayout";
import toast from "react-hot-toast";
import { getColumns } from "@/components/AdminOrderRow";
import AdminDataTableSkeleton from "@/components/AdminDataTableSkeleton";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import type { Order } from "@/lib/DatabaseTypes";



export default function AdminAllOrders() {

  const { data: ordersData, isLoading: ordersLoading } = useGetSellerOrdersQuery({Seller_id: "019c52df-1e7a-7006-ac12-aa2be28f77b4", size: 10});
  const orders = ordersData?.content || [];
  const [deleteOrderMutation] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();


  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [data, setData] = useState<Order[]>(orders);
  const [dialogOpen, setDialogOpen] = useState(false);

  

  const handleStatusChange = async (orderId: string, newStatus: string) => {

    const previousData = [...orders ];
    setData(prevData => 
      prevData.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    try {
      await updateOrderStatus({ orderId: orderId, status: newStatus }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error: any) {
      setData(previousData);
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      await deleteOrderMutation(String(orderId)).unwrap();
      setData(prevData => prevData.filter(order => order.id !== orderId));
      toast.success("Order deleted successfully");
      setDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete order");
    }
  }
 
  const exportToExcel = () => {
  try {
    if (!orders || orders.length === 0) {
      toast.error("No data to export");
      return;
    }

    const exportData = orders.map((order) => ({
      "Order ID": order.id,
      "Customer First Name": order.firstName || "N/A",
      "Customer Last Name": order.lastName || "N/A",
      "Phone Number": order.phoneNumber || "N/A",
      "State": order.state || "N/A",
      "City": order.city || "N/A",

      "Products Count": order.products?.length || 0,

      "Products": order.products
        ?.map(
          (item: any) =>
            `${item.product?.name || "Unknown"} (x${item.prodNb}) - Size: ${
              item.size || "-"
            } - Color: ${item.color || "-"}`
        )
        .join(" | ") || "N/A",

      "Products Cost": `${order.productsCost?.toFixed(2) || "0.00"} DA`,
      "Delivery Cost": `${order.deliveryCost?.toFixed(2) || "0.00"} DA`,
      "Total Cost": `${order.totalCost?.toFixed(2) || "0.00"} DA`,

      "Status":
        order.status?.charAt(0).toUpperCase() +
          order.status?.slice(1).toLowerCase() || "N/A",
    }));

    const headers = Object.keys(exportData[0]);

    const csvContent = [
      headers.join(","),
      ...exportData.map((row: any) =>
        headers
          .map((header) => {
            const value = row[header];

            return typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `orders_export_${new Date().toISOString().split("T")[0]}.csv`
    );

    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Orders exported successfully!");
  } catch (error) {
    toast.error("Failed to export orders");
    console.error("Export error:", error);
  }
  };


  const [sorting, setSorting] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<any>({});
  const [rowSelection, setRowSelection] = useState<any>({});

  const columns = getColumns({
    handleStatusChange,
    setSelectedOrder,
    setDialogOpen,
    deleteOrder,
  });

  const table = useReactTable({
    data:orders,
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
    <AdminSidebarLayout breadcrumbTitle="Orders">
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="text-gray-700 dark:text-gray-400 mb-4">
        View & Track All User Orders.
      </p>
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Input
            type="text"
            placeholder="Search By First Name.."
            value={table.getColumn("firstName")?.getFilterValue() ?? ""}
            onChange={(event: any) =>
              table.getColumn("firstName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex items-center justify-between gap-3">

          <Button 
            variant="primary" 
            size="default"
            onClick={exportToExcel}
            className="ml-auto cursor-pointer"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="ml-auto cursor-pointer">
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
       </div>

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
              {ordersLoading ? (
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

        <OrderDetailsModal
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          selectedOrder={selectedOrder}
        />

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="primary"
              size="lg"
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
