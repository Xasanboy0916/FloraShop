import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";
import { ArrowRightIcon, SparklesIcon, StarIcon, TruckIcon } from "./icons";

const stats = [
  { value: "7+", label: "years of craft" },
  { value: "120+", label: "bouquet designs" },
  { value: "45m", label: "avg. delivery" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-96 w-96 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full bg-sage-100/80 blur-3xl" />
      </div>

      <div className="container-x relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-28">
        <div className="max-w-xl">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-rose-500 shadow-sm ring-1 ring-rose-100">
              <SparklesIcon className="h-3.5 w-3.5" />
              Fresh flowers every day
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
              Flowers that bring <span className="text-rose-500">happiness</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Hand-tied pastel bouquets, picked at dawn and delivered same-day across Tashkent — for birthdays,
              weddings, and every ordinary day worth celebrating.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/order" className="btn-primary">
                Order a bouquet
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/flowers" className="btn-secondary">
                Browse flowers
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-rose-100 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold text-rose-500 sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink-soft">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={200} className="relative">
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[3rem] bg-gradient-to-b from-rose-100/70 to-sage-100/50 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-rose-200/60 ring-1 ring-rose-100">
              <Image
                src="/placeholder/hero-bouquet.jpg"
                alt="Hand-tied pastel bouquet in a pink vase"
                width={720}
                height={800}
                priority
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="h-auto w-full"
              />
            </div>

            <div className="absolute -left-3 top-12 animate-float rounded-2xl bg-white/95 px-4 py-3 shadow-lg shadow-rose-100 ring-1 ring-rose-100 backdrop-blur sm:-left-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-100 text-sage-600">
                  <TruckIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-ink">Same-day delivery</p>
                  <p className="text-xs font-semibold text-ink-soft">across Tashkent</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 bottom-14 animate-float-slow rounded-2xl bg-white/95 px-4 py-3 shadow-lg shadow-rose-100 ring-1 ring-rose-100 backdrop-blur sm:-right-6">
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-1 text-xs font-bold text-ink">4.9 · 320+ happy customers</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
