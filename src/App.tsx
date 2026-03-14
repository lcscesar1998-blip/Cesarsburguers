import React from "react";

export default function App(): JSX.Element {
  return (
    <div className="app">
      <header className="hero">
        <div className="overlay" />
        <div className="hero-content">
          <span className="badge">Versão Imperial 3.0</span>
          <h1>Cesar&apos;s Burguer</h1>
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
            Escolha seu combo e entre para a arena do sabor.
          </p>

          <div className="cards">
            <article className="card">
              <h3>Burguer Clássico</h3>
              <p>Pão brioche, hambúrguer artesanal, queijo, alface e tomate.</p>
              <strong>R$ 22,90</strong>
            </article>

            <article className="card featured">
              <h3>Imperial Bacon</h3>
              <p>
                Hambúrguer artesanal, cheddar cremoso, bacon crocante e molho da
                casa.
              </p>
              <strong>R$ 29,90</strong>
            </article>

            <article className="card">
              <h3>Duplo Gladiador</h3>
              <p>
                Dois hambúrgueres artesanais, queijo duplo, cebola caramelizada
                e molho especial.
              </p>
              <strong>R$ 34,90</strong>
            </article>
          </div>
        </section>

        <section className="section dark-section">
          <h2 className="section-title">Combos</h2>
          <div className="cards">
            <article className="card">
              <h3>Combo Arena</h3>
              <p>Burguer + fritas + refrigerante.</p>
              <strong>R$ 34,90</strong>
            </article>

            <article className="card">
              <h3>Combo Coliseu</h3>
              <p>Imperial Bacon + fritas + refrigerante.</p>
              <strong>R$ 39,90</strong>
            </article>

            <article className="card">
              <h3>Combo César Supremo</h3>
              <p>Duplo Gladiador + fritas + refrigerante + sobremesa.</p>
              <strong>R$ 49,90</strong>
            </article>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Peça Agora</h2>
          <p className="section-text">
            Atendimento rápido, visual premium e pedido direto pelo WhatsApp.
          </p>

          <div className="cta-box">
            <a
              href="https://wa.me/5511932351231"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Fazer Pedido
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Cesar&apos;s Burguer © 2026 - Versão Imperial 3.0</p>
      </footer>
    </div>
  );
}
