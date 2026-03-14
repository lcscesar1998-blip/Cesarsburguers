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
              alt="Logo Cesar's Burguer"
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

          <span className="badge">Versão Imperial 4.0</span>

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
              href="https://wa.me/5511984239383"
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
              <div className="card-tag">Clássico</div>
              <h3>Burguer Clássico</h3>
              <p>Pão brioche, hambúrguer artesanal, queijo, alface e tomate.</p>
              <strong>R$ 22,90</strong>
            </article>

            <article className="card featured">
              <div className="card-tag">Mais pedido</div>
              <h3>Imperial Bacon</h3>
              <p>
                Hambúrguer artesanal, cheddar cremoso, bacon crocante e molho da
                casa.
              </p>
              <strong>R$ 29,90</strong>
            </article>

            <article className="card">
              <div className="card-tag">Premium</div>
              <h3>Duplo Gladiador</h3>
              <p>
                Dois hambúrgueres artesanais, queijo duplo, cebola caramelizada
                e molho especial.
              </p>
              <strong>R$ 34,90</strong>
            </article>
          </div>
        </section>

        <section id="combos" className="section dark-section">
          <h2 className="section-title">Combos Imperiais</h2>
          <p className="section-text">
            Monte seu ataque perfeito com fritas e bebida.
          </p>

          <div className="cards">
            <article className="card">
              <div className="card-tag">Combo</div>
              <h3>Combo Arena</h3>
              <p>Burguer + fritas + refrigerante.</p>
              <strong>R$ 34,90</strong>
            </article>

            <article className="card">
              <div className="card-tag">Combo</div>
              <h3>Combo Coliseu</h3>
              <p>Imperial Bacon + fritas + refrigerante.</p>
              <strong>R$ 39,90</strong>
            </article>

            <article className="card">
              <div className="card-tag">Supremo</div>
              <h3>Combo César Supremo</h3>
              <p>Duplo Gladiador + fritas + refrigerante + sobremesa.</p>
              <strong>R$ 49,90</strong>
            </article>
          </div>
        </section>

        <section className="section info-grid">
          <div className="info-box">
            <h3>Entrega rápida</h3>
            <p>Pedido direto no WhatsApp com atendimento ágil.</p>
          </div>

          <div className="info-box">
            <h3>Visual premium</h3>
            <p>Marca forte, experiência moderna e presença profissional.</p>
          </div>

          <div className="info-box">
            <h3>Sabor marcante</h3>
            <p>Combinações feitas para quem quer comer de verdade.</p>
          </div>
        </section>

        <section id="pedido" className="section cta-section">
          <h2 className="section-title">Peça Agora</h2>
          <p className="section-text">
            Clique no botão abaixo e fale direto com a Cesar's Burguer.
          </p>

          <div className="cta-box">
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

      <a
        href="https://wa.me/5511932351231"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
      >
        Pedir agora
      </a>

      <footer className="footer">
        <img
          src="/logo-cesars.png"
          alt="Logo Cesar's Burguer"
          className="footer-logo"
        />
        <p>Cesar&apos;s Burguer © 2026 - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
