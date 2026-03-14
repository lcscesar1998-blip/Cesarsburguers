import React, { useState } from "react";
import "./styles.css";

const storeAddress =
  "Rua Quinta da Conraria, 38 - Parque Santo Antônio, São Paulo - SP";

const pricePerKm = 1.8;

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

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [notes, setNotes] = useState("");
  const [distance, setDistance] = useState(0);

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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = distance * pricePerKm;

  const total = subtotal + deliveryFee;

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

    const message = `Pedido - Cesar's Burguer

Cliente: ${name}
Endereço: ${address}

Pedido:
${items}

Subtotal: ${formatPrice(subtotal)}
Entrega (${distance} km): ${formatPrice(deliveryFee)}
Total: ${formatPrice(total)}

Pagamento: ${payment}
Obs: ${notes}

Loja:
${storeAddress}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="app">
      <header className="hero">
        <img src="/logo-cesars.png" className="hero-logo" />

        <h1>Cesar's Burguer</h1>

        <p>Nesse império a fome é o inimigo dos gladiadores</p>

        <p className="delivery-info">🚚 Entrega R$1,80 por km</p>
      </header>

      <section className="menu">
        <h2>Cardápio</h2>

        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} />

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

        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <span>
              {item.name} ({item.quantity})
            </span>

            <div>
              <button onClick={() => decrease(item.id)}>-</button>
              <button onClick={() => increase(item.id)}>+</button>
            </div>
          </div>
        ))}

        <h3>Subtotal: {formatPrice(subtotal)}</h3>

        <div className="delivery-calc">
          <label>Distância em KM:</label>

          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />

          <p>Entrega: {formatPrice(deliveryFee)}</p>
        </div>

        <h2>Total: {formatPrice(total)}</h2>

        <div className="form">
          <input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Endereço"
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
    </div>
  );
}
