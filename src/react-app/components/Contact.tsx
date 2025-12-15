import { FileText, Github, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/shared/config';

export default function Contact() {
  const socialLinks = [
    {
      label: 'Currículo Lattes',
      href: siteConfig.social.lattes,
      icon: FileText,
      tone: 'text-amber-300',
    },
    {
      label: 'Google Scholar',
      href: siteConfig.social.googleScholar,
      icon: FileText,
      tone: 'text-emerald-300',
    },
    {
      label: 'ORCID',
      href: siteConfig.social.orcid,
      icon: FileText,
      tone: 'text-sky-300',
    },
    {
      label: 'LinkedIn',
      href: siteConfig.social.linkedin,
      icon: Linkedin,
      tone: 'text-blue-300',
    },
    {
      label: 'GitHub',
      href: siteConfig.social.github,
      icon: Github,
      tone: 'text-slate-200',
    },
    {
      label: 'Instagram',
      href: siteConfig.social.instagram,
      icon: Instagram,
      tone: 'text-rose-300',
    },
  ];

  return (
    <section id="contato" className="relative py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 flex justify-center"
      >
        <div className="h-80 w-full max-w-6xl rounded-full bg-gradient-to-br from-emerald-400/20 via-sky-400/20 to-indigo-400/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
            Vamos cocriar soluções
          </p>
          <h2 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">
            Conecte-se para projetos, orientações e parcerias estratégicas
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Envie uma mensagem com ideias, desafios ou oportunidades. Respondo pessoalmente para alinhar possibilidades reais de colaboração.
          </p>
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-8 shadow-[0_25px_70px_rgba(2,6,23,0.7)] backdrop-blur-2xl">
              <h3 className="text-lg font-semibold uppercase tracking-[0.35em] text-slate-300">
                Coordenadas principais
              </h3>

              <address className="mt-8 space-y-6 not-italic text-sm text-slate-300">
                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                    <Mail size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Email institucional</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-1 block text-base font-semibold text-white transition-colors hover:text-emerald-200"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-400/15 text-sky-200">
                    <Phone size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Agenda direta</p>
                    <a
                      href={siteConfig.phoneHref}
                      className="mt-1 block text-base font-semibold text-white transition-colors hover:text-emerald-200"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-400/15 text-indigo-200">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Base de pesquisa</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      Universidade de Brasília (UnB)
                      <br /> Faculdade de Tecnologia · Departamento de Engenharia Elétrica
                      <br /> Campus Darcy Ribeiro · Brasília · Brasil
                    </p>
                  </div>
                </div>
              </address>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-8 shadow-[0_25px_70px_rgba(2,6,23,0.7)] backdrop-blur-2xl">
              <h3 className="text-lg font-semibold uppercase tracking-[0.35em] text-slate-300">
                Redes curadas
              </h3>

              <ul className="mt-6 grid grid-cols-2 gap-4">
                {socialLinks.map(({ label, href, icon: Icon, tone }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href !== '#' ? '_blank' : undefined}
                      rel={href !== '#' ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-emerald-300/50 hover:text-white"
                    >
                      <Icon className={tone} size={22} />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_35px_80px_rgba(2,6,23,0.75)] backdrop-blur-3xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)] opacity-80" />
            <div className="relative">
              <h3 className="text-lg font-semibold uppercase tracking-[0.35em] text-slate-300">
                Mensagem rápida
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Compartilhe contexto, resultados desejados e prazos. Voltarei rapidamente com possíveis caminhos.
              </p>

              <form className="mt-8 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner shadow-black/40 transition-all focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                    placeholder="Quem está escrevendo?"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner shadow-black/40 transition-all focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner shadow-black/40 transition-all focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                    placeholder="Sobre o que conversaremos?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner shadow-black/40 transition-all focus:border-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                    placeholder="Conte sobre seu desafio, contexto ou objetivo."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-900 shadow-[0_20px_40px_rgba(56,189,248,0.35)] transition-transform duration-300 hover:scale-[1.01]"
                >
                  Enviar mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
