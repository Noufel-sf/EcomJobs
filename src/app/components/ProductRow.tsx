import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/animate-ui/base/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const createProductColumns = ({
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
}) => [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <img
        className="w-12 h-12 object-cover rounded"
        src={row.getValue("image")}
        alt="Product Image"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return row
        .getValue(columnId)
        ?.toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const categoryTitle = row.original.category?.title || "Unknown";
      return <div className="text-sm font-medium">{categoryTitle}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("price")}
      </div>
    ),
  },

  {
    accessorKey: "Active",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      const isActive = product.active !== false;
      const status = isActive ? "active" : "pending";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 px-2 cursor-pointer">
              <Badge
                className={`cursor-pointer ${
                  status === "active"
                    ? "bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400"
                    : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400"
                }`}
              >
                {status === "active" ? "Active" : "Pending"}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleStatusChange(product.id, "active")}
            >
              <Badge className="bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400">
                Active
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleStatusChange(product.id, "pending")}
            >
              <Badge className="bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400">
                Pending
              </Badge>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "bestSelling",
    header: "Best Selling",
    cell: ({ row }) => {
      const isBestSelling = row.getValue("bestSelling");
      return (
        <div className="text-sm text-muted-foreground">
          {isBestSelling ? "Yes" : "No"}
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setSelectedProduct(product);
                setEditMode(true);
                setEditSheetOpen(true);
                setName(product.name);
                setPrice(product.price);
                setDescription(product.description || "");
                setCategoryId(product.categoryId);
                setBestSelling(product.bestSelling);
                setSizes(product.sizes || []);
                setImages([null, null, null, null]);
                setImagePreviews([null, null, null, null]);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
