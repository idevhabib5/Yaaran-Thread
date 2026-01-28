import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { CustomerReviews } from "@/components/reviews/CustomerReviews";
import { products } from "@/lib/data";
import heroCrochet from "@/assets/hero-crochet.jpg";
import foundersImage from "@/assets/founders.jpg";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: "var(--gradient-hero)",
          }}
        />

        <div className="container relative z-10 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                custom={0}
              >
                <span className="handmade-badge mb-6 inline-block">
                  <Sparkles className="h-3 w-3" />
                  Handmade with Love
                </span>
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                custom={1}
                className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
              >
                Two best friends.
                <br />
                <span className="text-primary">One shared dream.</span>
                <br />
                Handmade crochet.
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                custom={2}
                className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0"
              >
                Every stitch carries friendship. Discover unique, handcrafted
                crochet pieces made with love and care.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                custom={3}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button size="lg" asChild className="rounded-full">
                  <Link to="/shop">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-full">
                  <Link to="/our-story">Explore Our Story</Link>
                </Button>
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/40 rounded-3xl blur-2xl" />
                <img
                  src={heroCrochet}
                  alt="Handmade crochet collection"
                  className="relative w-full rounded-3xl shadow-elevated"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="cozy-section bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl mb-4"
            >
              New Arrivals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Fresh drops, made just for you
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Button variant="outline" size="lg" asChild className="rounded-full">
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="cozy-section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-sage/30 to-blush/30 rounded-3xl blur-2xl" />
              <img
                src={foundersImage}
                alt="Yaraan Threads founders"
                className="relative w-full rounded-3xl shadow-card"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <span className="handmade-badge mb-6 inline-block">Our Story</span>
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                Where Friendship
                <br />
                Meets Creativity
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                What started as two friends crocheting together on cozy afternoons
                has blossomed into Yaraan Threads. Every piece we create carries a
                piece of our friendship — warmth, care, and endless creativity.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 py-2 mb-8 text-lg italic text-foreground">
                "Every stitch carries friendship."
              </blockquote>
              <Button variant="outline" asChild className="rounded-full">
                <Link to="/our-story">
                  Read Our Full Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Instagram CTA */}
      <section className="cozy-section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Instagram className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              Follow Our Journey
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join our community on Instagram for behind-the-scenes, new drops,
              and daily doses of crochet inspiration.
            </p>
            <Button size="lg" asChild className="rounded-full">
              <a
                href="https://www.instagram.com/yaaran_thread/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 h-5 w-5" />
                @yaaran_thread
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
