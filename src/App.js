import React, { useMemo, useState, useEffect } from "react";

/**
 * Site de Investimentos e Finanças – SPA em React (single file)
 * -------------------------------------------------------------
 * ✅ Pronto para monetização com Google AdSense (instruções abaixo)
 * ✅ Layout responsivo, limpo e profissional (Tailwind)
 * ✅ Páginas: Home, Blog, Artigo, Sobre, Contato, Privacidade
 * ✅ Busca, filtro por categorias, captura de e‑mail (mock), áreas de anúncio
 *
 * Como usar:
 * 1) Copie esse componente como App.jsx (ou substitua seu componente principal) em um projeto React com Tailwind.
 * 2) Configure Tailwind no seu bundler (Vite/CRA/Next). 
 * 3) Troque os conteúdos, posts e imagens conforme sua estratégia.
 * 4) AdSense: Após aprovação do domínio, inclua o script global no index.html (instruções no final do arquivo) e substitua data-ad-client/slot.
 *
 * Observação: Este arquivo não usa react-router para simplificar; o roteamento é simulado via estado.
 */

// ------------------------
// Dados simulados (edite à vontade)
// ------------------------
const CATEGORIES = [
  { id: "bitcoin", label: "Bitcoin" },
  { id: "acoes", label: "Ações" },
  { id: "fiis", label: "FIIs" },
  { id: "renda-fixa", label: "Renda Fixa" },
  { id: "renda-extra", label: "Renda Extra" },
];

const MOCK_POSTS = [
  {
    id: "btc-o-que-e",
    title: "O que é Bitcoin e por que ele foi criado?",
    excerpt:
      "Entenda, em linguagem simples, o que é o Bitcoin e o problema que ele resolve no sistema financeiro.",
    category: "bitcoin",
    cover:
      "https://images.unsplash.com/photo-1611971262781-1c9a5b4b1d1a?q=80&w=1920&auto=format&fit=crop",
    date: "2025-08-10",
    readTime: 6,
    content: `\n## Resumo rápido\nO Bitcoin é uma rede descentralizada de dinheiro digital. Foi criado para permitir transferências sem intermediários, com oferta limitada e regras previsíveis.\n\n### Por que isso importa\n- Pagamentos de pessoa para pessoa, sem bancos.\n- Oferta fixa (21 milhões) → proteção contra inflação.\n- Rede aberta e auditável.\n\n### Como começar\n1. Entenda o risco e a volatilidade.\n2. Use uma corretora confiável.\n3. Faça compras fracionadas e regulares.\n4. Guarde com segurança (carteira própria).\n`,
  },
  {
    id: "fiis-como-comecar",
    title: "FIIs: como começar passo a passo",
    excerpt:
      "Fundos Imobiliários para gerar renda mensal: conceitos, riscos e como evitar armadilhas.",
    category: "fiis",
    cover:
      "https://images.unsplash.com/photo-150 Jackson?auto=format&fit=crop&w=1920&q=80",
    date: "2025-07-28",
    readTime: 8,
    content: `\n### Conceitos-chave\n- Segmentos: logístico, lajes, shoppings, papel.\n- Indicadores: DY, vacância, P/VP, gestão.\n- Riscos: concentração, juros, qualidade dos contratos.\n\n### Passo a passo\n1. Monte reserva de emergência.\n2. Defina objetivo: renda, proteção, diversificação.\n3. Estude o relatório gerencial.\n4. Diversifique 8–12 fundos.\n`,
  },
  {
    id: "acoes-analise-simples",
    title: "Ações: análise simples para iniciantes",
    excerpt:
      "Aprenda a olhar o básico: lucro, dívida, margens e vantagem competitiva, sem complicação.",
    category: "acoes",
    cover:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1920&auto=format&fit=crop",
    date: "2025-07-18",
    readTime: 7,
    content: `\n### O que observar\n- Receita e lucro crescendo?\n- Dívida sob controle?\n- Margens saudáveis?\n- A empresa tem vantagem competitiva?\n\n### Dicas práticas\n- Evite modismos.\n- Paciência e aportes regulares.\n- Compare empresas do mesmo setor.\n`,
  },
  {
    id: "renda-fixa-2025",
    title: "Renda Fixa em 2025: onde faz sentido",
    excerpt:
      "Tesouro IPCA, prefixados e pós-fixados: como escolher de acordo com seus objetivos.",
    category: "renda-fixa",
    cover:
      "https://images.unsplash.com/photo-1567427013953-1d736cffe042?q=80&w=1920&auto=format&fit=crop",
    date: "2025-06-30",
    readTime: 5,
    content: `\n### Mapinha mental\n- Reserva: pós-fixado com liquidez.\n- Metas de médio prazo: prefixado.\n- Proteção de longo prazo: IPCA+.\n`,
  },
  {
    id: "renda-extra-ideias",
    title: "Renda extra: 7 ideias realistas",
    excerpt:
      "Do zero: serviços locais, produtos digitais simples e revenda online, sem promessas milagrosas.",
    category: "renda-extra",
    cover:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1920&auto=format&fit=crop",
    date: "2025-06-12",
    readTime: 4,
    content: `\n### Ideias testáveis\n- Prestação de serviços (freelancer).\n- Produtos digitais simples (planilhas, e-books curtos).\n- Revenda de produtos nichados.\n- Gestão de anúncios para comerciantes locais.\n`,
  },
];

