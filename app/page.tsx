import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import ContactSection from "@/components/ContactSection";
import FadeIn from "@/components/FadeIn";
import FlowerGrid from "@/components/FlowerGrid";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRightIcon, HeartIcon, LeafIcon, TruckIcon } from "@/components/icons";
import { featuredFlowers } from "@/lib/flowers";

export const metadata: Metadata = {
  description:
    "Boutique flower studio in Tashkent — hand-tied pastel bouquets with same-day delivery. Flowers that bring happiness.",
};

const features = [
  {
    icon: LeafIcon,
    title: "Garden fresh",
    text: "Stems are cut the same morning they're arranged, so every bouquet opens beautifully at home.",
  },
  {
    icon: HeartIcon,
    title: "Hand-tied with love",
    text: "No two bouquets are alike — our florists compose each one to the occasion, not from a catalogue.",
  },
  {
    icon: TruckIcon,
    title: "At your door in 45 min",
    text: "Same-day delivery across Tashkent in water-packed, wind-safe wrapping that protects every petal.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our flowers"
            title="Fresh picks, tied with love"
            description="Every arrangement is made to order — here are this week's favourites."
          />
          <div className="mt-12">
            <FlowerGrid items={featuredFlowers} className="sm:grid-cols-2 lg:grid-cols-3" />
          </div>
          <FadeIn delay={150} className="mt-12 text-center">
            <Link href="/flowers" className="btn-secondary">
              View all flowers
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-sage-50/70 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Flora & Bloom"
            title="Small studio, big care"
            description="We keep our catalogue short so that every stem gets the attention it deserves."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <FadeIn key={feature.title} delay={i * 100}>
                  <div className="h-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-sage-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sage-100">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-100 text-sage-600">
                      <Icon className="h-5.5 w-5.5" />
                    </span>
                    <h3 className="mt-5 text-lg font-extrabold text-ink">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.text}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
      <ContactSection />
    </>
  );
}
