import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { ClockIcon, MapPinIcon, PhoneIcon, SendIcon } from "./icons";
import { site } from "@/lib/site";

const contactItems = [
  { icon: PhoneIcon, title: "Call us", line: site.phone, sub: "We answer within minutes", href: site.phoneHref },
  { icon: SendIcon, title: "Telegram", line: site.telegramHandle, sub: "The fastest way to order", href: site.telegram },
  { icon: MapPinIcon, title: "Visit the studio", line: site.address, sub: "Free parking nearby", href: site.mapsUrl },
  { icon: ClockIcon, title: "Opening hours", line: site.hours, sub: "Also open on holidays" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-24">
      <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Come say hello"
            description="Order by phone or Telegram, or drop by the studio to smell the roses in person — we're easy to find, and there's always coffee on."
          />
          <FadeIn delay={150}>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-sage-50 px-5 py-4 text-sm font-bold text-sage-700 ring-1 ring-sage-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-100"
            >
              <MapPinIcon className="h-5 w-5" />
              Get directions
            </a>
          </FadeIn>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-500 transition-colors duration-300 group-hover:bg-rose-500 group-hover:text-white">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">{item.title}</p>
                <p className="mt-1 font-bold text-ink">{item.line}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{item.sub}</p>
              </>
            );
            const cardCls =
              "group block h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-rose-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100";
            return (
              <FadeIn key={item.title} delay={i * 90}>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cardCls}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={cardCls}>{content}</div>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
