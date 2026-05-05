import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#171717] text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Content />
      <Footer />
    </div>
  );
}
