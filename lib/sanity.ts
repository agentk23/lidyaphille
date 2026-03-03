// lib/sanity.ts
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function getWorkImages(category: string) {
  const query = groq`*[_type == "workImage" && category == $category] {
    _id,
    title,
    "imageUrl": image.asset->url,
    description
  }`;
  const images = await client.fetch(query, { category });
  return images;
}
