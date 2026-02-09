import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Order {
  id: number;
  user?: {
    id: number;
    name: string;
    phone: string;
    email: string;
  };
  totalPrice: number;
  status: string;
  createdAt: string;
  orderItems?: any[];
}

interface AdminOrderRowProps {
  handleStatusChange: (orderId: number, newStatus: string) => void;
  setSelectedOrder: (order: Order) => void;
  setDialogOpen: (open: boolean) => void;
  deleteOrder: (orderId: number) => void;
}

export function getColumns({
  handleStatusChange,
  setSelectedOrder,
  setDialogOpen,
  deleteOrder,
}: AdminOrderRowProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400";
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "CANCELED":
        return "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 dark:bg-gray-500/20 dark:text-gray-400";
    }
  };

  return [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          className="cursor-pointer"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          className="cursor-pointer"
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: any) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      id: "userName",
      header: "User",
      accessorFn: (row: Order) => row.user?.name,
      cell: ({ row }: any) => (
        <div className="font-medium">{row.original.user?.name}</div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Total",
      cell: ({ row }: any) => (
        <div className="font-medium">
          {row.getValue("totalPrice").toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const order = row.original;
        const status = order.status;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="default" className="h-8 px-2 cursor-pointer">
                <span
                  className={`cursor-pointer text-xs px-2 py-1 rounded-full ${getStatusStyle(status)}`}
                >
                  {status}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuLabel className="" inset={false}>Change Status</DropdownMenuLabel>
              <DropdownMenuSeparator className="" />
              <DropdownMenuItem
                className="cursor-pointer"
                inset={false}
                onClick={() => handleStatusChange(order.id, "PENDING")}
              >
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400">
                  PENDING
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                inset={false}
                onClick={() => handleStatusChange(order.id, "COMPLETED")}
              >
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400">
                  COMPLETED
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                inset={false}
                onClick={() => handleStatusChange(order.id, "CANCELED")}
              >
                <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400">
                  CANCELED
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }: any) => (
        <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: any) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="default" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuLabel className="" inset={false}>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="" />
              <DropdownMenuItem
                className="cursor-pointer"
                inset={false}
                onClick={() => {
                  setSelectedOrder(order);
                  setDialogOpen(true);
                }}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                inset={false}
                onClick={() => {
                  deleteOrder(order.id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export default getColumns;
