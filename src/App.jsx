import React, { useState, useMemo } from "react";
import {
  Gem, ShoppingBag, Search, ChevronLeft, Star,
  Check, SlidersHorizontal, ArrowRight, MapPin, CreditCard,
  PartyPopper, Send, Sparkles, Circle
} from "lucide-react";

/* =========================================================================
   ODESSA — bijoux vintage & seconde main, pièces uniques
   Cible : adultes 25–45 ans en quête de pièces uniques, sensibles à la mode
   durable et à l'histoire des objets qu'ils portent.
   ========================================================================= */

const PRODUCTS = [
  { id: 1, name: "Bague marquise en or 18 k", price: 320, promo: 0, type: "Bague", era: "Art Déco", material: "Or", cond: "Excellent état", hue: 44, image: "/images/bague-marquise-or.jpg",
    story: "Retrouvée dans un coffret de famille à Québec, cette marquise taillée à la main porte encore l'éclat de ses cent ans. Une seule pièce comme celle-ci existe chez nous.",
    detail: "Anneau en or 18 k, pierre centrale taillée marquise, gravures intérieures d'origine visibles." },
  { id: 2, name: "Collier de perles Akoya", price: 180, promo: 15, type: "Collier", era: "Rétro", material: "Argent", cond: "Bon état", hue: 210, image: "/images/collier-perles-akoya.jpg",
    story: "Un fermoir en argent d'époque tient encore fermement ce rang de perles Akoya, sélectionnées une à une dans les années 60.",
    detail: "Perles Akoya véritables, fermoir en argent sterling, longueur 45 cm." },
  { id: 3, name: "Boucles pendantes en laiton", price: 45, promo: 0, type: "Boucles d'oreilles", era: "Y2K", material: "Laiton", cond: "Bon état", hue: 28, image: "/images/boucles-pendantes-laiton.jpg",
    story: "Trouvées dans un lot de bijoux fantaisie du début des années 2000, elles ont ce mouvement qui attire l'œil dès qu'on tourne la tête.",
    detail: "Laiton doré, attaches à levier, longueur 6 cm." },
  { id: 4, name: "Bracelet gourmette plaqué or", price: 65, promo: 0, type: "Bracelet", era: "Contemporain vintage", material: "Plaqué or", cond: "Bon état", hue: 40, image: "/images/bracelet-gourmette-or.jpg",
    story: "Une gourmette classique, portée avec confiance pendant les années 90, qui n'a pratiquement rien perdu de son fini doré.",
    detail: "Plaqué or 14 k sur laiton, maillons soudés, longueur ajustable." },
  { id: 5, name: "Broche fleur émaillée", price: 210, promo: 10, type: "Broche", era: "Victorienne", material: "Or", cond: "Avec patine", hue: 50, image: "/images/broche-fleur-emaillee.jpg",
    story: "Sa patine raconte l'histoire à elle seule : plus de cent trente ans passés à orner des cols de dentelle. Nous l'avons laissée telle quelle, par respect pour son âge.",
    detail: "Or et émail peint à la main, épingle de sécurité d'origine, légère usure visible assumée." },
  { id: 6, name: "Bague solitaire gravée", price: 150, promo: 0, type: "Bague", era: "Art Déco", material: "Argent", cond: "Excellent état", hue: 200, image: "/images/bague-solitaire-gravee.jpg",
    story: "Une gravure florale discrète court tout autour de l'anneau — le genre de détail qu'on ne remarque qu'au deuxième regard.",
    detail: "Argent sterling, pierre centrale sertie clos, taille ajustable chez un bijoutier." },
  { id: 7, name: "Ras-de-cou chaîne dorée", price: 65, promo: 0, type: "Collier", era: "Contemporain vintage", material: "Plaqué or", cond: "Bon état", hue: 42, image: "/images/ras-de-cou-chaine-doree.jpg",
    story: "Simple, dense et lumineux : le genre de chaîne qu'on ne retire plus une fois qu'on l'a mise.",
    detail: "Plaqué or sur laiton, maille serpent, longueur 40 cm." },
  { id: 8, name: "Clips d'oreilles perlés", price: 55, promo: 0, type: "Boucles d'oreilles", era: "Rétro", material: "Argent", cond: "Excellent état", hue: 205, image: "/images/clips-oreilles-perles.jpg",
    story: "Pas de perçage requis : ces clips d'époque se referment avec un petit clic satisfaisant, comme au premier jour.",
    detail: "Monture argentée, perle nacrée, mécanisme à clip d'origine." },
  { id: 9, name: "Manchette laiton martelé", price: 95, promo: 20, type: "Bracelet", era: "Contemporain vintage", material: "Laiton", cond: "Bon état", hue: 30, image: "/images/manchette-laiton-martele.jpg",
    story: "Chaque bosse du martelage est différente — une manchette façonnée à la main, jamais tout à fait symétrique, et c'est ce qui la rend belle.",
    detail: "Laiton massif martelé à la main, ouverture ajustable, finition mate." },
];

