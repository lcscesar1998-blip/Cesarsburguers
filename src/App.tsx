export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <div className="overlay" />
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />

        <nav className="topbar">
          <div className="brand-mini">
            <img
              src="/logo-cesars.png"
              alt="Logo Cesar&apos;s Burguer"
              className="brand-mini-logo"
            />
            <span>Cesar&apos;s Burguer</span>
          </div>

          <div className="topbar-links">
            <a href="#cardapio">Cardápio</a>
            <a href="#combos">Combos</a>
            <a href="#pedido">Pedido</a>
          </div>
        </nav>

        <div className="hero-content">
          <img
            src="/logo-cesars.png"
            alt="Logo Cesar&apos;s Burguer"
            className="hero-logo"
          />

          <span className="badge">Versão Imperial</span>

          <h1>
            O sabor de um <span>império</span>.
          </h1>

          <p className="subtitle">
            Nesse império, a fome é o inimigo dos gladiadores.
          </p>

          <div className="hero-buttons">
            <a href="#cardapio" className="btn btn-primary">
              Ver Cardápio
            </a>

            <a
              href="https://wa.me/5511932351231"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              Pedir no WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="cardapio" className="section">
          <h2 className="section-title">Cardápio Imperial</h2>
          <p className="section-text">
            Escolha seu lanche e entre para a arena do sabor.
          </p>

          <div className="cards">
            <article className="card">
              <img
                src="/images/smash-classico.png"
                alt="Smash Clássico"
                className="card-img"
              />
              <div className="card-tag">Clássico</div>
              <h3>Smash Clássico</h3>
              <p>Pão brioche, smash burger, queijo e molho da casa.</p>
              <strong>R$ 22,90</strong>
            </article>

            <article className="card featured">
              <img
                src="/images/burguer-premium.png"
                alt="Burguer Premium"
                className="card-img"
              />
              <div className="card-tag">Premium</div>
              <h3>Burguer Premium</h3>
              <p>Hambúrguer artesanal, cheddar cremoso e bacon crocante