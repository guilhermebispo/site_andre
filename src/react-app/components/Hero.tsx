import { ArrowDownRight, ArrowRight, BookMarked, GitBranch, TrendingUp } from 'lucide-react';
import { siteConfig } from '@/shared/config';
import heroImage from '../assets/andre.png';

const stats = [
  {
    value: '180+',
    label: 'Publicações científicas e técnicas',
    icon: BookMarked,
  },
  {
    value: '25+',
    label: 'Projetos aplicados com fomento público',
    icon: GitBranch,
  },
  {
    value: '960+',
    label: 'Citações no Google Scholar',
    icon: TrendingUp,
  },
];

export default function Hero() {
  const primaryCta =
    siteConfig.social.lattes !== '#'
      ? siteConfig.social.lattes
      : siteConfig.social.linkedin !== '#'
        ? siteConfig.social.linkedin
        : siteConfig.social.orcid !== '#'
          ? siteConfig.social.orcid
          : undefined;

  return (
    <section id="sobre" className="relative isolate pt-40 pb-32 sm:pt-44">
      <div
        aria-hidden
        className="absolute inset-x-0 top-12 -z-10 flex justify-center"
      >
        <div className="h-[540px] w-[760px] rounded-full bg-gradient-to-br from-emerald-500/25 via-sky-500/25 to-indigo-600/30 blur-3xl" />
      </div>

      <div className="relative px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] xl:items-start">
            <header className="space-y-12">
              <div className="space-y-6">
                <h1 className="text-4xl font-semibold text-white sm:text-5xl lg:text-[3.25rem]">
                  Liderança em produtividade pública, analytics e inteligência aplicada
                </h1>
                <p className="text-lg leading-relaxed text-slate-300">
                  André Serrano coordena os laboratórios Projectum e LinceX na UnB, estruturando redes multidisciplinares para elevar capacidades tecnológicas do Estado brasileiro, potencializar decisões baseadas em dados e acelerar inovação orientada a impacto social.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {primaryCta ? (
                  <a
                    href={primaryCta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-900 shadow-[0_20px_50px_rgba(56,189,248,0.4)] transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Ver currículo
                    <ArrowRight size={16} />
                  </a>
                ) : null}
                <a
                  href="#projetos"
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200 transition-all duration-300 hover:border-emerald-300/60 hover:text-white"
                >
                  Projetos em destaque
                  <ArrowDownRight size={16} className="text-emerald-300" />
                </a>
              </div>
            </header>

            <aside className="mx-auto w-full max-w-lg xl:mx-0">
              <figure className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 shadow-[0_45px_110px_rgba(2,6,23,0.75)] backdrop-blur-3xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_60%)] opacity-100" />
                <img
                  src={heroImage}
                  alt="Retrato do Prof. André Luiz Marques Serrano"
                  className="relative block h-full w-full object-cover"
                />
              </figure>
            </aside>
          </div>
        </div>
      </div>

      <div className="relative mt-16 w-full px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_25px_70px_rgba(2,6,23,0.55)]"
              >
                <p className="inline-flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                  <stat.icon size={18} className="text-emerald-300" />
                  {stat.label}
                </p>
                <p className="mt-6 text-3xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
