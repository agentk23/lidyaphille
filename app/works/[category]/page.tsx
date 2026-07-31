import { ParallaxGallery } from "@/components/ParallaxGallery";
import { getWorkImages } from "@/lib/sanity";
import { CATEGORIES } from "@/lib/categories";
import { Suspense } from "react";

export function generateStaticParams() {
  return CATEGORIES.map(({ slug }) => ({ category: slug }));
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

async function Gallery({ category }: { category: string }) {
  const images = await getWorkImages(category);

  return <ParallaxGallery category={category} images={images} />;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <Gallery category={category} />
    </Suspense>
  );
}
