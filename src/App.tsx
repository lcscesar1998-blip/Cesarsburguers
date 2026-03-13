import React from "react";

export default function App() {
  const burgers = [
    {
      name: "Smash Clássico",
      price: "R$22",
      desc: "O guerreiro da linha de frente. Smash 90g, queijo e molho da casa.",
    },
    {
      name: "César Burguer",
      price: "R$28",
      desc: "O imperador da arena. Hambúrguer 120g, bacon e molho imperial.",
    },
    {
      name: "Burguer Premium",
      price: "R$32",
      desc: "A escolha dos que nasceram para dominar. Cheddar, bacon e cebola caramelizada.",
    },
    {
      name: "Burguer Duplo",
      price: "R$35",
      desc: "Força dobrada para vencer a arena. Dois hambúrgueres e queijo duplo.",
    },
  ];

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#d4af37", fontSize: 48 }}>CÉSAR'S BURGUER</h1>

        <p style={{ fontSize: 22, marginTop: 10 }}>
          Neste império, a fome é o inimigo dos gladiadores.
        </p>

        <p style={{ color: "#ccc", maxWidth: 560, margin: "20px auto" }}>
          Burgers artesanais com identidade imperial, sabor intenso e presença
          de arena.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 24,
          }}
        >
          <a
            href="https://wa.me/5511932351231"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#d4af37",
              color: "#000",
              padding: "14px 22px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Pedir no WhatsApp
          </a>

          <a
            href="#cardapio"
            style={{
              border: "1px solid #d4af37",
              color: "#d4af37",
              padding: "14px 22px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Ver Cardápio
          </a>
        </div>
      </section>

      <section style={{ padding: 40, textAlign: "center" }}>
        <h2 style={{ color: "#d4af37" }}>
          FORJADO NA CHAPA. SERVIDO COMO IMPÉRIO.
        </h2>

        <p style={{ maxWidth: 650, margin: "20px auto", color: "#bbb" }}>
          Na César's Burguer cada detalhe carrega a força da arena. Ingredientes
          selecionados, identidade forte e sabor digno de gladiadores.
        </p>
      </section>

      <section id="cardapio" style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", color: "#d4af37" }}>
          CARDÁPIO IMPERIAL
        </h2>

        <div style={{ maxWidth: 720, margin: "30px auto" }}>
          {burgers.map((item) => (
            <div
              key={item.name}
              style={{
                background: "#111",
                padding: 20,
                marginBottom: 15,
                borderRadius: 14,
                border: "1px solid #222",
              }}
            >
              <h3 style={{ marginBottom: 5 }}>{item.name}</h3>
              <p style={{ color: "#bbb", marginBottom: 10 }}>{item.desc}</p>
              <strong style={{ color: "#d4af37" }}>{item.price}</strong>
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign: "center", padding: 40 }}>
        <h2 style={{ color: "#d4af37" }}>ENTRE NA ARENA.</h2>
        <p style={{ fontSize: 18 }}>Escolha seu burger e derrote a fome.</p>
      </section>
    </div>
  );
}
