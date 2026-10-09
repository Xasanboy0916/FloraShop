import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";
import FadeIn from "@/components/FadeIn";
import FlowerGrid from "@/components/FlowerGrid";
import SectionHeading from "@/components/SectionHeading";
import { SparklesIcon } from "@/components/icons";
import { flowers } from "@/lib/flowers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Flowers",
  description:
    "Browse our fresh, hand-picked flowers — Lola, Atirgul, Moychechak, Binafsha and more. Made-to-order bouquets with same-day delivery in Tashkent.",
};

export default function FlowersPage() {
  return (
    <>
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Our collection"
          title="Fresh flowers, picked every morning"
          description="Every bouquet is made to order from today's stock. Prices depend on the season and bouquet size — message us for a quote."
        />
      </section>

      <section className="container-x pb-16">
        <FlowerGrid items={flowers} className="sm:grid-cols-2 lg:grid-cols-4" />
      </section>

      <section className="container-x pb-16">
        <FadeIn>
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-sage-50 p-7 text-center ring-1 ring-sage-100 sm:flex-row sm:text-left">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-sage-600 ring-1 ring-sage-200">
              <SparklesIcon className="h-5.5 w-5.5" />
            </span>
            <p className="flex-1 text-sm leading-relaxed text-ink-soft sm:text-base">
              Looking for something custom — a specific colour, flower or budget? We love a challenge, and custom
              bouquets are our favourite kind.
            </p>
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sage-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-sage-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-700 active:scale-[0.98]"
            >
              Ask on Telegram
            </a>
          </div>
        </FadeIn>
      </section>

      <CtaBanner />
    </>
  );
}
