/**
 * main.js — 공통 기능 + "BIO EXPEDITION OS" 비주얼 시스템 컴포넌트
 *
 *  - 인라인 SVG 아이콘 세트 (외부 아이콘 라이브러리 없음)
 *  - Hero 그래픽 (grid + molecular network + travel route + skyline)
 *  - 상단/하단 내비게이션, 중국어 복사, 장소 카드 렌더링
 */

// ---------- 아이콘 세트 (24x24, currentColor, 외부 의존 없음) ----------
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2.4"/><line x1="12" y1="1.6" x2="12" y2="4.4"/><line x1="12" y1="19.6" x2="12" y2="22.4"/><line x1="1.6" y1="12" x2="4.4" y2="12"/><line x1="19.6" y1="12" x2="22.4" y2="12"/></svg>',
  route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18 L9 10 L15 15 L21 6"/><circle cx="3" cy="18" r="1.5" fill="currentColor" stroke="none"/><circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none"/><circle cx="21" cy="6" r="1.5" fill="currentColor" stroke="none"/></svg>',
  prep: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.2" y="4" width="17.6" height="16" rx="2.2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="14.5" y2="13"/><line x1="7" y1="17" x2="11" y2="17"/></svg>',
  org: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.1"/><circle cx="5" cy="17" r="2.1"/><circle cx="19" cy="17" r="2.1"/><line x1="11.1" y1="7" x2="6.3" y2="14.9"/><line x1="12.9" y1="7" x2="17.7" y2="14.9"/><line x1="7.1" y1="17" x2="16.9" y2="17"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.5s7-7.3 7-12.3a7 7 0 1 0-14 0c0 5 7 12.3 7 12.3z"/><circle cx="12" cy="9.2" r="2.3"/></svg>',
  crew: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="2.7"/><path d="M4 20c0-3.2 2.2-5.2 5-5.2s5 2 5 5.2"/><circle cx="17.3" cy="9" r="2.1"/><path d="M14.6 14.4c2.6 0 4.7 2 4.7 5.6"/></svg>',
  signal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><path d="M8.6 8.6a5 5 0 0 0 0 6.8"/><path d="M15.4 8.6a5 5 0 0 1 0 6.8"/><path d="M5.6 5.6a9.2 9.2 0 0 0 0 12.8"/><path d="M18.4 5.6a9.2 9.2 0 0 1 0 12.8"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="8.2" y="3.6" width="11.5" height="15" rx="1.6"/><path d="M8.2 6.4H6a1.6 1.6 0 0 0-1.6 1.6v12A1.6 1.6 0 0 0 6 21.6h10a1.6 1.6 0 0 0 1.6-1.6v-1.4"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16V12.5L6 7.5h12l2 5V16"/><rect x="3" y="16" width="18" height="4" rx="1.4"/><circle cx="7.5" cy="20" r="1.4"/><circle cx="16.5" cy="20" r="1.4"/><line x1="6" y1="11" x2="18" y2="11"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.3 15.2c.4.9 1.4 1.3 2.7 1.3 1.8 0 3-0.8 3-2s-1-1.7-3-2.1-3-1-3-2.1 1.2-2 3-2c1.3 0 2.3.4 2.7 1.3"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C10.9 21.1 2.9 13.1 2.9 3.7c0-.6.4-1 1-1H7.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>',
  fork: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2.5v7.5M9.4 2.5v7.5M7 10a2.4 2.4 0 0 1-2.4-2.4V2.5M9.4 10a2.4 2.4 0 0 0 2.4-2.4V2.5M8.2 10v11.5"/><path d="M16.5 2.5c-1.8 0-3 2-3 5s1.2 4.6 3 4.6V21.5"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5h12l1 12.5H5L6 8.5z"/><path d="M9 8.5V6.8a3 3 0 0 1 6 0v1.7"/></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6.5A2 2 0 0 1 5 9.5h14a2 2 0 0 1 2 2V18"/><path d="M3 18v2.5M21 18v2.5"/><path d="M3 15h18"/><rect x="5.5" y="9.5" width="6" height="3.2" rx="1"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.2A1.7 1.7 0 0 1 5.7 6.5h1.9l1-1.7h6.8l1 1.7h1.9A1.7 1.7 0 0 1 20 8.2v9.6a1.7 1.7 0 0 1-1.7 1.7H5.7A1.7 1.7 0 0 1 4 17.8V8.2z"/><circle cx="12" cy="12.8" r="3.4"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9.5" rx="2.2"/><path d="M8 11V7.8a4 4 0 0 1 8 0V11"/></svg>',
};

