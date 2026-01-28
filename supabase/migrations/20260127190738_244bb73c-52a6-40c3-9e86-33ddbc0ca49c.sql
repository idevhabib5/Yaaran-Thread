-- Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    photo_url TEXT,
    product_id TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews"
ON public.reviews
FOR SELECT
USING (is_approved = true);

-- Anyone can insert reviews (public submissions)
CREATE POLICY "Anyone can submit reviews"
ON public.reviews
FOR INSERT
WITH CHECK (true);

-- Create storage bucket for review photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-photos', 'review-photos', true);

-- Allow public read access to review photos
CREATE POLICY "Public read access for review photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'review-photos');

-- Allow anyone to upload review photos
CREATE POLICY "Anyone can upload review photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'review-photos');