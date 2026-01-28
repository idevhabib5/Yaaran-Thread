import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="group">
      <Skeleton className="aspect-square rounded-2xl mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </div>
  );
}
