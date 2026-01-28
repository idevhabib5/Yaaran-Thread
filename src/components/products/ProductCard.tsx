import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { wishlist, toggleWishlist, addItem } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      product,
      quantity: 1,
      selectedColor: product.colors?.[0],
      selectedSize: product.sizes?.[0],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="handmade-badge">✨ New</span>
            )}
            {product.isLimited && (
              <span className="limited-badge">🔥 Limited</span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-all",
              isWishlisted ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <Heart
              className={cn("h-5 w-5", isWishlisted && "fill-current")}
            />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-background"
              size="sm"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.stock <= 5 && (
            <p className="text-xs text-primary">Only {product.stock} left!</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