function icon(name) {
  return ICONS[name] || "";
}

// ---------- 브랜드 마크 (KAIST BIM 로고 대체 — 텍스트+아이콘 조합, 공식 로고 변형 아님) ----------
function brandMarkSVG() {
  return `<svg viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14.5" stroke="currentColor" stroke-width="1.2" opacity="0.3"/>
    <circle cx="16" cy="8.5" r="1.8" fill="#1a2c5c"/>
    <circle cx="9" cy="20" r="1.8" fill="#4863b5"/>
    <circle cx="23" cy="20" r="1.8" fill="#4863b5"/>
    <line x1="16" y1="8.5" x2="9" y2="20" stroke="currentColor" stroke-width="1" opacity="0.4"/>
    <line x1="16" y1="8.5" x2="23" y2="20" stroke="currentColor" stroke-width="1" opacity="0.4"/>
    <line x1="9" y1="20" x2="23" y2="20" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  </svg>`;
}

// ---------- Hero 그래픽: grid + molecular network + travel route + skyline ----------
// 하나의 모티프로 KAIST(grid)·BIM(network)·Field Trip(route)·Shanghai(skyline)를 연결합니다.
function heroGraphicSVG() {
  return `
  <svg viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a2c5c" stroke-width="0.5" opacity="0.08"/>
      </pattern>
      <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#1a2c5c"/>
        <stop offset="100%" stop-color="#4863b5"/>
      </linearGradient>
    </defs>

    <rect width="800" height="420" fill="url(#grid)"/>

    <!-- molecular network (BIM: bio innovation) -->
    <g stroke="#23397a" stroke-width="1" opacity="0.4">
      <line x1="120" y1="80" x2="220" y2="130"/>
      <line x1="220" y1="130" x2="180" y2="210"/>
      <line x1="220" y1="130" x2="310" y2="100"/>
      <line x1="310" y1="100" x2="380" y2="170"/>
      <line x1="180" y1="210" x2="90" y2="230"/>
    </g>
    <g fill="#23397a" opacity="0.75">
      <circle cx="120" cy="80" r="4"/>
      <circle cx="220" cy="130" r="5.5"/>
      <circle cx="180" cy="210" r="4"/>
      <circle cx="310" cy="100" r="4"/>
      <circle cx="380" cy="170" r="4.5"/>
      <circle cx="90" cy="230" r="3.5"/>
    </g>

    <!-- travel route: ICN -> Shanghai -->
    <path id="fieldRoute" d="M 60 330 C 260 380, 420 60, 730 90" fill="none" stroke="url(#routeGrad)" stroke-width="1.6" stroke-dasharray="2 10" stroke-linecap="round" opacity="0.65"/>
    <circle cx="60" cy="330" r="4" fill="#1a2c5c"/>
    <circle cx="730" cy="90" r="4" fill="#d9603f"/>
    <g fill="#d9603f">
  <path d="
  M -18 -2
  L -4 -2
  L 4 -14
  L 8 -14
  L 5 -2
  L 18 -2
  L 24 0
  L 18 2
  L 5 2
  L 8 14
  L 4 14
  L -4 2
  L -18 2
  L -24 7
  L -27 7
  L -23 0
  L -27 -7
  L -24 -7
  Z
"/>
  <animateMotion
    dur="9s"
    repeatCount="indefinite"
    rotate="auto"
    path="M 60 330 C 260 380, 420 60, 730 90"
  />
</g>

    <!-- Shanghai skyline silhouette -->
    <g fill="#1a2c5c" opacity="0.08">
      <rect x="0" y="368" width="800" height="52"/>
    </g>
    <g fill="#1a2c5c" opacity="0.22">
      <rect x="30" y="330" width="14" height="90"/>
      <rect x="55" y="300" width="10" height="120"/>
      <rect x="80" y="345" width="18" height="75"/>
      <rect x="470" y="310" width="12" height="110"/>
      <rect x="495" y="270" width="16" height="150"/>
      <rect x="522" y="335" width="10" height="85"/>
      <rect x="545" y="295" width="13" height="125"/>
      <rect x="640" y="320" width="11" height="100"/>
      <rect x="665" y="285" width="15" height="135"/>
      <rect x="695" y="345" width="10" height="75"/>
      <rect x="720" y="300" width="13" height="120"/>
    </g>
    <g fill="#b9790a" opacity="0.55">
      <rect x="497" y="266" width="3" height="6"/>
      <rect x="667" y="281" width="3" height="6"/>
    </g>
  </svg>`;
}