const TYPES = ["Bague", "Collier", "Boucles d'oreilles", "Bracelet", "Broche"];
const ERAS = ["Victorienne", "Art Déco", "Rétro", "Contemporain vintage", "Y2K"];
const MATERIALS = ["Or", "Argent", "Plaqué or", "Laiton"];

function money(n) { return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD" }); }

/* ---------- Illustration SVG générique de bijou (variée par type et teinte) ---------- */
function JewelArt({ type, hue }) {
  const metal = `hsl(${hue}, 55%, 58%)`;
  const metalDark = `hsl(${hue}, 45%, 40%)`;
  const gem = `hsl(${(hue + 260) % 360}, 55%, 62%)`;

  if (type === "Bague") return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <circle cx="60" cy="68" r="42" fill="none" stroke={metal} strokeWidth="10" />
      <circle cx="60" cy="68" r="42" fill="none" stroke={metalDark} strokeWidth="2.5" />
      <polygon points="60,10 78,32 60,46 42,32" fill={gem} stroke={metalDark} strokeWidth="2" />
    </svg>
  );
  if (type === "Collier") return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <path d="M8 18 C 8 86, 112 86, 112 18" fill="none" stroke={metal} strokeWidth="5" />
      <path d="M40 70 L60 106 L80 70 Z" fill={gem} stroke={metalDark} strokeWidth="2" />
      {[...Array(11)].map((_, i) => {
        const t = i / 10, x = 8 + t * 104, y = 18 + Math.sin(t * Math.PI) * 60;
        return <circle key={i} cx={x} cy={y} r="4.2" fill={metal} />;
      })}
    </svg>
  );
  if (type === "Boucles d'oreilles") return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      {[28, 92].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={16} r="5.5" fill="none" stroke={metal} strokeWidth="4" />
          <path d={`M${cx} 22 Q${cx + (i === 0 ? -10 : 10)} 62 ${cx} 96`} fill="none" stroke={metal} strokeWidth="4" />
          <ellipse cx={cx} cy={106} rx="12" ry="16" fill={gem} stroke={metalDark} strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
  if (type === "Bracelet") return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <ellipse cx="60" cy="62" rx="54" ry="36" fill="none" stroke={metal} strokeWidth="11" />
      <ellipse cx="60" cy="62" rx="54" ry="36" fill="none" stroke={metalDark} strokeWidth="2.5" />
      <circle cx="60" cy="26" r="9" fill={gem} />
    </svg>
  );
  // Broche
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <g transform="translate(60,64)">
        {[0, 72, 144, 216, 288].map(a => (
          <ellipse key={a} rx="20" ry="34" fill={metal} stroke={metalDark} strokeWidth="2"
            transform={`rotate(${a}) translate(0,-22)`} />
        ))}
        <circle r="15" fill={gem} stroke={metalDark} strokeWidth="2" />
      </g>
    </svg>
  );
}

/* ---------- Indicateur d'étapes façon "collier de perles" (élément signature) --------- */
/* ---------- Affiche une vraie photo si disponible, sinon l'illustration ---------- */
function PhotoOrArt({ image, type, hue }) {
  const [broken, setBroken] = useState(false);
  if (image && !broken) {
    return (
      <img src={image} alt={type} onError={() => setBroken(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8, display: "block" }} />
    );
  }
  return <JewelArt type={type} hue={hue} />;
}

