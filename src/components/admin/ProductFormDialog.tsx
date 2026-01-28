import { useState, useEffect, useRef } from "react";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string;
  images: string[];
  is_new: boolean | null;
  is_limited: boolean | null;
  colors: string[] | null;
  sizes: string[] | null;
  stock: number;
  care_instructions: string[] | null;
  delivery_days: number;
  is_active: boolean | null;
}

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

const categories = [
  { value: "accessories", label: "Accessories" },
  { value: "wearables", label: "Wearables" },
  { value: "custom", label: "Custom" },
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function ProductFormDialog({ open, onOpenChange, product }: ProductFormDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!product;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category: "accessories",
    colors: "",
    sizes: "",
    stock: "0",
    care_instructions: "",
    delivery_days: "5",
    is_new: false,
    is_limited: false,
    is_active: true,
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        original_price: product.original_price?.toString() || "",
        category: product.category,
        colors: product.colors?.join(", ") || "",
        sizes: product.sizes?.join(", ") || "",
        stock: product.stock.toString(),
        care_instructions: product.care_instructions?.join(", ") || "",
        delivery_days: product.delivery_days.toString(),
        is_new: product.is_new || false,
        is_limited: product.is_limited || false,
        is_active: product.is_active ?? true,
      });
      setImageUrls(product.images || []);
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        original_price: "",
        category: "accessories",
        colors: "",
        sizes: "",
        stock: "0",
        care_instructions: "",
        delivery_days: "5",
        is_new: false,
        is_limited: false,
        is_active: true,
      });
      setImageUrls([]);
    }
  }, [product, open]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid File",
            description: `${file.name} is not an image file.`,
            variant: "destructive",
          });
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File Too Large",
            description: `${file.name} exceeds 5MB limit.`,
            variant: "destructive",
          });
          continue;
        }

        const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file, { contentType: file.type });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast({
            title: "Upload Failed",
            description: `Failed to upload ${file.name}.`,
            variant: "destructive",
          });
          continue;
        }

        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/product-images/${filePath}`;
        newUrls.push(publicUrl);
      }

      if (newUrls.length > 0) {
        setImageUrls((prev) => [...prev, ...newUrls]);
        toast({
          title: "Images Uploaded",
          description: `Successfully uploaded ${newUrls.length} image(s).`,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Error",
        description: "An error occurred during upload.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const productData = {
        name: data.name.trim(),
        description: data.description.trim(),
        price: parseFloat(data.price),
        original_price: data.original_price ? parseFloat(data.original_price) : null,
        category: data.category,
        images: imageUrls,
        colors: data.colors.split(",").map((s) => s.trim()).filter(Boolean),
        sizes: data.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        stock: parseInt(data.stock),
        care_instructions: data.care_instructions.split(",").map((s) => s.trim()).filter(Boolean),
        delivery_days: parseInt(data.delivery_days),
        is_new: data.is_new,
        is_limited: data.is_limited,
        is_active: data.is_active,
      };

      if (isEditing && product) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(productData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: isEditing ? "Product Updated" : "Product Created",
        description: isEditing
          ? "The product has been updated successfully."
          : "The product has been added to your store.",
      });
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || !formData.price) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {isEditing ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Sage Bucket Hat"
                required
                maxLength={200}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A beautifully handcrafted crochet piece..."
              rows={3}
              required
              maxLength={2000}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="45.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="original_price">Original Price ($)</Label>
              <Input
                id="original_price"
                type="number"
                step="0.01"
                min="0"
                value={formData.original_price}
                onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                placeholder="60.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3">
            <Label>Product Images</Label>
            
            {/* Image Previews */}
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-secondary/30 group">
                    <img
                      src={url}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <div className="flex gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex-1"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Images
                  </>
                )}
              </Button>
            </div>

            {imageUrls.length === 0 && (
              <div className="flex items-center justify-center h-24 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8 mx-auto mb-1 opacity-50" />
                  <p className="text-sm">No images uploaded</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="colors">Colors (comma-separated)</Label>
              <Input
                id="colors"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                placeholder="Sage Green, Cream, Blush Pink"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sizes">Sizes (comma-separated)</Label>
              <Input
                id="sizes"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                placeholder="XS, S, M, L, XL"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="care_instructions">Care Instructions (comma-separated)</Label>
              <Input
                id="care_instructions"
                value={formData.care_instructions}
                onChange={(e) => setFormData({ ...formData, care_instructions: e.target.value })}
                placeholder="Hand wash cold, Lay flat to dry"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery_days">Delivery Days *</Label>
              <Input
                id="delivery_days"
                type="number"
                min="1"
                value={formData.delivery_days}
                onChange={(e) => setFormData({ ...formData, delivery_days: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_new"
                checked={formData.is_new}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_new: checked === true })
                }
              />
              <Label htmlFor="is_new">Mark as New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_limited"
                checked={formData.is_limited}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_limited: checked === true })
                }
              />
              <Label htmlFor="is_limited">Limited Edition</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked === true })
                }
              />
              <Label htmlFor="is_active">Active (Visible)</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending || isUploading}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
