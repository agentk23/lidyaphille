import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export type WorkImage = {
  _id: string;
  title: string;
  imageUrl: string;
  description?: string;
};

export async function getWorkImages(category: string): Promise<WorkImage[]> {
  const query = groq`*[_type == "workImage" && category == $category] {
    _id,
    title,
    "imageUrl": image.asset->url,
    description
  }`;
  return client.fetch(query, { category });
}