function PearlStrand({ steps, current }) {
  return (
    <div style={{ margin: "0 0 30px" }}>
      <svg viewBox="0 0 460 70" width="100%" height="70" style={{ maxWidth: 460, display: "block", margin: "0 auto" }}>
        <path d="M30 20 C 140 60, 320 60, 430 20" fill="none" stroke="var(--line)" strokeWidth="2" />
        {steps.map((label, i) => {
          const t = i / (steps.length - 1);
          const x = 30 + t * 400;
          const y = 20 + Math.sin(t * Math.PI) * 34;
          const done = i < current, active = i === current;
          return (
            <g key={label}>
              <circle cx={x} cy={y} r={active ? 12 : 9} fill={done ? "var(--gold)" : active ? "var(--rose)" : "var(--velvet)"}
                stroke={done || active ? "none" : "var(--line)"} strokeWidth="1.5" />
              {done && <path d={`M${x - 4} ${y} l3 3 l6 -7`} stroke="#241B2E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
              <text x={x} y={y + 30} textAnchor="middle" fontSize="11.5" fontFamily="var(--font-body)"
                fontWeight={active ? 700 : 500} fill={active ? "var(--rose)" : done ? "var(--gold)" : "var(--ink-soft)"}>
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Badge({ children, tone = "gold" }) {
  const bg = tone === "rose" ? "var(--rose)" : tone === "gold" ? "var(--gold)" : "var(--line)";
  const color = tone === "line" ? "var(--ink)" : "var(--ink)";
  return (
    <span style={{
      background: bg, color, fontSize: 11, fontWeight: 700, letterSpacing: 0.4,
      padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", fontFamily: "var(--font-body)"
    }}>{children}</span>
  );
}

/* ================================ APP ================================ */
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [orderNum] = useState(() => "OD-" + Math.floor(10000 + Math.random() * 89999));
  const [shipInfo, setShipInfo] = useState({ nom: "", adresse: "", ville: "", postal: "" });
  const [payInfo, setPayInfo] = useState({ carte: "", exp: "", cvv: "" });
  const [survey, setSurvey] = useState({ note: 0, commentaire: "" });
  const [surveyDone, setSurveyDone] = useState(false);

  const [filters, setFilters] = useState({ type: [], era: [], material: [], maxPrice: 350, q: "" });

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartItems = cart.map(c => ({ ...c, product: PRODUCTS.find(p => p.id === c.id) }));
  const cartTotal = cartItems.reduce((s, c) => {
    const price = c.product.promo ? c.product.price * (1 - c.product.promo / 100) : c.product.price;
    return s + price * c.qty;
  }, 0);

  function addToCart(id) {
    setCart(prev => {
      const found = prev.find(c => c.id === id);
      if (found) return prev; // pièce unique : une seule en stock
      return [...prev, { id, qty: 1 }];
    });
  }
  function removeFromCart(id) {
    setCart(prev => prev.filter(c => c.id !== id));
  }

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (filters.type.length && !filters.type.includes(p.type)) return false;
      if (filters.era.length && !filters.era.includes(p.era)) return false;
      if (filters.material.length && !filters.material.includes(p.material)) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.q && !p.name.toLowerCase().includes(filters.q.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  function toggleFacet(key, value) {
    setFilters(prev => {
      const arr = prev[key];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  }

  const containerStyle = {
    "--ink": "#3A3140", "--ink-soft": "#7C6F82", "--bg": "#F2EFF3", "--velvet": "#EAE6ED",
    "--card": "#FFFFFF", "--gold": "#8C6E97", "--rose": "#A9789A", "--line": "#DCD5E0",
    "--font-display": "'Cormorant Garamond', Georgia, serif", "--font-body": "'Work Sans', system-ui, sans-serif",
    background: "var(--bg)", color: "var(--ink)", minHeight: "100%", fontFamily: "var(--font-body)"
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        button { cursor: pointer; font-family: var(--font-body); border: none; }
        input, textarea { font-family: var(--font-body); }
        .wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
        .btn { border-radius: 8px; padding: 12px 22px; font-weight: 700; font-size: 14px; letter-spacing: .2px; display: inline-flex; align-items: center; gap: 8px; transition: transform .15s ease, opacity .15s ease; }
        .btn:hover { transform: translateY(-1px); opacity: .92; }
        .btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }
        .btn-gold { background: var(--gold); color: var(--ink); }
        .btn-rose { background: var(--rose); color: var(--ink); }
        .btn-ghost { background: transparent; color: var(--ink); border: 1.5px solid var(--line); }
        .card { background: var(--card); border-radius: 14px; border: 1px solid var(--line); }
        .chip { border: 1.5px solid var(--line); background: var(--card); border-radius: 999px; padding: 7px 14px; font-size: 13px; font-weight: 600; color: var(--ink); display: inline-flex; align-items: center; gap: 6px; }
        .chip.active { background: var(--gold); border-color: var(--gold); color: var(--ink); }
        input[type="text"], input[type="search"] { width: 100%; border: 1.5px solid var(--line); border-radius: 8px; padding: 10px 12px; font-size: 14px; background: var(--velvet); color: var(--ink); }
        input[type="text"]:focus, input[type="search"]:focus, textarea:focus { outline: 2px solid var(--gold); outline-offset: 1px; }
        textarea { width: 100%; border: 1.5px solid var(--line); border-radius: 8px; padding: 10px 12px; font-size: 14px; background: var(--velvet); color: var(--ink); resize: vertical; }
        a { color: inherit; }
        .tag-card { position: relative; border: 1.5px dashed var(--line); border-radius: 10px; padding: 14px 16px; background: var(--velvet); }
      `}</style>

      <TopBar page={page} setPage={setPage} cartCount={cartCount} />

      <main className="wrap" style={{ paddingTop: 28, paddingBottom: 64 }}>
        {page === "home" && (
          <HomePage
            filters={filters} setFilters={setFilters} toggleFacet={toggleFacet}
            filtered={filtered} cartIds={cart.map(c => c.id)}
            onOpenProduct={(p) => { setSelected(p); setPage("product"); }}
            onAdd={addToCart}
          />
        )}

        {page === "product" && selected && (
          <ProductDetail product={selected} inCart={cart.some(c => c.id === selected.id)}
            onBack={() => setPage("home")}
            onAdd={(id) => addToCart(id)} onGoCart={() => setPage("cart")} />
        )}

        {page === "cart" && (
          <CartPage items={cartItems} total={cartTotal}
            onRemove={removeFromCart}
            onBack={() => setPage("home")}
            onCheckout={() => { setCheckoutStep(0); setPage("checkout"); }} />
        )}

        {page === "checkout" && (
          <CheckoutPage
            step={checkoutStep} setStep={setCheckoutStep}
            shipInfo={shipInfo} setShipInfo={setShipInfo}
            payInfo={payInfo} setPayInfo={setPayInfo}
            total={cartTotal}
            onFinish={() => setPage("confirmation")}
          />
        )}

        {page === "confirmation" && (
          <ConfirmationPage orderNum={orderNum} onSurvey={() => setPage("survey")}
            onHome={() => { setCart([]); setPage("home"); }} />
        )}

        {page === "survey" && (
          <SurveyPage survey={survey} setSurvey={setSurvey} done={surveyDone}
            onSubmit={() => setSurveyDone(true)} onHome={() => { setCart([]); setPage("home"); }} />
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ============================== TOP BAR ============================== */
function TopBar({ page, setPage, cartCount }) {
  return (
    <header style={{ borderBottom: "1.5px solid var(--line)", background: "var(--bg)", position: "sticky", top: 0, zIndex: 10 }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
        <button onClick={() => setPage("home")} style={{ background: "none", display: "flex", alignItems: "center", gap: 8, padding: 0 }}>
          <Gem size={22} color="var(--gold)" />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, letterSpacing: 0.4, color: "var(--ink)" }}>Odessa</span>
        </button>
        <nav style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 13, color: "var(--ink-soft)", display: page === "home" ? "inline" : "none" }}>
            Des bijoux vintage, une seule pièce à la fois.
          </span>
          <button onClick={() => setPage("cart")} className="btn btn-ghost" style={{ position: "relative", padding: "9px 14px" }}>
            <ShoppingBag size={18} />
            Panier
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -8, right: -8, background: "var(--rose)", color: "var(--ink)",
                borderRadius: "50%", width: 20, height: 20, fontSize: 11.5, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>{cartCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

/* =============================== HOME ================================ */
function HomePage({ filters, setFilters, toggleFacet, filtered, cartIds, onOpenProduct, onAdd }) {
  return (
    <div>
      <section style={{ padding: "24px 0 32px", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 28, alignItems: "center" }}>
        <div>
          <Badge tone="rose">Chaque pièce n'existe qu'en un seul exemplaire</Badge>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1.08, margin: "16px 0 14px", color: "var(--ink)" }}>
            Des bijoux qui ont déjà <em style={{ color: "var(--gold)" }}>une histoire</em> à raconter.
          </h1>
          <p style={{ fontSize: 16.5, color: "var(--ink-soft)", maxWidth: 460, marginBottom: 22 }}>
            Chez Odessa, on chine, on nettoie et on authentifie des bijoux vintage pour leur offrir une seconde vie. Aucune pièce n'est reproduite : une fois vendue, elle disparaît du catalogue.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#catalogue" className="btn btn-gold">Découvrir la collection <ArrowRight size={16} /></a>
            <span className="btn btn-ghost" style={{ pointerEvents: "none" }}><Sparkles size={16} /> Pièces authentifiées</span>
          </div>
        </div>
        <div className="card" style={{ padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {PRODUCTS.slice(0, 4).map(p => (
            <div key={p.id} style={{ background: "var(--velvet)", borderRadius: 10, padding: 6, height: 148 }}>
              <PhotoOrArt image={p.image} type={p.type} hue={p.hue} />
            </div>
          ))}
        </div>
      </section>

      <section id="catalogue" style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: 22, alignItems: "start" }}>
        <aside className="card" style={{ padding: 18, position: "sticky", top: 90 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <SlidersHorizontal size={17} color="var(--gold)" />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, margin: 0, color: "var(--ink)" }}>Affiner la recherche</h3>
          </div>

          <div style={{ position: "relative", marginBottom: 20 }}>
            <Search size={15} style={{ position: "absolute", left: 10, top: 12, color: "var(--ink-soft)" }} />
            <input type="search" placeholder="Rechercher par nom…" value={filters.q}
              onChange={e => setFilters(f => ({ ...f, q: e.target.value }))} style={{ paddingLeft: 32 }} />
          </div>

          <FacetGroup label="Type de bijou">
            {TYPES.map(v => (
              <button key={v} className={`chip ${filters.type.includes(v) ? "active" : ""}`}
                onClick={() => toggleFacet("type", v)} style={{ marginRight: 8, marginBottom: 8 }}>{v}</button>
            ))}
          </FacetGroup>

          <FacetGroup label="Époque">
            {ERAS.map(v => (
              <button key={v} className={`chip ${filters.era.includes(v) ? "active" : ""}`}
                onClick={() => toggleFacet("era", v)} style={{ marginRight: 8, marginBottom: 8 }}>{v}</button>
            ))}
          </FacetGroup>

          <FacetGroup label="Matériau">
            {MATERIALS.map(v => (
              <button key={v} className={`chip ${filters.material.includes(v) ? "active" : ""}`}
                onClick={() => toggleFacet("material", v)} style={{ marginRight: 8, marginBottom: 8 }}>{v}</button>
            ))}
          </FacetGroup>

          <FacetGroup label={`Budget maximum : ${money(filters.maxPrice)}`}>
            <input type="range" min="40" max="350" step="10" value={filters.maxPrice}
              onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))} style={{ width: "100%" }} />
          </FacetGroup>

          <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
            onClick={() => setFilters({ type: [], era: [], material: [], maxPrice: 350, q: "" })}>
            Réinitialiser
          </button>
        </aside>

        <div>
          <p style={{ color: "var(--ink-soft)", fontSize: 14, margin: "0 0 14px" }}>
            {filtered.length} pièce{filtered.length !== 1 ? "s" : ""} unique{filtered.length !== 1 ? "s" : ""} correspond{filtered.length !== 1 ? "ent" : ""} à votre recherche
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} p={p} inCart={cartIds.includes(p.id)} onOpen={() => onOpenProduct(p)} onAdd={() => onAdd(p.id)} />
            ))}
            {filtered.length === 0 && (
              <div className="card" style={{ gridColumn: "1 / -1", padding: 32, textAlign: "center", color: "var(--ink-soft)" }}>
                Aucune pièce ne correspond à ces critères pour l'instant — essayez d'élargir votre budget ou vos filtres !
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function FacetGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 10 }}>{label}</p>
      {children}
    </div>
  );
}

function ProductCard({ p, inCart, onOpen, onAdd }) {
  const finalPrice = p.promo ? p.price * (1 - p.promo / 100) : p.price;
  return (
    <div className="card" style={{ padding: 12, display: "flex", flexDirection: "column" }}>
      <button onClick={onOpen} style={{ background: "var(--velvet)", borderRadius: 10, height: 150, padding: 8, marginBottom: 10 }}>
        <PhotoOrArt image={p.image} type={p.type} hue={p.hue} />
      </button>
      <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
        <Badge tone="rose">Pièce unique</Badge>
        {p.promo > 0 && <Badge tone="gold">-{p.promo} %</Badge>}
      </div>
      <button onClick={onOpen} style={{ background: "none", textAlign: "left", padding: 0 }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, margin: "0 0 4px", color: "var(--ink)" }}>{p.name}</h4>
      </button>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 10px" }}>{p.era} · {p.material} · {p.cond}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
        <strong style={{ fontSize: 17, color: "var(--ink)" }}>{money(finalPrice)}</strong>
        {p.promo > 0 && <span style={{ fontSize: 13, color: "var(--ink-soft)", textDecoration: "line-through" }}>{money(p.price)}</span>}
      </div>
      <button className="btn btn-gold" style={{ justifyContent: "center", marginTop: "auto" }} disabled={inCart} onClick={onAdd}>
        {inCart ? "Déjà réservée" : "Réserver cette pièce"}
      </button>
    </div>
  );
}

/* ============================ PRODUCT DETAIL =========================== */
function ProductDetail({ product: p, inCart, onBack, onAdd, onGoCart }) {
  const finalPrice = p.promo ? p.price * (1 - p.promo / 100) : p.price;
  return (
    <div>
      <button onClick={onBack} className="btn btn-ghost" style={{ marginBottom: 20 }}><ChevronLeft size={16} /> Retour à la collection</button>
      <div className="card" style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
        <div style={{ background: "var(--velvet)", borderRadius: 12, height: 320, padding: 18 }}>
          <PhotoOrArt image={p.image} type={p.type} hue={p.hue} />
        </div>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <Badge tone="rose">Pièce unique — une seule en stock</Badge>
            {p.promo > 0 && <Badge tone="gold">Offre : -{p.promo} %</Badge>}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, margin: "0 0 10px", color: "var(--ink)" }}>{p.name}</h1>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <Badge tone="line">{p.type}</Badge>
            <Badge tone="line">{p.era}</Badge>
            <Badge tone="line">{p.material}</Badge>
            <Badge tone="line">{p.cond}</Badge>
          </div>
          <div className="tag-card" style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color: "var(--gold)", margin: "0 0 8px" }}>
              Carte de provenance
            </p>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0, color: "var(--ink)" }}>{p.story}</p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", marginBottom: 20 }}>{p.detail}</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>{money(finalPrice)}</span>
            {p.promo > 0 && <span style={{ fontSize: 16, color: "var(--ink-soft)", textDecoration: "line-through" }}>{money(p.price)}</span>}
          </div>
          {!inCart ? (
            <button className="btn btn-gold" onClick={() => onAdd(p.id)}>
              Réserver cette pièce <ShoppingBag size={16} />
            </button>
          ) : (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "var(--gold)", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <Check size={17} /> Réservée dans votre panier
              </span>
              <button className="btn btn-rose" onClick={onGoCart}>Voir mon panier <ArrowRight size={15} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================ CART ================================ */
function CartPage({ items, total, onRemove, onBack, onCheckout }) {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 30, marginBottom: 6, color: "var(--ink)" }}>Votre panier</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>Ces pièces sont réservées pour vous — finalisez votre commande avant qu'une autre personne ne les repère.</p>

      {items.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: "center" }}>
          <p style={{ marginBottom: 16, color: "var(--ink-soft)" }}>Votre panier est vide pour l'instant.</p>
          <button className="btn btn-gold" onClick={onBack}>Découvrir la collection</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>
          <div className="card" style={{ padding: 8 }}>
            {items.map(({ id, product }) => {
              const price = product.promo ? product.price * (1 - product.promo / 100) : product.price;
              return (
                <div key={id} style={{ display: "flex", gap: 14, padding: 14, borderBottom: "1px solid var(--line)" }}>
                  <div style={{ width: 70, height: 70, background: "var(--velvet)", borderRadius: 8, padding: 8, flexShrink: 0 }}>
                    <PhotoOrArt image={product.image} type={product.type} hue={product.hue} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontSize: 16, color: "var(--ink)" }}>{product.name}</h4>
                    <p style={{ margin: "0 0 6px", fontSize: 13, color: "var(--ink-soft)" }}>{product.era} · {product.material}</p>
                    <button onClick={() => onRemove(id)} style={{ background: "none", color: "var(--ink-soft)", fontSize: 13, textDecoration: "underline" }}>Retirer du panier</button>
                  </div>
                  <strong style={{ alignSelf: "center", color: "var(--ink)" }}>{money(price)}</strong>
                </div>
              );
            })}
          </div>

          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginTop: 0, color: "var(--ink)" }}>Résumé</h3>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, marginBottom: 8, color: "var(--ink)" }}>
              <span>Sous-total</span><span>{money(total)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, marginBottom: 14, color: "var(--ink-soft)" }}>
              <span>Livraison assurée</span><span>{total >= 100 ? "Gratuite" : money(9.5)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 17, borderTop: "1px solid var(--line)", paddingTop: 12, marginBottom: 18, color: "var(--ink)" }}>
              <span>Total</span><span>{money(total >= 100 ? total : total + 9.5)}</span>
            </div>
            <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }} onClick={onCheckout}>
              Passer à la caisse <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================== CHECKOUT ============================== */
function CheckoutPage({ step, setStep, shipInfo, setShipInfo, payInfo, setPayInfo, total, onFinish }) {
  const steps = ["Livraison", "Paiement", "Confirmation"];
  const shipValid = shipInfo.nom && shipInfo.adresse && shipInfo.ville && shipInfo.postal;
  const payValid = payInfo.carte.length >= 12 && payInfo.exp && payInfo.cvv.length >= 3;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <PearlStrand steps={steps} current={step} />

      {step === 0 && (
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <MapPin size={18} color="var(--gold)" />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: 0, color: "var(--ink)" }}>Où livrons-nous votre bijou ?</h2>
          </div>
          <Field label="Nom complet" value={shipInfo.nom} onChange={v => setShipInfo(s => ({ ...s, nom: v }))} placeholder="Ex. Alex Tremblay" />
          <Field label="Adresse" value={shipInfo.adresse} onChange={v => setShipInfo(s => ({ ...s, adresse: v }))} placeholder="123 rue des Érables" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Ville" value={shipInfo.ville} onChange={v => setShipInfo(s => ({ ...s, ville: v }))} placeholder="Gatineau" />
            <Field label="Code postal" value={shipInfo.postal} onChange={v => setShipInfo(s => ({ ...s, postal: v }))} placeholder="J8X 1A1" />
          </div>
          <button className="btn btn-gold" style={{ marginTop: 8 }} disabled={!shipValid} onClick={() => setStep(1)}>
            Continuer vers le paiement <ArrowRight size={16} />
          </button>
          {!shipValid && <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 8 }}>Remplissez tous les champs pour continuer — il ne reste que deux étapes !</p>}
        </div>
      )}

      {step === 1 && (
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <CreditCard size={18} color="var(--gold)" />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: 0, color: "var(--ink)" }}>Comment payez-vous ?</h2>
          </div>
          <Field label="Numéro de carte" value={payInfo.carte} onChange={v => setPayInfo(s => ({ ...s, carte: v }))} placeholder="1234 5678 9012 3456" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Expiration" value={payInfo.exp} onChange={v => setPayInfo(s => ({ ...s, exp: v }))} placeholder="MM/AA" />
            <Field label="CVV" value={payInfo.cvv} onChange={v => setPayInfo(s => ({ ...s, cvv: v }))} placeholder="123" />
          </div>
          <div className="card" style={{ background: "var(--velvet)", padding: "10px 14px", margin: "8px 0 18px", fontSize: 14, display: "flex", justifyContent: "space-between", color: "var(--ink)" }}>
            <span>Total à payer</span><strong>{money(total >= 100 ? total : total + 9.5)}</strong>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => setStep(0)}><ChevronLeft size={16} /> Retour</button>
            <button className="btn btn-gold" disabled={!payValid} onClick={onFinish}>
              Confirmer ma commande <Check size={16} />
            </button>
          </div>
          {!payValid && <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 8 }}>Aucun vrai paiement n'est traité ici — ces champs servent uniquement à la démonstration.</p>}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink)" }}>{label}</label>
      <input type="text" value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

/* ============================ CONFIRMATION ============================ */
function ConfirmationPage({ orderNum, onSurvey, onHome }) {
  return (
    <div style={{ maxWidth: 560, margin: "40px auto", textAlign: "center" }}>
      <PearlStrand steps={["Livraison", "Paiement", "Confirmation"]} current={2} />
      <div className="card" style={{ padding: 36 }}>
        <div style={{ display: "inline-flex", background: "var(--gold)", borderRadius: "50%", padding: 16, marginBottom: 18 }}>
          <PartyPopper size={30} color="var(--ink)" />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, margin: "0 0 10px", color: "var(--ink)" }}>Merci ! Votre pièce vous attend déjà.</h1>
        <p style={{ color: "var(--ink-soft)", fontSize: 15, marginBottom: 6 }}>
          Numéro de commande <strong style={{ color: "var(--ink)" }}>{orderNum}</strong>
        </p>
        <p style={{ color: "var(--ink-soft)", fontSize: 15, marginBottom: 24 }}>
          J'emballe votre bijou avec le même soin qu'on lui a donné en le retrouvant. Un courriel de confirmation s'en vient !
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="btn btn-ghost" onClick={onHome}>Retour à l'accueil</button>
          <button className="btn btn-rose" onClick={onSurvey}>Donner mon avis <Send size={15} /></button>
        </div>
      </div>
    </div>
  );
}

/* =============================== SURVEY ================================ */
function SurveyPage({ survey, setSurvey, done, onSubmit, onHome }) {
  return (
    <div style={{ maxWidth: 520, margin: "20px auto" }}>
      {!done ? (
        <div className="card" style={{ padding: 30 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, margin: "0 0 8px", color: "var(--ink)" }}>Comment était votre expérience ?</h1>
          <p style={{ color: "var(--ink-soft)", fontSize: 15, marginBottom: 22 }}>
            Ça prend 30 secondes, et ça m'aide énormément à trouver et présenter encore mieux nos prochaines trouvailles. Merci d'avance !
          </p>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: "var(--ink)" }}>Votre visite, en une note :</p>
          <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setSurvey(s => ({ ...s, note: n }))} style={{ background: "none", padding: 4 }}>
                <Star size={30} fill={n <= survey.note ? "var(--gold)" : "none"} color={n <= survey.note ? "var(--gold)" : "var(--line)"} />
              </button>
            ))}
          </div>
          <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8, color: "var(--ink)" }}>
            Un commentaire pour nous aider à mieux chiner ?
          </label>
          <textarea rows={4} placeholder="Dites-nous tout — le bon comme le moins bon !"
            value={survey.commentaire} onChange={e => setSurvey(s => ({ ...s, commentaire: e.target.value }))}
            style={{ marginBottom: 20 }} />
          <button className="btn btn-gold" disabled={survey.note === 0} onClick={onSubmit}>
            Envoyer mon commentaire <Send size={15} />
          </button>
          {survey.note === 0 && <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 8 }}>Choisissez une note d'abord — même une seule étoile nous aide !</p>}
        </div>
      ) : (
        <div className="card" style={{ padding: 36, textAlign: "center" }}>
          <Gem size={32} color="var(--gold)" style={{ marginBottom: 12 }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, margin: "0 0 10px", color: "var(--ink)" }}>Merci mille fois pour votre retour !</h2>
          <p style={{ color: "var(--ink-soft)", marginBottom: 22 }}>
            Je lis chaque commentaire personnellement — le vôtre va m'aider à choisir encore mieux nos prochaines pièces. À très vite !
          </p>
          <button className="btn btn-rose" onClick={onHome}>Retour à l'accueil</button>
        </div>
      )}
    </div>
  );
}

/* =============================== FOOTER ================================ */
function Footer() {
  return (
    <footer style={{ borderTop: "1.5px solid var(--line)", padding: "26px 0", textAlign: "center" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--ink-soft)", fontSize: 13 }}>
        <Circle size={5} fill="var(--gold)" color="var(--gold)" /> Odessa — bijoux vintage & seconde main. Gatineau, Québec.
      </div>
    </footer>
  );
}