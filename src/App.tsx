import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  tag: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Smash Clássico",
    price: 22.9,
    image: "/images/smash-classico.png",
    description: "Pão brioche, smash burger, queijo e molho da casa.",
    tag: "Clássico",
  },
  {
    id: 2,
    name: "Burguer Premium",
    price: 29.9,
    image: "/images/burguer-premium.png",
    description: "Hambúrguer artesanal, cheddar cremoso e bacon crocante.",
    tag: "Premium",
  },
  {
    id: 3,
    name: "César Burguer",
    price: 27.9,
    image: "/images/cesar-burguer.png",
    description: "Hambúrguer artesanal com batata especial e molho da casa.",
    tag: "Especial",
  },
  {
    id: 4,
    name: "Burguer Duplo",
    price: 34.9,
    image: "/images/burguer-duplo.png",
    description: "Dois hambúrgueres artesanais com queijo e bacon.",
    tag: "Duplo",
  },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [notes, setNotes] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

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
    
      const phone = "5511932351231";
    
      const itemsText = cart
        .map(
          (item) =>
            `- ${item.quantity}x ${item.name} — ${formatPrice(
              item.price * item.quantity
            )}`
        )
        .join("\n");
    
      const message = `Olá! Quero fazer um pedido na Cesar's Burguer:
    
    Nome: ${name || "Não informado"}
    Endereço: ${address || "Não informado"}
    Pagamento: ${payment || "Não informado"}
    Observações: ${notes || "Nenhuma"}
    
    Pedido:
    ${itemsText}
    
    Total: ${formatPrice(totalPrice)}`;
    
      const url = https://wa.me/${phone}?text=${encodeURIComponent(message)};
      window.open(url, "_blank");
    };

  return (
    <div className="app">
      <header className="hero">
        <div className="overlay" />

        <nav className="topbar">
          <div className="brand-mini">
            <img
              src="/logo-cesars.png"
              alt="Logo Cesar's Burguer"
              className="brand-mini-logo"
            />
            <span>Cesar&apos;s Burguer</span>
          </div>

          <div className="topbar-links">
            <a href="#cardapio">Cardápio</a>
            <a href="#combos">Combos</a>
            <button
              type="button"
              className="cart-toggle"
              onClick={() => setIsCartOpen(true)}
            >
              Carrinho ({totalItems})
            </button>
          </div>