function injectHeroGraphics() {
  document.querySelectorAll("[data-hero-graphic]").forEach((el) => {
    el.innerHTML = heroGraphicSVG();
  });
}

// ---------- 내비게이션 (v0.6 — 핵심 5개로 단순화) ----------
// GitHub Pages = 공개 여행 안내, Google Apps Script = 실제 참가자 운영 앱이라는
// 역할이 명확해졌으므로, 공개 사이트의 최상위 내비게이션은 실제 여행 중 쓰는 5개
// (Home/Schedule/Shanghai Guide/Prep/My Trip)만 남깁니다. 역할별로 메뉴가 달라지던
// v0.5 구조(TOP_NAV_SETS/BOTTOM_NAV_SETS/Demo Persona)는 더 이상 필요하지 않아
// 제거했습니다 — 모든 방문자가 같은 5개 메뉴를 봅니다.
const NAV_ITEMS = [
  { id: "home", label: "Home", href: "index.html", icon: "home" },
  { id: "itinerary", label: "Schedule", href: "itinerary.html", icon: "route" },
  { id: "guide", label: "Shanghai Guide", href: "guide.html", icon: "pin" },
  { id: "prep", label: "Prep", href: "prep.html", icon: "prep" },
  // v0.6.2 — My Trip은 더 이상 내부 게이트웨이 페이지(my-trip.html, 삭제됨)를
  // 거치지 않습니다. 클릭하면 goToPrivatePortal()이 participantPortalUrl()로 같은
  // 탭에서 바로 이동시킵니다(portalLink: true로 표시, renderNav()에서 처리).
  { id: "my-trip", label: "My Trip", href: "#", icon: "crew", portalLink: true },
];
// v0.6.3 — config.js에 붙여넣은 URL에 앞뒤 공백/줄바꿈이 섞여 들어와도(복사-붙여넣기
// 시 흔한 실수) 항상 trim()된 값을 반환합니다. participantPortalUrl 값은 여전히
// js/config.js 한 곳(APP_CONFIG.participantPortalUrl)에서만 관리합니다.
function participantPortalUrl() {
  const raw = typeof APP_CONFIG !== "undefined" ? APP_CONFIG.participantPortalUrl : "";
  const trimmed = (raw || "").trim();
  return trimmed || "#";
}
// config.js에 아직 <APPS_SCRIPT_WEB_APP_URL> placeholder가 남아 있거나 값이 비어
// 있는지 확인합니다. placeholder/빈 값이면 이동하지 않고 간단한 안내를 대신
// 보여줍니다 (goToPrivatePortal() 참고).
function isPortalConfigured() {
  const url = participantPortalUrl();
  return !!url && url !== "#" && !url.includes("<APPS_SCRIPT_WEB_APP_URL>");
}

// v0.6.2 — MY TRIP(nav/Home CTA/Schedule 안내 링크 등 Private Portal로 나가는 모든
// 지점)이 공통으로 사용하는 이동 함수입니다. participantPortalUrl()이 설정되어
// 있으면 같은 탭(window.location.href)에서 바로 이동하고, 아직 placeholder거나
// 비어 있으면 이동하지 않고 간단한 안내만 보여줍니다. participantPortalUrl 값은
// js/config.js 한 곳에서만 관리합니다.
function goToPrivatePortal(e) {
  if (e && typeof e.preventDefault === "function") e.preventDefault();
  if (isPortalConfigured()) {
    window.location.href = participantPortalUrl();
  } else {
    alert("Private Portal 연결 주소가 아직 설정되지 않았습니다.\n(js/config.js → APP_CONFIG.participantPortalUrl)");
  }
  return false;
}

function pathPrefix() {
  return document.body.getAttribute("data-depth") === "1" ? "../" : "";
}

