/**
 * data-trip.js
 * ------------------------------------------------------------------
 * "여행 콘텐츠" 데이터 (일정 / 방문기관 / 음식 / 장소 / 쇼핑 / 숙소 / 준비 정보).
 * 화면(HTML/JS)과 데이터를 분리해서, 실제 정보가 확정될 때마다
 * 이 파일만 수정하면 모든 페이지에 반영되도록 설계했습니다.
 *
 * 상태값 규칙 (status)
 *   "confirmed" = 실제로 확정된 정보
 *   "candidate" = 실제로 관심 있게 수집한 후보 (아직 확정 아님)
 *   "tbd"       = 정보 자체가 아직 미정
 *   "demo"      = 실제 콘텐츠가 아니라 기능 시연을 위한 가상(DEMO) 데이터
 *   "sample"    = v0.4 신설. 실존 장소/기관 이름을 SAMPLE 데이터로 사용하되,
 *                 KAIST BIM Field Trip에 실제로 확정된 것이 아님을 뜻합니다.
 *
 * real / realLabel / sampleLabel (v0.4 신설)
 *   real: true 인 항목은 "실제로 존재하는" 장소/기관입니다 (H+ Hotel, 방문기관 5곳 등).
 *   realLabel  = "REAL HOTEL" / "REAL ORGANIZATION" 처럼 실존한다는 라벨
 *   sampleLabel= "SAMPLE ACCOMMODATION" / "SAMPLE VISIT" 처럼 이번 트립에서는
 *                아직 SAMPLE(미확정)라는 라벨
 *   → 실존 여부와 확정 여부를 항상 함께, 명확히 구분해서 보여주기 위한 필드입니다.
 *   → 화면에서는 항상 "NOT CONFIRMED"를 함께 표시합니다 (main.js realSampleTagsHtml).
 *
 * zhVerify: true  → 중국어명/주소를 아직 검증하지 않은 CANDIDATE. 화면에는
 *                    "中文名称 · VERIFY" 로 표시되고, 임의로 지어낸 중국어를
 *                    넣지 않습니다. 다음 단계에서 하나씩 검증해 채웁니다.
 *
 * ------------------------------------------------------------------
 * 정보구조 (v0.3.1 목적별 화면 분리를 그대로 유지 + v0.4 SAMPLE 트립 데이터 추가)
 *   PLACES         "장소"만 다룹니다 — 숙소(hotel) / 공항(airport) /
 *                  방문기관 위치(org) / 관광·야경·포토·전시·체험(see) / 쇼핑 매장(shop).
 *   ORGS           방문기관(회사/학교) 사전학습 콘텐츠 → Field Visits 화면
 *   FOOD_ITEMS     "먹어보고 싶은 음식" 위시리스트 (식당이 아직 미정)
 *   RESTAURANTS    실제 식당/카페 후보 장소 (확정된 방문지가 아님)
 *   SOUVENIR_ITEMS "무엇을 살지" 기념품 품목 (지금은 비어있음, 구조만 준비)
 *   SAMPLE_DINNERS v0.4 신설 — 공식 일정처럼 동작하는 SAMPLE 단체 저녁식사 2건
 *                  (Dinner 01 양꼬치 · Dinner 02 베이징덕). 실제 식당은 TBD.
 *   ITINERARY      v0.4에서 5일 전체에 schedule[] (시간대별 SAMPLE 이벤트)을
 *                  채워 Today/Itinerary 화면이 실제로 작동하는지 확인합니다.
 * ------------------------------------------------------------------
 *
 * ⚠️ v0.4 SAMPLE MODE 안내
 * 이 파일에 있는 H+ Hotel / Sanofi China / Zai Lab / WuXi Biologics /
 * Shanghai Henlius Biotech / Alibaba Cloud 는 전부 "실존하는" 장소·기관입니다.
 * 하지만 KAIST BIM Shanghai Field Trip의 실제 확정 숙소/방문기관이 아닙니다.
 * 24명 SAMPLE 트립이 실제로 진행 중이라고 가정했을 때 Room Assignment /
 * Hotel Check-in / Wuxi Bus Boarding 같은 기능이 어떻게 동작하는지 검증하기
 * 위한 자리표시자(SAMPLE) 데이터입니다. 공식 일정이 확정되면 전부 교체됩니다.
 */

// ===== 여행 기본 정보 =====
// 2026-12-27 ~ 2026-12-31, 실제 확정된 Field Trip 기간입니다.
const TRIP_CONFIG = {
  name: "KAIST BIM Shanghai Field Trip",
  isDemo: false,
  version: "v0.6.3 · Portal Link Hotfix",
  startDate: "2026-12-27",
  endDate: "2026-12-31",
  note: "여행 기간(2026.12.27~12.31)은 확정입니다. 세부 일정(방문기관/식사/숙소)은 SAMPLE MODE로 채워져 있으며, 실제로 확정된 공식 일정이 아닙니다 (기능 검증용).",
  totalParticipants: 24,
  studentCount: 18,
  professorCount: 5,
  staffCount: 1,
};

