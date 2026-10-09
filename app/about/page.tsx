import type { Metadata } from "next";
import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { ClockIcon, FlowerMark, SparklesIcon, TruckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of Flora & Bloom — a family flower studio in Tashkent since 2019. Our mission, our craft, and our services.",
};

const services = [
  {
    icon: TruckIcon,
    title: "Same-day delivery",
    text: "Free within Tashkent. Order by 18:00 and we deliver the same evening, water-packed and wind-safe.",
  },
  {
    icon: FlowerMark,
    title: "Custom bouquets",
    text: "Tell us the occasion and budget — our florists will tie a one-of-a-kind arrangement for you.",
  },
  {
    icon: SparklesIcon,
    title: "Weddings & events",
    text: "Full styling for venues, arches and tablescapes — from the first proposal to the final 'I do'.",
  },
  {
    icon: ClockIcon,
    title: "Care with every order",
    text: "Each bouquet ships with a care card, so your blooms stay fresh for as long as possible.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-x pb-8 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Our story"
          title="A small studio with a big love for flowers"
          description="Two sisters, one bucket of garden roses, and a belief that everyone deserves fresh flowers."
        />
      </section>

      <section className="container-x grid items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <div className="space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            <p>
              Flora &amp; Bloom began in 2019 as a tiny kiosk with two buckets of garden roses and a handwritten
              sign. We sold out by lunch — and realised Tashkent was ready for flowers that feel personal, not
              mass-produced.
            </p>
            <p>
              Six years later, we&apos;re a small team of florists working from a sunny studio on Amir Temur Avenue.
              Everything is still tied by hand, still sourced from local growers at dawn, and still made with the
              same promise: fresh flowers, honest prices, and a bouquet arranged like it&apos;s for someone we love.
            </p>
            <p className="font-display text-xl font-semibold text-ink">— Dilnoza &amp; Kamola, founders</p>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-[2.5rem] shadow-xl shadow-rose-200/50 ring-1 ring-rose-100">
              <Image
                src="/placeholder/hero-bouquet.jpg"
                alt="Hand-tied pastel bouquet made in the Flora & Bloom studio"
                width={720}
                height={800}
                sizes="(min-width: 1024px) 36rem, 90vw"
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -left-3 top-8 rounded-2xl bg-white px-5 py-4 text-center shadow-lg shadow-rose-100 ring-1 ring-rose-100 sm:-left-8">
              <p className="font-display text-3xl font-semibold text-rose-500">2019</p>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink-soft">Rooted in Tashkent</p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="container-x py-12">
        <FadeIn>
          <div className="grid items-center gap-10 rounded-[2.5rem] bg-sage-50 p-10 ring-1 ring-sage-100 sm:p-14 lg:grid-cols-[auto_1fr]">
            <span className="mx-auto grid h-24 w-24 shrink-0 place-items-center rounded-full bg-white text-rose-500 shadow-sm ring-1 ring-sage-100">
              <FlowerMark className="h-12 w-12" />
            </span>
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">Our mission</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft sm:text-lg">
                To make fresh flowers an everyday joy — not a rare luxury. We source from local growers, arrange
                everything by hand, and treat every small order like the celebration it is.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Freshness", "Craft", "Care"].map((value) => (
                  <span
                    key={value}
                    className="rounded-full bg-white px-5 py-2 text-sm font-bold text-sage-700 ring-1 ring-sage-200"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="container-x py-16">
        <SectionHeading
          eyebrow="What we offer"
          title="Services & delivery"
          description="From a single stem to a full venue — here's how we can help."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={i * 90}>
                <div className="h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-rose-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-500">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 font-extrabold text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
