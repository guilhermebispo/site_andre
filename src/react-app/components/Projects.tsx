import { Calendar, ExternalLink, GitBranch, Users } from 'lucide-react';

const projects = [
  {
    title: 'Marinha do Brasil · Gestão de Processos Inteligente',
    description:
      'Pesquisa experimental que combina modelos matemáticos, DEA e inteligência artificial para otimizar processos e força de trabalho no Centro de Obtenção da Marinha do Rio de Janeiro.',
    status: 'Ativo',
    team: 9,
    startYear: '2025',
    funding: 'Marinha do Brasil',
    tags: ['Gestão por Processos', 'IA aplicada', 'Força de Trabalho'],
    color: 'from-sky-500 to-emerald-500',
  },
  {
    title: 'MELISSA · Energia Inteligente com LLMs e IoT',
    description:
      'Integra redes IoT, modelos de linguagem de grande porte e análise comportamental para monitorar consumo residencial e recomendar ações energéticas personalizadas.',
    status: 'Ativo',
    team: 11,
    startYear: '2025',
    funding: 'FAP DF / UnB',
    tags: ['Energia', 'IoT', 'LLM'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'SEAD-GO · Modelo de Produtividade para o Governo de Goiás',
    description:
      'Desenvolve metodologias de dimensionamento e sistemas de apoio à decisão para gestão da força de trabalho, com indicadores de produtividade e automação de análises.',
    status: 'Ativo',
    team: 12,
    startYear: '2024',
    funding: 'Secretaria de Administração de Goiás',
    tags: ['Produtividade', 'Gestão Pública', 'Analytics'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'ANA · People Analytics e Ecoeficiência em Recursos Hídricos',
    description:
      'Modelagem quali e quantitativa da capacidade produtiva da Agência Nacional de Águas, com cruzamento de bases, indicadores e simulações para apoiar decisões estratégicas.',
    status: 'Concluído',
    team: 11,
    startYear: '2021',
    funding: 'Agência Nacional de Águas e Saneamento Básico',
    tags: ['People Analytics', 'Gestão Pública', 'DEA'],
    color: 'from-blue-600 to-cyan-500',
  },
  {
    title: 'COAF · Produtividade e Inteligência de Dados',
    description:
      'Construiu modelos e dashboards para monitorar produtividade, custos e resultados do COAF, suportando decisões de combate a ilícitos financeiros.',
    status: 'Concluído',
    team: 10,
    startYear: '2021',
    funding: 'COAF / Ministério da Fazenda',
    tags: ['Analytics', 'Governança', 'BI'],
    color: 'from-rose-500 to-orange-500',
  },
  {
    title: 'SISDIP · Dimensionamento da Força de Trabalho Federal',
    description:
      'Metodologia, algoritmos e sistemas para o Ministério da Economia e o SIGEPE, definindo cenários de capacidade produtiva em mais de 250 órgãos da administração pública.',
    status: 'Concluído',
    team: 12,
    startYear: '2020',
    funding: 'Ministério da Economia / SGP',
    tags: ['Dimensionamento', 'Modelagem', 'Serviço Público'],
    color: 'from-slate-600 to-indigo-500',
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="relative py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-10 -z-10 flex justify-center"
      >
        <div className="h-64 w-full max-w-6xl rounded-full bg-gradient-to-br from-sky-500/20 via-indigo-400/20 to-fuchsia-400/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <header className="flex flex-col gap-6 text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
            Radar de inovação
          </p>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            Programas estratégicos e projetos de impacto
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-300">
            Portfólio multidisciplinar que conecta universidade, setor público e indústria em iniciativas aplicadas, alinhadas com os desafios de transformação digital e sustentabilidade.
          </p>
        </header>

        <ul className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.title}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-8 shadow-[0_28px_70px_rgba(2,6,23,0.75)] backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-2">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.color}`} />
                <header className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-emerald-200">
                    {project.title}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      project.status === 'Ativo'
                        ? 'bg-emerald-400/20 text-emerald-200'
                        : 'bg-slate-700/50 text-slate-200'
                    }`}
                  >
                    {project.status}
                  </span>
                </header>

                <p className="mt-6 text-sm leading-relaxed text-slate-300 flex-1">
                  {project.description}
                </p>

                <dl className="mt-8 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <dt className="flex items-center gap-2 text-slate-400">
                      <Users size={16} className="text-emerald-300" />
                      Equipe
                    </dt>
                    <dd className="font-semibold text-slate-200">{project.team} pesquisadores dedicados</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="flex items-center gap-2 text-slate-400">
                      <Calendar size={16} className="text-sky-300" />
                      Início
                    </dt>
                    <dd className="font-semibold text-slate-200">{project.startYear}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="flex items-center gap-2 text-slate-400">
                      <GitBranch size={16} className="text-indigo-300" />
                      Fomento
                    </dt>
                    <dd className="font-semibold text-slate-200">{project.funding}</dd>
                  </div>
                </dl>

                <ul className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-slate-200">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-emerald-300/60 hover:text-white"
                >
                  Explorar detalhes
                  <ExternalLink size={16} />
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