// ===== Places: 숙소 / 공항 / 방문기관 위치 / 관광·체험(SEE) / 쇼핑 매장 =====
// category: "hotel" | "airport" | "org" | "see" | "shop"
// status:   "confirmed" | "candidate" | "tbd" | "demo" | "sample"
// exploreType(see 전용): "landmark" | "nightview" | "photo" | "museum" | "walk" | "experience" (복수 가능)
// duration(see 전용): 예상 체류시간 — 지금은 전부 TBD, 다음 단계에 채울 자리만 마련
// reservation: "required" | "done" | "walkin" | "tbd"
// map.status: "unverified"(현지 서비스 검증 전) | "verified"
// real / realLabel / sampleLabel: v0.4 SAMPLE MODE 이중 라벨 (파일 상단 설명 참고)
const PLACES = [
  // ---------- STAY (호텔) — v0.4: 실존 호텔을 SAMPLE 숙소로 사용 ----------
  {
    id: "hplus-hotel",
    category: "hotel",
    status: "sample",
    real: true,
    realLabel: "REAL HOTEL",
    sampleLabel: "SAMPLE ACCOMMODATION",
    name_ko: "H+ Hotel (상하이) · SAMPLE 숙소",
    name_en: "H+ Hotel Shanghai (real hotel, used as SAMPLE only)",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (정확한 지점 · 주소는 SAMPLE 단계에서 확인하지 않았습니다)",
    note: "H+ Hotel은 실존하는 호텔이지만, KAIST BIM Field Trip의 실제 확정 숙소가 아닙니다. Room Assignment/Hotel Check-in 기능을 검증하기 위한 SAMPLE 데이터입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },

  // ---------- AIRPORTS (v0.4 신설 — 이동 SAMPLE 데이터용) ----------
  {
    id: "icn-airport",
    category: "airport",
    status: "sample",
    name_ko: "인천국제공항 (ICN)",
    name_en: "Incheon International Airport",
    area: "대한민국 인천",
    note: "집결/출국 시각은 SAMPLE입니다. 실제 항공편은 확정되지 않았습니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "pudong-airport",
    category: "airport",
    status: "sample",
    name_ko: "상하이 푸동국제공항 (PVG)",
    name_en: "Shanghai Pudong International Airport",
    area: "상하이 푸동신구",
    note: "도착/귀국 시각은 SAMPLE입니다. 실제 항공편은 확정되지 않았습니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },

  // ---------- FIELD VISITS (방문기관 위치) — v0.4: 실존 기관을 SAMPLE 방문지로 사용 ----------
  {
    id: "wuxi-biologics-wuxi",
    category: "org",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "우시 바이오로직스 (우시 소재 사업장)",
    name_en: "WuXi Biologics — Wuxi site",
    name_zh: "药明生物（无锡）",
    address_zh: "확인 필요 (공개 주소 미검증 · 방문 대상 사업장 미정)",
    area: "장쑤성 우시(無錫)시 — 이번 SAMPLE 일정은 우시 현지 사업장을 가정합니다",
    note: "실제 방문 확정 기관이 아니라, Day 3 우시(Wuxi) 장거리 이동 SAMPLE 일정을 검증하기 위한 데이터입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "sanofi-china-shanghai",
    category: "org",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "사노피 차이나 (Sanofi China)",
    name_en: "Sanofi China",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (방문 사업장 · 상세 주소 미정)",
    note: "실제 방문 확정 기관이 아닙니다. Field Visits 화면 검증용 SAMPLE 데이터입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "zai-lab-shanghai",
    category: "org",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "자이랩 (Zai Lab)",
    name_en: "Zai Lab",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (방문 사업장 · 상세 주소 미정)",
    note: "실제 방문 확정 기관이 아닙니다. Field Visits 화면 검증용 SAMPLE 데이터입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "henlius-biotech-shanghai",
    category: "org",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "상하이 헨리우스 바이오텍 (Shanghai Henlius Biotech)",
    name_en: "Shanghai Henlius Biotech",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (방문 사업장 · 상세 주소 미정)",
    note: "실제 방문 확정 기관이 아닙니다. Field Visits 화면 검증용 SAMPLE 데이터입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "alibaba-cloud-shanghai",
    category: "org",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "알리바바 클라우드 (Alibaba Cloud) · DX·AI 산업 방문",
    name_en: "Alibaba Cloud (DX / AI industry visit sample)",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (방문 사업장 · 상세 주소 미정 · DX·AI 유사 기관으로 대체될 수 있음)",
    note: "실제 방문 확정 기관이 아닙니다. Field Visits 화면 검증용 SAMPLE 데이터입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },

  // ---------- EXPLORE SHANGHAI (SEE / 관광·야경·포토·전시·체험 후보) ----------
  {
    id: "see-bund",
    category: "see",
    status: "candidate",
    exploreType: ["landmark", "nightview"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "와이탄 (The Bund)",
    name_en: "The Bund",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "황푸구 인근 (지도 서비스 검증 후 확인)",
    note: "자유시간 방문 후보이자, Day 1 SAMPLE 야간 산책 코스로도 사용됩니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-pudong-art-museum",
    category: "see",
    status: "candidate",
    exploreType: ["museum"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "푸동미술관 (Pudong Museum of Art)",
    name_en: "Pudong Museum of Art",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "푸동 (추후 확인)",
    note: "자유시간 방문 후보입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-longhua-pagoda",
    category: "see",
    status: "candidate",
    exploreType: ["photo"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "용화탑 주변 포토스팟 (Longhua Pagoda)",
    name_en: "Longhua Pagoda area — photo spot",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "쉬후이구 (추후 확인)",
    note: "포토스팟 방문 후보입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-heping-park",
    category: "see",
    status: "candidate",
    exploreType: ["landmark", "photo"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "허핑공원 (Heping Park)",
    name_en: "Heping Park",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "추후 확인",
    note: "자유시간 방문 후보입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-heatherwick",
    category: "see",
    status: "candidate",
    exploreType: ["landmark", "experience"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "1000 Trees (Thomas Heatherwick 설계)",
    name_en: "1000 Trees",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "쑤저우강변 (정확한 위치 확인 필요)",
    note: "실제로 관심 있게 모아둔 후보입니다. 정식 중국어명·주소는 아직 검증 전입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-the-stage",
    category: "see",
    status: "candidate",
    exploreType: ["nightview"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: '"The Stage" 전망대 (명칭 확인 중)',
    name_en: '"The Stage" viewpoint (name unconfirmed)',
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "확인 필요",
    note: "정식 명칭·운영 여부를 추후 확인할 예정입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-glass-room-monet",
    category: "see",
    status: "candidate",
    exploreType: ["photo"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "Glass Room / Monet Lakeside (명칭 확인 중)",
    name_en: "Glass Room / Monet Lakeside (name unconfirmed)",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "확인 필요",
    note: "정식 명칭·운영 여부를 추후 확인할 예정입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-lv-boat-exhibition",
    category: "see",
    status: "candidate",
    exploreType: ["museum"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "Louis Vuitton 보트 전시 (운영 여부 확인 중)",
    name_en: "Louis Vuitton boat exhibition (status unconfirmed)",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "확인 필요",
    note: "현재 운영 여부·정식 명칭을 추후 확인할 예정입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-ai-massage",
    category: "see",
    status: "candidate",
    exploreType: ["experience"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "AI 마사지 체험 (후보)",
    name_en: "AI massage experience (candidate)",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "확인 필요",
    note: "체험 후보입니다 — 매장/브랜드는 아직 미정입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-wanghong-experience",
    category: "see",
    status: "candidate",
    exploreType: ["experience"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "왕홍(网红) 스타일 체험 (후보)",
    name_en: '"Wanghong"-style experience (candidate)',
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "확인 필요",
    note: "구체적인 장소·브랜드는 아직 미정입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-robot-experience",
    category: "see",
    status: "candidate",
    exploreType: ["experience"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "로봇 체험/대여 (후보)",
    name_en: "Robot experience / rental (candidate)",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "확인 필요",
    note: "구체적인 장소·브랜드는 아직 미정입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },

  {
    id: "see-wukang-mansion",
    category: "see",
    status: "candidate",
    exploreType: ["landmark", "walk", "photo"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "우캉맨션 / 우캉루 (Wukang Mansion / Wukang Road)",
    name_en: "Wukang Mansion / Wukang Road",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "쉬후이구 (정확한 위치 확인 필요)",
    note: "실제로 관심 있게 모아둔 후보입니다. 산책하며 건축을 구경하는 스팟입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-xintiandi",
    category: "see",
    status: "candidate",
    exploreType: ["landmark", "walk", "nightview"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "신천지 (Xintiandi)",
    name_en: "Xintiandi",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "황푸구 (정확한 위치 확인 필요)",
    note: "실제로 관심 있게 모아둔 후보입니다. 스쿠먼(石库门) 골목을 재개발한 상업지구입니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-yuyuan-garden",
    category: "see",
    status: "candidate",
    exploreType: ["landmark", "walk"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "예원 (Yuyuan Garden)",
    name_en: "Yuyuan Garden",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "황푸구 (정확한 위치 확인 필요)",
    note: "실제로 관심 있게 모아둔 후보입니다. 전통 정원과 주변 상가(예원상성)를 함께 둘러볼 수 있습니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "see-nanjing-road",
    category: "see",
    status: "candidate",
    exploreType: ["landmark", "walk", "nightview"],
    bestTime: "TBD",
    duration: "TBD",
    reservation: "tbd",
    name_ko: "난징동루 (Nanjing East Road)",
    name_en: "Nanjing East Road",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "황푸구 (정확한 위치 확인 필요)",
    note: "실제로 관심 있게 모아둔 후보이자, Day 1 SAMPLE 야간 산책 코스로도 사용됩니다.",
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },

  // ---------- SHOP & SOUVENIRS (매장) ----------
  {
    id: "shop-popmart",
    category: "shop",
    status: "candidate",
    name_ko: "POP MART",
    name_en: "POP MART",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (지점 확인 필요)",
    note: "기념품/굿즈 구매 후보 매장입니다.",
    souvenir_ids: [],
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "shop-miniso",
    category: "shop",
    status: "candidate",
    name_ko: "MINISO",
    name_en: "MINISO",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (지점 확인 필요)",
    note: "생활잡화·굿즈 구매 후보 매장입니다.",
    souvenir_ids: [],
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "shop-mms",
    category: "shop",
    status: "candidate",
    name_ko: "M&M'S",
    name_en: "M&M'S",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (지점 확인 필요)",
    note: "과자/식품 기념품 구매 후보 매장입니다.",
    souvenir_ids: [],
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
  {
    id: "shop-harmay",
    category: "shop",
    status: "candidate",
    name_ko: "HARMAY",
    name_en: "HARMAY",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (지점 확인 필요)",
    note: "뷰티/코스메틱 편집매장 후보입니다. 매장 공간 자체가 볼거리로 알려져 있습니다.",
    souvenir_ids: [],
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
];

// ===== Host Orgs (Field Visits): 방문기관 사전학습 콘텐츠 =====
// v0.4: 실존 기관 5곳을 "REAL ORGANIZATION · SAMPLE VISIT · NOT CONFIRMED"로 사용합니다.
// 방문 대상 사업장 · 상세 주소 · 방문 가능 여부 · 미팅 담당자 등 확인되지 않은 정보는
// 임의로 만들지 않고 TBD로 남겨둡니다. (§9 — 이번 라운드는 짧은 SAMPLE 프로필만)
const ORGS = [
  {
    id: "wuxi-biologics",
    place_id: "wuxi-biologics-wuxi",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "우시 바이오로직스 (WuXi Biologics · Wuxi)",
    summary: {
      oneLine: "바이오의약품 위탁개발생산(CRDMO) 기업 — Day 3 우시(Wuxi) 이동 SAMPLE 일정 검증용",
      keywords: ["CRDMO", "바이오의약품 CDMO", "홍콩거래소 상장", "우시(Wuxi) 소재"],
      whyVisit: "TBD — 방문 목적·의제는 아직 정해지지 않았습니다.",
    },
    detail: {
      founded: "2015년 설립 (모회사 WuXi AppTec에서 분사, 사업 기원은 2010년으로 거슬러 올라감)",
      headquarters: "중국 장쑤성 우시(無錫)시",
      business: "생물의약품(바이오로직스) 신약 개발을 위한 개방형 통합 CRDMO(위탁연구·개발·생산) 플랫폼 제공",
      listing: "2017년 6월 홍콩거래소(HKEX) 상장, 2020년 8월 항셍지수(Hang Seng Index) 편입",
      shanghaiSites: "우시(無錫) 본사 사업장 외에도 상하이 와이가오차오, 펑셴 등 복수 사업장을 보유 — 이번 SAMPLE 일정은 Day 3 우시 이동을 가정해 우시 사업장을 대상으로 표시합니다. 실제 방문 대상 사업장은 아직 정해지지 않았습니다.",
      whatToWatch: "TBD — 방문이 확정되면 최근 사업 이슈, 업계 내 포지셔닝, KAIST BIM 관점에서 주목할 점을 이 자리에 정리할 예정입니다.",
      source: "일반에 공개된 기업 개요 수준 정보 (2026년 9월 기준, 상세 검증은 방문 확정 후 진행 예정)",
      prepQuestions: "TBD — 방문이 확정되면 사전학습 질문을 이 자리에 정리할 예정입니다.",
    },
  },
  {
    id: "sanofi-china",
    place_id: "sanofi-china-shanghai",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "사노피 차이나 (Sanofi China)",
    summary: {
      oneLine: "글로벌 제약회사 사노피의 중국 법인 — Day 2 SAMPLE Visit A 검증용",
      keywords: ["글로벌 제약", "백신·스페셜티케어", "프랑스 본사", "중국 R&D·생산 거점"],
      whyVisit: "TBD — 방문 목적·의제는 아직 정해지지 않았습니다.",
    },
    detail: {
      founded: "1973년 프랑스에서 설립 (Sanofi) · 중국 진출은 수십 년 전부터",
      headquarters: "글로벌 본사: 프랑스 파리 · 중국 본부: 상하이",
      business: "백신, 스페셜티케어, 일반의약품 등을 다루는 글로벌 제약회사. 중국 내 대규모 R&D·생산 거점 보유",
      listing: "유로넥스트 파리(SAN), 나스닥(SNY) 상장",
      shanghaiSites: "상하이 지역에 R&D·생산 관련 거점 보유 — 이번 방문 대상 사업장·상세 주소는 아직 정해지지 않았습니다.",
      whatToWatch: "TBD — 방문이 확정되면 이 자리에 정리할 예정입니다.",
      source: "일반에 공개된 기업 개요 수준 정보 (2026년 9월 기준, 상세 검증은 방문 확정 후 진행 예정)",
      prepQuestions: "TBD",
    },
  },
  {
    id: "zai-lab",
    place_id: "zai-lab-shanghai",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "자이랩 (Zai Lab)",
    summary: {
      oneLine: "상하이 소재 바이오제약기업 (혁신 신약 도입·개발) — Day 2 SAMPLE Visit B 검증용",
      keywords: ["바이오제약", "라이선스 인 모델", "나스닥·홍콩거래소 상장", "상하이 소재"],
      whyVisit: "TBD — 방문 목적·의제는 아직 정해지지 않았습니다.",
    },
    detail: {
      founded: "2013년 설립 (상하이 소재 바이오제약기업)",
      headquarters: "중국 상하이",
      business: "글로벌 혁신 신약을 중국 시장에 도입(라이선스 인)·개발·상업화하고, 최근에는 자체 신약 개발도 확대하는 바이오제약기업",
      listing: "나스닥(ZLAB), 홍콩거래소(9688) 상장",
      shanghaiSites: "상하이에 본사 및 R&D 조직 보유 — 이번 방문 대상 사업장·상세 주소는 아직 정해지지 않았습니다.",
      whatToWatch: "TBD — 방문이 확정되면 이 자리에 정리할 예정입니다.",
      source: "일반에 공개된 기업 개요 수준 정보 (2026년 9월 기준, 상세 검증은 방문 확정 후 진행 예정)",
      prepQuestions: "TBD",
    },
  },
  {
    id: "henlius-biotech",
    place_id: "henlius-biotech-shanghai",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "상하이 헨리우스 바이오텍 (Shanghai Henlius Biotech)",
    summary: {
      oneLine: "바이오시밀러·항체 신약 개발기업 (Fosun Pharma 계열) — Day 4 SAMPLE Visit C 검증용",
      keywords: ["바이오시밀러", "항체 신약", "종양학", "홍콩거래소 상장"],
      whyVisit: "TBD — 방문 목적·의제는 아직 정해지지 않았습니다.",
    },
    detail: {
      founded: "2010년 설립 (Fosun Pharma 계열 바이오제약기업)",
      headquarters: "중국 상하이",
      business: "바이오시밀러 및 혁신 항체 신약(종양학 중심) 개발·생산 기업",
      listing: "홍콩거래소(2696) 상장",
      shanghaiSites: "상하이 소재 R&D·생산시설 보유 — 이번 방문 대상 사업장·상세 주소는 아직 정해지지 않았습니다.",
      whatToWatch: "TBD — 방문이 확정되면 이 자리에 정리할 예정입니다.",
      source: "일반에 공개된 기업 개요 수준 정보 (2026년 9월 기준, 상세 검증은 방문 확정 후 진행 예정)",
      prepQuestions: "TBD",
    },
  },
  {
    id: "alibaba-cloud",
    place_id: "alibaba-cloud-shanghai",
    status: "sample",
    real: true,
    realLabel: "REAL ORGANIZATION",
    sampleLabel: "SAMPLE VISIT",
    name_ko: "알리바바 클라우드 (Alibaba Cloud) · DX·AI 산업 방문",
    summary: {
      oneLine: "알리바바그룹의 클라우드·AI 인프라 사업부 — Day 4 SAMPLE Visit D 검증용 (DX·AI 산업 방문 대체 후보 포함)",
      keywords: ["클라우드 컴퓨팅", "AI 인프라", "알리바바그룹", "DX·AI 산업"],
      whyVisit: "TBD — 방문 목적·의제는 아직 정해지지 않았습니다.",
    },
    detail: {
      founded: "2009년 설립 (알리바바그룹의 클라우드 컴퓨팅 사업부)",
      headquarters: "중국 항저우(그룹 본사) · 상하이 등 복수 거점",
      business: "클라우드 컴퓨팅·AI 인프라 서비스를 제공하는 아시아 최대 클라우드 사업자 중 하나",
      listing: "알리바바그룹(BABA) 산하 사업부문 — 알리바바그룹은 뉴욕증권거래소·홍콩거래소 상장",
      shanghaiSites: "상하이 지역 오피스/이노베이션 센터 등 — 이번 방문 대상 장소는 아직 정해지지 않았습니다. 유사한 DX·AI 산업 방문지로 대체될 수 있습니다.",
      whatToWatch: "TBD — 방문이 확정되면 이 자리에 정리할 예정입니다.",
      source: "일반에 공개된 기업 개요 수준 정보 (2026년 9월 기준, 상세 검증은 방문 확정 후 진행 예정)",
      prepQuestions: "TBD",
    },
  },
];

// ===== Eat Shanghai (1) — 먹어보고 싶은 음식 위시리스트 =====
// 특정 식당이 아직 정해지지 않은 "메뉴 자체"에 대한 관심 후보입니다.
// restaurant_ids: 이 음식을 파는 것으로 확인된 RESTAURANTS 항목 id (지금은 전부 미확정 · 빈 배열)
const FOOD_ITEMS = [
  { id: "food-yangchuan", status: "candidate", name_ko: "양꼬치", name_en: "Lamb skewers (Yangchuan)", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다 — Day 1 SAMPLE Dinner 01로도 사용됩니다.", restaurant_ids: [] },
  { id: "food-peking-duck", status: "candidate", name_ko: "베이징덕", name_en: "Peking Duck", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다 — Day 4 SAMPLE Dinner 02로도 사용됩니다.", restaurant_ids: [] },
  { id: "food-kaoyu", status: "candidate", name_ko: "카오위 (烤鱼)", name_en: "Kao Yu (grilled fish hot pot)", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다.", restaurant_ids: [] },
  { id: "food-mala-xiaolongxia", status: "candidate", name_ko: "마라룽샤", name_en: "Mala crayfish", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다.", restaurant_ids: [] },
  { id: "food-hongshaorou", status: "candidate", name_ko: "홍소육", name_en: "Hongshaorou (braised pork belly)", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다.", restaurant_ids: [] },
  { id: "food-crab-noodle", status: "candidate", name_ko: "게살국수", name_en: "Crab noodles", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다. 정확한 메뉴 표기는 식당마다 다를 수 있습니다.", restaurant_ids: [] },
  { id: "food-jianbing", status: "candidate", name_ko: "지엔빙", name_en: "Jianbing", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다.", restaurant_ids: [] },
  { id: "food-shandong-pancake", status: "candidate", name_ko: "산동 잡곡전병", name_en: "Shandong multigrain pancake", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다.", restaurant_ids: [] },
  { id: "food-heytea", status: "candidate", name_ko: "HEYTEA", name_en: "HEYTEA", name_zh: "", zhVerify: true, note: "방문 지점은 아직 미확정입니다.", restaurant_ids: [] },
  { id: "food-dongpo-pork", status: "candidate", name_ko: "동파육", name_en: "Dongpo Pork", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다 — 메뉴 자체가 관심 후보입니다.", restaurant_ids: [] },
  { id: "food-tudoufen", status: "candidate", name_ko: "감자국수 (투도우펀)", name_en: "Potato noodles (Tudoufen)", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다.", restaurant_ids: [] },
  { id: "food-dimsum", status: "candidate", name_ko: "딤섬", name_en: "Dim sum", name_zh: "", zhVerify: true, note: "특정 식당은 아직 미확정입니다.", restaurant_ids: [] },
];

// ===== Eat Shanghai (2) — 식당/카페 후보 (실제 장소) =====
// food_ids: 이 식당에서 먹을 수 있는 것으로 확인된 FOOD_ITEMS id (지금은 전부 미확정 · 빈 배열)
const RESTAURANTS = [
  {
    id: "cafe-13demarzo",
    category: "cafe",
    status: "candidate",
    name_ko: "13DE MARZO Cafe",
    name_en: "13DE MARZO Cafe",
    name_zh: "",
    address_zh: "",
    zhVerify: true,
    area: "상하이 (지점 확인 필요)",
    signatureMenu: "TBD",
    priceRange: "TBD",
    reservation: "tbd",
    note: "방문 확정이 아닙니다. 예약 여부 등 세부사항은 추후 확인 예정입니다.",
    food_ids: [],
    map: { status: "unverified", google: "", amap: "", baidu: "" },
  },
];

// ===== Shop & Souvenirs — 기념품 품목 =====
// v0.6.1 — 사용자가 이미 직접 모아둔 위시리스트를 그대로 반영합니다. 새로 조사해서
// 추가한 품목은 없습니다. 정확한 중국어 표기·가격·구매처가 확인되지 않은 항목은
// 임의로 채우지 않고 name_zh: ""/priceRange: "TBD"/shop_ids: []로 남겨둡니다.
// { id, name_ko, name_en, name_zh, status, priceRange, note, shop_ids: [PLACES(category:"shop") id] }
const SOUVENIR_ITEMS = [
  { id: "souv-qingzhi-hand-cream", status: "candidate", name_ko: "Qingzhi hand cream", name_en: "Qingzhi hand cream", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-to-summer-fragrance", status: "candidate", name_ko: "To Summer fragrance", name_en: "To Summer fragrance", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-tagi", status: "candidate", name_ko: "TAGI", name_en: "TAGI", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-jiangxiaobai", status: "candidate", name_ko: "Jiangxiaobai", name_en: "Jiangxiaobai", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-adidas-cny-jacket", status: "tbd", name_ko: "Adidas Chinese New Year jacket", name_en: "Adidas Chinese New Year jacket", name_zh: "", priceRange: "TBD", note: "정확한 모델/디자인은 아직 미정(TBD)입니다 — 임의로 특정 상품을 지정하지 않았습니다.", shop_ids: [] },
  { id: "souv-digital-camera", status: "candidate", name_ko: "digital camera", name_en: "digital camera", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-old-iphone", status: "candidate", name_ko: "old iPhone", name_en: "old iPhone", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-dji-accessories", status: "candidate", name_ko: "DJI accessories", name_en: "DJI accessories", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-levis", status: "candidate", name_ko: "Levi's", name_en: "Levi's", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-cassette-player", status: "candidate", name_ko: "cassette player", name_en: "cassette player", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-vintage-luxury-watch", status: "candidate", name_ko: "vintage luxury watch", name_en: "vintage luxury watch", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-kiehls-moisturizer", status: "candidate", name_ko: "Kiehl's moisturizer", name_en: "Kiehl's moisturizer", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-colgate-toothpaste", status: "candidate", name_ko: "Colgate toothpaste", name_en: "Colgate toothpaste", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-plum-wine", status: "candidate", name_ko: "plum wine", name_en: "plum wine", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-white-rabbit-candy", status: "candidate", name_ko: "White Rabbit candy", name_en: "White Rabbit candy", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-shanghai-oreo", status: "candidate", name_ko: "Shanghai Oreo", name_en: "Shanghai Oreo", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-cucumber-lays", status: "candidate", name_ko: "cucumber Lay's", name_en: "cucumber Lay's", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-tomato-lays", status: "candidate", name_ko: "tomato Lay's", name_en: "tomato Lay's", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-towel-cake", status: "candidate", name_ko: "towel cake", name_en: "towel cake", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-oolong-tea", status: "candidate", name_ko: "oolong tea", name_en: "oolong tea", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-figures-character-goods", status: "candidate", name_ko: "figures / character goods", name_en: "figures / character goods", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-starbucks-shanghai-mug", status: "candidate", name_ko: "Starbucks Shanghai city mug", name_en: "Starbucks Shanghai city mug", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-hello-kitty-dimsum-doll", status: "candidate", name_ko: "Shanghai Hello Kitty dim sum doll", name_en: "Shanghai Hello Kitty dim sum doll", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-gathering", status: "tbd", name_ko: "GATHERING / 集雅", name_en: "GATHERING / 集雅", name_zh: "", priceRange: "TBD", note: "정확한 명칭·실체 확인이 아직 필요합니다 (verification needed).", shop_ids: [] },
  { id: "souv-custom-magnet", status: "candidate", name_ko: "custom magnet", name_en: "custom magnet", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-franzzi-cookie", status: "candidate", name_ko: "Franzzi cookie", name_en: "Franzzi cookie", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-jujube-nougat-cashew", status: "candidate", name_ko: "jujube nougat cashew", name_en: "jujube nougat cashew", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-kaman-egg-roll", status: "candidate", name_ko: "KAMAN egg roll", name_en: "KAMAN egg roll", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-three-squirrels-macadamia", status: "candidate", name_ko: "Three Squirrels macadamia", name_en: "Three Squirrels macadamia", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
  { id: "souv-caramel-sunflower-seeds", status: "candidate", name_ko: "caramel sunflower seeds", name_en: "caramel sunflower seeds", name_zh: "", priceRange: "TBD", note: "위시리스트 후보 품목입니다.", shop_ids: [] },
];

// ===== SAMPLE Dinners (v0.4 신설) =====
// 공식 일정처럼 동작하는 SAMPLE 단체 저녁식사 2건입니다.
// 실제 식당은 아직 결정되지 않아 restaurantName은 "TBD"입니다 — 임의로 만들지 않습니다.
// 실제 식당이 확정되면 이 스키마 그대로 이름/중국어명/주소/예약 정보를 채울 수 있습니다.
const SAMPLE_DINNERS = [
  {
    id: "dinner-01",
    day: 1,
    date: "2026-12-27",
    label: "SAMPLE Dinner 01 · 양꼬치",
    status: "sample",
    food_id: "food-yangchuan",
    restaurantName: "TBD",
    restaurantName_zh: "",
    address_zh: "",
    meetingTime: "18:30 SAMPLE (로비 집합)",
    reservationTime: "19:00 SAMPLE",
    partySize: 24,
    reservationHolder: "TBD",
    reservationStatus: "tbd",
    menu: "TBD (양꼬치 단체 코스 예상)",
    price: "TBD",
    location_id: null,
    note: "실제 식당은 아직 결정되지 않았습니다. SAMPLE 데이터로 화면 동작만 확인합니다.",
  },
  {
    id: "dinner-02",
    day: 4,
    date: "2026-12-30",
    label: "SAMPLE Dinner 02 · 베이징덕",
    status: "sample",
    food_id: "food-peking-duck",
    restaurantName: "TBD",
    restaurantName_zh: "",
    address_zh: "",
    meetingTime: "18:00 SAMPLE (Visit D 종료 후 이동)",
    reservationTime: "18:30 SAMPLE",
    partySize: 24,
    reservationHolder: "TBD",
    reservationStatus: "tbd",
    menu: "TBD (베이징덕 단체 코스 예상)",
    price: "TBD",
    location_id: null,
    note: "실제 식당은 아직 결정되지 않았습니다. 이 저녁식사가 끝나는 시점을 공식 일정 종료로 봅니다 (이후 개인 자유활동은 공식 일정에 포함하지 않습니다).",
  },
];

// ===== Itinerary: 2026-12-27 ~ 2026-12-31 (실제 여행 기간) =====
// v0.4 — 5일 전체에 SAMPLE schedule[]을 채워 Today/Itinerary 화면이
// 24명 SAMPLE 트립 기준으로 실제로 작동하는지 검증합니다.
// ⚠️ 아래 시간·방문기관·식당·자유시간은 전부 SAMPLE이며 학교의 공식 확정 일정이
// 아닙니다. 실제 방문기관/식당/시간이 확정되면 이 배열을 교체합니다.
//
// schedule[] 각 항목: { time, title, type, org_id?, location_id?, dinner_id?, note? }
//   v0.6.1 — 실제 체크인/버스 탑승 상태는 Private Participant Portal(Google Apps
//   Script)에서만 확인합니다. GitHub 쪽 schedule[]은 참고용 항목 목록일 뿐입니다.
const ITINERARY = [
  {
    day: 1,
    date: "2026-12-27",
    weekday: "일",
    label: "Day 1",
    status: "sample",
    title: "SAMPLE Day 1 · 상하이 도착 & 호텔 체크인 (전부 SAMPLE · 미확정)",
    meetup: { time: "09:00 SAMPLE", place_id: "icn-airport", departureTime: "11:00 SAMPLE", transport: "항공편 (SAMPLE)" },
    officialSchedule: { status: "sample", note: "출국 → 상하이 도착 → H+ Hotel 체크인 → SAMPLE Dinner 01(양꼬치) → 야간 산책(난징동루·와이탄)" },
    visit: { status: "sample", note: "방문기관 일정 없음 (도착일)" },
    meal: { status: "sample", note: "SAMPLE Dinner 01 · 양꼬치 (식당 미정 · TBD)" },
    accommodation: { status: "sample", note: "H+ Hotel · REAL HOTEL · SAMPLE ACCOMMODATION · NOT CONFIRMED" },
    freeTime: { status: "tbd", note: "별도 자유시간 없음 (저녁 SAMPLE 일정 진행)" },
    schedule: [
      { time: "09:00", title: "인천공항 집결 · 출국 수속 (SAMPLE)", type: "TRAVEL", location_id: "icn-airport" },
      { time: "11:00", title: "인천 → 상하이 항공편 출발 (SAMPLE)", type: "TRAVEL" },
      { time: "12:20", title: "상하이 푸동공항 도착 (SAMPLE)", type: "TRAVEL", location_id: "pudong-airport" },
      { time: "13:30", title: "H+ Hotel 도착 (SAMPLE)", type: "HOTEL", location_id: "hplus-hotel" },
      { time: "14:00", title: "호텔 체크인 (Hotel Check-in)", type: "ACTION", location_id: "hplus-hotel" },
      { time: "14:30", title: "각자 Room Assignment 확인 (My Trip → Private Portal)", type: "INFO" },
      { time: "18:30", title: "로비 집합 (저녁 식사 이동)", type: "MEETUP", location_id: "hplus-hotel" },
      { time: "19:00", title: "SAMPLE Dinner 01 · 양꼬치 단체 저녁", type: "MEAL", dinner_id: "dinner-01" },
      { time: "20:30", title: "저녁식사 후 SAMPLE 야경 산책 · 난징동루", type: "FREE", location_id: "see-nanjing-road" },
      { time: "21:15", title: "SAMPLE 야경 산책 · 와이탄 (The Bund)", type: "FREE", location_id: "see-bund" },
      { time: "22:00", title: "호텔 복귀", type: "HOTEL", location_id: "hplus-hotel" },
    ],
    hotel_place_id: "hplus-hotel",
    meals: { breakfast: null, lunch: null, dinner: "dinner-01" },
    isFreeTime: false,
  },
  {
    day: 2,
    date: "2026-12-28",
    weekday: "월",
    label: "Day 2",
    status: "sample",
    title: "SAMPLE Day 2 · Sanofi China · Zai Lab 방문 (전부 SAMPLE · 미확정)",
    meetup: { time: "08:30 SAMPLE", place_id: "hplus-hotel", departureTime: "09:00 SAMPLE", transport: "전용버스 (SAMPLE)" },
    officialSchedule: { status: "sample", note: "호텔 출발 → SAMPLE Visit A(Sanofi China) → 점심 TBD → SAMPLE Visit B(Zai Lab) → 17:00 이후 자유시간 또는 선택적 그룹투어" },
    visit: { status: "sample", note: "SAMPLE Visit A: Sanofi China · SAMPLE Visit B: Zai Lab (모두 REAL ORGANIZATION · SAMPLE VISIT · NOT CONFIRMED)" },
    meal: { status: "sample", note: "점심 TBD · 저녁은 자유시간/선택 투어에 따라 개인 식사" },
    accommodation: { status: "sample", note: "H+ Hotel · REAL HOTEL · SAMPLE ACCOMMODATION · NOT CONFIRMED" },
    freeTime: {
      status: "candidate",
      note: "17:00 이후 자유시간 또는 선택적 그룹투어 — 둘 다 가능성이 있으며 아직 확정되지 않았습니다.",
      options: ["자유시간 (개별 활동)", "선택적 그룹투어 (참가비 별도 · 확정 아님)"],
    },
    schedule: [
      { time: "08:30", title: "호텔 로비 집합", type: "MEETUP", location_id: "hplus-hotel" },
      { time: "09:00", title: "호텔 출발", type: "TRAVEL" },
      { time: "09:30", title: "SAMPLE Visit A · Sanofi China", type: "VISIT", org_id: "sanofi-china" },
      { time: "12:00", title: "점심 · Lunch: TBD", type: "MEAL" },
      { time: "14:00", title: "SAMPLE Visit B · Zai Lab", type: "VISIT", org_id: "zai-lab" },
      { time: "16:30", title: "호텔 · 시내 복귀", type: "TRAVEL", location_id: "hplus-hotel" },
      { time: "17:00", title: "자유시간 OR 선택적 그룹투어 (미확정)", type: "FREE", note: "공식 일정 종료 후 자유시간 또는 선택적 그룹투어 중 아직 정해지지 않았습니다." },
    ],
    hotel_place_id: "hplus-hotel",
    meals: { breakfast: null, lunch: null, dinner: null },
    isFreeTime: true,
  },
  {
    day: 3,
    date: "2026-12-29",
    weekday: "화",
    label: "Day 3",
    status: "sample",
    title: "SAMPLE Day 3 · 우시(Wuxi) 장거리 이동일 (전부 SAMPLE · 미확정)",
    meetup: { time: "07:30 SAMPLE", place_id: "hplus-hotel", departureTime: "08:00 SAMPLE", transport: "우시행 버스 (SAMPLE)" },
    officialSchedule: { status: "sample", note: "H+ Hotel 로비 집합 → 우시행 버스 탑승 → WuXi Biologics(우시) 방문 → 점심 TBD → 오후 SAMPLE 프로그램 → 상하이 복귀 버스 → 저녁 공식 일정 없음" },
    visit: { status: "sample", note: "SAMPLE Visit: WuXi Biologics (Wuxi) — REAL ORGANIZATION · SAMPLE VISIT · NOT CONFIRMED" },
    meal: { status: "sample", note: "점심 TBD (3가지 가능성) · 저녁 공식 일정 없음", lunchOptions: ["현지 식당", "방문기관 제공", "도시락 · 테이크아웃"] },
    accommodation: { status: "sample", note: "H+ Hotel · REAL HOTEL · SAMPLE ACCOMMODATION · NOT CONFIRMED (당일 저녁 상하이 복귀)" },
    freeTime: { status: "candidate", note: "저녁 공식 일정 없음 — 자유 식사/휴식 (확정 아님)" },
    schedule: [
      { time: "07:30", title: "H+ Hotel 로비 집합", type: "MEETUP", location_id: "hplus-hotel" },
      { time: "08:00", title: "우시행 버스 탑승 (Wuxi Outbound Bus)", type: "ACTION" },
      { time: "10:00", title: "SAMPLE Visit · WuXi Biologics (Wuxi)", type: "VISIT", org_id: "wuxi-biologics" },
      { time: "12:00", title: "점심 · Lunch Plan: TBD (3가지 가능성)", type: "MEAL", note: "① 현지 식당 ② 방문기관 제공 ③ 도시락 · 테이크아웃 — 아직 미정입니다." },
      { time: "13:30", title: "오후 SAMPLE 공식 프로그램 (세부 미정)", type: "PROGRAM" },
      { time: "17:30", title: "상하이 복귀 버스 탑승 (Wuxi Return Bus)", type: "ACTION" },
      { time: "19:30", title: "H+ Hotel 도착", type: "HOTEL", location_id: "hplus-hotel" },
      { time: "19:30", title: "저녁 공식 일정 없음 (자유 식사)", type: "FREE" },
    ],
    hotel_place_id: "hplus-hotel",
    meals: { breakfast: null, lunch: null, dinner: null },
    isFreeTime: true,
  },
  {
    day: 4,
    date: "2026-12-30",
    weekday: "수",
    label: "Day 4",
    status: "sample",
    title: "SAMPLE Day 4 · Henlius · Alibaba Cloud 방문 & 베이징덕 (전부 SAMPLE · 미확정)",
    meetup: { time: "08:30 SAMPLE", place_id: "hplus-hotel", departureTime: "09:00 SAMPLE", transport: "전용버스 (SAMPLE)" },
    officialSchedule: { status: "sample", note: "호텔 출발 → SAMPLE Visit C(Henlius) → 점심 TBD → SAMPLE Visit D(Alibaba Cloud/DX·AI) → SAMPLE Dinner 02(베이징덕) → 저녁식사 종료 시점에 공식 일정 종료" },
    visit: { status: "sample", note: "SAMPLE Visit C: Shanghai Henlius Biotech · SAMPLE Visit D: Alibaba Cloud/DX·AI (모두 REAL ORGANIZATION · SAMPLE VISIT · NOT CONFIRMED)" },
    meal: { status: "sample", note: "점심 TBD · SAMPLE Dinner 02 · 베이징덕 (식당 미정 · TBD)" },
    accommodation: { status: "sample", note: "H+ Hotel · REAL HOTEL · SAMPLE ACCOMMODATION · NOT CONFIRMED" },
    freeTime: { status: "tbd", note: "저녁식사 종료 후 개인 자유활동 (음주 등 비공식 활동은 공식 일정에 포함하지 않습니다)" },
    schedule: [
      { time: "08:30", title: "호텔 로비 집합", type: "MEETUP", location_id: "hplus-hotel" },
      { time: "09:00", title: "호텔 출발", type: "TRAVEL" },
      { time: "09:30", title: "SAMPLE Visit C · Shanghai Henlius Biotech", type: "VISIT", org_id: "henlius-biotech" },
      { time: "12:00", title: "점심 · Lunch: TBD", type: "MEAL" },
      { time: "14:00", title: "SAMPLE Visit D · Alibaba Cloud / DX·AI 산업 방문", type: "VISIT", org_id: "alibaba-cloud" },
      { time: "18:30", title: "SAMPLE Dinner 02 · 베이징덕 단체 저녁", type: "MEAL", dinner_id: "dinner-02" },
      { time: "20:30", title: "공식 일정 종료 (저녁식사 종료 시점 기준 · 이후 개인 자유활동)", type: "END" },
    ],
    hotel_place_id: "hplus-hotel",
    meals: { breakfast: null, lunch: null, dinner: "dinner-02" },
    isFreeTime: false,
  },
  {
    day: 5,
    date: "2026-12-31",
    weekday: "목",
    label: "Day 5",
    status: "sample",
    title: "SAMPLE Day 5 · 체크아웃 & 귀국 (전부 SAMPLE · 미확정)",
    meetup: { time: "10:30 SAMPLE", place_id: "hplus-hotel", departureTime: "11:00 SAMPLE", transport: "공항 이동 버스 (SAMPLE)" },
    officialSchedule: { status: "sample", note: "오전 자유시간 → 체크아웃 → 로비 집합 → 푸동공항 이동 → 13:10 상하이 → 서울 출발편 (SAMPLE)" },
    visit: { status: "tbd", note: "방문기관 일정 없음 (귀국일)" },
    meal: { status: "tbd", note: "공식 식사 일정 없음 (이동일)" },
    accommodation: { status: "sample", note: "H+ Hotel 체크아웃 (SAMPLE)" },
    freeTime: { status: "candidate", note: "오전 자유시간 (확정 아님)" },
    schedule: [
      { time: "08:00", title: "오전 자유시간", type: "FREE" },
      { time: "10:00", title: "호텔 체크아웃 (Check-out)", type: "HOTEL", location_id: "hplus-hotel" },
      { time: "10:30", title: "로비 집합", type: "MEETUP", location_id: "hplus-hotel" },
      { time: "11:00", title: "푸동공항 이동", type: "TRAVEL", location_id: "pudong-airport" },
      { time: "13:10", title: "상하이 푸동 → 서울(인천) 출발편 (SAMPLE)", type: "TRAVEL", location_id: "pudong-airport" },
      { time: "—", title: "Field Trip 종료", type: "END" },
    ],
    hotel_place_id: "hplus-hotel",
    meals: { breakfast: null, lunch: null, dinner: null },
    isFreeTime: true,
  },
];

// ===== Prep: 출국 전 준비 + 중국 현지 준비 (v0.5 — 실제 출국 전 체크리스트 수준으로 보강) =====
// status 값(안내 강도 구분용): "essential" | "optional" | "backup" | "travelerTip" |
//   "checkBeforeDeparture" | "reference"
// ⚠️ 아래 앱/서비스/팁은 사용자가 직접 제공한 내용만 사용했습니다 — 새로운 앱이나
// 서비스를 임의로 조사해 추가하지 않았습니다. Disney 관련 내용은 포함하지 않습니다.
const PREP_STATUS_LABEL = {
  essential: "ESSENTIAL",
  optional: "OPTIONAL",
  backup: "BACKUP",
  travelerTip: "TRAVELER TIP",
  checkBeforeDeparture: "CHECK BEFORE DEPARTURE",
  reference: "REFERENCE",
};

const PREP = {
  beforeYouFly: {
    intro: "출국 전에 꼭 완료하세요.",
    items: [
      { id: "app-download", label: "필요한 앱 다운로드 (Alipay · WeChat · Amap)", status: "essential" },
      { id: "alipay-passport", label: "Alipay 여권 인증", status: "essential" },
      { id: "alipay-card", label: "해외결제 카드 등록", status: "essential" },
      { id: "wechat-setup", label: "WeChat 준비", status: "essential" },
      { id: "amap-install", label: "Amap 설치", status: "essential" },
      { id: "connectivity-plan", label: "통신 방법 준비 (로밍 · eSIM · VPN)", status: "essential" },
      { id: "power-bank-pack", label: "보조배터리 준비", status: "optional" },
    ],
  },

  essentialApps: [
    {
      id: "alipay", name: "Alipay", name_zh: "支付宝", status: "essential",
      purpose: ["결제", "교통 관련 기능", "Taxi / Didi 등 현지 이동 과정에서 활용"],
    },
    {
      id: "wechat", name: "WeChat", name_zh: "微信", status: "essential",
      purpose: ["메신저", "결제", "식당 QR 주문 등"],
    },
    {
      id: "amap", name: "Amap", name_zh: "高德地图", status: "essential",
      purpose: ["중국 현지 길찾기", "장소 검색"],
    },
  ],
  essentialAppsNote: "출국 전 가능한 범위에서 앱 다운로드 → 여권 인증 → 카드 등록까지 미리 완료해 두는 것을 권장합니다.",

  optionalApps: [
    {
      id: "xiaohongshu", name: "Xiaohongshu", name_zh: "小红书", status: "optional",
      purpose: ["핫플", "카페", "장소 검색 참고"],
    },
    {
      id: "meituan", name: "Meituan", name_zh: "美团", status: "optional",
      purpose: ["배달음식", "현지 생활 서비스 참고"],
    },
    {
      id: "dianping", name: "Dianping", name_zh: "大众点评", status: "optional",
      purpose: ["식당 정보", "예약권", "할인권 참고"],
    },
  ],

  payment: {
    primary: {
      name: "Alipay", status: "essential",
      note: "출국 전 여권 인증 · 해외결제 카드 등록을 미리 확인하세요.",
    },
    backup: {
      label: "BACKUP · CHECK BEFORE DEPARTURE",
      title: "카카오페이로 Alipay 결제 코드 생성 (백업)",
      steps: ["카카오페이 메뉴", "지구 모양 / 해외결제", "중국 Alipay 결제 코드 생성"],
      note: "Alipay 사용에 문제가 있을 경우를 대비한 백업 옵션입니다. 앱 UI나 서비스 방식은 바뀔 수 있으므로 출국 전 재확인이 필요하며, 공식 확정 기능은 아닙니다.",
      status: "backup",
    },
  },

  connectivity: {
    note: "중국에서 필요한 서비스 사용을 위해 로밍 / eSIM / VPN 기능 지원 여부를 출국 전에 확인하세요.",
    options: ["로밍 (Roaming)", "eSIM", "VPN 지원 여부"],
    reference: {
      label: "TRAVELER RECOMMENDATION",
      title: "eSIM (참고용)",
      url: "https://brand.naver.com/rokebi/products/7505331209",
      note: "여행자가 참고용으로 공유한 상품입니다. KAIST 공식 추천 상품이나 Field Trip 공식 지정 상품이 아닙니다.",
      status: "reference",
    },
  },

  powerBank: {
    title: "POWER BANK RECOMMENDED",
    note: "지도 · 결제 · Taxi 호출 · 메신저 · 번역 등으로 휴대폰 사용량이 많다는 점을 고려해 보조배터리 준비를 권장합니다.",
    caution: "Check airline carry-on rules before departure.",
    status: "checkBeforeDeparture",
  },

  gettingAround: [
    { id: "taxi-didi", title: "TAXI / DIDI", note: "길에서 임의로 택시를 잡기보다는 앱 호출 Taxi / Didi 활용을 권장합니다.", status: "travelerTip" },
    { id: "subway", title: "SUBWAY", note: "상하이 내 이동 시 선택 가능한 수단입니다.", status: "travelerTip" },
    { id: "city-tour-bus", title: "CITY TOUR BUS", note: "관광 목적 이동 시 선택지 중 하나입니다.", status: "travelerTip" },
  ],
  gettingAroundNote: "특정 교통수단 하나가 항상 최선이라고 단정할 수 없어, 상황에 맞게 선택할 수 있도록 안내합니다.",

  emergencyCash: {
    title: "EMERGENCY CASH",
    note: "휴대폰 문제 · 배터리 문제 · 통신 오류 · 결제 오류 등을 대비해 소액의 현금을 비상용으로 준비할 수 있습니다.",
    example: "TRAVELER EXAMPLE · about 500 CNY",
    status: "travelerTip",
  },

  localTips: [
    { id: "green-hat", title: "GREEN HAT", note: "중국 문화에서 초록색 모자는 특정 부정적 의미와 연결될 수 있어, 굳이 착용하지 않는 것을 추천하는 여행 팁입니다.", status: "travelerTip" },
    { id: "cold-drinks", title: "COLD DRINKS", note: "차가운 음료를 원할 경우 차갑게 요청하거나 얼음을 별도로 요청해야 하는 상황이 있을 수 있습니다.", status: "travelerTip" },
    { id: "restaurant-extra-charges", title: "RESTAURANT EXTRA CHARGES", note: "일부 식당에서는 식기 · 포장된 휴지 · 물티슈가 별도 비용으로 계산될 수 있으니, 사용 전 또는 계산 시 영수증을 확인하세요. 모든 식당에 적용되는 규칙은 아닙니다.", status: "travelerTip" },
  ],
};
