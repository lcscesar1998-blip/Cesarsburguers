import React from "react";

export default function App() {
  const burgers = [
    {
      name: "Smash Clássico",
      price: "R$22",
      desc: "Pão brioche, smash 90g, queijo e molho da casa.",
    },
    {
      name: "César Burguer",
      price: "R$28",
      desc: "Hambúrguer 120g, queijo, bacon e molho imperial.",
    },
    {
      name: "Burguer Premium",
      price: "R$32",
      desc: "Cheddar, bacon crocante e cebola caramelizada.",
    },
    {
      name: "Burguer Duplo",
      price: "R$35",
      desc: "Dois hambúrgueres, queijo duplo e molho especial.",
    },
  ];

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: 40,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#d4af37", fontSize: 42, marginBottom: 10 }}>
        CÉSAR'S BURGUER
      </h1>

      <p style={{ marginTop: 0, marginBottom: 20 }}>
        O sabor digno de um imperador.
      </p>

      <a
        href="https://wa.me/5511932351231"
        target="_blank"
        rel="noreferrer"
        style={{
          background: "#d4af37",
          color: "#000",
          padding: "12px 18px",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: "bold",
          display: "inline-block",
        }}
      >
        Pedir no WhatsApp
      </a>

      <h2 style={{ marginTop: 40 }}>Cardápio</h2>

      {burgers.map((item) => (
        <div
          key={item.name}
          style={{
            background: "#111",
            padding: 20,
            marginTop: 12,
            borderRadius: 10,
            border: "1px solid #222",
          }}
        >
          <h3 style={{ margin: "0 0 8px 0" }}>{item.name}</h3>
          <p style={{ margin: "0 0 8px 0", color: "#ddd" }}>{item.desc}</p>
          <strong style={{ color: "#d4af37" }}>{item.price}</strong>
        </div>
      ))}
    </div>
  );
}
