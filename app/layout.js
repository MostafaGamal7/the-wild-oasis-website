import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";
import { Analytics } from "@vercel/analytics/next";

const josephine = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Welcome | The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description:
    "The Wild Oasis is a place for all things wild and wonderful.Discover the beauty of nature and the thrill of adventure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josephine.className} flex flex-col antialiased min-h-screen bg-primary-950 text-primary-100`}
      >
        <Header />
        <div className="grid flex-grow px-8 py-12">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
