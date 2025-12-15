import { useMemo, useState } from 'react';
import {
  Download,
  Layers,
  Library,
  Menu,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import { siteConfig } from '@/shared/config';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = useMemo(
    () => [
      { id: 'sobre', label: 'Introdução', icon: Sparkles },
      { id: 'publicacoes', label: 'Publicações', icon: Library },
      { id: 'projetos', label: 'Projetos', icon: Layers },
      { id: 'contato', label: 'Conectar', icon: Share2 },
    ],
    [],
  );

  const ctaHref =
    siteConfig.social.lattes !== '#'
      ? siteConfig.social.lattes
      : siteConfig.social.linkedin !== '#'
        ? siteConfig.social.linkedin
        : siteConfig.social.orcid;

  return (
    <header className="fixed left-1/2 top-6 z-50 w-full max-w-5xl -translate-x-1/2 px-4">
      <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-3xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400/90 via-indigo-400/90 to-fuchsia-400/90 text-slate-900 shadow-lg">
            <span className="text-lg font-bold uppercase tracking-tight">
              {siteConfig.profileDisplayName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Prof. Dr.</p>
            <p className="text-base font-semibold text-slate-100">
              {siteConfig.profileDisplayName}
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={ctaHref !== '#' ? ctaHref : undefined}
            target={ctaHref && ctaHref !== '#' ? '_blank' : undefined}
            rel={ctaHref && ctaHref !== '#' ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-indigo-400/20 px-5 py-2 text-sm font-semibold text-emerald-200 transition-all duration-300 hover:border-emerald-300 hover:from-emerald-400/40 hover:via-blue-400/30 hover:to-indigo-400/30"
          >
            <Download size={16} />
            <span>Ver currículo</span>
          </a>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Abrir navegação"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mt-3 rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-[0_30px_70px_rgba(2,6,23,0.8)] backdrop-blur-2xl md:hidden">
          <div className="space-y-3">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-emerald-200/40 hover:bg-emerald-400/10 hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {label}
                </span>
                <span className="text-xs uppercase tracking-wide text-slate-400">Ir</span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <a
              href={ctaHref !== '#' ? ctaHref : undefined}
              target={ctaHref && ctaHref !== '#' ? '_blank' : undefined}
              rel={ctaHref && ctaHref !== '#' ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-3 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:scale-[1.02]"
            >
              <Download size={18} />
              <span>Acessar currículo</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
