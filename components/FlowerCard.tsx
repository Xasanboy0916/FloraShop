import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Flower } from "@/lib/flowers";

export default function FlowerCard({ flower }: { flower: Flower }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-rose-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-200/50">
      <div className="relative overflow-hidden">
        <Image
          src={flower.img}
          alt={flower.name}
          width={600}
          height={600}
          sizes="(min-width: 1280px) 22rem, (min-width: 640px) 45vw, 90vw"
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-semibold text-ink">{flower.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{flower.desc}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-sm font-extrabold text-sage-600">{formatPrice(flower.price)}</span>
          <Link
            href={`/order?flower=${encodeURIComponent(flower.name)}`}
            className="inline-flex items-center justify-center rounded-full bg-rose-500 px-5 py-2 text-sm font-bold text-white shadow-md shadow-rose-500/20 transition-all duration-300 hover:bg-rose-600 hover:shadow-lg active:scale-95"
          >
            Order
          </Link>
        </div>
      </div>
    </article>
  );
}
