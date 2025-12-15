import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/shared/config';
import { fetchOrcidWorks, type OrcidExternalId, type OrcidWork } from '@/shared/orcid';

const defaultPublicationLink =
  siteConfig.social.orcid !== '#'
    ? siteConfig.social.orcid
    : siteConfig.social.lattes !== '#'
      ? siteConfig.social.lattes
      : 'http://lattes.cnpq.br/0754994451297734';

const typeLabels: Record<string, string> = {
  'journal-article': 'Artigo em periódico',
  'conference-paper': 'Trabalho em conferência',
  'book-chapter': 'Capítulo de livro',
  'book-review': 'Resenha',
  'edited-book': 'Livro organizado',
  'magazine-article': 'Artigo em revista',
  'newspaper-article': 'Artigo em jornal',
  report: 'Relatório técnico',
  other: 'Produção acadêmica',
};

const formatWorkType = (type?: string) => {
  if (!type) {
    return typeLabels.other;
  }

  const normalized = type.toLowerCase();
  return typeLabels[normalized] || typeLabels.other;
};

const resolveExternalIdHref = (id: OrcidExternalId) => {
  if (id.url) {
    return id.url;
  }

  if (id.type.toLowerCase() === 'doi') {
    return `https://doi.org/${id.value}`;
  }

  return undefined;
};

const sanitizeSource = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const blocked = ['crossref', 'datacite', 'figshare', 'scopus - elsevier'];
  const normalized = value.trim().toLowerCase();
  return blocked.includes(normalized) ? undefined : value;
};

const resolveVenue = (work: OrcidWork) => {
  const sanitizedSource = sanitizeSource(work.source);
  if (work.journal) {
    return work.journal;
  }

  if (sanitizedSource) {
    return sanitizedSource;
  }

  const type = (work.type || '').toLowerCase();
  if (type.includes('conference')) {
    return 'Artigo de Conferência';
  }

  return undefined;
};

const buildBadgeLabel = (work: OrcidWork) => {
  const venue = resolveVenue(work);
  const raw = venue
    ? `${venue}${work.year ? ` · ${work.year}` : ''}`
    : work.year || 'Publicação';
  return raw.length > 36 ? `${raw.slice(0, 33)}...` : raw;
};

export default function Publications() {
  const [works, setWorks] = useState<OrcidWork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!siteConfig.orcidId) {
      setErrorMessage('Configure o ORCID URL (ex.: https://orcid.org/0000-0000-0000-0000) para habilitar a sincronização automática.');
      setWorks([]);
      setIsLoading(false);
      return;
    }

    let isSubscribed = true;
    setIsLoading(true);
    setErrorMessage(null);

    fetchOrcidWorks(siteConfig.orcidId)
      .then((data) => {
        if (!isSubscribed) {
          return;
        }

        if (data.length === 0) {
          setErrorMessage('Nenhuma publicação encontrada no ORCID informado. Verifique se há produções públicas associadas ao perfil.');
          setWorks([]);
        } else {
          setWorks(data);
        }
      })
      .catch((err: unknown) => {
        if (!isSubscribed) {
          return;
        }

        const status =
          typeof err === 'object' && err !== null && 'status' in err
            ? Number((err as { status?: number }).status)
            : undefined;
        const message = status === 404
          ? 'Perfil ORCID não encontrado. Verifique se o identificador está correto.'
          : 'Não foi possível carregar as publicações no momento. Confirme se a URL do ORCID está correta e se o perfil é público.';

        setErrorMessage(message);
        setWorks([]);
      })
      .finally(() => {
        if (isSubscribed) {
          setIsLoading(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [siteConfig.orcidId]);

  const seeAllLink =
    siteConfig.social.orcid !== '#'
      ? siteConfig.social.orcid
      : siteConfig.social.lattes !== '#'
        ? siteConfig.social.lattes
        : '#';

  return (
    <section id="publicacoes" className="relative py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 flex justify-center"
      >
        <div className="h-72 w-full max-w-5xl rounded-full bg-gradient-to-br from-indigo-500/25 via-sky-400/20 to-emerald-400/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
            Orquestrando conhecimento
          </p>
          <h2 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">
            Publicações recentes e marcos científicos
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Seleção dinâmica a partir do ORCID ({siteConfig.social.orcid !== '#' ? siteConfig.social.orcid : 'não configurado'}) destacando impactos reais em IA, segurança, IoT e interações digitais.
          </p>
          {isLoading ? (
            <p className="mt-6 text-sm text-emerald-300">Sincronizando dados do ORCID...</p>
          ) : null}
          {errorMessage ? (
            <p className="mt-6 text-sm text-rose-300">{errorMessage}</p>
          ) : null}
        </header>

        <div className="relative mt-16">
          <div aria-hidden className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-emerald-400/60 via-white/10 to-transparent md:block" />
          <ul className="space-y-10">
            {works.length === 0 && !isLoading && !errorMessage ? (
              <li>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-300">
                  Nenhuma publicação disponível no momento.
                </div>
              </li>
            ) : null}

            {works.map((work) => {
              const externalIdBadges = (work.externalIds || []).slice(0, 2);
              const primaryLink = work.url || (siteConfig.orcidId ? `https://orcid.org/${siteConfig.orcidId}` : defaultPublicationLink);
              const badgeLabel = buildBadgeLabel(work);

              return (
                <li key={work.putCode}>
                  <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 p-8 shadow-[0_25px_80px_rgba(2,6,23,0.7)] backdrop-blur-2xl md:pl-16">
                    <span className="absolute left-5 top-12 hidden h-3 w-3 rounded-full bg-emerald-400 md:block" />
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-emerald-200">
                        {badgeLabel}
                      </span>
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                        {formatWorkType(work.type)}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold text-white">
                      {work.url ? (
                        <a
                          href={work.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-emerald-300"
                        >
                          {work.title}
                        </a>
                      ) : (
                        work.title
                      )}
                    </h3>

                    {Array.isArray(work.authors) && work.authors.length > 0 ? (
                      <p className="mt-3 text-sm text-slate-300">
                        <span className="font-semibold text-slate-200">Autores:</span> {work.authors.join('; ')}
                      </p>
                    ) : null}

                    {externalIdBadges.length > 0 ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {externalIdBadges.map((id) => {
                          const href = resolveExternalIdHref(id);
                          const key = `${work.putCode}-${id.type}-${id.value}`;
                          const label = id.type.toUpperCase();

                          return (
                            <li key={key}>
                              {href ? (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold text-emerald-200 transition-all duration-300 hover:border-emerald-300/50 hover:text-emerald-100"
                                >
                                  {label}
                                  <span className="text-slate-400">{id.value}</span>
                                </a>
                              ) : (
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold text-slate-300">
                                  {label}
                                  <span className="text-slate-400">{id.value}</span>
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}

                    <a
                      href={primaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition-colors hover:text-emerald-100"
                    >
                      Acessar publicação completa
                      <ExternalLink size={16} />
                    </a>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-16 text-center">
          <a
            href={seeAllLink}
            target={seeAllLink !== '#' ? '_blank' : undefined}
            rel={seeAllLink !== '#' ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200 transition-all duration-300 hover:border-emerald-300/60 hover:text-white"
          >
            Ver portfólio completo
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
