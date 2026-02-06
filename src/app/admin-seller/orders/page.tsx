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
import { ChevronDown, Download } from "lucide-react";
import AdminSidebarLayout from "@/components/AdminSidebarLayout";
import toast from "react-hot-toast";
import { getColumns } from "@/components/AdminOrderRow";
import AdminDataTableSkeleton from "@/components/AdminDataTableSkeleton";
import OrderDetailsModal from "@/components/OrderDetailsModal";

import { mockOrders } from "@/lib/data";



export default function AdminAllOrders() {
  const [data, setData] = useState(mockOrders);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      setData(prevData => 
        prevData.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const deleteOrder = async (orderId: number) => {
    try {
      setData(prevData => prevData.filter(order => order.id !== orderId));
      toast.success("Order deleted successfully");
      setDialogOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete order");
    }
  }

  const exportToExcel = () => {
    try {
      // Prepare data for export
      const exportData = data.map(order => ({
        'Order ID': order.id,
        'Customer Name': order.user?.name || 'N/A',
        'Customer Email': order.user?.email || 'N/A',
        'Total Price': `$${order.totalPrice.toFixed(2)}`,
        'Status': order.status.charAt(0).toUpperCase() + order.status.slice(1),
        'Order Date': new Date(order.createdAt).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        'Items Count': order.orderItems?.length || 0,
        'Products': order.orderItems?.map(item => 
          `${item.product?.name || 'Unknown'} (x${item.quantity})`
        ).join(', ') || 'N/A'
      }));

      // Convert to CSV
      if (!exportData || exportData.length === 0) {
        toast.error('No data to export');
        return;
      }
      const headers = Object.keys(exportData[0] as any);
      const csvContent = [
        headers.join(','),
        ...exportData.map((row: any) => 
          headers.map(header => {
            const value = row[header];
            // Escape commas and quotes
            return typeof value === 'string' && (value.includes(',') || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          }).join(',')
        )
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Orders exported successfully!');
    } catch (error) {
      toast.error('Failed to export orders');
      console.error('Export error:', error);
    }
  };

  useEffect(() => {
    // Using mock data directly, no need to fetch
    // fetchOrders();
  }, []);

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
    <AdminSidebarLayout breadcrumbTitle="Orders">
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="text-gray-700 dark:text-gray-400 mb-4">
        View & Track All User Orders.
      </p>
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Input
            type="text"
            placeholder="Search By Username.."
            value={table.getColumn("userName")?.getFilterValue() ?? ""}
            onChange={(event: any) =>
              table.getColumn("userName")?.setFilterValue(event.target.value)
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
              variant="outline"
              size="default"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="default"
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
