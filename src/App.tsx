import React, { useMemo, useState } from "react";
import "./styles.css";

const storeAddress =
  "Rua Quinta da Conraria, 38 - Parque Santo Antônio, São Paulo - SP - 05852-480";

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
    description: "Hambúrguer especial com molho da casa.",
  },
  {
    id: 4,
    name: "Burguer Duplo",
    price: 34.9,
    image: "/images/burguer-duplo.png",
    description: "Dois hambúrgueres artesanais com queijo e bacon.",
  },
];

function getDeliveryFee(distance: number) {
  if (distance <= 0) return 0;
  if (distance <= 2.5) return 3.5;
  if (distance <= 5) return 7;
  if (distance <= 10) return 12.5;
  return 17;
}

function getDeliveryLabel(distance: number) {
  if (distance <= 0) return "Informe a distância";
  if (distance <= 2.5) return "Até 2,5 km";
  if (distance <= 5) return "De 2,5 km até 5 km";
  if (distance <= 10) return "De 5 km até 10 km";
  return "Acima de 10 km";
}

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [notes, setNotes] = useState("");
  const [distance, setDistance] = useState<number | "">("");

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
      return;
    }

    setCart([...cart, { ...product, quantity: 1 }]);
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

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const numericDistance = typeof distance === "number" ? distance : 0;
  const deliveryFee = getDeliveryFee(numericDistance);
  const deliveryLabel = getDeliveryLabel(numericDistance);
  const total = subtotal + deliveryFee;

  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    if (!name.trim()) {
      alert("Informe o nome do cliente.");
      return;
    }

    if (!address.trim()) {
      alert("Informe o endereço de entrega.");
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

    const message = `Pedido - Cesar's Burguer

Cliente: ${name}
Endereço: ${address}

Pedido:
${items}

Subtotal: ${formatPrice(subtotal)}
Entrega: ${formatPrice(deliveryFee)} (${deliveryLabel})
Total: ${formatPrice(total)}

Pagamento: ${payment || "Não informado"}
Observações: ${notes || "Nenhuma"}

Origem da loja:
${storeAddress}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="app">
      <nav className="topbar">
        <a href="#inicio">Início</a>
        <a href="#cardapio">Cardápio</a>
        <a href="#pedido">Pedido</a>
      </nav>

      <header className="hero" id="inicio">
        <img
          src="/logo-cesars.png"
          alt="Logo Cesar's Burguer"
          className="hero-logo"
        />

        <h1>Cesar&apos;s Burguer</h1>

        <p className="subtitle">
          Nesse império a fome é o inimigo dos gladiadores.
        </p>

        <div className="delivery-banner">
          🚚 Delivery por faixa de distância
        </div>

        <div className="delivery-table">
          <span>Até 2,5 km = R$ 3,50</span>
          <span>2,5 a 5 km = R$ 7,00</span>
          <span>5 a 10 km = R$ 12,50</span>
          <span>Acima de 10 km = R$ 17,00</span>
        </div>
      </header>

      <section className="menu-section" id="cardapio">
        <h2>Cardápio</h2>

        <div className="cards">
          {products.map((product) => (
            <article className="card" key={product.id}>
              <div className="card-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img"
                />
              </div>

              <div className="card-body">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong>{formatPrice(product.price)}</strong>

                <button onClick={() => addToCart(product)}>Adicionar</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cart-section" id="pedido">
        <h2>Seu Pedido</h2>

        {cart.length === 0 && <p className="empty">Seu carrinho está vazio.</p>}

        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-item-info">
              <span className="cart-item-name">
                {item.name} ({item.quantity})
              </span>
              <small>{formatPrice(item.price * item.quantity)}</small>
            </div>

            <div className="cart-controls">
              <button onClick={() => decrease(item.id)}>-</button>
              <button onClick={() => increase(item.id)}>+</button>
            </div>
          </div>
        ))}

        <div className="totals-box">
          <h3>Subtotal: {formatPrice(subtotal)}</h3>

          <div className="delivery-calc">
            <label htmlFor="distance">Distância em km</label>

            <input
              id="distance"
              type="number"
              min="0"
              step="0.1"
              value={distance}
              onChange={(e) => {
                const value = e.target.value;
                setDistance(value === "" ? "" : Number(value));
              }}
              placeholder="Ex.: 4.5"
            />

            <p className="delivery-range">{deliveryLabel}</p>
            <p className="delivery-price">
              Entrega: {formatPrice(deliveryFee)}
            </p>
          </div>

          <h2 className="final-total">Total: {formatPrice(total)}</h2>
        </div>

        <div className="form">
          <input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Endereço completo"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
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
          Finalizar no WhatsApp
        </button>
      </section>

      <a href="#pedido" className="order-fixed">
        🛒 Pedido ({totalItems})
      </a>
    </div>
  );
}
