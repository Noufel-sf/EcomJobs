import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OrderDetailsModalProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedOrder: any;
}

export default function OrderDetailsModal({
  dialogOpen,
  setDialogOpen,
  selectedOrder,
}: OrderDetailsModalProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="">
          <DialogTitle className="">Order #{selectedOrder?.id}</DialogTitle>
          <DialogDescription className="">
            Order placed on {selectedOrder?.createdAt && new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </DialogDescription>
        </DialogHeader>

        {/* Customer Information */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-sm">Customer Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{selectedOrder?.user?.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{selectedOrder?.user?.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{selectedOrder?.user?.phone}</p>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-muted-foreground text-sm">Status</p>
            <span className={`inline-block text-xs px-3 py-1 rounded-full mt-1 ${
              selectedOrder?.status === 'delivered' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : selectedOrder?.status === 'shipped'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : selectedOrder?.status === 'processing'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                : selectedOrder?.status === 'cancelled'
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
            }`}>
              {selectedOrder?.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-4">
          <h3 className="font-semibold text-sm mb-3">Order Items</h3>
          <div className="space-y-3">
            {selectedOrder?.orderItems?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 border rounded-lg p-3"
              >
                {item.product ? (
                  <>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Product information not available.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Total */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total Amount</span>
            <span className="font-bold text-2xl text-primary">
              ${selectedOrder?.totalPrice?.toFixed(2)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
