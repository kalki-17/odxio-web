const domains = [
  { key: 'banking', label: 'Open Banking', desc: 'Secure, standardized APIs enabling seamless financial data sharing between institutions and fintechs.' },
  { key: 'health', label: 'Open Health', desc: 'Interoperable health data ecosystems that empower patients and providers with unified records.' },
  { key: 'wealth', label: 'Open Wealth', desc: 'Transparent wealth management through open investment data and advisory interoperability.' },
  { key: 'data', label: 'Open Data', desc: 'Frameworks for ethical, accessible data exchange that fuel research and public good.' },
  { key: 'identity', label: 'Open Identity', desc: 'Decentralized, user-owned identity solutions for secure and private digital interactions.' },
  { key: 'commerce', label: 'Open Commerce', desc: 'Unified commerce APIs connecting merchants, platforms, and consumers in an open marketplace.' }
];

const icons = {
  banking: 'landmark',
  health: 'heart-pulse',
  wealth: 'trending-up',
  data: 'database',
  identity: 'shield-check',
  commerce: 'shopping-bag'
};

function renderDomains() {
  const grid = document.getElementById('domains-grid');
  grid.innerHTML = '';

  domains.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'domain-card fade-up';
    card.style.animationDelay = `${0.1 + i * 0.08}s`;
    card.innerHTML = `
      <div class="domain-icon">
        <i data-lucide="${icons[d.key]}" style="width: 48px; height: 48px; color: var(--primary); stroke-width: 1.5;"></i>
      </div>
      <span class="mono text-xs font-bold" style="color: var(--primary); letter-spacing: 0.5px;">${d.key.toUpperCase()}</span>
      <h3 class="text-xl font-bold mt-3 mb-2">${d.label}</h3>
      <p class="text-sm" style="color: var(--text-light);">${d.desc}</p>
    `;
    grid.appendChild(card);
  });

  lucide.createIcons();
}

const defaultConfig = {
  background_color: '#ffffff',
  surface_color: '#f5f7fb',
  text_color: '#0f172a',
  text_light_color: '#475569',
  primary_color: '#2563eb',
  primary_dark_color: '#1e40af',
  accent_color: '#7c3aed',
  font_family: 'Poppins',
  font_size: 16,
  hero_headline: 'Connecting open\necosystems.',
  hero_subtext: 'Building bridges between industries through open standards, interoperable platforms, and transparent data exchange.',
  cta_text: 'Explore Our Vision'
};

async function onConfigChange(config) {
  const bg = config.background_color || defaultConfig.background_color;
  const surface = config.surface_color || defaultConfig.surface_color;
  const text = config.text_color || defaultConfig.text_color;
  const textLight = config.text_light_color || defaultConfig.text_light_color;
  const primary = config.primary_color || defaultConfig.primary_color;
  const accent = config.accent_color || defaultConfig.accent_color;
  const font = config.font_family || defaultConfig.font_family;
  const size = config.font_size || defaultConfig.font_size;

  document.documentElement.style.setProperty('--bg', bg);
  document.documentElement.style.setProperty('--surface', surface);
  document.documentElement.style.setProperty('--text', text);
  document.documentElement.style.setProperty('--text-light', textLight);
  document.documentElement.style.setProperty('--primary', primary);
  document.documentElement.style.setProperty('--accent', accent);

  document.body.style.fontFamily = `'${font}', sans-serif`;

  const h1 = document.getElementById('hero-headline');
  const sub = document.getElementById('hero-subtext');
  const cta = document.getElementById('cta-btn');

  if (h1) {
    const raw = config.hero_headline || defaultConfig.hero_headline;
    h1.innerHTML = raw.replace(/\n/g, '<br />') + `<span style="color:${primary};">.</span>`;
    h1.style.fontSize = `${size * 3.5}px`;
  }
  if (sub) {
    sub.textContent = config.hero_subtext || defaultConfig.hero_subtext;
    sub.style.fontSize = `${size * 1.1}px`;
  }
  if (cta) {
    cta.textContent = config.cta_text || defaultConfig.cta_text;
  }
}

function mapToCapabilities(config) {
  function makeColor(key) {
    return {
      get: () => config[key] || defaultConfig[key],
      set: (v) => { config[key] = v; window.elementSdk.setConfig({ [key]: v }); }
    };
  }
  return {
    recolorables: [
      makeColor('background_color'),
      makeColor('surface_color'),
      makeColor('text_color'),
      makeColor('primary_color'),
      makeColor('accent_color')
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
    }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ['hero_headline', config.hero_headline || defaultConfig.hero_headline],
    ['hero_subtext', config.hero_subtext || defaultConfig.hero_subtext],
    ['cta_text', config.cta_text || defaultConfig.cta_text]
  ]);
}

function handleContactSubmit(e) {
  e.preventDefault();
  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('contact-success').style.display = 'block';
}

function closeContactSuccess() {
  document.getElementById('contact-overlay').classList.remove('open');
  document.getElementById('contact-form').style.display = '';
  document.getElementById('contact-form').reset();
  document.getElementById('contact-success').style.display = 'none';
}

renderDomains();
lucide.createIcons();

document.querySelectorAll('.fade-up').forEach(el => {
  el.style.animationPlayState = 'paused';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  obs.observe(el);
});

document.querySelectorAll('nav .fade-up, .hero-section .fade-up').forEach(el => {
  el.style.animationPlayState = 'running';
});

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}
