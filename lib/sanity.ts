import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export type WorkImage = {
  _id: string;
  title: string;
  imageUrl: string;
  description?: string;
};

// Sanity CDN filenames end in "-{width}x{height}.{format}",
// e.g. https://cdn.sanity.io/images/abc123/production/f00ba4-1920x1080.jpg
export function getImageDimensions(
  url: string,
): { width: number; height: number } | null {
  const match = url.match(/-(\d+)x(\d+)\.\w+(?:\?.*)?$/);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

export async function getWorkImages(category: string): Promise<WorkImage[]> {
  const query = groq`*[_type == "workImage" && category == $category] {
    _id,
    title,
    "imageUrl": image.asset->url,
    description
  }`;
  return client.fetch(query, { category });
}
