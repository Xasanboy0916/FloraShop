import { flowers, type Flower } from "@/lib/flowers";
import FadeIn from "./FadeIn";
import FlowerCard from "./FlowerCard";

export default function FlowerGrid({
  items = flowers,
  className = "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: {
  items?: Flower[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-6 md:gap-8 ${className}`}>
      {items.map((flower, i) => (
        <FadeIn key={flower.name} delay={(i % 4) * 90}>
          <FlowerCard flower={flower} />
        </FadeIn>
      ))}
    </div>
  );
}
