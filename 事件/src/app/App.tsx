import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { EventCard } from "./components/EventCard";
import { Footer } from "./components/Footer";

const events = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  category: "Tiger Dynamics",
  title: "Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners",
  date: "Nov 17. 2023",
}));

export default function App() {
  return (
    <div className="min-h-screen bg-[#171717] text-white overflow-x-hidden">
      <Header />
      <Hero />

      <main className="relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(225deg, rgba(39,39,39,0.42) 0%, rgba(23,23,23,0) 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[120rem] px-[2rem] lg:px-[3.5rem] py-[4rem] lg:py-[6rem]">
          <div className="flex flex-col gap-[2rem] lg:gap-[2.25rem]">
            {events.map((e) => (
              <EventCard key={e.id} category={e.category} title={e.title} date={e.date} />
            ))}
          </div>

          <div className="flex justify-center mt-[4rem]">
            <button className="text-[#E1AB5C] border-b-2 border-[#E1AB5C] pb-[0.25rem] px-[1rem] hover:opacity-80 transition" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "1.25rem" }}>
              See More
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
