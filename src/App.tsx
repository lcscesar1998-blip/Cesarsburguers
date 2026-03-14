export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <nav className="topbar">
          <div className="brand-mini">
            <img
              src="/logo-cesars.png"
              alt="Cesar's Burguer"
              className="brand-mini-logo"
            />
            <span>Cesar's Burguer</span>
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
            alt="Logo Cesar's Burguer"
            className="hero-logo"
          />

          <h1>
            O sabor de um <span>império</span>
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

              <p>Hambúrguer artesanal, cheddar cremoso e bacon crocante.</p>

              <strong>R$ 29,90</strong>
            </article>

            <article className="card">
              <img
                src="/images/cesar-burguer.png"
                alt="César Burguer"
                className="card-img"
              />

              <div className="card-tag">Especial</div>

              <h3>César Burguer</h3>

              <p>Hambúrguer artesanal com batata especial e molho da casa.</p>

              <strong>R$ 27,90</strong>
            </article>

            <article className="card">
              <img
                src="/images/burguer-duplo.png"
                alt="Burguer Duplo"
                className="card-img"
              />

              <div className="card-tag">Duplo</div>

              <h3>Burguer Duplo</h3>

              <p>Dois hambúrgueres artesanais com queijo e bacon.</p>

              <strong>R$ 34,90</strong>
            </article>
          </div>
        </section>

        <section id="combos" className="section">
          <h2 className="section-title">Combos Imperiais</h2>

          <p className="section-text">
            Monte seu combo perfeito com fritas e bebida.
          </p>

          <div className="cards">
            <article className="card">
              <div className="card-tag">Combo</div>

              <h3>Combo Arena</h3>

              <p>Smash Clássico + fritas + refrigerante.</p>

              <strong>R$ 34,90</strong>
            </article>

            <article className="card">
              <div className="card-tag">Combo</div>

              <h3>Combo Premium</h3>

              <p>Burguer Premium + fritas + refrigerante.</p>

              <strong>R$ 39,90</strong>
            </article>

            <article className="card">
              <div className="card-tag">Supremo</div>

              <h3>Combo César Supremo</h3>

              <p>Burguer Duplo + fritas + refrigerante.</p>

              <strong>R$ 44,90</strong>
            </article>
          </div>
        </section>

        <section id="pedido" className="section">
          <h2 className="section-title">Peça Agora</h2>

          <p className="section-text">
            Clique abaixo e fale direto com a Cesar's Burguer.
          </p>

          <div className="hero-buttons">
            <a
              href="https://wa.me/5511932351231"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Fazer Pedido no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <img
          src="/logo-cesars.png"
          alt="Logo Cesar's Burguer"
          className="footer-logo"
        />

        <p>Cesar's Burguer © 2026</p>
      </footer>
    </div>
  );
}
