import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addItem } = useCart();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground/50" />
          <h1 className="font-display text-4xl mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite pieces here for later!
          </p>
          <Button size="lg" asChild className="rounded-full">
            <Link to="/shop">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl mb-8"
        >
          Your Wishlist
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm text-primary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-semibold">${product.price}</p>
                </div>
              </Link>

              <Button
                size="sm"
                className="w-full mt-3 rounded-full"
                onClick={() =>
                  addItem({
                    product,
                    quantity: 1,
                    selectedColor: product.colors?.[0],
                    selectedSize: product.sizes?.[0],
                  })
                }
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
