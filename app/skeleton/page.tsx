import { BlogCardSkeleton } from "@/app/ui/my-skeleton";

export default function SkeletonPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 mx-auto max-w-6xl p-6">
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </div>
  );
}
