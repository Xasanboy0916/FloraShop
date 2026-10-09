import data from "@/data/flowers.json";

export type Flower = {
  name: string;
  desc: string;
  price?: string;
  img: string;
};

export const flowers = data as Flower[];

export const featuredFlowers = flowers.slice(0, 3);

export function formatPrice(price?: string): string {
  return price && price.trim() ? price : "Price on request";
}
