import crochetBucketHat from "@/assets/crochet-bucket-hat.jpg";
import crochetToteBag from "@/assets/crochet-tote-bag.jpg";
import crochetInfinityScarf from "@/assets/crochet-infinity-scarf.jpg";
import crochetCardigan from "@/assets/crochet-cardigan.jpg";
import crochetBeanie from "@/assets/crochet-beanie.jpg";
import crochetBunny from "@/assets/crochet-bunny.jpg";
import crochetCoasters from "@/assets/crochet-coasters.jpg";
import crochetScrunchies from "@/assets/crochet-scrunchies.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: "accessories" | "wearables" | "custom";
  images: string[];
  isNew?: boolean;
  isLimited?: boolean;
  colors?: string[];
  sizes?: string[];
  stock: number;
  careInstructions?: string[];
  deliveryDays: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Sage Bucket Hat",
    description: "A beautifully handcrafted crochet bucket hat in calming sage green. Perfect for sunny days and casual outings. Each stitch is made with love and care.",
    price: 2500,
    category: "accessories",
    images: [crochetBucketHat],
    isNew: true,
    colors: ["Sage Green", "Cream", "Blush Pink"],
    stock: 8,
    careInstructions: ["Hand wash cold", "Lay flat to dry", "Do not bleach"],
    deliveryDays: 5,
  },
  {
    id: "2",
    name: "Blush Tote Bag",
    description: "This gorgeous crochet tote bag in soft blush pink is both practical and stylish. Handmade with premium cotton yarn, it's perfect for everyday use.",
    price: 3200,
    originalPrice: 3800,
    category: "accessories",
    images: [crochetToteBag],
    isLimited: true,
    colors: ["Blush Pink", "Sage Green", "Natural"],
    stock: 3,
    careInstructions: ["Spot clean only", "Store in dust bag", "Avoid direct sunlight"],
    deliveryDays: 7,
  },
  {
    id: "3",
    name: "Chunky Infinity Scarf",
    description: "Wrap yourself in warmth with this cozy chunky infinity scarf. Made from soft, premium yarn in a timeless cream color that goes with everything.",
    price: 2800,
    category: "wearables",
    images: [crochetInfinityScarf],
    isNew: true,
    colors: ["Cream", "Oatmeal", "Dusty Rose"],
    stock: 12,
    careInstructions: ["Hand wash gently", "Reshape while damp", "Air dry flat"],
    deliveryDays: 5,
  },
  {
    id: "4",
    name: "Flower Cardigan",
    description: "A dreamy crochet cardigan adorned with beautiful flower details. This statement piece is perfect for layering and adding a touch of handmade charm to any outfit.",
    price: 3800,
    originalPrice: 4500,
    category: "wearables",
    images: [crochetCardigan],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blush Pink", "Sage", "Cream"],
    stock: 5,
    careInstructions: ["Dry clean recommended", "Store folded", "Handle with care"],
    deliveryDays: 10,
  },
  {
    id: "5",
    name: "Cozy Beanie",
    description: "Stay warm in style with this handcrafted crochet beanie. Featuring a beautiful cable knit pattern in warm mustard yellow. Soft, stretchy, and perfect for chilly days.",
    price: 2000,
    category: "accessories",
    images: [crochetBeanie],
    isNew: true,
    colors: ["Mustard", "Forest Green", "Burgundy"],
    stock: 15,
    careInstructions: ["Hand wash cold", "Lay flat to dry"],
    deliveryDays: 4,
  },
  {
    id: "6",
    name: "Amigurumi Bunny",
    description: "Meet your new cuddly companion! This adorable handmade amigurumi bunny is crocheted with love using soft cotton yarn. Perfect as a gift or nursery decoration.",
    price: 2200,
    category: "custom",
    images: [crochetBunny],
    isNew: true,
    colors: ["Pastel Pink", "Lavender", "Mint Green"],
    stock: 10,
    careInstructions: ["Surface wash only", "Keep away from heat", "Suitable for ages 3+"],
    deliveryDays: 6,
  },
  {
    id: "7",
    name: "Boho Coaster Set",
    description: "Add a handmade touch to your home with this beautiful set of 4 crochet coasters. Featuring an intricate mandala design in warm terracotta and cream tones.",
    price: 1800,
    category: "accessories",
    images: [crochetCoasters],
    colors: ["Terracotta & Cream", "Sage & Natural", "Navy & White"],
    stock: 20,
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron on low if needed"],
    deliveryDays: 3,
  },
  {
    id: "8",
    name: "Pastel Scrunchie Set",
    description: "Elevate your hair game with this adorable set of 4 handmade crochet scrunchies. Soft, stretchy, and gentle on your hair. Perfect for everyday styling or gifting!",
    price: 1500,
    category: "accessories",
    images: [crochetScrunchies],
    isNew: true,
    colors: ["Pastel Mix", "Earth Tones", "Rainbow"],
    stock: 25,
    careInstructions: ["Hand wash gently", "Air dry", "Do not wring"],
    deliveryDays: 3,
  },
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "accessories", name: "Crochet Accessories" },
  { id: "wearables", name: "Cozy Wearables" },
  { id: "custom", name: "Custom Pieces" },
];

export const testimonials = [
  {
    id: "1",
    name: "Sarah M.",
    text: "Absolutely in love with my bucket hat! You can really feel the love and care that went into making it. So unique and beautiful!",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya K.",
    text: "The quality is amazing and the customer service was wonderful. My tote bag arrived perfectly packaged with a handwritten note. So special!",
    rating: 5,
  },
  {
    id: "3",
    name: "Emma L.",
    text: "I ordered a custom scarf for my mom's birthday and she cried happy tears! Yaraan Threads truly puts friendship in every stitch.",
    rating: 5,
  },
];
