import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Truck, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, wishlist, toggleWishlist } = useCart();

  const product = products.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addItem({
      product,
      quantity,
      selectedColor,
      selectedSize,
      notes,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container py-8 md:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-secondary/30"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <span className="handmade-badge">✨ New</span>}
              {product.isLimited && (
                <span className="limited-badge">🔥 Limited</span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={cn(
                "absolute top-4 right-4 p-3 rounded-full bg-background/80 backdrop-blur-sm transition-all",
                isWishlisted ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Heart className={cn("h-6 w-6", isWishlisted && "fill-current")} />
            </button>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  {product.category}
                </span>
                <span className="handmade-badge text-xs">
                  <Sparkles className="h-3 w-3" />
                  Handmade
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Options */}
            <div className="space-y-4">
              {product.colors && product.colors.length > 0 && (
                <div>
                  <Label className="mb-2 block">Color</Label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <Label className="mb-2 block">Size</Label>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className="min-w-[48px]"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label className="mb-2 block">Personal Notes (Optional)</Label>
                <Textarea
                  placeholder="Any special requests or customizations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label className="mb-2 block">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center text-lg font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} available
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 rounded-full"
                onClick={handleAddToCart}
              >
                Add to Cart — {formatPrice(product.price * quantity)}
              </Button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    {product.deliveryDays}-{product.deliveryDays + 3} business days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Handmade</p>
                  <p className="text-xs text-muted-foreground">
                    Made with love & care
                  </p>
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="p-4 bg-secondary/30 rounded-xl">
                <h3 className="font-medium mb-2">Care Instructions</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {product.careInstructions.map((instruction, i) => (
                    <li key={i}>• {instruction}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
