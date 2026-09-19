/**
 * home.js — Home 화면 로직 (v0.6 · "이번 Field Trip이 무엇인지 한눈에 이해하는 것")
 *
 * v0.5까지 Home은 Today 대시보드(ACTION 체크인 버튼·Today's Route·Quick Links·
 * Notice teaser·Simulator)를 겸했지만, 그 운영 정보들은 전부 Private Participant
 * Portal(Google Apps Script)로 옮겨갔습니다. v0.6의 Home은 다음 3가지만 보여줍니다.
 *   1) Hero — 트립 정체성 + D-Day/현재 상태 (날짜 기준 자동 전환, 수동 미리보기 UI 없음)
 *   2) Trip at a Glance — Day 1~5의 아주 짧은 동선 요약
 *   3) My Trip — Private Participant Portal로 이동하는 단일 CTA
 * 상단 내비게이션이 이미 Schedule/Shanghai Guide/Prep으로 가는 길을 제공하므로,
 * Home에 별도 Quick Link 카드를 다시 만들지 않습니다.
 */

function toDateOnly(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function parseISODate(str) { const [y, m, d] = str.split("-").map(Number); return new Date(y, m - 1, d); }
function diffDays(a, b) { const MS = 24 * 60 * 60 * 1000; return Math.round((toDateOnly(b) - toDateOnly(a)) / MS); }

// 오늘 실제 날짜와 TRIP_CONFIG(여행 기간)를 비교해 날짜 기준으로만 자동 전환됩니다.
// 사용자에게 노출되는 수동 미리보기(Simulator) UI는 v0.6에서 제거했습니다.
function computeAutoPhase() {
  const today = toDateOnly(new Date());
  const start = parseISODate(TRIP_CONFIG.startDate);
  const end = parseISODate(TRIP_CONFIG.endDate);
  if (today < start) return { type: "before" };
  if (today > end) return { type: "after" };
  const formatISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const dayObj = ITINERARY.find((d) => d.date === formatISO(today));
  return dayObj ? { type: "day", day: dayObj.day } : { type: "day", day: ITINERARY[0].day };
}

function heroShell(kickerText, titleLines, extra) {
  return `
    <section class="hero">
      <div class="hero__graphic" data-hero-graphic></div>
      <div class="hero__content">
        <div class="hero__kicker">${icon("bolt")}<span>${kickerText}</span></div>
        <h1 class="hero__title">${titleLines.map((l) => `<span${l.accent ? ' class="accent"' : ""}>${l.text}</span>`).join("")}</h1>
        ${extra}
      </div>
    </section>
  `;
}

function heroForPhase(phase) {
  if (phase.type === "before") {
    const today = toDateOnly(new Date());
    const start = parseISODate(TRIP_CONFIG.startDate);
    const dday = diffDays(today, start);
    return heroShell("BIO EXPEDITION · DEC 27–31", [
      { text: "KAIST BIM" },
      { text: "SHANGHAI", accent: true },
      { text: "FIELD TRIP 2026" },
    ], `
      <div class="hero__route">SEOUL (ICN) &rarr; SHANGHAI (PVG)</div>
      <div class="dday"><span class="dday__num">D&minus;${dday > 0 ? dday : 0}</span><span class="dday__label">Until Departure</span></div>
      <div class="status-strip status-strip--prep"><span class="status-strip__dot"></span>PREP MODE</div>
    `);
  }
  if (phase.type === "day") {
    const dayObj = ITINERARY.find((d) => d.day === phase.day);
    return heroShell(`FIELD OPS · ${dayObj.date}`, [
      { text: "ON FIELD" },
      { text: dayObj.label.toUpperCase(), accent: true },
    ], `
      <div class="status-strip"><span class="status-strip__dot"></span>ON FIELD &middot; ${dayObj.label.toUpperCase()}</div>
    `);
  }
  return heroShell("BIO EXPEDITION · WRAP-UP", [
    { text: "MISSION" },
    { text: "COMPLETE", accent: true },
  ], `
    <div class="status-strip status-strip--end"><span class="status-strip__dot"></span>FIELD TRIP ENDED</div>
  `);
}

// day.title은 "SAMPLE Day N · <짧은 요약> (전부 SAMPLE · 미확정)" 형식으로 이미
// 작성되어 있습니다 — 그 가운데 짧은 요약만 뽑아 Trip at a Glance에 재사용하고,
// 형식이 다르면(예상치 못한 데이터) 원래 title을 그대로 보여줍니다.
function shortDayTitle(day) {
  const m = day.title && day.title.match(/·\s*(.+?)\s*\(/);
  return m ? m[1] : day.title;
}

function tripAtGlanceHtml() {
  return `
    <div class="manifest-title"><span class="manifest-title__num">01</span>TRIP AT A GLANCE<span class="manifest-title__line"></span></div>
    <div class="grid grid--2">
      ${ITINERARY.map((day) => `
        <div class="card">
          <div class="day-card__header">
            <div><span class="day-card__label">${day.label}</span><span class="day-card__date"> &middot; ${day.date}</span></div>
            ${statusBadge(day.status)}
          </div>
          <p class="text-muted" style="margin-bottom:0;">${shortDayTitle(day)}</p>
        </div>
      `).join("")}
    </div>
    <p class="text-faint mono" style="margin-top:10px; font-size:.72rem;">자세한 동선과 방문기관은 <a href="itinerary.html">Schedule</a>에서 확인하세요.</p>
  `;
}

// My Trip — v0.6.2부터 내부 게이트웨이 페이지(my-trip.html, 삭제됨) 없이,
// goToPrivatePortal()(main.js)로 participantPortalUrl()에 바로 이동합니다.
function myTripCtaHtml() {
  return `
    <div class="manifest-title"><span class="manifest-title__num">02</span>MY TRIP<span class="manifest-title__line"></span></div>
    <a class="card is-hoverable" href="#" onclick="goToPrivatePortal(event)">
      <h3 style="margin-bottom:4px;">Private Participant Portal 바로가기</h3>
      <p class="text-muted mt-0" style="margin-bottom:0;">실제 일정 · 숙소 · 체크인 · Taxi Team 정보는 로그인 후 확인합니다.</p>
    </a>
  `;
}

function renderHome() {
  const root = document.getElementById("today-root");
  if (!root) return;
  const phase = computeAutoPhase();
  root.innerHTML = `
    ${heroForPhase(phase)}
    ${tripAtGlanceHtml()}
    ${myTripCtaHtml()}
  `;
  injectHeroGraphics();
}

document.addEventListener("DOMContentLoaded", renderHome);
