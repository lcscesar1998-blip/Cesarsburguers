import React from "react";

export default function App() {
  const burgers = [
    {
      name: "Smash Clássico",
      badge: "Guerreiro",
      price: "R$22",
      desc: "Smash 90g, queijo derretido e molho da casa.",
      highlight: "Entrada perfeita para a arena",
    },
    {
      name: "César Burguer",
      badge: "Imperador",
      price: "R$28",
      desc: "Hambúrguer 120g, bacon e molho imperial.",
      highlight: "O burger assinatura da casa",
    },
    {
      name: "Burguer Premium",
      badge: "Elite",
      price: "R$32",
      desc: "Cheddar, bacon crocante e cebola caramelizada.",
      highlight: "A escolha dos que dominam",
    },
    {
      name: "Burguer Duplo",
      badge: "Conquista",
      price: "R$35",
      desc: "Dois hambúrgueres, queijo duplo e molho especial.",
      highlight: "Força máxima contra a fome",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #020202 0%, #071633 45%, #000000 100%)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section style={{ padding: "70px 20px 50px", textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            border: "1px solid #d4af37",
            color: "#d4af37",
            padding: "8px 16px",
            borderRadius: 999,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          O IMPÉRIO DO SABOR
        </div>

        <h1 style={{ fontSize: 56, color: "#f5d66b", margin: 0 }}>
          CÉSAR'S BURGUER
        </h1>

        <p style={{ fontSize: 24, marginTop: 16 }}>
          Neste império, a fome é o inimigo dos gladiadores.
        </p>

        <p
          style={{ color: "#d7d7d7", maxWidth: 700, margin: "18px auto 28px" }}
        >
          Delivery com identidade imperial, visual marcante e burgers forjados
          para conquistar.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://wa.me/5511932351231"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#d4af37",
              color: "#000",
              padding: "14px 24px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: "bold",
              boxShadow: "0 8px 24px rgba(212,175,55,0.25)",
            }}
          >
            Pedir Agora
          </a>

          <a
            href="#menu"
            style={{
              border: "1px solid #4f83ff",
              color: "#89adff",
              padding: "14px 24px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Explorar Cardápio
          </a>
        </div>
      </section>

      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 30px" }}
      >
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {[
            [
              "Arena de Sabor",
              "Combinações fortes, identidade premium e presença marcante.",
            ],
            ["Pedido Rápido", "Um toque no WhatsApp e a conquista começa."],
            [
              "Marca Imperial",
              "Visual preto, dourado e azul para ser lembrado.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              style={{
                background: "rgba(10,10,10,0.85)",
                border: "1px solid rgba(212,175,55,0.18)",
                borderRadius: 18,
                padding: 22,
              }}
            >
              <h3 style={{ color: "#d4af37", marginTop: 0 }}>{title}</h3>
              <p style={{ color: "#c9c9c9", marginBottom: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="menu"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 60px" }}
      >
        <h2 style={{ textAlign: "center", color: "#f5d66b", fontSize: 36 }}>
          CARDÁPIO IMPERIAL
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#bdbdbd",
            maxWidth: 600,
            margin: "10px auto 30px",
          }}
        >
          Cada burger foi criado para transformar fome em conquista.
        </p>

        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {burgers.map((item) => (
            <div
              key={item.name}
              style={{
                background:
                  "linear-gradient(180deg, rgba(16,16,16,0.95), rgba(7,7,7,0.95))",
                border: "1px solid rgba(79,131,255,0.15)",
                borderRadius: 22,
                padding: 22,
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    background: "rgba(212,175,55,0.15)",
                    color: "#f5d66b",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontWeight: "bold",
                  }}
                >
                  {item.badge}
                </span>
                <strong style={{ color: "#d4af37", fontSize: 20 }}>
                  {item.price}
                </strong>
              </div>

              <h3 style={{ marginBottom: 8 }}>{item.name}</h3>
              <p style={{ color: "#dcdcdc", marginBottom: 10 }}>{item.desc}</p>
              <p style={{ color: "#89adff", margin: 0, fontWeight: "bold" }}>
                {item.highlight}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "10px 20px 70px" }}>
        <h2 style={{ color: "#d4af37", fontSize: 34 }}>
          Entre na arena. Vença a fome.
        </h2>
        <p style={{ color: "#cfcfcf", marginBottom: 28 }}>
          O império está aberto. Escolha seu burger e peça agora.
        </p>
        <a
          href="https://wa.me/5511932351231"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#1d4ed8",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: 12,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Fazer Pedido
        </a>
      </section>
    </div>
  );
}
