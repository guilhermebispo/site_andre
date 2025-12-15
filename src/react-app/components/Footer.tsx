import { Heart, Sparkles } from 'lucide-react';
import { siteConfig } from '@/shared/config';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950/70 py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),_transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_1fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
              <Sparkles size={16} />
              Pesquisador em rede
            </div>
            <h3 className="text-2xl font-semibold text-white">
              {siteConfig.profileDisplayName}
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Estratégias digitais, inovação e cibersegurança com impacto mensurável em ecossistemas públicos e privados.
              Alavancando pesquisa aplicada, dados e colaboração multidisciplinar.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
              Navegação
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
              {[
                { href: '#sobre', label: 'Introdução' },
                { href: '#publicacoes', label: 'Publicações' },
                { href: '#projetos', label: 'Projetos' },
                { href: '#contato', label: 'Conectar' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center transition-all duration-300 hover:border-emerald-300/60 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
              Focos transformadores
            </h4>
            <div className="mt-4 grid gap-3 text-xs font-semibold uppercase tracking-wide text-slate-200">
              {[
                'Inteligência artificial aplicada',
                'Arquiteturas IoT e cidades',
                'Experiências humano-digital',
                'Segurança e resiliência',
                'Analytics para decisões públicas',
                'Energia inteligente e verde',
              ].map((topic) => (
                <span key={topic} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.profileDisplayName}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span>Desenvolvido por {siteConfig.profileName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
