import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

type Category = "promos" | "burgers" | "sides" | "drinks350" | "drinks600";

type ExtraOption = {
  id: string;
  label: string;
  price: number;
};

type MenuItem = {
  id: string;
  name: string;
  image?: string;
  category: Category;
  description: string;
  price: number;
  badge?: string;
  customizable?: boolean;
  baseIngredients?: string[];
  extraOptions?: ExtraOption[];
};

type CartItem = {
  uid: string;
  itemId: string;
  name: string;
  category: Category;
  quantity: number;
  basePrice: number;
  unitPrice: number;
  removedIngredients: string[];
  extras: ExtraOption[];
  notes: string;
};

type ViaCepResponse = {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

type CustomerProfile = {
  name: string;
  phone: string;
  email: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  payment: string;
  saveProfile: boolean;
};

const STORAGE_KEY = "cesars-burguer-profile-v3";

const menuItems: MenuItem[] = [
  {
    id: "promo-gladiador",
    name: "Combo Gladiador",
    image: "/images/combo-gladiador.png",
    category: "promos",
    description: "1 César's Burguer + Batata Normal + Refrigerante 350 ml.",
    price: 39.9,
    badge: "Promo",
  },
  {
    id: "promo-dupla",
    name: "Promo Dupla de Arena",
    image: "/images/combo-dupla-arena.png",
    category: "promos",
    description:
      "2 Smash Clássico + 1 Batata Rústica + 2 Refrigerantes 350 ml.",
    price: 74.9,
    badge: "Casal",
  },
  {
    id: "promo-imperador",
    name: "Combo Imperador",
    image: "/images/combo-imperador.png",
    category: "promos",
    description: "1 Burguer Premium + Anéis de Cebola + Refrigerante 600 ml.",
    price: 49.9,
    badge: "Top",
  },

  {
    id: "smash-classico",
    name: "Smash Clássico",
    image: "/images/smash.png",
    category: "burgers",
    description: "Pão brioche, smash burger, queijo, picles e molho da casa.",
    price: 22.9,
    badge: "Best-seller",
    customizable: true,
    baseIngredients: [
      "Pão brioche",
      "Smash burger 120 g",
      "Queijo prato",
      "Picles",
      "Molho da casa",
    ],
    extraOptions: [
      { id: "extra-cheddar", label: "Cheddar extra", price: 4.5 },
      { id: "extra-bacon", label: "Bacon crocante", price: 5.5 },
      { id: "extra-ovo", label: "Ovo", price: 3.5 },
    ],
  },
  {
    id: "cesars-burguer",
    name: "César's Burguer",
    image: "/images/cesar.png",
    category: "burgers",
    description: "Hambúrguer especial, queijo, alface, tomate e molho da casa.",
    price: 27.9,
    badge: "Casa",
    customizable: true,
    baseIngredients: [
      "Pão brioche",
      "Hambúrguer artesanal 150 g",
      "Queijo prato",
      "Alface",
      "Tomate",
      "Molho da casa",
    ],
    extraOptions: [
      { id: "extra-cheddar-c", label: "Cheddar extra", price: 4.5 },
      { id: "extra-bacon-c", label: "Bacon crocante", price: 5.5 },
      { id: "extra-cebola-c", label: "Cebola caramelizada", price: 4.0 },
    ],
  },
  {
    id: "burguer-premium",
    name: "Burguer Premium",
    image: "/images/premium.png",
    category: "burgers",
    description: "Hambúrguer artesanal, cheddar, bacon crocante e cebola roxa.",
    price: 29.9,
    badge: "Premium",
    customizable: true,
    baseIngredients: [
      "Pão brioche",
      "Hambúrguer artesanal 180 g",
      "Cheddar",
      "Bacon crocante",
      "Cebola roxa",
      "Molho especial",
    ],
    extraOptions: [
      { id: "extra-queijo-p", label: "Queijo extra", price: 4.5 },
      { id: "extra-bacon-p", label: "Bacon extra", price: 5.5 },
      { id: "extra-ovo-p", label: "Ovo", price: 3.5 },
    ],
  },
  {
    id: "burguer-duplo",
    name: "Burguer Duplo",
    image: "/images/duplo.png",
    category: "burgers",
    description: "Dois hambúrgueres, queijo, bacon e molho especial.",
    price: 34.9,
    badge: "Fome braba",
    customizable: true,
    baseIngredients: [
      "Pão brioche",
      "2 hambúrgueres artesanais",
      "Queijo prato",
      "Bacon crocante",
      "Molho especial",
    ],
    extraOptions: [
      { id: "extra-queijo", label: "Queijo extra", price: 4.5 },
      { id: "extra-bacon", label: "Bacon", price: 5.5 },
      { id: "extra-alface", label: "Alface", price: 2 },
      { id: "extra-tomate", label: "Tomate", price: 2 },
    ],
  },

  {
    id: "batata-normal",
    name: "Batata Normal",
    image: "/images/batata.png",
    category: "sides",
    description: "Porção de batata crocante tradicional.",
    price: 14.9,
    badge: "Acompanhamento",
  },
  {
    id: "batata-normal-cheddar",
    name: "Batata Normal com Cheddar",
    image: "/images/batata-cheddar-bacon.png",
    category: "sides",
    description: "Batata tradicional com cheddar cremoso.",
    price: 18.9,
    badge: "Cheddar",
  },
  {
    id: "batata-rustica",
    name: "Batata Rústica",
    image: "/images/batata-rustica.png",
    category: "sides",
    description: "Porção de batata rústica temperada.",
    price: 17.9,
    badge: "Rústica",
  },
  {
    id: "batata-rustica-cheddar",
    name: "Batata Rústica com Cheddar",
    image: "/images/batata-rustica-cheddar-bacon.png",
    category: "sides",
    description: "Batata rústica com cheddar cremoso.",
    price: 21.9,
    badge: "Premium",
  },
  {
    id: "aneis-cebola",
    name: "Anéis de Cebola",
    image: "/images/aneis-cebola.png",
    category: "sides",
    description: "Porção de onion rings crocantes.",
    price: 19.9,
    badge: "Crunch",
  },

  {
    id: "coca-350",
    name: "Coca-Cola 350 ml",
    image: "/images/coca.png",
    category: "drinks350",
    description: "Lata gelada 350 ml.",
    price: 6.5,
  },
  {
    id: "guarana-350",
    name: "Guaraná 350 ml",
    image: "/images/guarana.png",
    category: "drinks350",
    description: "Lata gelada 350 ml.",
    price: 6.5,
  },
  {
    id: "fanta-350",
    name: "Fanta 350 ml",
    image: "/images/fanta.png",
    category: "drinks350",
    description: "Lata gelada 350 ml.",
    price: 6.5,
  },

  {
    id: "coca-600",
    name: "Coca-Cola 600 ml",
    image: "/images/coca.png",
    category: "drinks600",
    description: "Garrafa gelada 600 ml.",
    price: 9.9,
  },
  {
    id: "guarana-600",
    name: "Guaraná 600 ml",
    image: "/images/guarana.png",
    category: "drinks600",
    description: "Garrafa gelada 600 ml.",
    price: 9.9,
  },
  {
    id: "fanta-600",
    name: "Fanta 600 ml",
    image: "/images/fanta.png",
    category: "drinks600",
    description: "Garrafa gelada 600 ml.",
    price: 9.9,
  },
];

const categoryLabels: Record<Category, string> = {
  promos: "Promoções",
  burgers: "Lanches",
  sides: "Acompanhamentos",
  drinks350: "Refrigerantes 350 ml",
  drinks600: "Refrigerantes 600 ml",
};

const categoryOrder: Category[] = [
  "promos",
  "burgers",
  "sides",
  "drinks350",
  "drinks600",
];

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

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

function uid(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getCategoryIcon(category: Category): string {
  switch (category) {
    case "promos":
      return "🏆";
    case "burgers":
      return "🍔";
    case "sides":
      return "🍟";
    case "drinks350":
    case "drinks600":
      return "🥤";
    default:
      return "⭐";
  }
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("promos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [customNotes, setCustomNotes] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [deliveryRange, setDeliveryRange] = useState("");
  const [addressPreview, setAddressPreview] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");

  const [customer, setCustomer] = useState<CustomerProfile>({
    name: "",
    phone: "",
    email: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    payment: "Pix",
    saveProfile: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<CustomerProfile>;
      setCustomer((current) => ({
        ...current,
        ...parsed,
        saveProfile: true,
      }));
    } catch {
      /* ignore */
    }
  }, []);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const total = subtotal + (deliveryFee ?? 0);

  const activeItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const customizerPrice = useMemo(() => {
    if (!selectedItem) return 0;
    return (
      selectedItem.price +
      selectedExtras.reduce((sum, extra) => sum + extra.price, 0)
    );
  }, [selectedItem, selectedExtras]);

  function updateCustomer<K extends keyof CustomerProfile>(
    field: K,
    value: CustomerProfile[K]
  ) {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }

  function openCustomizer(item: MenuItem) {
    setSelectedItem(item);
    setRemovedIngredients([]);
    setSelectedExtras([]);
    setCustomNotes("");
  }

  function closeCustomizer() {
    setSelectedItem(null);
    setRemovedIngredients([]);
    setSelectedExtras([]);
    setCustomNotes("");
  }

  function toggleIngredient(ingredient: string) {
    setRemovedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  }

  function toggleExtra(extra: ExtraOption) {
    setSelectedExtras((prev) => {
      const exists = prev.some((item) => item.id === extra.id);
      return exists
        ? prev.filter((item) => item.id !== extra.id)
        : [...prev, extra];
    });
  }

  function addSimpleItem(item: MenuItem) {
    const cartItem: CartItem = {
      uid: uid(),
      itemId: item.id,
      name: item.name,
      category: item.category,
      quantity: 1,
      basePrice: item.price,
      unitPrice: item.price,
      removedIngredients: [],
      extras: [],
      notes: "",
    };

    setCart((prev) => [...prev, cartItem]);
  }

  function addCustomizedItem() {
    if (!selectedItem) return;

    const cartItem: CartItem = {
      uid: uid(),
      itemId: selectedItem.id,
      name: selectedItem.name,
      category: selectedItem.category,
      quantity: 1,
      basePrice: selectedItem.price,
      unitPrice: customizerPrice,
      removedIngredients,
      extras: selectedExtras,
      notes: customNotes.trim(),
    };

    setCart((prev) => [...prev, cartItem]);
    closeCustomizer();
  }

  function increaseItem(uidToUpdate: string) {
    setCart((prev) =>
      prev.map((item) =>
        item.uid === uidToUpdate
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseItem(uidToUpdate: string) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.uid === uidToUpdate
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  async function buscarCep() {
    const cepLimpo = customer.cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setCepError("Digite um CEP válido com 8 números.");
      setAddressPreview("");
      setDeliveryFee(null);
      setDeliveryRange("");
      return;
    }

    try {
      setCepLoading(true);
      setCepError("");

      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado.");
        setAddressPreview("");
        setDeliveryFee(null);
        setDeliveryRange("");
        return;
      }

      const enderecoCompleto = `${data.logradouro || ""}${
        data.bairro ? ` - ${data.bairro}` : ""
      }${data.localidade ? ` - ${data.localidade}` : ""}${
        data.uf ? ` - ${data.uf}` : ""
      }`;

      setAddressPreview(enderecoCompleto);
      updateCustomer("address", data.logradouro || "");

      const entrega = calcularEntregaPorRegiao(
        data.bairro || "",
        data.localidade || "",
        data.uf || ""
      );

      setDeliveryFee(entrega.fee);
      setDeliveryRange(entrega.faixa);
    } catch {
      setCepError("Não foi possível consultar o CEP.");
      setAddressPreview("");
      setDeliveryFee(null);
      setDeliveryRange("");
    } finally {
      setCepLoading(false);
    }
  }

  function saveProfile() {
    const payload = {
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      cep: customer.cep,
      address: customer.address,
      number: customer.number,
      complement: customer.complement,
      payment: customer.payment,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  function enviarPedido() {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    if (!customer.name.trim()) {
      alert("Informe o nome do cliente.");
      return;
    }

    if (!customer.phone.trim()) {
      alert("Informe o telefone do cliente.");
      return;
    }

    if (!customer.cep.trim()) {
      alert("Informe o CEP para calcular a entrega.");
      return;
    }

    if (!customer.address.trim()) {
      alert("Busque o CEP e confirme o endereço.");
      return;
    }

    if (customer.saveProfile) {
      saveProfile();
    }

    const itens = cart
      .map((item) => {
        const extrasText =
          item.extras.length > 0
            ? ` | extras: ${item.extras
                .map((extra) => `${extra.label} (+${formatPrice(extra.price)})`)
                .join(", ")}`
            : "";

        const removedText =
          item.removedIngredients.length > 0
            ? ` | retirar: ${item.removedIngredients.join(", ")}`
            : "";

        const notesText = item.notes ? ` | obs: ${item.notes}` : "";

        return `${item.quantity}x ${item.name} - ${formatPrice(
          item.unitPrice * item.quantity
        )}${extrasText}${removedText}${notesText}`;
      })
      .join("\n");

    const enderecoFinal = `${customer.address}${
      customer.number ? `, nº ${customer.number}` : ""
    }${customer.complement ? ` - ${customer.complement}` : ""}`;

    const message = `Pedido - Cesar's Burguer

Cliente: ${customer.name}
Telefone: ${customer.phone}
E-mail: ${customer.email || "Não informado"}
CEP: ${customer.cep}
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

Pagamento: ${customer.payment || "Não informado"}
Observações gerais: ${generalNotes || "Nenhuma"}`;

    const url = `https://wa.me/5511932351231?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  }

  return (
    <div className="app" translate="no">
      <nav className="topbar">
        <a href="#inicio">Início</a>
        <a href="#promocoes">Promoções</a>
        <a href="#cardapio">Cardápio</a>
        <a href="#pedido">Pedido</a>
      </nav>

      <header className="hero" id="inicio">
        <div className="hero-overlay"></div>
        <div className="hero-smoke"></div>
        <div className="hero-smoke hero-smoke-2"></div>
        <div className="hero-smoke hero-smoke-3"></div>

        <div className="hero-mark" aria-label="Marca Cesar's Burguer">
          <div className="hero-mark-ring"></div>
          <div className="hero-mark-center">
            <img
              src="/logo.png"
              className="hero-logo-center"
              alt="Logo Cesar's Burguer"
            />
          </div>
        </div>

        <h1 className="hero-title">Cesar&apos;s Burguer</h1>

        <div className="hero-copy-box">
          <p className="subtitle">
            Hambúrgueres artesanais forjados em{" "}
            <span className="magma-fire">magma</span> para verdadeiros
            gladiadores.
          </p>

          <p className="hero-small">
            FOME DE LEÃO, TE PREPARAMOS PARA A ARENA.
          </p>

          <div className="hero-cta-group">
            <a href="#cardapio" className="hero-button">
              Escolher meu Burger
            </a>
            <a href="#pedido" className="hero-button secondary">
              Finalizar pedido
            </a>
          </div>
        </div>
      </header>

      <section className="promotions-section" id="promocoes">
        <div className="section-header">
          <span className="section-kicker">Promoções da casa</span>
          <h2>Combos de vencedores para vencedores</h2>
        </div>

        <div className="promo-grid">
          {menuItems
            .filter((item) => item.category === "promos")
            .map((item) => (
              <article className="promo-card" key={item.id}>
                {item.image && (
                  <img src={item.image} alt={item.name} className="promo-img" />
                )}
                <span className="promo-tag">{item.badge || "Promo"}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <strong>{formatPrice(item.price)}</strong>
                <button onClick={() => addSimpleItem(item)}>
                  Adicionar promoção
                </button>
              </article>
            ))}
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefit-card">🔥 Carne artesanal</div>
        <div className="benefit-card">🧀 Montagem premium</div>
        <div className="benefit-card">⚡ Pedido rápido</div>
        <div className="benefit-card">🚚 Entrega por CEP</div>
      </section>

      <section className="menu-section" id="cardapio">
        <div className="section-header">
          <span className="section-kicker">Cardápio completo</span>
          <h2>Equipe seu o pedido do seu jeito </h2>
        </div>

        <div className="category-tabs">
          {categoryOrder.map((category) => (
            <button
              key={category}
              className={category === activeCategory ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              <span>{getCategoryIcon(category)}</span>
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        <div className="cards">
          {activeItems.map((item) => (
            <article className="card" key={item.id}>
              <div className="card-media">
                <span className="card-badge">
                  {item.badge || getCategoryIcon(item.category)}
                </span>
                {item.image ? (
                  <img src={item.image} alt={item.name} className="card-img" />
                ) : (
                  <div className={`card-visual ${item.category}`}>
                    {getCategoryIcon(item.category)}
                  </div>
                )}
              </div>
              <div className="card-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <strong>{formatPrice(item.price)}</strong>

                {item.customizable ? (
                  <button onClick={() => openCustomizer(item)}>
                    Personalizar lanche
                  </button>
                ) : (
                  <button onClick={() => addSimpleItem(item)}>Adicionar</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cart-section" id="pedido">
        <div className="section-header left">
          <span className="section-kicker">Cadastro + checkout</span>
          <h2>Seu Pedido</h2>
          <p>
            Cadastre o cliente, calcule a entrega e envie tudo direto no
            WhatsApp.
          </p>
        </div>

        {cart.length === 0 && <p className="empty">Seu carrinho está vazio.</p>}

        {cart.length > 0 && (
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.uid}>
                <div className="cart-item-info">
                  <span className="cart-item-name">
                    {item.name} ({item.quantity})
                  </span>
                  <small>{formatPrice(item.unitPrice * item.quantity)}</small>

                  {item.extras.length > 0 && (
                    <small className="cart-meta">
                      Extras:{" "}
                      {item.extras.map((extra) => extra.label).join(", ")}
                    </small>
                  )}

                  {item.removedIngredients.length > 0 && (
                    <small className="cart-meta">
                      Retirar: {item.removedIngredients.join(", ")}
                    </small>
                  )}

                  {item.notes && (
                    <small className="cart-meta">Obs: {item.notes}</small>
                  )}
                </div>

                <div className="cart-controls">
                  <button onClick={() => decreaseItem(item.uid)}>-</button>
                  <button onClick={() => increaseItem(item.uid)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="checkout-grid">
          <div className="totals-box">
            <h3>Subtotal: {formatPrice(subtotal)}</h3>

            {deliveryFee !== null && (
              <div className="delivery-box">
                <p>Entrega: {formatPrice(deliveryFee)}</p>
                <p>Faixa: {deliveryRange}</p>
              </div>
            )}

            <h2 className="final-total">Total: {formatPrice(total)}</h2>
          </div>

          <div className="customer-box">
            <h3>Cadastro do cliente</h3>

            <div className="form">
              <input
                placeholder="Nome do cliente"
                value={customer.name}
                onChange={(e) => updateCustomer("name", e.target.value)}
              />

              <input
                placeholder="Telefone / WhatsApp"
                value={customer.phone}
                onChange={(e) => updateCustomer("phone", e.target.value)}
              />

              <input
                placeholder="E-mail (opcional)"
                value={customer.email}
                onChange={(e) => updateCustomer("email", e.target.value)}
              />

              <div className="cep-row">
                <input
                  placeholder="Digite o CEP"
                  value={customer.cep}
                  onChange={(e) => updateCustomer("cep", e.target.value)}
                />

                <button
                  type="button"
                  className="cep-button"
                  onClick={buscarCep}
                  disabled={cepLoading}
                >
                  {cepLoading ? "Buscando..." : "Buscar CEP"}
                </button>
              </div>

              {cepError && <p className="cep-error">{cepError}</p>}
              {addressPreview && (
                <p className="address-preview">{addressPreview}</p>
              )}

              <input
                placeholder="Rua / Logradouro"
                value={customer.address}
                onChange={(e) => updateCustomer("address", e.target.value)}
              />

              <div className="double-grid">
                <input
                  placeholder="Número"
                  value={customer.number}
                  onChange={(e) => updateCustomer("number", e.target.value)}
                />
                <input
                  placeholder="Complemento"
                  value={customer.complement}
                  onChange={(e) => updateCustomer("complement", e.target.value)}
                />
              </div>

              <select
                value={customer.payment}
                onChange={(e) => updateCustomer("payment", e.target.value)}
              >
                <option value="Pix">Pix</option>
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
              {(customer.payment === "Débito" ||
                customer.payment === "Crédito") && (
                <p className="payment-info">Levar maquininha na entrega.</p>
              )}

              {customer.payment === "Dinheiro" && (
                <input
                  placeholder="Troco para quanto?"
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                />
              )}

              <textarea
                placeholder="Observações gerais do pedido"
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
              />

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={customer.saveProfile}
                  onChange={(e) =>
                    updateCustomer("saveProfile", e.target.checked)
                  }
                />
                <span>Salvar cadastro neste aparelho</span>
              </label>
            </div>

            <button className="whatsapp" onClick={enviarPedido}>
              Finalizar no WhatsApp
            </button>
          </div>
        </div>
      </section>

      <a href="#pedido" className="order-fixed">
        🛒 Pedido ({totalItems})
      </a>

      {selectedItem && (
        <div className="modal-backdrop" onClick={closeCustomizer}>
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-top">
              <div>
                <span className="section-kicker">Personalização premium</span>
                <h3>{selectedItem.name}</h3>
                <p>{selectedItem.description}</p>
              </div>

              <button className="close-button" onClick={closeCustomizer}>
                ×
              </button>
            </div>

            <div className="modal-section">
              <h4>Retirar ingredientes</h4>
              <div className="chips">
                {selectedItem.baseIngredients?.map((ingredient) => {
                  const active = removedIngredients.includes(ingredient);
                  return (
                    <button
                      key={ingredient}
                      type="button"
                      className={active ? "chip remove active" : "chip remove"}
                      onClick={() => toggleIngredient(ingredient)}
                    >
                      {active ? "Retirado" : ingredient}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="modal-section">
              <h4>Adicionar extras</h4>
              <div className="chips">
                {selectedItem.extraOptions?.map((extra) => {
                  const active = selectedExtras.some(
                    (item) => item.id === extra.id
                  );
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      className={active ? "chip extra active" : "chip extra"}
                      onClick={() => toggleExtra(extra)}
                    >
                      {extra.label} (+{formatPrice(extra.price)})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="modal-section">
              <h4>Observações do lanche</h4>
              <textarea
                className="modal-notes"
                placeholder="Ex: ponto da carne, sem molho, etc."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <strong>{formatPrice(customizerPrice)}</strong>
              <button className="modal-add" onClick={addCustomizedItem}>
                Adicionar ao pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
