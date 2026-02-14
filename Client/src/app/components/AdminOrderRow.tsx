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
import { OrderItem } from "@/lib/DatabaseTypes";
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
  orderItems?: OrderItem[];
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
      case "Delivered":
        return "bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400";
      case "Processing":
        return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400";
      case "Returned":
        return "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400";
      case "Canceled":
        return "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 dark:bg-gray-500/20 dark:text-gray-400";
    }
  };

  return [
  
   
    {
      id: "firstName",
      header: "Client",
      accessorFn: (row) => row.firstName,
      cell: ({ row }: any) => (
        <div className="font-medium">{row.getValue("firstName") + " " + row.original.lastName}</div>
      ),
    },
    {
      id: "state",
      header: "state",
      accessorFn: (row: Order) => row.state,
      cell: ({ row }: any) => (
        <div className="font-medium">{row.getValue("state")}</div>
      ),
    },
    {
      accessorKey: "totalCost",
      header: "Total",
      cell: ({ row }: any) => (
        <div className="font-medium text-green-500">
          {row.getValue("totalCost").toFixed(2)}
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
                onClick={() => handleStatusChange(order.id, "New")}
              >
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400">
                  New
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                inset={false}
                onClick={() => handleStatusChange(order.id, "Processing")}
              >
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  Processing
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                inset={false}
                onClick={() => handleStatusChange(order.id, "Delivered")}
              >
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400">
                  Delivered
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                inset={false}
                onClick={() => handleStatusChange(order.id, "Returned")}
              >
                <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400">
                  Returned
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
