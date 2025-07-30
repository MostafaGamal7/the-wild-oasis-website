import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <div className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="object-cover object-center "
        alt="Mountains and forests with two cabins"
      />

      <div className="relative text-center px-4">
        <h1
          className="text-primary-50 mb-6 sm:mb-8 md:mb-10 tracking-tight font-normal"
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: "1.1",
          }}
        >
          Beyond Luxury, Beyond Imagination
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 text-primary-800 font-semibold hover:bg-accent-600 transition-all inline-block"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
            padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem)",
          }}
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
}
