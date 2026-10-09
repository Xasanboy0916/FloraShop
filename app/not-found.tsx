import Link from "next/link";
import { FlowerMark } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-28 text-center">
      <FlowerMark className="h-16 w-16 text-rose-300" />
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink sm:text-5xl">This page wilted away</h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist — but our flowers are very much alive.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to the shop
      </Link>
    </section>
  );
}
