import { useState } from "react";
import { type LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronRight,
  Compass,
  Gauge,
  Instagram,
  LockKeyhole,
  MapPin,
  Menu,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
  Clock3,
} from "lucide-react";

const heroImage = "/manus-storage/hero-black-car_cd7629a0.jpg";
const featureImage = "/manus-storage/e30-feature_82c69502.jpg";
const meetImage = "/manus-storage/meet-night_e8e0283c.jpg";

const navItems = [
  { label: "Meet-uri", href: "#meets" },
  { label: "Comunitate", href: "#community" },
  { label: "Rezultate", href: "#results" },
];

const stats = [
  { value: "—", label: "membri verificați" },
  { value: "—", label: "meet-uri publice" },
  { value: "—", label: "mașini în garaj" },
];

function FeatureCard({
  eyebrow,
  title,
  body,
  icon: Icon,
  image,
  href,
}: {
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  image?: string;
  href: string;
}) {
  return (
    <a className={`feature-card ${image ? "feature-card--image" : ""}`} href={href}>
      {image && <img src={image} alt="Mașină pregătită pentru următorul meet" />}
      <div className="feature-card__veil" />
      <div className="feature-card__content">
        <div className="icon-tile"><Icon size={18} strokeWidth={1.7} /></div>
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p className="muted-copy">{body}</p>
        <span className="text-link">Explorează <ArrowRight size={15} /></span>
      </div>
    </a>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleJoin = () => {
    setJoinOpen(true);
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Romanian BlackList acasă">
            <span className="brand-mark"><span /></span>
            <span className="brand-wordmark">ROMANIAN <b>BLACKLIST</b></span>
          </a>

          <nav className="desktop-nav" aria-label="Navigație principală">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>

          <div className="header-actions">
            <button className="header-login" onClick={() => setJoinOpen(true)}>Intră în cont</button>
            <button className="button button--small button--amber" onClick={handleJoin}>Alătură-te <ArrowRight size={15} /></button>
            <button className="mobile-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ChevronRight size={16} /></a>)}
            <button onClick={handleJoin}>Intră în comunitate <ArrowRight size={16} /></button>
          </div>
        )}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-backdrop" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="hero-radiance" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="live-pill"><span className="live-dot" /> platformă în dezvoltare <span className="pill-separator" /> powered by comunitate</div>
              <h1>Nu e doar o mașină.<br /><em>E un statement.</em></h1>
              <p className="hero-description">Romanian BlackList este locul în care pasiunea pentru mașini devine comunitate. Meet-uri reale, build-uri autentice și oameni care înțeleg de ce contează fiecare detaliu.</p>
              <div className="hero-actions">
                <button className="button button--amber" onClick={handleJoin}>Intră în BlackList <ArrowRight size={17} /></button>
                <a className="button button--ghost" href="#meets">Explorează meet-urile <MoveUpRight size={16} /></a>
              </div>
              <div className="hero-meta"><span><ShieldCheck size={16} /> acces pe bază de invitație</span><span><LockKeyhole size={15} /> safe zone pentru membri</span></div>
            </div>
            <div className="hero-aside">
              <div className="hero-vertical-label">BUCUREȘTI · ROMÂNIA <span> / 01</span></div>
              <div className="hero-caption"><span className="caption-line" /> <span>keep it real</span></div>
            </div>
          </div>
          <div className="hero-scroll"><span /> scroll to explore</div>
        </section>

        <section className="ticker" aria-label="BlackList principles">
          <div className="ticker-track"><span>BUILT NOT BOUGHT</span><i>✳</i><span>REAL BUILDS</span><i>✳</i><span>REAL PEOPLE</span><i>✳</i><span>NO GATEKEEPING</span><i>✳</i><span>BUILT NOT BOUGHT</span></div>
        </section>

        <section className="section section--intro" id="community">
          <div className="container intro-layout">
            <div className="section-kicker"><span>01</span><span className="section-rule" /><span>despre BlackList</span></div>
            <div className="intro-content">
              <div className="section-heading-row"><h2>Locul unde<br /><em>pasiunea are nume.</em></h2><span className="heading-index">RB / 2026</span></div>
              <p className="lead-copy">Am construit BlackList pentru oamenii care văd mai mult decât cai putere și timpi pe sfert de milă. Pentru cei care știu că o mașină spune ceva despre tine înainte să apuci să vorbești.</p>
              <div className="intro-divider" />
              <div className="principles-grid">
                <div><span className="principle-number">01</span><h3>Fără zgomot</h3><p>Mai puțină validare. Mai multă substanță în build.</p></div>
                <div><span className="principle-number">02</span><h3>Fără filtre</h3><p>Profiluri, garaje și meet-uri construite de oameni reali.</p></div>
                <div><span className="principle-number">03</span><h3>Cu respect</h3><p>O comunitate safe pentru orice stil, orice nivel.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--dark" id="meets">
          <div className="container">
            <div className="section-topline"><div className="section-kicker"><span>02</span><span className="section-rule" /><span>ce se întâmplă</span></div><a className="text-link" href="#empty-meets">vezi toate meet-urile <ArrowRight size={15} /></a></div>
            <div className="section-heading-row section-heading-row--meets"><h2>Următorul <em>meet</em><br />începe aici.</h2><p className="section-aside-copy">Nu inventăm date. Când Firebase e conectat, meet-urile live apar aici direct din comunitate.</p></div>
            <div className="meet-feature" id="empty-meets">
              <div className="meet-feature__visual"><img src={meetImage} alt="Meet auto nocturn" /><div className="meet-feature__visual-label">RB MEET / 001</div><div className="meet-feature__visual-bottom"><span>pending firebase sync</span><span className="status-dot" /></div></div>
              <div className="meet-feature__body"><div className="meet-date"><span className="date-day">—</span><span className="date-month">COMING SOON</span></div><div className="meet-copy"><span className="tag tag--outline">public meet</span><h3>Primul meet BlackList</h3><p>Locul, ora și lista de participanți vor fi publicate aici când comunitatea dă startul. Activează-ți profilul ca să nu ratezi invitația.</p><div className="meet-details"><span><MapPin size={15} /> România</span><span><Clock3 size={15} /> în curând</span></div><button className="text-link text-link--button" onClick={handleJoin}>Anunță-mă când e live <ArrowRight size={15} /></button></div></div>
            </div>
          </div>
        </section>

        <section className="section section--warm" id="results">
          <div className="container">
            <div className="section-topline"><div className="section-kicker"><span>03</span><span className="section-rule" /><span>ecosistemul</span></div><span className="section-status"><span className="status-dot status-dot--warm" /> construim în public</span></div>
            <div className="section-heading-row section-heading-row--ecosystem"><h2>Tot ce ai nevoie<br /><em>într-un singur loc.</em></h2><p className="section-aside-copy">De la primul tău profil până la ultimul rezultat din sezon. BlackList ține totul conectat.</p></div>
            <div className="feature-grid">
              <FeatureCard eyebrow="comunitate" title="Cunoaște oamenii" body="Profiluri publice, ranguri și build-uri care merită văzute." icon={Users} href="#community" />
              <FeatureCard eyebrow="meet-uri" title="Găsește-ți locul" body="Evenimente publice și invitații curate, fără zgomot." icon={Compass} image={featureImage} href="#meets" />
              <FeatureCard eyebrow="garaj" title="Arată ce construiești" body="Un garage digital pentru mașina ta, exact așa cum este." icon={CarFront} href="#garage" />
              <FeatureCard eyebrow="rezultate" title="Ține scorul" body="Rezultate publice, sincronizate cu comunitatea și aplicația." icon={Gauge} href="#results" />
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Statistici comunitate">
          <div className="container stats-grid">
            <div className="stats-intro"><Sparkles size={17} /><span>BlackList / index</span><strong>prima pagină<br /><em>se scrie acum</em></strong></div>
            {stats.map((stat) => <div className="stat" key={stat.label}><span className="stat-value">{stat.value}</span><span className="stat-label">{stat.label}</span></div>)}
          </div>
        </section>

        <section className="section section--invite" id="garage">
          <div className="container invite-layout"><div className="invite-copy"><div className="section-kicker"><span>04</span><span className="section-rule" /><span>fă parte din poveste</span></div><h2>Ai venit pentru mașini.<br /><em>Rămâi pentru oameni.</em></h2><p>Accesul se deschide pe bază de invitație. Creează-ți profilul, adaugă-ți mașina și intră în rețeaua care contează.</p><button className="button button--amber" onClick={handleJoin}>Cere o invitație <ArrowRight size={17} /></button></div><div className="invite-visual"><div className="invite-ring invite-ring--one" /><div className="invite-ring invite-ring--two" /><div className="invite-mark"><Zap size={30} strokeWidth={1.4} /><span>RB</span></div><span className="invite-visual-caption">est. 2026<br />ro · community</span></div></div>
        </section>

        <section className="section section--footer-cta">
          <div className="container footer-cta"><div><span className="eyebrow">ready when you are</span><h2>Ne vedem<br /><em>în parcare.</em></h2></div><button className="button button--light" onClick={handleJoin}>Începe aici <ArrowRight size={17} /></button></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a className="brand" href="#top"><span className="brand-mark"><span /></span><span className="brand-wordmark">ROMANIAN <b>BLACKLIST</b></span></a><div className="footer-note">platformă construită pentru comunitate<br /><span>© 2026 · safe zone</span></div><a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a></div></footer>

      {joinOpen && <div className="modal-backdrop" onClick={() => setJoinOpen(false)}><div className="join-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="join-title"><button className="modal-close" onClick={() => setJoinOpen(false)} aria-label="Închide"><X size={20} /></button>{submitted ? <div className="modal-success"><CheckCircle2 size={42} /><span className="eyebrow">request received</span><h2>Ești pe listă.</h2><p>Mulțumim. Când BlackList deschide următoarea rundă de invitații, vei fi primul care află.</p><button className="button button--amber" onClick={() => setJoinOpen(false)}>Închide</button></div> : <><span className="eyebrow">access request / 001</span><h2 id="join-title">Intră în<br /><em>BlackList.</em></h2><p>Lasă-ne un contact și îți trimitem un semn când deschidem următoarea rundă de invitații.</p><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label htmlFor="email">email</label><input id="email" name="email" type="email" placeholder="tu@exemplu.ro" required /><label htmlFor="handle">username dorit</label><input id="handle" name="handle" type="text" placeholder="@username" required /><button className="button button--amber button--full" type="submit">Trimite request-ul <ArrowRight size={17} /></button></form><span className="form-privacy"><LockKeyhole size={13} /> fără spam. fără vânzări de date.</span></>}</div></div>}
    </div>
  );
}

export default Home;

