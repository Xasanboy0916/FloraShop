"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FlowerMark, MenuIcon, PhoneIcon, XIcon } from "./icons";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/flowers", label: "Flowers" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-cream/90 shadow-sm shadow-rose-100/70 backdrop-blur-md" : "bg-cream/70 backdrop-blur-sm"
      }`}
    >
      <nav aria-label="Main navigation" className="container-x flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <FlowerMark className="h-9 w-9 text-rose-500 transition-transform duration-500 group-hover:rotate-45" />
          <span className="font-display text-2xl font-semibold tracking-tight">
            Flora <span className="text-rose-500">&amp;</span> Bloom
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-bold tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-rose-400 after:transition-all after:duration-300 after:content-[''] ${
                isActive(link.href)
                  ? "text-rose-600 after:w-full"
                  : "text-ink-soft after:w-0 hover:text-rose-500 hover:after:w-full"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-rose-600"
          >
            <PhoneIcon className="h-4 w-4 text-rose-500" />
            {site.phone}
          </a>
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-600 active:scale-[0.98]"
          >
            Order now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full text-ink ring-1 ring-rose-100 transition hover:bg-rose-50 lg:hidden"
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-x flex flex-col gap-1 border-t border-rose-100 pb-6 pt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-2xl px-4 py-3 text-base font-bold transition-colors ${
                isActive(link.href) ? "bg-rose-50 text-rose-600" : "text-ink hover:bg-rose-50/60 hover:text-rose-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/order" className="btn-primary mt-3 w-full">
            Order now
          </Link>
          <a
            href={site.phoneHref}
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-ink-soft"
          >
            <PhoneIcon className="h-4 w-4 text-rose-400" />
            {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
