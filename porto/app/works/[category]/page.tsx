import { ParallaxGallery } from "@/components/ui/ParallaxGallery";
import { getWorkImages } from "@/lib/sanity";
import { Suspense } from "react";


export function generateStaticParams() {
  return [
    { category: "traditional" },
    { category: "digital" },
    { category: "animation" },
  ];
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
