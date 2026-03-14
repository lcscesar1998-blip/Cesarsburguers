import React, { useState } from "react";
import "./styles.css";

const products = [
  {
    id: 1,
    name: "Smash Clássico",
    price: 22.9,
    image: "/images/smash-classico.png",
    description: "Pão brioche, smash burger, queijo e molho da casa.",
  },
  {
    id: 2,
    name: "Burguer Premium",
    price: 29.9,
    image: "/images/burguer-premium.png",
    description: "Hambúrguer artesanal, cheddar e bacon crocante.",
  },
  {
    id: 3,
    name: "César Burguer",
    price: 27.9,
    image: "/images/cesar-burguer.png",
    description: "Hambúrguer artesanal especial com molho da casa.",
  },
  {
    id: 4,
    name: "Burguer Duplo",
    price: 34.9,
    image: "/images/burguer-duplo.png",
    description: "Dois hambúrgueres artesanais com queijo e bacon.",
  },
];

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [notes, setNotes] = useState("");

  const addToCart = (product: any) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increase = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio");
      return;
    }

    const phone = "5511932351231";

    const items = cart
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const message = `Olá! Quero fazer um pedido na Cesar's Burguer

Nome: ${name || "Não informado"}
Endereço: ${address || "Não informado"}
Pagamento: ${payment || "Não informado"}
Observações: ${notes || "Nenhuma"}

Pedido:
${items}

Subtotal: ${formatPrice(total)}
Taxa de entrega: R$1,80 por km (calculada conforme a distância)
Total final: Subtotal + taxa de entrega`;

    const url = "https://wa.me/${phone}?text=${encodeURIComponent(message)}";
    window.open(url, "_blank");
  };

  return (
    <div className="app">
      <header className="hero">
        <img
          src="/logo-cesars.png"
          alt="Logo Cesar's Burguer"
          className="hero-logo"
        />

        <h1>Cesar&apos;s Burguer</h1>

        <p className="subtitle">
          Nesse império a fome é o inimigo dos gladiadores.
        </p>
      </header>

      <section className="menu">
        <h2>Cardápio</h2>

        <p className="delivery-info">
          🚚 Taxa de entrega: R$1,80 por km a partir da loja
        </p>

        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="card-img"
              />

              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>{formatPrice(product.price)}</strong>

              <button onClick={() => addToCart(product)}>Adicionar</button>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <h2>Seu Pedido</h2>

        {cart.length === 0 && <p className="empty">Seu carrinho está vazio.</p>}

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>
              {item.name} ({item.quantity})
            </span>

            <div className="cart-controls">
              <button onClick={() => decrease(item.id)}>-</button>
              <button onClick={() => increase(item.id)}>+</button>
            </div>
          </div>
        ))}

        <h3>Subtotal: {formatPrice(total)}</h3>

        <p className="delivery-note-cart">
          Taxa de entrega: R$1,80 por km (calculada conforme a distância)
        </p>

        <div className="form">
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="Forma de pagamento"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />

          <textarea
            placeholder="Observações"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button className="whatsapp" onClick={sendOrderToWhatsApp}>
          Finalizar Pedido no WhatsApp
        </button>
      </section>

      <button className="order-fixed" onClick={sendOrderToWhatsApp}>
        🛒 Pedido ({totalItems})
      </button>
    </div>
  );
}
