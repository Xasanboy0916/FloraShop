import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import FadeIn from "@/components/FadeIn";
import OrderForm from "@/components/OrderForm";
import SectionHeading from "@/components/SectionHeading";
import { ClockIcon, MapPinIcon, PhoneIcon, SendIcon, TruckIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Flowers",
  description:
    "Order a hand-tied bouquet in under a minute — pick your flowers, leave your number, and we'll call back within 15 minutes to confirm.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function OrderFormSection({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const flower = typeof params.flower === "string" ? params.flower : "";
  return <OrderForm initialFlower={flower} />;
}

function FormSkeleton() {
  return (
    <div aria-hidden className="animate-pulse space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-rose-100 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[4.5rem] rounded-2xl bg-rose-50" />
        ))}
      </div>
      <div className="h-32 rounded-2xl bg-rose-50" />
      <div className="h-12 w-44 rounded-full bg-rose-100" />
    </div>
  );
}

export default function OrderPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <section className="container-x py-16 sm:py-24">
      <SectionHeading
        eyebrow="Order"
        title="Order your bouquet"
        description="Fill in the form and we'll call you back within 15 minutes to confirm — payment on delivery, no prepayment needed."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <FadeIn className="lg:col-span-3">
          <Suspense fallback={<FormSkeleton />}>
            <OrderFormSection searchParams={searchParams} />
          </Suspense>
        </FadeIn>

        <aside className="space-y-6 lg:col-span-2">
          <FadeIn delay={120}>
            <div className="rounded-3xl bg-rose-50 p-7 ring-1 ring-rose-100">
              <h2 className="font-display text-2xl font-semibold text-ink">Need help choosing?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Our florists are happy to suggest something for your occasion and budget.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-rose-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-600 active:scale-[0.98]"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {site.phone}
                </a>
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-rose-600 ring-1 ring-rose-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-100/60 active:scale-[0.98]"
                >
                  <SendIcon className="h-4 w-4" />
                  Message on Telegram
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-rose-100">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink-soft">Good to know</h3>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed text-ink-soft">
                <li className="flex gap-3">
                  <TruckIcon className="mt-0.5 h-5 w-5 shrink-0 text-sage-500" />
                  <span>
                    <span className="font-bold text-ink">Free delivery</span> across Tashkent on orders over 150 000
                    so&apos;m.
                  </span>
                </li>
                <li className="flex gap-3">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-sage-500" />
                  <span>
                    <span className="font-bold text-ink">15-minute callback</span> — we confirm availability and the
                    final price by phone.
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-sage-500" />
                  <span>
                    Pickup available at the studio — <span className="font-bold text-ink">{site.address}</span>.
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={280}>
            <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-rose-100">
              <Image
                src="/placeholder/moychechak.jpg"
                alt="Fresh white chamomile flowers"
                width={600}
                height={600}
                sizes="(min-width: 1024px) 22rem, 90vw"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
          </FadeIn>
        </aside>
      </div>
    </section>
  );
}
