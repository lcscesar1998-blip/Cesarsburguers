import React, { useMemo, useState } from "react";
import "./styles.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
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

function calcularEntregaPorRegiao(
  bairro: string,
  cidade: string,
  uf: string
): { fee: number; faixa: string } {
  const bairroNormalizado = bairro.toLowerCase().trim();
  const cidadeNormalizada = cidade.toLowerCase().trim();
  const ufNormalizada = uf.toLowerCase().trim();

  if (
    (cidadeNormalizada !== "são paulo" && cidadeNormalizada !== "sao paulo") ||
    ufNormalizada !== "sp"
  ) {
    return { fee: 17, faixa: "Acima de 10 km" };
  }

  if (
    bairroNormalizado.includes("parque santo antônio") ||
    bairroNormalizado.includes("parque santo antonio")
  ) {
    return { fee: 3.5, faixa: "Até 2,5 km" };
  }

  if (
    bairroNormalizado.includes("capão redondo") ||
    bairroNormalizado.includes("capao redondo") ||
    bairroNormalizado.includes("jardim são luís") ||
    bairroNormalizado.includes("jardim sao luis")
  ) {
    return { fee: 7, faixa: "De 2,5 km até 5 km" };
  }

  if (
    bairroNormalizado.includes("campo limpo") ||
    bairroNormalizado.includes("jardim ângela") ||
    bairroNormalizado.includes("jardim angela") ||
    bairroNormalizado.includes("vila das belezas")
  ) {
    return { fee: 12.5, faixa: "De 5 km até 10 km" };
  }

  return { fee: 17, faixa: "Acima de 10 km" };
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [payment, setPayment] = useState("");
  const [notes, setNotes] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [deliveryRange, setDeliveryRange] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const total = subtotal + (deliveryFee ?? 0);

  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const updateTotalItems = (updatedCart: CartItem[]) => {
    const totalQuantidade = updatedCart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setTotalItems(totalQuantidade);
  };

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    let updatedCart: CartItem[];

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    updateTotalItems(updatedCart);
  };

  const increase = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCart(updatedCart);
    updateTotalItems(updatedCart);
  };

  const decrease = (id: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    updateTotalItems(updatedCart);
  };

  const buscarCep = async () => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setCepError("Digite um CEP válido com 8 números.");
      setAddress("");
      setDeliveryFee(null);
      setDeliveryRange("");
      return;
    }

    try {
      setLoadingCep(true);
      setCepError("");

      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado.");
        setAddress("");
        setDeliveryFee(null);
        setDeliveryRange("");
        return;
      }

      const enderecoCompleto = `${data.logradouro || ""}${
        data.bairro ? ` - ${data.bairro}` : ""
      }${data.localidade ? ` - ${data.localidade}` : ""}${
        data.uf ? ` - ${data.uf}` : ""
      }`;

      setAddress(enderecoCompleto);

      const entrega = calcularEntregaPorRegiao(
        data.bairro || "",
        data.localidade || "",
        data.uf || ""
      );

      setDeliveryFee(entrega.fee);
      setDeliveryRange(entrega.faixa);
    } catch (error) {
      setCepError("Não foi possível consultar o CEP.");
      setAddress("");
      setDeliveryFee(null);
      setDeliveryRange("");
    } finally {
      setLoadingCep(false);
    }
  };

  const enviarPedido = () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    if (!name.trim()) {
      alert("Informe seu nome.");
      return;
    }

    if (!cep.trim()) {
      alert("Informe o CEP.");
      return;
    }

    const itens = cart
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const enderecoFinal = `${address}${number ? `, nº ${number}` : ""}${
      complement ? ` - ${complement}` : ""
    }`;

    const message = `Pedido - Cesar's Burguer

Cliente: ${name}
CEP: ${cep}
Endereço: ${enderecoFinal}

Pedido:
${itens}

Subtotal: ${formatPrice(subtotal)}
${
  deliveryFee !== null
    ? `Entrega: ${formatPrice(deliveryFee)} (${deliveryRange})`
    : "Entrega: a confirmar"
}
Total: ${formatPrice(total)}

Pagamento: ${payment || "Não informado"}
Observações: ${notes || "Nenhuma"}`;

    const url = `https://wa.me/5511932351231?text=${encodeURIComponent(
      message
    )}`;

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
        <div className="hero-overlay"></div>
        <div className="hero-smoke"></div>
        <div className="hero-smoke hero-smoke-2"></div>
        <div className="hero-smoke hero-smoke-3"></div>

        <img
          src="/logo-cesars.png"
          alt="Logo Cesar's Burguer"
          className="hero-logo"
        />

        <h1 className="hero-title">Cesar&apos;s Burguer</h1>

        <div className="hero-copy-box">
          <p className="subtitle">
            Hambúrgueres artesanais forjados em{" "}
            <span className="magma-fire">magma</span> para verdadeiros
            gladiadores.
          </p>

          <p className="hero-small">
            Sabor marcante, identidade forte e pedido rápido direto pelo site.
          </p>

          <a href="#cardapio" className="hero-button">
            Escolher meu Burger
          </a>
        </div>
      </header>

      <section className="benefits-section">
        <div className="benefit-card">🔥 Carne artesanal</div>
        <div className="benefit-card">🧀 Ingredientes selecionados</div>
        <div className="benefit-card">⚡ Pedido rápido</div>
        <div className="benefit-card">🚚 Delivery na região</div>
      </section>

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

          <div className="form">
            <input
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="cep-row">
              <input
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />

              <button
                type="button"
                className="cep-button"
                onClick={buscarCep}
                disabled={loadingCep}
              >
                {loadingCep ? "Buscando..." : "Buscar CEP"}
              </button>
            </div>

            {cepError && <p className="cep-error">{cepError}</p>}

            {address && <p className="address-preview">{address}</p>}

            <input
              placeholder="Número"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <input
              placeholder="Complemento"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
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

          {deliveryFee !== null && (
            <div className="delivery-box">
              <p>Entrega: {formatPrice(deliveryFee)}</p>
              <p>Faixa: {deliveryRange}</p>
            </div>
          )}

          <h2 className="final-total">Total: {formatPrice(total)}</h2>
        </div>

        <button className="whatsapp" onClick={enviarPedido}>
          Finalizar no WhatsApp
        </button>
      </section>

      <a href="#pedido" className="order-fixed">
        🛒 Pedido ({totalItems})
      </a>
    </div>
  );
}
