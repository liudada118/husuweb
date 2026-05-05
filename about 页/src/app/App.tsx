import { Nav } from "./components/about/Nav";
import { Hero } from "./components/about/Hero";
import { Vision } from "./components/about/Vision";
import { Honors } from "./components/about/Honors";
import { Culture } from "./components/about/Culture";
import { Chronicle } from "./components/about/Chronicle";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#171717] text-white overflow-x-hidden">
      <Nav />
      <Hero />
      <Vision />
      <Honors />
      <Culture />
      <Chronicle />
      <footer className="py-[3rem] text-center text-white/40" style={{ fontSize: '0.875rem' }}>
        © 2026 Tiger Partners. All rights reserved.
      </footer>
    </div>
  );
}
