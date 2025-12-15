import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import Publications from '@/react-app/components/Publications';
import Projects from '@/react-app/components/Projects';
import Contact from '@/react-app/components/Contact';
import Footer from '@/react-app/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(244,114,182,0.18),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(15,23,42,0.75),_rgba(2,8,23,0.9))]" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_65%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <Hero />
          <Publications />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
