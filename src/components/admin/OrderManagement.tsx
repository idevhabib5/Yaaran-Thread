import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { 
  Check, 
  Clock, 
  Loader2, 
  Package, 
  Truck, 
  X,
  Phone,
  MapPin,
  Eye
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { formatPrice } from "@/lib/currency";

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "bg-yellow-500", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-500", icon: Check },
  processing: { label: "Processing", color: "bg-purple-500", icon: Package },
  shipped: { label: "Shipped", color: "bg-indigo-500", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-500", icon: Check },
  cancelled: { label: "Cancelled", color: "bg-red-500", icon: X },
};

export function OrderManagement() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map((order) => ({
        ...order,
        items: order.items as unknown as OrderItem[],
      })) as Order[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated");
    },
    onError: () => {
      toast.error("Failed to update order status");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No orders yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Orders ({orders.length})</CardTitle>
          <CardDescription>Manage customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status]?.icon || Clock;
              return (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.customer_name}</span>
                      <Badge 
                        variant="secondary" 
                        className={`${statusConfig[order.status]?.color} text-white`}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[order.status]?.label || order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.created_at), "PPP 'at' p")}
                    </p>
                    <p className="text-sm font-medium">
                      {formatPrice(order.total_amount)} • {order.items.length} item(s)
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(value) => 
                        updateStatusMutation.mutate({ id: order.id, status: value })
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="space-y-2">
                <h4 className="font-medium">Customer Information</h4>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{selectedOrder.customer_name}</p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {selectedOrder.customer_phone}
                  </p>
                  <p className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    {selectedOrder.delivery_address}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <h4 className="font-medium">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex justify-between text-sm p-2 bg-secondary/30 rounded"
                    >
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-muted-foreground text-xs">
                          Qty: {item.quantity}
                          {item.selectedColor && ` • ${item.selectedColor}`}
                          {item.selectedSize && ` • ${item.selectedSize}`}
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between font-semibold text-lg border-t pt-4">
                <span>Total</span>
                <span>{formatPrice(selectedOrder.total_amount)}</span>
              </div>

              {/* Order Date */}
              <p className="text-xs text-muted-foreground text-center">
                Placed on {format(new Date(selectedOrder.created_at), "PPP 'at' p")}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