function renderNav() {
  const prefix = pathPrefix();
  const current = document.body.getAttribute("data-page");

  const topList = document.querySelector("[data-site-nav] .site-nav__list");
  if (topList) {
    topList.innerHTML = NAV_ITEMS.map((item, i) => `
      <li>
        <a class="site-nav__link ${item.id === current ? "is-active" : ""}" href="${item.portalLink ? "#" : prefix + item.href}"${item.portalLink ? ' onclick="goToPrivatePortal(event)"' : ""}>
          <span class="site-nav__icon">${icon(item.icon)}</span>
          ${item.label}
          <span class="site-nav__num">${String(i + 1).padStart(2, "0")}</span>
        </a>
      </li>`).join("");
  }

  const bottomNav = document.querySelector("[data-bottom-nav]");
  if (bottomNav) {
    bottomNav.innerHTML = NAV_ITEMS.map((item) => `
        <a class="bottom-nav__link ${item.id === current ? "is-active" : ""}" href="${item.portalLink ? "#" : prefix + item.href}"${item.portalLink ? ' onclick="goToPrivatePortal(event)"' : ""}>
          ${icon(item.icon)}
          <span>${item.label}</span>
        </a>`).join("");
  }

  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  if (toggle && nav) {
    toggle.innerHTML = icon("menu");
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-brand-mark]").forEach((el) => (el.innerHTML = brandMarkSVG()));
}

// ---------- 상태 태그 (DEMO / TBD / CONFIRMED / SAMPLE — 작은 배지) ----------
function statusBadge(status) {
  const map = {
    confirmed: { label: "CONFIRMED", cls: "tag--confirmed" },
    candidate: { label: "CANDIDATE", cls: "tag--candidate" },
    tbd: { label: "TBD", cls: "tag--tbd" },
    demo: { label: "DEMO", cls: "tag--demo" },
    sample: { label: "SAMPLE", cls: "tag--sample" },
  };
  const s = map[status] || map.tbd;
  return `<span class="tag ${s.cls}">${s.label}</span>`;
}

// ---------- REAL + SAMPLE 이중 라벨 (v0.4) ----------
// 실존하는 장소/기관(real: true)을 SAMPLE 데이터로 쓸 때, "실존한다"와
// "이번 트립에서 확정되지 않았다"를 항상 함께, 명확하게 보여주기 위한 헬퍼입니다.
// 예: H+ Hotel → REAL HOTEL · SAMPLE ACCOMMODATION · NOT CONFIRMED
function realSampleTagsHtml(item) {
  if (!item || !item.real) return "";
  return `
    <span class="tag tag--sample">${item.realLabel || "REAL"}</span>
    <span class="tag tag--sample">${item.sampleLabel || "SAMPLE"}</span>
    <span class="tag tag--outline">NOT CONFIRMED</span>
  `;
}

// item.real이 있으면 REAL+SAMPLE 이중 라벨을, 없으면 기존 statusBadge를 보여줍니다.
function statusOrRealTagsHtml(item) {
  if (item && item.real) return realSampleTagsHtml(item);
  return statusBadge(item ? item.status : null);
}

// ---------- 예약 상태 표시 (있을 때만) ----------
const RESERVATION_LABEL = {
  required: "RESERVATION NEEDED",
  done: "RESERVED",
  walkin: "WALK-IN OK",
  tbd: "RESERVATION TBD",
};
function reservationTag(res) {
  if (!res) return "";
  return `<span class="tag tag--outline">${RESERVATION_LABEL[res] || "RESERVATION TBD"}</span>`;
}

// ---------- 중국어 이름/주소 복사 ----------
function copyText(text, btnEl) {
  if (!text) return;
  const done = () => {
    if (!btnEl) return;
    const original = btnEl.getAttribute("data-original-label") || btnEl.innerHTML;
    btnEl.setAttribute("data-original-label", original);
    btnEl.innerHTML = `${icon("check")}<span>COPIED</span>`;
    btnEl.classList.add("is-copied");
    setTimeout(() => {
      btnEl.innerHTML = original;
      btnEl.classList.remove("is-copied");
    }, 1500);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    done();
  } catch (e) {
    /* v0.2 데모 범위 — 복사 실패 시 조용히 무시 */
  }
  document.body.removeChild(ta);
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-copy]");
  if (btn) copyText(btn.getAttribute("data-copy"), btn);
});

