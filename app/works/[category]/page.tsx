import { ParallaxGallery } from "@/components/ui/ParallaxGallery";

export function generateStaticParams() {
  return [
    { category: "traditional" },
    { category: "digital" },
    { category: "animation" },
  ];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <ParallaxGallery category={category} />;
}
