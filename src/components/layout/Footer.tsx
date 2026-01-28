import { Link } from "react-router-dom";
import { Instagram, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-3xl text-foreground">
                Yaraan Threads
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Handmade with friendship in every stitch. Two best friends turning
              their passion for crochet into unique, lovingly crafted pieces.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/yaaran_thread/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@yaraanthreads.com"
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/shop"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Shop All
              </Link>
              <Link
                to="/our-story"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Our Story
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/contact#faq"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-xl mb-4">Stay in the Loop</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get updates on new drops and exclusive offers.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background"
              />
              <Button variant="default" size="icon" type="submit">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Yaraan Threads. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> by
            two best friends
          </p>
        </div>
      </div>
    </footer>
  );
}
