import { motion } from "framer-motion";
import { Heart, Quote } from "lucide-react";
import foundersImage from "@/assets/founders.jpg";
import heroCrochet from "@/assets/hero-crochet.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function OurStory() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            How two best friends turned cozy afternoons into a crochet business
            built on friendship, creativity, and love.
          </motion.p>
        </div>
      </section>

      {/* Main Story */}
      <section className="cozy-section">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-blush/30 to-sage/30 rounded-3xl blur-2xl" />
              <img
                src={foundersImage}
                alt="Yaraan Threads founders"
                className="relative rounded-3xl shadow-card"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                It All Started with Friendship
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We've been best friends since childhood — sharing secrets, dreams,
                and countless cups of chai. When we discovered our mutual love for
                crochet, something magical happened.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What started as a way to spend cozy afternoons together soon became
                a passion we couldn't contain. We made gifts for family, scarves
                for friends, and bags for ourselves. And people kept asking: "Where
                did you get that?"
              </p>
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card p-8 md:p-12 rounded-3xl text-center mb-20"
          >
            <Quote className="h-12 w-12 mx-auto mb-6 text-primary/50" />
            <blockquote className="font-display text-3xl md:text-4xl mb-6">
              "Every stitch carries friendship."
            </blockquote>
            <p className="text-muted-foreground">
              — The heart of everything we create
            </p>
          </motion.div>

          {/* Journey */}
          <div className="space-y-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="font-display text-3xl md:text-4xl mb-6 text-center">
                From Hobby to Dream
              </h2>
              <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto mb-8">
                In 2023, we decided to take the leap. We named our brand "Yaraan
                Threads" — "Yaraan" meaning "friends" in Urdu — because friendship
                is woven into everything we do.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="grid md:grid-cols-3 gap-6 text-center"
            >
              <div className="p-6 rounded-2xl bg-secondary/30">
                <div className="font-display text-4xl text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/30">
                <div className="font-display text-4xl text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Hours of Crafting</p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/30">
                <div className="font-display text-4xl text-primary mb-2">∞</div>
                <p className="text-muted-foreground">Stitches of Love</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="cozy-section bg-secondary/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              Behind Every Stitch
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each piece takes hours to create. We select premium yarns, craft
              with intention, and infuse every item with our friendship and care.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative max-w-3xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-sage/20 to-blush/20 rounded-3xl blur-2xl" />
            <img
              src={heroCrochet}
              alt="Crochet creations"
              className="relative rounded-3xl shadow-elevated w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="cozy-section">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              What We Believe
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Handmade Magic",
                desc: "Every piece is crafted by hand, making each one unique and special.",
              },
              {
                title: "Friendship First",
                desc: "Our bond inspires our work. We create with the same love we share.",
              },
              {
                title: "Sustainable Craft",
                desc: "We use quality materials and timeless designs that last.",
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