// ---------- 지도 링크 버튼 ----------
function mapButtonsHtml(place) {
  if (!place || !place.map) return "";
  if (place.map.status !== "verified") {
    return `<button class="btn btn--sm" type="button" disabled title="지도 서비스 검증 후 연결 예정">${icon("pin")}<span>MAP · VERIFY LATER</span></button>`;
  }
  const links = [];
  if (place.map.google) links.push(`<a class="btn btn--sm" href="${place.map.google}" target="_blank" rel="noopener">Google Maps</a>`);
  if (place.map.amap) links.push(`<a class="btn btn--sm" href="${place.map.amap}" target="_blank" rel="noopener">高德地图</a>`);
  if (place.map.baidu) links.push(`<a class="btn btn--sm" href="${place.map.baidu}" target="_blank" rel="noopener">百度地图</a>`);
  return links.join("");
}

// ---------- 장소 카드 (공용) ----------
const CATEGORY_LABEL = {
  hotel: "HOTEL",
  see: "SEE",
  shop: "SHOP",
  org: "VISIT",
  airport: "AIRPORT",
};
const CATEGORY_ICON = {
  hotel: "bed",
  see: "pin",
  shop: "bag",
  org: "org",
  airport: "route",
};

// 중국어명/주소 블록 — 확정된 중국어명이 있으면 복사 가능한 카드로,
// 아직이면 VERIFY/TBD 안내로 표시합니다. 여러 카드 타입에서 공용으로 씁니다.
function zhBlockOrNotice(place) {
  const hasZh = place.name_zh && place.name_zh.trim().length > 0;
  if (hasZh) {
    return `
      <div class="zh-block">
        <div class="zh-block__label">中文 · 기사님께 보여주기</div>
        <div class="zh-block__text">${place.name_zh}</div>
        ${place.address_zh ? `<div class="zh-block__addr">${place.address_zh}</div>` : ""}
        <div class="btn-row" style="margin-top:11px;">
          <button class="copy-btn" type="button" data-copy="${escapeAttr(place.name_zh)}">${icon("copy")}<span>NAME</span></button>
          ${place.address_zh ? `<button class="copy-btn" type="button" data-copy="${escapeAttr(place.address_zh)}">${icon("copy")}<span>ADDRESS</span></button>` : ""}
        </div>
      </div>`;
  }
  return place.zhVerify
    ? `<div class="notice notice--tbd">中文名称 &middot; VERIFY &middot; Address &middot; TBD</div>`
    : `<div class="notice notice--tbd">중국어 이름·주소 TBD</div>`;
}

// 사진 자리 — 실제 사진이 없을 때 억지 이미지 대신 쓰는 자리표시자
function photoPlaceholderHtml() {
  return `<div class="photo-slot">${icon("camera")}<span>PHOTO · TBD</span></div>`;
}

// COPY 中文 / SHOW DRIVER 액션 버튼 — 중국어명이 검증되기 전까지는 비활성 상태로
// 자리만 잡아두고, 검증되면 그대로 동작하는 버튼입니다 (Explore Shanghai 카드 전용).
function zhActionsHtml(place) {
  const hasZh = place.name_zh && place.name_zh.trim().length > 0;
  if (hasZh) {
    return `
      <button class="copy-btn" type="button" data-copy="${escapeAttr(place.name_zh)}">${icon("copy")}<span>COPY 中文</span></button>
      <button class="copy-btn" type="button" data-show-driver="${escapeAttr(place.name_ko)}|||${escapeAttr(place.name_zh)}|||${escapeAttr(place.address_zh || "")}">${icon("bolt")}<span>SHOW DRIVER</span></button>
    `;
  }
  return `
    <button class="copy-btn" type="button" disabled title="중국어명 검증 후 사용 가능">${icon("copy")}<span>COPY 中文 · VERIFY</span></button>
    <button class="copy-btn" type="button" disabled title="중국어명 검증 후 사용 가능">${icon("bolt")}<span>SHOW DRIVER · VERIFY</span></button>
  `;
}

