import Link from "next/link";
import { ClockIcon, FlowerMark, HeartIcon, InstagramIcon, MapPinIcon, PhoneIcon, SendIcon } from "./icons";
import { site } from "@/lib/site";

const explore = [
  { href: "/", label: "Home" },
  { href: "/flowers", label: "Flowers" },
  { href: "/about", label: "About us" },
  { href: "/order", label: "Order" },
];

const socials = [
  { href: site.telegram, label: "Telegram", icon: SendIcon },
  { href: site.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.phoneHref, label: "Call us", icon: PhoneIcon },
];

// Evaluated once at module load, so it stays stable while prerendering.
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-gradient-to-b from-white to-rose-50/80">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <FlowerMark className="h-9 w-9 text-rose-500" />
            <span className="font-display text-2xl font-semibold tracking-tight">
              Flora <span className="text-rose-500">&amp;</span> Bloom
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            A boutique flower studio in Tashkent — fresh blooms, hand-tied bouquets and same-day delivery.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink-soft ring-1 ring-rose-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-500 hover:text-white"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-semibold text-ink-soft transition-colors hover:text-rose-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-ink-soft">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-2.5 transition-colors hover:text-rose-600">
                <PhoneIcon className="h-4 w-4 shrink-0 text-rose-400" />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-rose-600"
              >
                <SendIcon className="h-4 w-4 shrink-0 text-rose-400" />
                {site.telegramHandle}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
              {site.address}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink">Hours</h3>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-ink-soft">
            <li className="inline-flex items-center gap-2.5">
              <ClockIcon className="h-4 w-4 shrink-0 text-rose-400" />
              {site.hours}
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Same-day delivery for orders placed before 18:00.
          </p>
        </div>
      </div>

      <div className="border-t border-rose-100/80">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm text-ink-soft sm:flex-row">
          <p>
            © {currentYear} {site.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5 font-semibold">
            Flowers that bring happiness
            <HeartIcon className="h-4 w-4 text-rose-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
