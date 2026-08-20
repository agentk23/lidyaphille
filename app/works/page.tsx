"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageMenuContainer } from "@/components/ImageMenuContainer";
import { usePageTransition } from "@/context/TransitionContext";
import { CATEGORIES, Category } from "@/lib/categories";

const CategoryCard = ({ category }: { category: Category }) => {
  const { navigateWithTransition } = usePageTransition();
  const href = `/works/${category.slug}`;

  return (
    <div className="flex-1 sm:min-w-[23vw] lg:min-w-[30vw] grow-0">
      <Link
        href={href}
        className="block h-full w-full"
        onClick={(e) => {
          e.preventDefault();
          navigateWithTransition(href);
        }}
      >
        <ImageMenuContainer className="h-[40vh] md:h-[50vh]">
          <div className="flex flex-col gap-6 h-full items-center justify-center md:p-15 sm:p-20 p-16">
            <h2
              className="absolute top-15 text-xl md:text-2xl font-bold text-black uppercase tracking-widest drop-shadow-lg"
              style={{ viewTransitionName: `work-title-${category.slug}` }}
            >
              {category.title}
            </h2>
            {/* Shared element: morphs into the category page's hero. */}
            <div
              className="relative w-64 md:w-100 h-64 rounded-lg overflow-hidden shadow-lg border border-white/20"
              style={{ viewTransitionName: `work-${category.slug}` }}
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 256px, 400px"
                className="object-fill"
              />
            </div>
          </div>
        </ImageMenuContainer>
      </Link>
    </div>
  );
};

export default function WorksPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-zinc-950">
      <div className="absolute inset-0 z-0 h-full">
        <Image
          src="/2ndbg.jpg"
          alt="Works Background"
          fill
          sizes="100vw"
          className="object-cover opacity-80"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col xl:flex-row gap-8 w-full max-w-full px-20 xl:bg-black justify-center align-center items-center">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
