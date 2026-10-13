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
 *   SAMPLE_DINNERS v0.9에서 비움 (과거 SAMPLE 단체 저녁식사 제거 · 빈 배열 유지)
 *   ITINERARY      v0.9 공식 일정 (Day별 items[] — 시간대(오전/오후/저녁)만, 시각 없음)
 * ------------------------------------------------------------------
 *
 * ⚠️ v0.9 공식 일정 반영 안내
 * ITINERARY · ORGS는 2026.12.27~31 학교 공식 일정표 기준(공개용)입니다.
 * 공개 저장소이므로 구체적인 시각, 호텔명·주소, 참가자 개인정보는 넣지 않습니다.
 * PLACES의 H+ Hotel 등 나머지 항목은 기존 SAMPLE 데이터이며 SCHEDULE/HOME에는
 * 표시되지 않습니다. 실제 숙소·시간·집합 정보는 Private Participant Portal에서만 다룹니다.
 */

// ===== 여행 기본 정보 =====
// 2026-12-27 ~ 2026-12-31, 실제 확정된 Field Trip 기간입니다.
const TRIP_CONFIG = {
  name: "KAIST BIM Shanghai Field Trip",
  isDemo: false,
  version: "v0.6.3 · Portal Link Hotfix",
  startDate: "2026-12-27",
  endDate: "2026-12-31",
  note: "여행 기간(2026.12.27~12.31)과 방문기관 일정은 공식 일정표 기준입니다. 공개 페이지에는 구체적인 시각과 숙소 정보를 표시하지 않습니다.",
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

  // ---------- FIELD VISITS 위치 — v0.9: 공식 방문기관의 주소·지도는 ORGS에서 관리합니다 ----------

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

// ===== Host Orgs (Field Visits): 공식 방문기관 · v0.9 =====
// 2026-12 공식 일정표 기준 방문처 6곳입니다. 배열 순서 = 방문 순서입니다.
// - 소개 문구는 각 기관 공식 홈페이지(및 해당 기관의 공식 발표)를 대조해 작성했습니다.
//   확인할 수 없는 숫자·사업 성과·방문 프로그램 내용은 넣지 않습니다.
// - 주소는 공식 일정 자료에 제공된 방문지 주소를 그대로 사용합니다.
//   address_zh는 자료에 중국어 주소가 함께 제공된 경우에만 채웁니다(임의 번역 금지).
// - 지도: 高德地图 URI 검색(키 없음, 좌표 미사용). mapKeyword가 검색어이며,
//   중국어 주소가 있으면 그 주소를, 없으면 공식 중국어 명칭 + "上海"를 사용합니다.
// - ⚠️ 방문 시각·이동 시간 등 구체적인 시각은 이 공개 데이터에 넣지 않습니다.
//
// { id, visitDate, slot("오전"|"오후"|"저녁"), status, name_en, name_zh, type,
//   intro, keywords[], notes[], facility?{title, text}, address, address_zh,
//   mapKeyword, website, sources[{label, url}] }
const ORGS = [
  {
    id: "biointron",
    visitDate: "2026-12-28",
    slot: "오전",
    status: "confirmed",
    name_en: "Biointron",
    name_zh: "百英生物",
    type: "항체 연구개발 서비스 기업 (CRO)",
    intro: "상하이에 본사를 둔 항체 연구개발 서비스 기업으로, 항체 신약 개발 초기 단계에 필요한 발굴·최적화·생산 서비스를 제공합니다. VHH 항체 발굴, Single B Cell Screening, Hybridoma Sequencing 같은 발굴 서비스와 Affinity Maturation, Antibody Humanization 같은 항체 엔지니어링을 함께 다룹니다. 고처리량 재조합 항체 생산, 이중항체 발현, CHO-K1 안정 세포주 구축, 항체 개발 가능성(Developability) 평가도 서비스 범위에 포함됩니다.",
    keywords: ["Antibody Discovery", "VHH", "Single B Cell Screening", "Antibody Humanization", "HTP Recombinant Antibody Production", "Developability Assessment"],
    notes: [
      "자체 신약을 개발하는 회사가 아니라, 고객사의 항체 연구를 지원하는 서비스 기업이라는 점을 염두에 두면 좋습니다.",
      "공식 홈페이지는 소량 항체를 빠르게 발현·정제해 주는 RushMab™ 패키지와 자동화 생산 공정을 강조합니다.",
      "공식 홈페이지 기준 본사는 상하이이며, 미국(Piscataway, NJ · Cambridge, MA)에도 오피스가 있습니다.",
    ],
    address: "No. 1–9, Lane 99, Shenmei Road, Pudong New District, Shanghai, China",
    address_zh: "",
    mapKeyword: "百英生物 上海",
    website: "https://www.biointron.com/",
    sources: [
      { label: "Biointron · Services", url: "https://www.biointron.com/services/" },
      { label: "百英生物 (중문 사이트)", url: "https://www.biointron.com.cn" },
    ],
  },
  {
    id: "med-fine-capital",
    visitDate: "2026-12-28",
    slot: "오후",
    status: "confirmed",
    name_en: "Med-Fine Capital",
    name_zh: "幂方健康基金",
    type: "헬스케어·생명과학 전문 투자기관",
    intro: "상하이에 본사를 둔 의약·헬스케어 및 생명과학 분야 전문 투자기관입니다. 공식 홈페이지는 운영팀이 헬스케어 산업 배경과 벤처캐피털 투자 경험을 함께 갖추고 있다고 소개합니다. 방문 자료 기준으로 바이오테크, 진단, 의료기기, 의료서비스 등 헬스케어 전반에 투자합니다.",
    keywords: ["Healthcare Investment", "Life Sciences", "Venture Capital", "Biotech"],
    notes: [
      "회사 방문과 달리 투자자 관점에서 중국 바이오 산업의 자금 흐름, 기업 성장 단계, 투자 판단 기준을 들어볼 수 있는 방문처입니다.",
      "공식 홈페이지는 중국어로 운영되며, 중국어 명칭은 幂方健康基金(幂方资本)으로 표기됩니다.",
    ],
    address: "Room 3605, SK Tower, No. 150 Yaoyuan Road, Pudong District, Shanghai, China",
    address_zh: "",
    mapKeyword: "幂方健康基金 上海",
    website: "https://www.medfinecapital.com/",
    sources: [
      { label: "Med-Fine Capital · 공식 홈페이지", url: "https://www.medfinecapital.com/" },
    ],
  },
  {
    id: "harbour-biomed",
    visitDate: "2026-12-28",
    slot: "오후",
    status: "confirmed",
    name_en: "Harbour BioMed",
    name_zh: "和铂医药",
    type: "항체 치료제 개발 바이오제약 기업 (HKEX: 02142)",
    intro: "면역·염증 질환과 종양학 등을 중심으로 항체 치료제를 발굴·개발하는 글로벌 바이오제약 기업입니다. 전인간(fully human) 단일클론항체를 만드는 형질전환 마우스 플랫폼 Harbour Mice®를 보유하며, 일반 항체(H2L2)와 중쇄 단독 항체(HCAb) 두 형식을 모두 생성합니다. 이를 바탕으로 HCAb 기반 면역세포 인게이저 이중항체 기술 HBICE®와 다중특이 항체 기술 HCAb PLUS™를 운영합니다.",
    keywords: ["Harbour Mice®", "HCAb", "HBICE®", "HCAb PLUS™", "Immunology", "Oncology"],
    notes: [
      "홍콩증권거래소 상장사(HKEX: 02142)입니다.",
      "12월 30일 방문하는 Nona Biosciences가 Harbour BioMed의 100% 자회사입니다. 두 방문을 이어서 보면 '자체 신약 개발'과 '플랫폼 기반 연구 서비스'가 어떻게 나뉘는지 비교할 수 있습니다.",
      "공식 홈페이지는 Hu-mAtrIx™ AI 플랫폼 기반의 전인간 HCAb 생성형 AI 모델도 소개합니다.",
    ],
    address: "6F, Tower B, Fenglin International Phase I, No. 388 Fenglin Road, Xuhui District, Shanghai, China",
    address_zh: "",
    mapKeyword: "和铂医药 上海",
    website: "https://www.harbourbiomed.com/",
    sources: [
      { label: "Harbour BioMed · About", url: "https://www.harbourbiomed.com/about" },
    ],
  },
  {
    id: "sjtu-minhang",
    visitDate: "2026-12-29",
    slot: "오전",
    status: "confirmed",
    name_en: "Shanghai Jiao Tong University (Minhang Campus)",
    name_zh: "上海交通大学（闵行校区）",
    type: "연구중심 종합대학",
    intro: "중국의 주요 연구중심 대학 중 하나로, 이번 방문지는 상하이 민항구(闵行区)에 있는 민항 캠퍼스입니다. 생명과학, 의공학, 공학 분야의 연구 역량을 갖추고 있습니다. 방문할 구체적인 학과·연구실은 아직 공지되지 않았습니다.",
    keywords: ["Research University", "Life Sciences", "Biomedical Engineering", "Engineering"],
    notes: [
      "방문 학과·연구실·프로그램은 미정(TBD)입니다. 확정되면 이 카드에 반영됩니다.",
      "주소는 SJTU School of Life Sciences and Biotechnology 공식 페이지에 게재된 캠퍼스 주소입니다.",
    ],
    address: "800 Dongchuan Road, Minhang District, Shanghai, China",
    address_zh: "上海市闵行区东川路800号",
    mapKeyword: "上海市闵行区东川路800号",
    website: "https://en.sjtu.edu.cn/",
    sources: [
      { label: "SJTU · 공식 홈페이지", url: "https://en.sjtu.edu.cn/" },
      { label: "SJTU · 캠퍼스 주소", url: "https://life.sjtu.edu.cn/en/data/list/address" },
    ],
  },
  {
    id: "wuxi-biologics-shanghai",
    visitDate: "2026-12-29",
    slot: "오후",
    status: "confirmed",
    name_en: "WuXi Biologics Shanghai",
    name_zh: "药明生物",
    type: "바이오의약품 CRDMO (위탁 연구·개발·생산) 기업",
    intro: "바이오의약품의 발굴(Research), 공정·분석 개발(Development), cGMP 생산(Manufacturing)까지 한 회사 안에서 제공하는 글로벌 CRDMO 기업입니다. 공식 홈페이지에 따르면 동물세포(Mammalian)와 미생물(Microbial) 생산 시스템을 모두 다루며, 중국·미국·아일랜드·독일·싱가포르에 연구·개발·생산 거점을 운영합니다.",
    facility: {
      title: "Shanghai Fengxian 시설",
      text: "Shanghai Fengxian은 공식 홈페이지 사업장 목록에 올라 있는 상하이 거점 중 하나입니다(상하이에는 Waigaoqiao FTZ, Lingang 등 별도 거점도 있음). 2018년 회사 발표에 따르면 펑셴 부지는 바이오의약품 발굴·개발과 임상·상업 생산을 한 곳에 통합하는 혁신 센터로 계획되었습니다. 실제 방문 건물과 견학 범위는 아직 확인되지 않았습니다.",
    },
    keywords: ["CRDMO", "Biologics", "Process Development", "cGMP Manufacturing", "Quality"],
    notes: [
      "방문지는 장쑤성 우시(无锡)시가 아니라 상하이 펑셴구(奉贤区)입니다.",
      "같은 날 저녁 WuXi Biologics와 저녁 식사가 예정되어 있습니다.",
      "공정개발, 생산시설, 품질관리, 글로벌 제조 운영 관점에서 질문을 준비해 두면 좋습니다.",
    ],
    address: "1951 Huifeng West Road, Fengxian District, Shanghai, China",
    address_zh: "上海市奉贤区汇丰西路1951号",
    mapKeyword: "上海市奉贤区汇丰西路1951号",
    website: "https://www.wuxibiologics.com/",
    sources: [
      { label: "WuXi Biologics · Locations & Facilities", url: "https://www.wuxibiologics.com/locations-facilities/" },
      { label: "WuXi Biologics · 2018 Fengxian 착공 발표", url: "https://www.wuxibiologics.com/?p=1075" },
    ],
  },
  {
    id: "nona-biosciences",
    visitDate: "2026-12-30",
    slot: "오전",
    status: "confirmed",
    name_en: "Nona Biosciences",
    name_zh: "诺纳生物",
    type: "항체 기반 바이오의약품 발굴·전임상 연구 서비스 기업",
    intro: "항체 기반 바이오의약품의 아이디어 단계부터 IND 신청까지('Idea to IND') 이어지는 전임상 연구 서비스를 제공하는 바이오테크 기업입니다. Harbour Mice® 플랫폼으로 전인간 항체(H2L2·HCAb)를 발굴하고, 항원 준비·동물 면역, 항체 스크리닝, 리드 엔지니어링, 개발 가능성 및 약리 평가를 수행합니다. 이중·다중항체(HBICE®), ADC, CAR 기반 세포치료 등 차세대 모달리티 개발도 지원합니다.",
    keywords: ["Idea to IND", "Harbour Mice®", "Antibody Screening", "Antibody Engineering", "Bispecific / Multispecific", "ADC"],
    notes: [
      "Harbour BioMed(和铂医药)의 100% 자회사로 2022년 11월 출범했습니다(Harbour BioMed 공식 발표). Harbour BioMed는 Nona를 자사 기술과 전문성을 외부에 개방하는 사업 축으로 소개합니다.",
      "28일 방문하는 Harbour BioMed와 같은 플랫폼(Harbour Mice®)을 쓰므로, 두 방문을 연결해서 준비하면 좋습니다.",
    ],
    address: "6F, No. 987 Cailun Road, Pilot Free Trade Zone, Shanghai, China",
    address_zh: "",
    mapKeyword: "诺纳生物 上海",
    website: "https://nonabio.com/",
    sources: [
      { label: "Nona Biosciences · Our Company", url: "https://nonabio.com/our-company/" },
      { label: "Harbour BioMed · Nona 출범 발표 (2022.11)", url: "https://www.biospace.com/harbour-biomed-launches-nona-biosciences-ideas-to-ind-preclinical-solutions-business-to-accelerate-global-biotherapeutic-innovation" },
    ],
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

// ===== SAMPLE Dinners — v0.9에서 비움 =====
// 과거 SAMPLE 단체 저녁식사(시각 포함)는 공식 일정이 아니므로 제거했습니다.
// main.js의 getDinnerById()가 참조하므로 빈 배열로 유지합니다.
const SAMPLE_DINNERS = [];

// ===== Itinerary: 2026-12-27 ~ 2026-12-31 · 공식 일정 (공개용) =====
// v0.9 — 학교 공식 일정표 기준. 공개 페이지이므로 다음 원칙을 지킵니다.
//   - 구체적인 시각(방문·항공·집합·체크인·버스·식사·이동 소요시간)은 넣지 않습니다.
//     slot에는 "오전" / "오후" / "저녁" 같은 대략적인 시간대만 씁니다.
//   - 호텔명·주소·체크인 시간은 넣지 않습니다(숙소 정보는 Private Portal에서만).
//   - 미확정 액티비티(단체석식, 선택/단체 Activity 등)는 넣지 않습니다.
//   - 같은 시간대의 방문처는 공식 일정표 순서대로 나열합니다.
// items[]: { slot: "오전"|"오후"|"저녁"|null, title, type, org_id? }
const ITINERARY = [
  {
    day: 1,
    date: "2026-12-27",
    weekday: "일",
    label: "Day 1",
    status: "confirmed",
    title: "상하이 도착",
    summary: "항공 이동 · 상하이 도착 및 체크인",
    officialSchedule: { status: "confirmed", note: "항공 이동 → 상하이 도착 및 체크인" },
    items: [
      { slot: null, title: "항공 이동", type: "TRAVEL" },
      { slot: null, title: "상하이 도착 및 체크인", type: "HOTEL" },
    ],
  },
  {
    day: 2,
    date: "2026-12-28",
    weekday: "월",
    label: "Day 2",
    status: "confirmed",
    title: "기업 방문 3곳",
    summary: "Biointron → Med-Fine Capital → Harbour BioMed",
    officialSchedule: { status: "confirmed", note: "Biointron → Med-Fine Capital → Harbour BioMed" },
    items: [
      { slot: "오전", title: "Biointron 방문", type: "VISIT", org_id: "biointron" },
      { slot: "오후", title: "Med-Fine Capital 방문", type: "VISIT", org_id: "med-fine-capital" },
      { slot: "오후", title: "Harbour BioMed 방문", type: "VISIT", org_id: "harbour-biomed" },
    ],
  },
  {
    day: 3,
    date: "2026-12-29",
    weekday: "화",
    label: "Day 3",
    status: "confirmed",
    title: "SJTU · WuXi Biologics Shanghai",
    summary: "Shanghai Jiao Tong University → WuXi Biologics Shanghai (펑셴) · 저녁 식사",
    officialSchedule: { status: "confirmed", note: "Shanghai Jiao Tong University (Minhang Campus) → WuXi Biologics Shanghai (펑셴구) → WuXi Biologics 저녁 식사" },
    items: [
      { slot: "오전", title: "Shanghai Jiao Tong University (Minhang Campus) 방문", type: "VISIT", org_id: "sjtu-minhang" },
      { slot: "오후", title: "WuXi Biologics Shanghai 방문", type: "VISIT", org_id: "wuxi-biologics-shanghai" },
      { slot: "저녁", title: "WuXi Biologics 저녁 식사", type: "MEAL" },
    ],
  },
  {
    day: 4,
    date: "2026-12-30",
    weekday: "수",
    label: "Day 4",
    status: "confirmed",
    title: "Nona Biosciences",
    summary: "Nona Biosciences 방문",
    officialSchedule: { status: "confirmed", note: "Nona Biosciences" },
    items: [
      { slot: "오전", title: "Nona Biosciences 방문", type: "VISIT", org_id: "nona-biosciences" },
    ],
  },
  {
    day: 5,
    date: "2026-12-31",
    weekday: "목",
    label: "Day 5",
    status: "confirmed",
    title: "귀국",
    summary: "귀국",
    officialSchedule: { status: "confirmed", note: "귀국" },
    items: [
      { slot: null, title: "귀국", type: "TRAVEL" },
    ],
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