// SHOW DRIVER — 기사님께 보여줄 큰 글씨 화면 (중국어명이 검증된 이후 실제로 동작)
function openDriverModal(nameKo, nameZh, addressZh) {
  let modal = document.getElementById("driver-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "driver-modal";
    modal.className = "driver-modal";
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div class="driver-modal__backdrop" data-close-driver></div>
    <div class="driver-modal__card">
      <button class="driver-modal__close" type="button" data-close-driver aria-label="닫기">${icon("chevron")}</button>
      <div class="driver-modal__label">${nameKo}</div>
      <div class="driver-modal__zh">${nameZh}</div>
      ${addressZh ? `<div class="driver-modal__addr">${addressZh}</div>` : ""}
    </div>
  `;
  modal.classList.add("is-open");
  modal.querySelectorAll("[data-close-driver]").forEach((el) => el.addEventListener("click", () => modal.classList.remove("is-open")));
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-show-driver]");
  if (!btn) return;
  const [nameKo, nameZh, addressZh] = btn.getAttribute("data-show-driver").split("|||");
  openDriverModal(nameKo, nameZh, addressZh);
});

function placeCardHtml(place) {
  if (!place) return `<div class="placeholder-box">장소 정보 없음 (TBD)</div>`;
  return `
    <article class="place-card">
      <div class="place-card__top">
        <div class="place-card__category">${icon(CATEGORY_ICON[place.category] || "pin")}<span>${CATEGORY_LABEL[place.category] || "PLACE"}</span></div>
        <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end;">${statusOrRealTagsHtml(place)}${reservationTag(place.reservation)}</div>
      </div>
      <div>
        <div class="place-card__name-ko">${place.name_ko}</div>
        <div class="place-card__name-en">${place.name_en || ""}</div>
      </div>
      ${place.note ? `<div class="place-card__desc">${place.note}</div>` : ""}

      ${zhBlockOrNotice(place)}

      <div class="place-card__meta">${icon("pin")}<span>${place.area || "지역 TBD"}</span></div>

      <div class="btn-row">${mapButtonsHtml(place)}</div>
    </article>
  `;
}

function escapeAttr(str) {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function getPlaceById(id) {
  if (typeof PLACES === "undefined" || !id) return null;
  return PLACES.find((p) => p.id === id) || null;
}

// ---------- SAMPLE Dinner 조회/카드 (v0.4) ----------
function getDinnerById(id) {
  if (typeof SAMPLE_DINNERS === "undefined" || !id) return null;
  return SAMPLE_DINNERS.find((d) => d.id === id) || null;
}

function dinnerCardHtml(dinner) {
  if (!dinner) return "";
  return `
    <div class="card" style="margin-top:10px;">
      <div class="mono text-faint" style="font-size:.68rem;letter-spacing:.08em;margin-bottom:8px;">${icon("fork")} ${dinner.label}</div>
      <div class="notice notice--tbd" style="margin:0 0 12px;"><strong>Restaurant: TBD</strong> — 실제 식당은 아직 결정되지 않았습니다. SAMPLE 예약 정보로 화면 동작만 확인합니다.</div>
      <dl class="detail-list">
        <dt>Restaurant (中文)</dt><dd>${dinner.restaurantName_zh || "TBD"}</dd>
        <dt>Address (中文)</dt><dd>${dinner.address_zh || "TBD"}</dd>
        <dt>Meeting Time</dt><dd>${dinner.meetingTime || "TBD"}</dd>
        <dt>Reservation Time</dt><dd>${dinner.reservationTime || "TBD"}</dd>
        <dt>Party Size</dt><dd>${dinner.partySize ? dinner.partySize + "명 (SAMPLE)" : "TBD"}</dd>
        <dt>Reservation Holder</dt><dd>${dinner.reservationHolder || "TBD"}</dd>
        <dt>Reservation Status</dt><dd>${reservationTag(dinner.reservationStatus)}</dd>
        <dt>Menu</dt><dd>${dinner.menu || "TBD"}</dd>
        <dt>Price / Budget</dt><dd>${dinner.price || "TBD"}</dd>
      </dl>
      <div class="btn-row" style="margin-top:12px;">
        <button class="btn btn--sm" type="button" disabled title="지도 연결 예정">${icon("pin")}<span>MAP · TBD</span></button>
        <button class="copy-btn" type="button" disabled title="중국어명 확정 후 사용 가능">${icon("copy")}<span>COPY 中文 · TBD</span></button>
        <button class="copy-btn" type="button" disabled title="중국어명 확정 후 사용 가능">${icon("bolt")}<span>SHOW DRIVER · TBD</span></button>
      </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  injectHeroGraphics();
});