// ------------------------
// Componentes utilitários
// ------------------------
const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
    {subtitle && (
      <p className="text-slate-600 mt-1 leading-relaxed">{subtitle}</p>
    )}
  </div>
);

const CategoryChips = ({ value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => onChange("")}
      className={`px-3 py-1 rounded-full border text-sm ${
        value === "" ? "bg-slate-900 text-white" : "bg-white text-slate-700"
      }`}
    >
      Todas
    </button>
    {CATEGORIES.map((c) => (
      <button
        key={c.id}
        onClick={() => onChange(c.id)}
        className={`px-3 py-1 rounded-full border text-sm capitalize ${
          value === c.id
            ? "bg-slate-900 text-white"
            : "bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        {c.label}
      </button>
    ))}
  </div>
);

const AdSlot = ({ id, style = "banner" }) => {
  // Placeholder de anúncio. Depois de aprovado no AdSense, os blocos exibem anúncios automaticamente.
  const styles = {
    banner: "w-full h-24",
    rectangle: "w-full md:w-80 h-60",
    inline: "w-full h-28",
  };
  return (
    <div
      className={`my-6 border border-dashed border-slate-300 rounded-xl grid place-items-center bg-slate-50 ${styles[style]}`}
      role="complementary"
      aria-label="Espaço de anúncio"
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest text-slate-500">AdSense</div>
        <div className="text-sm font-medium text-slate-700">Bloco de anúncio – {id}</div>
        <div className="text-xs text-slate-500">Substitua por seu data-ad-client/slot</div>
      </div>
    </div>
  );
};

const PostCard = ({ post, onOpen }) => (
  <article className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
    <img src={post.cover} alt="Capa" className="h-48 w-full object-cover" />
    <div className="p-5">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        {CATEGORIES.find((c) => c.id === post.category)?.label || post.category}
      </div>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">{post.title}</h3>
      <p className="mt-2 text-slate-600 text-sm leading-relaxed">{post.excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-slate-500 text-xs">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>{post.readTime} min de leitura</span>
      </div>
      <button
        onClick={() => onOpen(post)}
        className="mt-4 w-full rounded-xl bg-slate-900 text-white py-2 text-sm font-medium hover:bg-slate-800"
      >
        Ler artigo
      </button>
    </div>
  </article>
);

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-bold">Receba dicas práticas no seu e‑mail</h3>
      <p className="text-slate-300 mt-1 text-sm">
        Sem spam. Conteúdo direto ao ponto sobre investimentos e finanças.
      </p>
      <form
        className="mt-4 flex flex-col sm:flex-row gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          setOk(true);
          setEmail("");
        }}
      >
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="flex-1 rounded-xl px-4 py-2 text-slate-900"
        />
        <button className="rounded-xl bg-white text-slate-900 px-5 py-2 font-semibold">
          Assinar
        </button>
      </form>
      {ok && (
        <p className="text-emerald-300 text-sm mt-3">
          Inscrição recebida! (Conecte a um serviço real como Beehiiv, Brevo, Mailchimp…)
        </p>
      )}
    </div>
  );
};

// ------------------------
// Navbar & Footer
// ------------------------
const Navbar = ({ route, setRoute }) => (
  <nav className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
    <Container>
      <div className="flex items-center justify-between h-16">
        <button
          onClick={() => setRoute({ name: "home" })}
          className="font-extrabold text-xl tracking-tight"
          aria-label="Ir para a página inicial"
        >
          <span className="text-slate-900">Marinho</span>
          <span className="text-emerald-600">Investimentos</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-4 text-sm">
          {[
            ["home", "Início"],
            ["blog", "Blog"],
            ["sobre", "Sobre"],
            ["contato", "Contato"],
            ["privacidade", "Privacidade"],
          ].map(([name, label]) => (
            <button
              key={name}
              onClick={() => setRoute({ name })}
              className={`px-3 py-1 rounded-lg hover:bg-slate-100 ${
                route.name === name ? "font-semibold" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </Container>
  </nav>
);

const Footer = () => (
  <footer className="mt-16 border-t py-10 text-sm">
    <Container>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div>
          <div className="font-extrabold text-lg">
            <span className="text-slate-900">Marinho</span>
            <span className="text-emerald-600">Investimentos</span>
          </div>
          <p className="text-slate-600 mt-1 max-w-sm">
            Educação financeira simples e prática. Sem promessas. Sem enrolação.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <ul className="space-y-2 text-slate-600">
            <li className="font-semibold text-slate-900 mb-1">Conteúdo</li>
            {CATEGORIES.map((c) => (
              <li key={c.id} className="capitalize">{c.label}</li>
            ))}
          </ul>
          <ul className="space-y-2 text-slate-600">
            <li className="font-semibold text-slate-900 mb-1">Legal</li>
            <li>Política de Privacidade</li>
            <li>Termos de Uso</li>
          </ul>
        </div>
      </div>
      <p className="text-slate-400 text-xs mt-8">© {new Date().getFullYear()} Marinho Investimentos. Todos os direitos reservados.</p>
    </Container>
  </footer>
);

// ------------------------
// Páginas
// ------------------------
const HomePage = ({ onOpenPost, goToBlog }) => {
  const latest = useMemo(
    () => [...MOCK_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3),
    []
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50 to-white border-b">
        <Container>
          <div className="py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Invista com clareza: <span className="text-emerald-600">conteúdo simples</span> que vira ação
              </h1>
              <p className="mt-3 text-slate-600">
                Bitcoin, ações, FIIs e renda fixa explicados sem complicação. Artigos práticos, exemplos reais e estratégias pé no chão.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={goToBlog}
                  className="rounded-xl bg-slate-900 text-white px-5 py-3 font-semibold hover:bg-slate-800"
                >
                  Ver artigos
                </button>
                <a href="#newsletter" className="rounded-xl px-5 py-3 border font-semibold">
                  Assinar newsletter
                </a>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-slate-200">
              <SectionTitle
                title="Destaques da semana"
                subtitle="Leituras rápidas e aplicáveis"
              />
              <div className="grid gap-4">
                {latest.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onOpenPost(p)}
                    className="text-left p-3 rounded-xl hover:bg-slate-50"
                  >
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      {CATEGORIES.find((c) => c.id === p.category)?.label}
                    </div>
                    <div className="font-semibold text-slate-900">{p.title}</div>
                    <div className="text-slate-600 text-sm">{p.readTime} min • {new Date(p.date).toLocaleDateString()}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Ad banner na Home */}
      <Container>
        <AdSlot id="home-banner-top" style="banner" />
      </Container>

      {/* Seção de categorias */}
      <section className="mt-10">
        <Container>
          <SectionTitle
            title="Categorias principais"
            subtitle="Escolha um caminho e comece por um guia simples"
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((c) => (
              <div key={c.id} className="rounded-2xl border p-4 hover:shadow-sm">
                <div className="text-sm text-slate-500">Categoria</div>
                <div className="font-semibold capitalize">{c.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lista curta de posts */}
      <section className="mt-12">
        <Container>
          <SectionTitle title="Leituras recomendadas" />
          <div className="grid md:grid-cols-3 gap-6">
            {latest.map((p) => (
              <PostCard key={p.id} post={p} onOpen={onOpenPost} />)
            )}
          </div>
        </Container>
      </section>

      <Container>
        <AdSlot id="home-inline" style="inline" />
      </Container>

      <section id="newsletter" className="mt-12">
        <Container>
          <Newsletter />
        </Container>
      </section>
    </>
  );
};

const BlogPage = ({ onOpenPost }) => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  const filtered = useMemo(() => {
    return MOCK_POSTS.filter((p) => {
      const okCat = !cat || p.category === cat;
      const okQ = !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, cat]);

  return (
    <Container>
      <div className="py-10">
        <SectionTitle
          title="Blog"
          subtitle="Artigos práticos sobre investimentos e finanças pessoais"
        />

        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Busque por título ou assunto"
            className="flex-1 rounded-xl border px-4 py-2"
            aria-label="Buscar artigos"
          />
          <CategoryChips value={cat} onChange={setCat} />
        </div>

        <AdSlot id="blog-top" style="banner" />

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} onOpen={onOpenPost} />
          ))}
        </div>

        <AdSlot id="blog-bottom" style="banner" />
      </div>
    </Container>
  );
};

const ArticlePage = ({ post, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [post?.id]);
  if (!post) return null;
  return (
    <Container>
      <article className="py-10 max-w-3xl mx-auto">
        <button onClick={onBack} className="text-sm text-slate-600 hover:underline">← Voltar</button>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">{post.title}</h1>
        <div className="mt-2 text-slate-500 text-sm">
          {new Date(post.date).toLocaleDateString()} • {post.readTime} min de leitura • {CATEGORIES.find(c=>c.id===post.category)?.label}
        </div>
        <AdSlot id="article-top" style="inline" />
        <img src={post.cover} alt="Capa do artigo" className="rounded-2xl mt-4" />
        <div className="prose prose-slate max-w-none mt-6">
          {post.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <AdSlot id="article-bottom" style="rectangle" />
      </article>
    </Container>
  );
};

const SobrePage = () => (
  <Container>
    <div className="py-10 max-w-3xl mx-auto">
      <SectionTitle title="Sobre o projeto" />
      <p className="text-slate-700 leading-relaxed">
        Nosso objetivo é ensinar finanças e investimentos de maneira simples e prática.
        Falamos de Bitcoin, ações, fundos imobiliários e renda fixa, sempre com exemplos
        do dia a dia, sem promessas irreais. Transparência e didática em primeiro lugar.
      </p>
    </div>
  </Container>
);

const ContatoPage = () => {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [ok, setOk] = useState(false);
  return (
    <Container>
      <div className="py-10 max-w-3xl mx-auto">
        <SectionTitle title="Contato" subtitle="Dúvidas, parcerias ou sugestões?" />
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setOk(true);
            setForm({ nome: "", email: "", mensagem: "" });
          }}
        >
          <input
            className="rounded-xl border px-4 py-2"
            placeholder="Seu nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
          <input
            type="email"
            className="rounded-xl border px-4 py-2"
            placeholder="Seu e‑mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            className="rounded-xl border px-4 py-2 min-h-40"
            placeholder="Sua mensagem"
            value={form.mensagem}
            onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
            required
          />
          <button className="rounded-xl bg-slate-900 text-white px-5 py-2 font-semibold w-fit">
            Enviar
          </button>
          {ok && (
            <p className="text-emerald-600 text-sm">
              Mensagem enviada (simulação). Conecte a um backend ou serviço de formulários.
            </p>
          )}
        </form>
      </div>
    </Container>
  );
};

const PrivacidadePage = () => (
  <Container>
    <div className="py-10 max-w-3xl mx-auto">
      <SectionTitle title="Política de Privacidade" />
      <p className="text-slate-700 leading-relaxed">
        Explicamos aqui como coletamos, usamos e protegemos seus dados. Para exibir Google AdSense,
        é necessário ter política de privacidade clara. Descreva cookies, uso de dados anônimos,
        ferramentas de analytics e a possibilidade de controle pelo usuário.
      </p>
      <ul className="list-disc pl-5 text-slate-700 mt-3 space-y-2">
        <li>Cookies para personalizar conteúdo e anúncios.</li>
        <li>Coleta anônima de métricas de uso (ex.: Google Analytics).</li>
        <li>Como desativar cookies no navegador.</li>
        <li>Contato do responsável pelo site.</li>
      </ul>
    </div>
  </Container>
);

// ------------------------
// App (roteamento simples)
// ------------------------
export default function App() {
  const [route, setRoute] = useState({ name: "home" });
  const [opened, setOpened] = useState(null);

  useEffect(() => {
    // Simples sincronização com hash (#blog, #sobre, etc.)
    const nameFromHash = window.location.hash.replace("#", "");
    if (nameFromHash) setRoute({ name: nameFromHash });
    const onHashChange = () => {
      const n = window.location.hash.replace("#", "");
      if (n) setRoute({ name: n });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (route.name) window.location.hash = route.name;
  }, [route.name]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar route={route} setRoute={setRoute} />

      {route.name === "home" && (
        <HomePage
          goToBlog={() => setRoute({ name: "blog" })}
          onOpenPost={(p) => {
            setOpened(p);
            setRoute({ name: "artigo" });
          }}
        />
      )}

      {route.name === "blog" && (
        <BlogPage
          onOpenPost={(p) => {
            setOpened(p);
            setRoute({ name: "artigo" });
          }}
        />
      )}

      {route.name === "artigo" && (
        <ArticlePage post={opened} onBack={() => setRoute({ name: "blog" })} />
      )}

      {route.name === "sobre" && <SobrePage />}
      {route.name === "contato" && <ContatoPage />}
      {route.name === "privacidade" && <PrivacidadePage />}

      <Footer />

      {/* --------------- Instruções AdSense --------------- */}
      {false && (
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=SEU_AD_CLIENT"
          crossOrigin="anonymous"
        ></script>
      )}
      {/* Para cada bloco real de anúncio, troque o componente AdSlot por algo como:
         <ins class="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="SEU_AD_CLIENT"
              data-ad-slot="SEU_SLOT_ID"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
         <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        
        Lembre: o domínio precisa ser aprovado no AdSense e a política de privacidade publicada.
      */}
    </div>
  );
}
