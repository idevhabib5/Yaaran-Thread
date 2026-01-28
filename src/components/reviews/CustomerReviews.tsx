import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReviewForm } from "./ReviewForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  photo_url: string | null;
  created_at: string;
}

export function CustomerReviews() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["customer-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, customer_name, rating, review_text, photo_url, created_at")
        .order("created_at", { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Review[];
    },
  });

  const handleReviewSuccess = () => {
    setIsDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["customer-reviews"] });
  };

  return (
    <section className="cozy-section bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl mb-4"
          >
            Love from Our Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-6"
          >
            See what our customers are saying about their handmade pieces
          </motion.p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="rounded-full">
                <MessageCircle className="mr-2 h-5 w-5" />
                Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <ReviewForm onSuccess={handleReviewSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 rounded-2xl animate-pulse">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="h-5 w-5 bg-muted rounded" />
                  ))}
                </div>
                <div className="h-20 bg-muted rounded mb-4" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl"
              >
                {review.photo_url && (
                  <div className="mb-4">
                    <img
                      src={review.photo_url}
                      alt={`Review by ${review.customer_name}`}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                )}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">
                  "{review.review_text}"
                </p>
                <p className="font-medium text-primary">— {review.customer_name}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </section>
  );
}
