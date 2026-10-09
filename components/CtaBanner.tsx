import Link from "next/link";
import FadeIn from "./FadeIn";
import { FlowerMark, SendIcon } from "./icons";
import { site } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section className="container-x py-20 sm:py-24">
      <FadeIn>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-100 via-rose-50 to-sage-50 px-6 py-16 text-center shadow-sm ring-1 ring-rose-200/60 sm:px-12 sm:py-20">
          <FlowerMark aria-hidden className="absolute -left-8 -top-8 h-44 w-44 rotate-12 text-rose-200/80" />
          <FlowerMark aria-hidden className="absolute -bottom-10 -right-6 h-48 w-48 -rotate-12 text-sage-200/80" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Let&apos;s craft your perfect bouquet
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              Tell us the occasion — we&apos;ll pick the blooms, tie them by hand and deliver them the same day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/order" className="btn-primary">
                Place an order
              </Link>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <SendIcon className="h-4 w-4" />
                Message on Telegram
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
