import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Since all our pieces are handmade, please allow 5-10 business days for creation plus 3-5 days for delivery. We'll keep you updated every step of the way!",
  },
  {
    question: "Can I request a custom order?",
    answer:
      "Absolutely! We love creating custom pieces. Just reach out via our contact form or Instagram DM with your idea, and we'll work together to bring it to life.",
  },
  {
    question: "What if I want a different color?",
    answer:
      "We offer a range of colors for most products. If you don't see the color you want, send us a message and we'll see what we can do!",
  },
  {
    question: "What is your return policy?",
    answer:
      "Due to the handmade nature of our products, we accept returns only for defective items within 7 days of delivery. Please contact us with photos if there's an issue.",
  },
  {
    question: "How do I care for my crochet items?",
    answer:
      "Each product comes with specific care instructions. Generally, we recommend hand washing in cold water and laying flat to dry to maintain the shape and quality.",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-md mx-auto"
          >
            Have a question or want to say hi? We'd love to hear from you!
          </motion.p>
        </div>
      </section>

      <section className="cozy-section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-3xl mb-6">Send Us a Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us everything..."
                    rows={5}
                    className="mt-1"
                  />
                </div>
                <Button size="lg" type="submit" className="rounded-full">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-3xl mb-6">Or Reach Out Directly</h2>

              <div className="space-y-6 mb-10">
                <a
                  href="https://www.instagram.com/yaaran_thread/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Instagram className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Instagram DM</p>
                    <p className="text-sm text-muted-foreground">
                      @yaaran_thread — Fastest response!
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:hello@yaraanthreads.com"
                  className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      hello@yaraanthreads.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">
                      Quick questions welcome!
                    </p>
                  </div>
                </a>
              </div>

              {/* FAQ Section */}
              <div id="faq">
                <h2 className="font-display text-3xl mb-6">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
