/**
 * data-guide.js — Shanghai Guide 전용 데이터 (v0.7.3 "SHANGHAI GUIDE IMAGES + HU GONG GUAN")
 * ------------------------------------------------------------------
 * 이 파일은 js/data-trip.js와 완전히 독립적입니다. Guide(guide.html)는
 * 이제부터 data-trip.js의 PLACES/FOOD_ITEMS/RESTAURANTS/SOUVENIR_ITEMS를
 * 더 이상 읽지 않고, 이 파일의 GUIDE_SPOTS/GUIDE_SOUVENIRS만 사용합니다.
 * data-trip.js(일정 · 방문기관 · SAMPLE 데이터)는 이 작업에서 전혀
 * 수정하지 않았습니다.
 *
 * 원칙 (사용자 지시 그대로):
 *  - 중국어명 · 주소 · 영업시간 · 가격은 사용자가 제공한 값만 사용합니다.
 *    확인되지 않은 값은 임의로 만들지 않고 빈 값("")으로 둡니다.
 *  - Guide 화면에는 CANDIDATE/후보/SAMPLE/TBD/VERIFY/NOT CONFIRMED 같은
 *    "일정 확정 여부" 표현을 쓰지 않습니다 (Guide는 일정관리 페이지가 아님).
 *  - area 값은 아래 AREA_CLUSTERS의 8개 클러스터 중 하나이거나 "OTHER"입니다.
 *    36개 신규 spot은 사용자가 준 클러스터를 그대로 사용했고, "기존 기본
 *    관광지" 19곳은 지명 자체에 이미 포함된 지역(예: 静安寺→정안구,
 *    陆家嘴→루자쭈이)을 근거로 한 스케매틱 지도용 근사 분류이며, 실제
 *    주소·영업시간·가격 데이터는 아닙니다.
 *
 * v0.7.1 QA 패스에서 추가된 것:
 *  - aliases: [] — 사용자가 직접 확인해준 한국어 별칭만 넣었습니다. 새 상호나
 *    중국어 이름을 추측해서 채우지 않았습니다. 검색(spotSearchText, guide.html)
 *    이 이 필드를 함께 봅니다.
 *  - image / image_alt / image_source_url / image_credit / image_license —
 *    v0.7.3에서 재사용 라이선스가 확인된 Wikimedia Commons 랜드마크 8곳을
 *    외부 이미지 URL로 연결했습니다. 사용권이 불명확한 SNS/블로그 사진은
 *    다운로드하거나 복제하지 않습니다. 외부 이미지 로드 실패 시 placeholder로
 *    자동 복귀합니다.
 *  - GUIDE_RESEARCH_NOTES_EXTENDED — compaction 이후 다시 정리하는 과정에서
 *    빠질 뻔한 사용자의 기존 수집 장소 33곳을 원문 그대로 보존합니다(화면에
 *    렌더링하지 않음, 주소/시간/중국어명을 새로 추측하지 않음).
 */

// ===== 지역 클러스터 (MAP 탭 스케매틱 지도 + 공유 AREA 필터) =====
// x/y는 800x560 스케매틱(비례 지도 아님) SVG 좌표입니다.
const AREA_CLUSTERS = [
  { id: "NANJING EAST · BUND", label: "NANJING EAST · BUND", x: 520, y: 300 },
  { id: "NORTH BUND", label: "NORTH BUND", x: 560, y: 200 },
  { id: "NANJING WEST · JING'AN", label: "NANJING WEST · JING'AN", x: 340, y: 260 },
  { id: "WUKANG · ANFU", label: "WUKANG · ANFU", x: 230, y: 380 },
  { id: "YONGKANG · XUHUI", label: "YONGKANG · XUHUI", x: 280, y: 470 },
  { id: "XINTIANDI", label: "XINTIANDI", x: 440, y: 400 },
  { id: "LUJIAZUI", label: "LUJIAZUI", x: 660, y: 300 },
  { id: "1000 TREES", label: "1000 TREES", x: 300, y: 190 },
];
const AREA_OTHER = "OTHER";
const AREA_FILTER_VALUES = ["ALL", ...AREA_CLUSTERS.map((c) => c.id), AREA_OTHER];

// ===== EAT 내부 필터 =====
const EAT_TYPES = ["ALL", "RESTAURANT", "CAFE", "DESSERT", "BAR"];

// ===== GUIDE_SPOTS =====
// tab: "see" | "eat" | "shop" (기본 소속 탭). tabs: [...] 가 있으면 여러 탭에 함께 노출.
// eatType: tab이 "eat"일 때만 사용 (restaurant/cafe/dessert/bar).
// category: 화면에 그대로 보여주는 원문 카테고리 라벨(사용자 원문 유지).
// v0.11.7: amap_keyword 가 있으면 高德地图 검색어로 그 값만 씁니다(없으면 기존대로 name_zh + address).
//   동방명주 · 상하이타워 · 예원 · 임시정부 청사는 보강한 주소를 ADDRESS 복사에만 쓰고, 지도 검색어는 기존 이름 기반을 유지합니다(사용자 결정 2026-10-18).
const GUIDE_SPOTS = [
  // ---------- NANJING WEST · JING'AN ----------
  {
    id: "gs-the-louis", tab: "see", category: "SEE",
    area: "NANJING WEST · JING'AN",
    name: "The Louis", name_zh: "路易号",
    address: "上海市静安区南京西路789号 兴业太古汇",
    hours: "10:00–22:00",
    note: "배 형태의 Louis Vuitton 컨셉 공간. 전시·매장·Le Café가 함께 있음.",
    keywords: ["Louis Vuitton", "ship", "exhibition", "Le Café", "photo"],
    aliases: ["루이비통 배", "루이비통배", "LV 배"],
    reservationNote: "My LV 미니프로그램 안내가 있음",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/The_Louis%2C_Louis_Vuitton_Flagship_Store_20251128.jpg/1280px-The_Louis%2C_Louis_Vuitton_Flagship_Store_20251128.jpg",
    image_alt: "The Louis, Louis Vuitton flagship ship-shaped building, Shanghai",
    image_source_url: "https://commons.wikimedia.org/wiki/File:The_Louis,_Louis_Vuitton_Flagship_Store_20251128.jpg",
    image_credit: "Photo: Supanut Arunoprayote",
    image_license: "CC BY 4.0",
    image_search_query: "路易号 The Louis Louis Vuitton 兴业太古汇 上海",
  },
  {
    id: "gs-starbucks-reserve-roastery", tab: "eat", eatType: "cafe", category: "CAFE",
    area: "NANJING WEST · JING'AN",
    name: "Starbucks Reserve Shanghai Roastery", name_zh: "",
    address: "789 West Nanjing Rd, Unit 110 & 201, Jing'an District",
    hours: "",
    note: "The Louis와 같은 Nanjing West Road 789 구역.",
    tip: "당일 영업시간은 지도앱에서 재확인.",
  
    image_search_query: "星巴克臻选上海烘焙工坊 Starbucks Reserve Roastery Shanghai 南京西路789号",},
  {
    id: "gs-henjiuyiqian-yangroushuan", tab: "eat", eatType: "restaurant", category: "RESTAURANT",
    area: "NANJING WEST · JING'AN",
    name: "很久以前羊肉串（南京西路818广场店）", name_zh: "很久以前羊肉串（南京西路818广场店）",
    address: "南京西路818号 818广场 B1",
    hours: "",
    signature: ["羊肉串"],
    note: "한국인 후기에서 南京东路/第一百货 지점보다 이 지점을 택하는 사례가 많음.",
    tip: "저녁에는 이곳도 2시간 이상 대기 사례가 있으므로 WeChat/Alipay에서 미리 웨이팅을 거는 것이 좋음.",
    aliases: ["헌지우이치엔", "헌우치엔", "양꼬치"],
  
    image_search_query: "很久以前羊肉串 南京西路818广场店 上海",},

  // ---------- NORTH BUND ----------
  {
    id: "gs-the-stage", tab: "see", category: "SEE",
    area: "NORTH BUND",
    name: "The Stage 白玉兰观景台", name_zh: "白玉兰观景台",
    address: "上海市虹口区东大名路501号 SMP上海白玉兰广场地下1层 LG1",
    hours: "10:00–23:00",
    note: "320m 높이에서 상하이 스카이라인을 보는 전망대.",
    keywords: ["night view", "sunset", "skyline"],
    metro: "地铁12号线 国际客运中心站 3号口",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/White_Magnolia_Plaza%2C_The_North_Bund%2C_Hong_Kou%2C_Shanghai.jpg",
    image_alt: "White Magnolia Plaza exterior, North Bund, Shanghai (the building that houses The Stage observation deck)",
    image_source_url: "https://commons.wikimedia.org/wiki/File:White_Magnolia_Plaza,_The_North_Bund,_Hong_Kou,_Shanghai.jpg",
    image_credit: "Photo: 冰纪",
    image_license: "CC BY-SA 4.0",
    image_context: "WHITE MAGNOLIA PLAZA · EXTERIOR",
  
    image_search_query: "The Stage 白玉兰观景台 北外滩 上海",},
  {
    id: "gs-manner-coffee-guoke", tab: "eat", eatType: "cafe", category: "CAFE",
    area: "NORTH BUND",
    name: "Manner Coffee（国客滨江店）", name_zh: "Manner Coffee（国客滨江店）",
    address: "上海市虹口区国客中心码头海事塔区域",
    hours: "",
    note: "통유리 너머 동방명주 정면 뷰가 유명한 북와이탄 Manner.",
    keywords: ["Oriental Pearl view", "coffee", "North Bund"],
  
    image_search_query: "Manner Coffee 国客滨江店 北外滩 上海",},
  {
    id: "gs-north-bund", tab: "see", category: "SEE",
    area: "NORTH BUND",
    name: "North Bund / 北外滩滨江", name_zh: "北外滩滨江",
    address: "", hours: "",
    note: "The Stage와 Manner Coffee를 함께 보기 좋은 강변 지역.",
  
    image_search_query: "North Bund Shanghai 北外滩滨江",},

  // ---------- WUKANG · ANFU ----------
  {
    id: "gs-13demarzo-cafe-anfu", tab: "eat", eatType: "cafe", category: "CAFE",
    area: "WUKANG · ANFU",
    name: "13DE MARZO CAFÉ（上海安福路店）", name_zh: "13DE MARZO CAFÉ（上海安福路店）",
    address: "上海市徐汇区安福路322号4号楼1楼",
    hours: "",
    note: "컵에 작은 곰 인형이 함께 나오는 비주얼로 유명.",
    tip: "인기 시간에는 대기 가능. QR/Alipay 주문 사례가 많음.",
    keywords: ["bear", "photo", "Anfu Road"],
    aliases: ["13드마르조", "곰돌이 카페", "곰돌이카페"],
  
    image_search_query: "13DE MARZO CAFÉ 安福路店 上海",},
  {
    id: "gs-harmay-wukang", tab: "shop", category: "SHOP",
    area: "WUKANG · ANFU",
    name: "HARMAY 上海武康路店", name_zh: "HARMAY 上海武康路店",
    address: "上海市徐汇区武康路55号",
    hours: "10:00–22:00",
    note: "HARMAY 공식 Tax Refund 매장. 공간 디자인 자체도 볼거리.",
    aliases: ["하메이"],
  
    image_search_query: "HARMAY 武康路店 上海",},
  {
    id: "gs-photowith", tab: "see", category: "SEE / EXPERIENCE",
    area: "WUKANG · ANFU",
    name: "PHOTOWITH 自助照相馆", name_zh: "PHOTOWITH 自助照相馆",
    address: "上海市徐汇区襄阳南路278弄1号",
    hours: "",
    metro: "陕西南路站",
    note: "컬러/흑백 셀프 촬영 스튜디오. 사전 예약 권장/필요.",
    tip: "디지털 사진 + 선택 보정/인화 구조. SNS에서 본 가격은 변동 가능하므로 고정가격으로 안내하지 않습니다.",
    reservationNote: "사전 예약 권장/필요",
  
    image_search_query: "PHOTOWITH 自助照相馆 襄阳南路 上海",},
  {
    id: "gs-to-summer", tab: "shop", category: "SHOP",
    area: "WUKANG · ANFU",
    name: "To Summer / 观夏闲庭", name_zh: "观夏闲庭",
    address: "上海市徐汇区湖南路111号",
    hours: "",
    note: "중국 향 브랜드 观夏의 플래그십. 오래된 스페인풍 양옥을 리노베이션한 공간으로 매장 자체의 건축·공간 경험도 포인트.",
    aliases: ["투썸머", "관샤", "향수"],
  
    image_search_query: "To Summer 观夏闲庭 湖南路 上海",},
  {
    id: "gs-tagi", tab: "shop", category: "SHOP",
    area: "WUKANG · ANFU",
    name: "TAGI.（乌鲁木齐中路店）", name_zh: "TAGI.（乌鲁木齐中路店）",
    address: "上海市徐汇区乌鲁木齐中路247-5号",
    hours: "",
    note: "컬러풀한 가방·모자·생활소품. 현지 리뷰에서 한국·동남아 방문객 언급이 많음.",
  
    image_search_query: "TAGI 乌鲁木齐中路店 上海",},
  {
    id: "gs-gathering", tab: "shop", category: "SHOP",
    area: "WUKANG · ANFU",
    name: "集雅 GATHERING（乌鲁木齐中路店）", name_zh: "集雅（乌鲁木齐中路店）",
    address: "上海市徐汇区乌鲁木齐中路200号",
    hours: "11:00–20:00",
    note: "수공예 도자기, 컵, 접시, 화병·다구류.",
  
    image_search_query: "集雅 GATHERING 乌鲁木齐中路店 上海",},
  {
    id: "gs-pane-yongyuan", tab: "shop", category: "SHOP",
    area: "WUKANG · ANFU",
    name: "PANE 永源路店", name_zh: "PANE 永源路店",
    address: "上海市永源路22号",
    hours: "10:00–22:00",
    note: "중국 로컬 패션·슈즈 쇼핑.",
  
    image_search_query: "PANE 永源路店 上海",},
  {
    id: "gs-mondaysleepingclub", tab: "shop", category: "SHOP",
    area: "WUKANG · ANFU",
    name: "MondaySleepingClub / 周一睡觉俱乐部", name_zh: "周一睡觉俱乐部",
    address: "上海市徐汇区延庆路72号",
    hours: "",
    note: "상하이 기반 로컬 패션 브랜드.",
    tip: "영업시간은 변동 가능하므로 당일 확인.",
  
    image_search_query: "MondaySleepingClub 周一睡觉俱乐部 延庆路 上海",},
  {
    id: "gs-wukang-mansion", tab: "see", category: "SEE",
    area: "WUKANG · ANFU",
    name: "Wukang Mansion / 武康大楼", name_zh: "武康大楼",
    address: "", hours: "",
    note: "우캉루 산책과 함께 보기 좋은 상하이의 대표 근대 건축물.",
    aliases: ["우캉맨션", "우캉빌딩"],
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Wukang_Mansion_20251128.jpg/960px-Wukang_Mansion_20251128.jpg",
    image_alt: "Shanghai Wukang Mansion",
    image_source_url: "https://commons.wikimedia.org/wiki/File:Wukang_Mansion_20251128.jpg",
    image_credit: "Photo: Supanut Arunoprayote",
    image_license: "CC BY 4.0",
  
    image_search_query: "武康大楼 Wukang Mansion Shanghai",},
  {
    id: "gs-wukang-road", tab: "see", category: "SEE",
    area: "WUKANG · ANFU",
    name: "Wukang Road / 武康路", name_zh: "武康路",
    address: "", hours: "",
    note: "건축·카페·편집숍이 섞여 있는 City Walk 구역.",
  
    image_search_query: "武康路 Wukang Road Shanghai",},
  {
    id: "gs-anfu-road", tab: "see", category: "SEE",
    area: "WUKANG · ANFU",
    name: "Anfu Road / 安福路", name_zh: "安福路",
    address: "", hours: "",
    note: "13DE MARZO, Brandy Melville 등과 함께 걷는 쇼핑·카페 거리.",
  
    image_search_query: "安福路 Anfu Road Shanghai",},
  {
    id: "gs-columbia-circle", tab: "see", category: "SEE",
    area: "WUKANG · ANFU",
    name: "Columbia Circle / 上生·新所", name_zh: "上生·新所",
    address: "上海市长宁区延安西路1262号",
    hours: "",
    note: "옛 Columbia Country Club 등을 재생한 문화·라이프스타일 공간. 청록색 야외 수영장이 대표 포토스팟.",
    tip: "바로 옆 延安西路1221号에 옛 장난감 공장을 개조한 복합공간 星期天公园(Park Dimanche)이 있어 함께 둘러보기 좋습니다. 카페·레스토랑 영업시간은 현장에서 확인하세요.",
    aliases: ["콜롬비아 서클", "상생신소"],
  
    image_search_query: "上生·新所 Columbia Circle Shanghai",},

  // ---------- YONGKANG · XUHUI ----------
  {
    id: "gs-tonton", tab: "eat", eatType: "dessert", category: "CAFE / FOOD",
    area: "YONGKANG · XUHUI",
    name: "TonTon", name_zh: "TonTon",
    address: "上海市徐汇区永康路176-178号",
    hours: "",
    note: "시나몬롤·베이커리로 알려진 Yongkang Road 스팟.",
  
    image_search_query: "TonTon 永康路店 上海",},
  {
    id: "gs-sanlifang-dirty", tab: "eat", eatType: "cafe", category: "CAFE",
    area: "YONGKANG · XUHUI",
    name: "三立方 × Mahlkönig Dirty", name_zh: "三立方",
    address: "上海市徐汇区永康路58号",
    hours: "",
    note: "초저온·프로즌 Dirty 커피로 SNS에서 알려짐.",
    tip: "작은 매장이고 대기 사례가 많으므로 오전 방문이 상대적으로 편하다는 후기.",
  
    image_search_query: "三立方 Mahlkönig Dirty 永康路 上海",},
  {
    id: "gs-renhe-guan", tab: "eat", eatType: "restaurant", category: "RESTAURANT",
    area: "YONGKANG · XUHUI",
    name: "人和馆·上海菜（徐汇店）", name_zh: "人和馆·上海菜（徐汇店）",
    address: "上海市徐汇区肇嘉浜路407号",
    hours: "",
    signature: ["蟹粉捞饭", "金牌红烧肉"],
    note: "2026 미쉐린 가이드 1스타 상하이 요리점. (과거 자료의 '人管' 표기는 '人和馆'으로 교정)",
    aliases: ["런허관", "게살솥밥", "홍소육"],
  
    image_search_query: "人和馆 上海菜 徐汇店 上海",},
  {
    id: "gs-andaz-itc", tab: "see", category: "AREA REFERENCE",
    area: "YONGKANG · XUHUI",
    name: "Andaz Shanghai ITC / 上海徐家汇中心安达仕酒店", name_zh: "上海徐家汇中心安达仕酒店",
    address: "上海市徐汇区虹桥路283号",
    hours: "",
    note: "The Rooftop Bar와 东阁이 함께 있는 호텔 단지 — 아래 두 곳을 찾아갈 때 기준점이 되는 위치입니다.",
  
    image_search_query: "上海徐家汇中心安达仕酒店 Andaz Shanghai ITC",},
  {
    id: "gs-rooftop-bar-andaz", tab: "eat", eatType: "bar", category: "BAR",
    area: "YONGKANG · XUHUI",
    name: "The Rooftop Bar — Andaz Shanghai ITC", name_zh: "",
    address: "上海市徐汇区虹桥路283号",
    hours: "12:00–01:00",
    note: "차를 활용한 칵테일과 고층 도시 전망.",
    tip: "Golden Hour 17:00–19:00.",
  
    image_search_query: "The Rooftop Bar Andaz Shanghai ITC 徐家汇 上海",},
  {
    id: "gs-dongge-andaz", tab: "eat", eatType: "restaurant", category: "RESTAURANT",
    area: "YONGKANG · XUHUI",
    name: "东阁 — Andaz Shanghai ITC", name_zh: "东阁",
    address: "上海市徐汇区虹桥路283号",
    hours: "",
    note: "클래식 상하이 가정식 계열 중식당.",
  
    image_search_query: "东阁 上海徐家汇中心安达仕酒店 上海",},

  // ---------- 1000 TREES ----------
  {
    id: "gs-tian-an-1000-trees", tab: "see", tabs: ["see", "shop"], category: "SEE / SHOP",
    area: "1000 TREES",
    name: "Tian An 1000 Trees / 天安千树", name_zh: "天安千树",
    address: "上海市普陀区莫干山路600号",
    hours: "",
    note: "Thomas Heatherwick 계열의 독특한 외관과 쇼핑 공간.",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/1000_Trees_20251127.jpg/960px-1000_Trees_20251127.jpg",
    image_alt: "Tian An 1000 Trees, Shanghai",
    image_source_url: "https://commons.wikimedia.org/wiki/File:1000_Trees_20251127.jpg",
    image_credit: "Photo: Supanut Arunoprayote",
    image_license: "CC BY 4.0",
  
    image_search_query: "天安千树 Tian An 1000 Trees Shanghai",},
  {
    id: "gs-charlietown", tab: "eat", eatType: "cafe", category: "CAFE / TEA",
    area: "1000 TREES",
    name: "CHARLIETOWN 红茶公司（天安千树店）", name_zh: "CHARLIETOWN 红茶公司（天安千树店）",
    address: "天安千树",
    hours: "",
    note: "차향 중심의 프리미엄 밀크티 브랜드. 파란 차통 벽·샹들리에 인테리어가 시그니처.",
    tip: "2026년 후기 기준 일부 메뉴 26元 — 메뉴·가격은 변동 가능.",
    aliases: ["찰리타운", "밀크티"],
  
    image_search_query: "CHARLIETOWN 红茶公司 天安千树店 上海",},

  // ---------- NANJING EAST · BUND ----------
  {
    id: "gs-qingzhi-handcream", tab: "shop", category: "SHOP / SOUVENIR",
    area: "NANJING EAST · BUND",
    name: "青稚护手霜（上海南京东路店）", name_zh: "青稚护手霜（上海南京东路店）",
    address: "南京东路66号",
    hours: "",
    note: "날짜·생일 테마 핸드크림, 선물용 패키징으로 알려짐.",
    aliases: ["칭즈", "칭즈 핸드크림"],
  
    image_search_query: "青稚护手霜 南京东路店 上海",},
  {
    id: "gs-popmart", tab: "shop", category: "SHOP",
    area: "NANJING EAST · BUND",
    name: "POP MART 泡泡玛特全球旗舰店", name_zh: "泡泡玛特全球旗舰店",
    address: "南京东路299号 宏伊国际广场 F1",
    hours: "",
    note: "캐릭터·블라인드박스 플래그십.",
    aliases: ["팝마트"],
  
    image_search_query: "POP MART 泡泡玛特全球旗舰店 南京东路 上海",},
  {
    id: "gs-miniso-land", tab: "shop", category: "SHOP",
    area: "NANJING EAST · BUND",
    name: "MINISO LAND / 名创优品全球壹号店", name_zh: "名创优品全球壹号店",
    address: "南京东路479号 U479",
    hours: "",
    note: "대형 IP·캐릭터 매장.",
    aliases: ["미니소", "미니소랜드"],
  
    image_search_query: "MINISO LAND 名创优品全球壹号店 南京东路 上海",},
  {
    id: "gs-toptoy", tab: "shop", category: "SHOP",
    area: "NANJING EAST · BUND",
    name: "TOP TOY 上海全球旗舰店", name_zh: "TOP TOY 上海全球旗舰店",
    address: "南京东路558号",
    hours: "",
    note: "피규어·캐릭터·중국 디자인 굿즈.",
    aliases: ["탑토이"],
  
    image_search_query: "TOP TOY 上海全球旗舰店 南京东路 上海",},
  {
    id: "gs-shanghai-first-food-store", tab: "shop", category: "SHOP / FOOD / SOUVENIR",
    area: "NANJING EAST · BUND",
    name: "上海第一食品商店", name_zh: "上海第一食品商店",
    address: "南京东路720号",
    hours: "",
    note: "중국·상하이 식품 기념품을 한 번에 보기 좋은 곳. White Rabbit 등 식품 선물과 연결됩니다.",
  
    image_search_query: "上海第一食品商店 南京东路 上海",},
  {
    id: "gs-mms-shanghai", tab: "shop", category: "SHOP",
    area: "NANJING EAST · BUND",
    name: "M&M'S 上海", name_zh: "M&M'S 上海",
    address: "南京东路829号 上海世茂广场 G层",
    hours: "",
    note: "초콜릿 + 캐릭터 굿즈 + 상하이 테마 선물.",
  
    image_search_query: "M&M'S 上海 世茂广场 南京东路",},
  {
    id: "gs-monogram", tab: "shop", category: "SHOP / SOUVENIR",
    area: "NANJING EAST · BUND",
    name: "monogram 墨格（上海世茂广场店）", name_zh: "墨格（上海世茂广场店）",
    address: "南京东路829号 上海世茂广场 L3 西区 L307",
    hours: "",
    note: "문구·엽서·마그넷·문창·기념품.",
  
    image_search_query: "monogram 墨格 上海世茂广场店 上海",},
  {
    id: "gs-libaixie", tab: "eat", eatType: "restaurant", category: "RESTAURANT",
    area: "NANJING EAST · BUND",
    name: "李百蟹·蟹黄面·江景餐厅（外滩·豫园店）", name_zh: "李百蟹·蟹黄面·江景餐厅（外滩·豫园店）",
    address: "上海市黄浦区外滩22号 中山东二路22号3楼",
    hours: "",
    signature: ["蟹黄面", "蟹黄捞饭"],
    note: "동방명주와 푸동 스카이라인이 정면으로 보이는 강변 뷰.",
    aliases: ["게살국수", "게살면", "게살밥"],
  
    image_search_query: "李百蟹 蟹黄面 江景餐厅 外滩豫园店 上海",},
  {
    id: "gs-hugongguan", tab: "eat", eatType: "restaurant", category: "RESTAURANT",
    area: "NANJING EAST · BUND",
    name: "Hu Gong Guan / 沪公馆·上海菜（外滩豫园店）", name_zh: "沪公馆·上海菜（外滩豫园店）",
    address: "上海市黄浦区外滩街道外滩22号中山东二路22号2楼",
    hours: "",
    signature: ["松鼠鲈鱼", "桂花红烧肉", "老上海罗宋汤", "蟹粉小笼", "生花装饰饮品（SNS参考）"],
    note: "Bund 22 2층의 상하이 요리점. 와이탄·푸동 스카이라인 뷰와 상하이식 메뉴를 함께 즐기는 곳.",
    tip: "같은 건물 3층의 李百蟹와는 별도 식당이므로 층수를 확인하세요.",
    aliases: ["호공관", "Hu Gong Guan", "상하이요리", "쏭슈 농어튀김", "홍소육", "게살 샤오롱바오"],
    keywords: ["Bund 22", "Shanghai cuisine", "松鼠鲈鱼", "红烧肉", "蟹粉小笼"],
  
    image_search_query: "沪公馆 上海菜 外滩豫园店 上海",},

  // ---------- XINTIANDI ----------
  {
    id: "gs-diandude", tab: "eat", eatType: "restaurant", category: "RESTAURANT",
    area: "XINTIANDI",
    name: "点都德（中海环宇荟店）", name_zh: "点都德（中海环宇荟店）",
    address: "上海市黄浦区黄陂南路838弄 中海环宇荟 B1 B125",
    hours: "",
    signature: ["金莎红米肠"],
    note: "광둥식 딤섬·차찬 계열.",
    aliases: ["점도덕", "딤섬", "홍미창펀"],
  
    image_search_query: "点都德 中海环宇荟店 上海",},
  {
    id: "gs-feidachu", tab: "eat", eatType: "restaurant", category: "RESTAURANT",
    area: "XINTIANDI",
    name: "费大厨辣椒炒肉（新天地店）", name_zh: "费大厨辣椒炒肉（新天地店）",
    address: "上海市黄浦区淮海中路333号 新天地广场 F4",
    hours: "",
    signature: ["辣椒炒肉"],
    note: "고추고기볶음(辣椒炒肉)을 대표 메뉴로 하는 체인의 신천지점.",
    aliases: ["페이다추", "고추고기볶음"],
  
    image_search_query: "费大厨辣椒炒肉 新天地店 上海",},

  // ---------- 기존 기본 관광지 (유지) ----------
  // 아래 19곳은 기존에 이미 저장되어 있던 장소이며, 검증되지 않은 candidate/TBD
  // 표현만 제거했습니다. area는 지명 자체가 속한 지역을 근거로 한 스케매틱
  // 지도용 근사 분류이며, 정확한 주소/영업시간은 표시하지 않습니다.
  { id: "gs-existing-bund", tab: "see", category: "SEE", area: "NANJING EAST · BUND", name: "The Bund", name_zh: "外滩", address: "", hours: "", note: "상하이를 대표하는 강변 산책로 · 야경 명소.", tip: "야간 경관 조명 시간은 계절과 행사에 따라 공지가 달라집니다. 12월 점등 시간은 당일 공지로 확인하세요.", image: "assets/guide/photos/bund.webp", image_alt: "The Bund at night — Customs House clock tower and HSBC Building lit up along the Huangpu River", image_source_url: "https://commons.wikimedia.org/wiki/File:HSBC_Building_and_Custom_House,_Shanghai_at_night_20260417.jpg", image_credit: "Photo: DvTor8303", image_license: "CC0", image_search_query: "外滩 The Bund Shanghai"},
  { id: "gs-existing-nanjing-east-road", tab: "see", category: "SEE", area: "NANJING EAST · BUND", name: "Nanjing East Road", name_zh: "南京东路", address: "", hours: "", note: "와이탄과 이어지는 대표 쇼핑가.", image_search_query: "南京东路步行街 上海"},
  { id: "gs-existing-peoples-square", tab: "see", category: "SEE", area: "OTHER", name: "People's Square", name_zh: "人民广场", address: "", hours: "", note: "상하이 도심 중앙 광장 · 지하철 환승 거점.", image_search_query: "人民广场 People's Square Shanghai"},
  { id: "gs-existing-oriental-pearl", tab: "see", category: "SEE", area: "LUJIAZUI", name: "Oriental Pearl Tower", name_zh: "东方明珠", amap_keyword: "东方明珠", address: "上海市浦东新区世纪大道1号", hours: "09:00–21:00 (참고)", note: "푸동 스카이라인의 상징적인 전망 타워.", tip: "관람 구역에 따라 권종이 나뉩니다. 요금과 예매 방법은 공식 매표 문의(021-58792888)로 확인하세요.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/ShanghaiPearlTower.jpg/960px-ShanghaiPearlTower.jpg", image_alt: "Oriental Pearl Tower, Shanghai", image_source_url: "https://commons.wikimedia.org/wiki/File:ShanghaiPearlTower.jpg", image_credit: "", image_license: "Public Domain", image_search_query: "东方明珠 Oriental Pearl Tower Shanghai"},
  { id: "gs-existing-lujiazui", tab: "see", category: "SEE", area: "LUJIAZUI", name: "Lujiazui", name_zh: "陆家嘴", address: "", hours: "", note: "상하이 금융 중심지 · 초고층 스카이라인 지역.", image_search_query: "陆家嘴 Lujiazui skyline Shanghai"},
  { id: "gs-existing-shanghai-tower", tab: "see", category: "SEE", area: "LUJIAZUI", name: "Shanghai Tower", name_zh: "上海中心大厦", amap_keyword: "上海中心大厦", address: "上海市浦东新区银城中路501号", hours: "08:30–22:00 (참고 · 마지막 입장 시간은 티켓에서 확인)", note: "중국에서 가장 높은 초고층 빌딩.", tip: "전망대(上海之巅观光厅, 118층) 입구는 지하 1층입니다. 표는 실명제로 판매되며 여권으로 구매·입장할 수 있습니다. 온라인 예매에서 여권 입력이 안 되면 건물의 현장 매표 데스크를 이용하세요.", image_search_query: "上海中心大厦 Shanghai Tower"},
  { id: "gs-existing-xintiandi", tab: "see", category: "SEE", area: "XINTIANDI", name: "Xintiandi", name_zh: "新天地", address: "", hours: "", note: "스쿠먼(石库门) 골목을 재개발한 상업지구.", image_search_query: "新天地 Xintiandi Shanghai"},
  { id: "gs-existing-tianzifang", tab: "see", category: "SEE", area: "XINTIANDI", name: "Tianzifang", name_zh: "田子坊", address: "", hours: "", note: "좁은 골목 사이 공방·카페·편집숍이 모인 구역.", image_search_query: "田子坊 Tianzifang Shanghai"},
  { id: "gs-existing-yuyuan", tab: "see", category: "SEE", area: "OTHER", name: "Yuyuan Garden", name_zh: "豫园", amap_keyword: "豫园", address: "上海市黄浦区福佑路168号（豫园北门）", hours: "09:00–16:30 (입장 16:00까지) · 매주 월요일 휴원(법정공휴일 제외)", note: "전통 정원과 주변 상가(예원상성)를 함께 둘러볼 수 있음.", tip: "12월은 비수기 요금(성인 30위안, 공식 안내 기준)입니다. 표는 공식 '上海豫园' 미니프로그램이나 남·북문 매표소에서 살 수 있고, ADDRESS 복사는 단체·개인이 모두 들어가는 북문(福佑路168号) 주소이고, 남문(豫园老街279号, 九曲桥 쪽)은 개인 관람객만 들어갈 수 있습니다(공식 안내). 高德地图 버튼은 정원 전체(豫园)로 검색합니다. 2026년 12월 28일은 월요일이라 휴원일입니다.", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Yu_Garden_1.jpg/1280px-Yu_Garden_1.jpg", image_alt: "Yu Garden, Shanghai", image_source_url: "https://commons.wikimedia.org/wiki/File:Yu_Garden_1.jpg", image_credit: "", image_license: "Public Domain", image_search_query: "豫园 Yu Garden Shanghai"},
  { id: "gs-existing-jingan-temple", tab: "see", category: "SEE", area: "NANJING WEST · JING'AN", name: "Jing'an Temple", name_zh: "静安寺", address: "", hours: "", note: "난징시루 인근의 대표 사찰.", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Jing%27an_temple.JPG/1280px-Jing%27an_temple.JPG", image_alt: "Jing'an Temple, Shanghai", image_source_url: "https://commons.wikimedia.org/wiki/File:Jing%27an_temple.JPG", image_credit: "Photo: J. Patrick Fischer", image_license: "CC BY-SA 3.0", image_search_query: "静安寺 Jing'an Temple Shanghai"},
  { id: "gs-existing-korean-provisional-govt", tab: "see", category: "SEE", area: "XINTIANDI", name: "Site of the Provisional Government of the Republic of Korea", name_zh: "大韩民国临时政府旧址", amap_keyword: "大韩民国临时政府旧址", address: "上海市黄浦区马当路306弄4号", hours: "09:00–11:30 · 13:30–17:00 (매표 11:00 · 16:30 마감)", note: "신천지 인근의 대한민국 임시정부 관련 유적.", tip: "점심시간(11:30–13:30)에는 관람할 수 없습니다. 휴관일과 입장료는 공식 안내로 확인되지 않아, 방문 전에 확인하세요.", image_search_query: "大韩民国临时政府旧址 上海"},
  { id: "gs-existing-longhua", tab: "see", category: "SEE", area: "OTHER", name: "Longhua Temple / Longhua Pagoda", name_zh: "龙华寺 / 龙华塔", address: "", hours: "", note: "상하이에서 가장 오래된 사찰·탑 중 하나.", image_search_query: "龙华寺 龙华塔 上海"},
  { id: "gs-existing-m50", tab: "see", category: "SEE", area: "OTHER", name: "M50", name_zh: "M50", address: "", hours: "", note: "옛 방직공장을 개조한 현대미술 갤러리 단지.", image_search_query: "M50 创意园 上海"},
  { id: "gs-existing-pudong-art-museum", tab: "see", category: "SEE", area: "LUJIAZUI", name: "Pudong Museum of Art", name_zh: "浦东美术馆", address: "", hours: "", note: "와이탄 건너편 강변에 위치한 미술관.", image_search_query: "浦东美术馆 上海"},
  { id: "gs-existing-xujiahui-library", tab: "see", category: "SEE", area: "YONGKANG · XUHUI", name: "Xujiahui Library", name_zh: "徐家汇书院", address: "", hours: "", note: "徐家汇 지역의 대표 도서관·복합문화공간.", image_search_query: "徐家汇书院 上海"},
  { id: "gs-existing-xujiahui-cathedral", tab: "see", category: "SEE", area: "YONGKANG · XUHUI", name: "Xujiahui Cathedral (St. Ignatius Cathedral)", name_zh: "徐家汇天主教堂", address: "", hours: "", note: "쉬자후이의 대표 성당 건축물.", image_search_query: "徐家汇天主教堂 上海"},
  { id: "gs-existing-zhujiajiao", tab: "see", category: "SEE", area: "OTHER", name: "Zhujiajiao Water Town", name_zh: "朱家角", address: "", hours: "", note: "상하이 외곽의 수향(水乡) 고진(古镇).", image_search_query: "朱家角古镇 上海"},
  { id: "gs-existing-wuzhen", tab: "see", category: "SEE", area: "OTHER", name: "Wuzhen Water Town", name_zh: "乌镇", address: "", hours: "", note: "장쑤·저장 지역의 대표 수향 고진.", image_search_query: "乌镇 Wuzhen Water Town"},
  { id: "gs-existing-panlong-tiandi", tab: "see", category: "SEE", area: "OTHER", name: "Panlong Tiandi", name_zh: "蟠龙天地", address: "", hours: "", note: "장강 삼각주 전통 마을을 재생한 복합공간.", image_search_query: "蟠龙天地 上海"},
  // v0.11.7 신규 2곳 (사용자 승인 2026-10-18). 실사: Commons(GUIDE_IMAGE_MANIFEST). 기존 56곳 항목은 바꾸지 않음.
  { id: "gs-zhangyuan", tab: "see", category: "SEE / SHOP", area: "NANJING WEST · JING'AN", name: "Zhangyuan", name_zh: "张园", address: "上海市静安区威海路588弄", hours: "", note: "석고문(石库门) 골목 단지를 리노베이션한 문화·상업 공간. 서쪽 구역은 2022년 11월부터 운영 중입니다.", tip: "동쪽 구역은 '2026년 말 개장 예정'(공식)이라 12월 개방 범위는 방문 전에 확인하세요.", aliases: ["장위안", "장옌", "张园"], image_search_query: "张园 Zhangyuan Shanghai", source_url: "https://www.swireproperties.com/zh-cn/portfolio/current-developments/zhangyuan/"},
  { id: "gs-jingan-sculpture-park", tab: "see", category: "SEE", area: "NANJING WEST · JING'AN", name: "Jing'an Sculpture Park", name_zh: "静安雕塑公园", address: "上海市静安区北京西路500号", hours: "24시간 · 무료 (2026-09 갱신 자료)", note: "조각 작품을 전시한 도심 공원. 지하철 13호선 自然博物馆역 근처입니다.", aliases: ["징안조각공원", "정안조각공원", "징안 조각공원"], image_search_query: "静安雕塑公园 Jing'an Sculpture Park", source_url: "https://www.jingan.gov.cn/rmtzx/003001/20221012/741c4a9b-dce0-4f09-8db8-f88ef9b7bb66.html"},
];

// v0.7.1 QA — image/image_alt/image_source_url/image_credit 필드를 모든 spot에
// 일관되게 준비합니다(전부 빈 값 기본). 사용권이 확인된 로컬 이미지가 생기면
// 이 필드들만 채우면 카드에 자동으로 반영됩니다(guide.html guidePhotoHtml 참고).
// 사용권이 불명확한 SNS/블로그 사진은 다운로드·복제하지 않았습니다.
GUIDE_SPOTS.forEach((s) => {
  s.aliases = s.aliases || [];
  s.name_ko = s.name_ko || "";
  s.image = s.image || "";
  s.image_alt = s.image_alt || "";
  s.image_source_url = s.image_source_url || "";
  s.image_credit = s.image_credit || "";
  s.image_license = s.image_license || "";
  s.image_context = s.image_context || "";
  s.image_search_query = s.image_search_query || ""; // Google 이미지 검색어 // 예: "AREA VIEW" — 매장 자체 사진이 아닌 지역 사진임을 카드에 표시
});

// ===== v0.11.7 기존 카드 보강 출처 (확인일 2026-10-18) =====
// 예원: 공식 참관 안내 https://www.yugarden.com.cn/page/articleview/message.html
// 대한민국 임시정부 청사: 上海市文旅推广网 https://www.meet-in-shanghai.net/cn/museum/office-of-the-former-site-of-the-provisional-government-of-the-republic-of-korea-444634/
// 동방명주: 携程 경점 정보(공식 매표 문의 번호 포함) https://you.ctrip.com/sight/shanghai2/762.html
// 상하이타워 上海之巅: China Trip Primer(2026-08 확인) https://chinatripprimer.com/zh-cn/shanghai/attractions/tower-top
// 와이탄 조명: 上海市 2026-09-30 공지는 국경절 기간만 다룸 → 시간 수치 미게시 https://www.shanghai.gov.cn/nw17239/20260930/14f402b303d1450eb9acdd097e8077ef.html
// 人和馆 2026 미쉐린 1스타: https://rachelgouk.com/michelin-guide-shanghai-2026-starred-restaurants-bib-gourmands/
// Columbia Circle 주변 星期天公园: 上观 2026-10-02 https://www.shobserver.cn/sgh/detail?id=4067998
// ===== GUIDE_SOUVENIRS =====
// 실제 가격을 검증하지 못한 품목에는 가격을 만들지 않습니다(priceRange: "").
// 구매처를 확실히 연결할 수 있는 경우에만 shop_ids를 연결합니다.
// SHOP인 HARMAY/MINISO/POP MART 등을 별도 souvenir item으로 중복 생성하지
// 않고, 캐릭터 굿즈는 product family로 shop_ids에 연결합니다.
const GUIDE_SOUVENIRS = [
  { id: "gsv-qingzhi-hand-cream", name: "Qingzhi hand cream", priceRange: "", note: "", shop_ids: ["gs-qingzhi-handcream"] },
  { id: "gsv-to-summer-fragrance", name: "To Summer fragrance", priceRange: "", note: "", shop_ids: ["gs-to-summer"] },
  { id: "gsv-tagi-accessories", name: "TAGI accessories", priceRange: "", note: "", shop_ids: ["gs-tagi"] },
  { id: "gsv-gathering-ceramics", name: "Gathering ceramics / teaware", priceRange: "", note: "", shop_ids: ["gs-gathering"] },
  { id: "gsv-white-rabbit-candy", name: "White Rabbit candy / 大白兔", priceRange: "", note: "", shop_ids: ["gs-shanghai-first-food-store"] },
  { id: "gsv-shanghai-china-oreo", name: "Shanghai / China Oreo", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-lays-cucumber", name: "Lay's cucumber", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-lays-tomato", name: "Lay's tomato", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-franzzi-cookies", name: "Franzzi cookies", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-jujube-nougat-cashew", name: "jujube nougat cashew", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-kaman-egg-roll", name: "KAMAN egg roll", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-three-squirrels-macadamia", name: "Three Squirrels macadamia", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-caramel-sunflower-seeds", name: "caramel sunflower seeds", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-oolong-tea", name: "oolong tea", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-jiangxiaobai", name: "Jiangxiaobai / 江小白", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-luckin-liquid-coffee", name: "Luckin Coffee liquid coffee product", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-mixue-mint-lemon", name: "Mixue mint-lemon juice product", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-starbucks-city-mug", name: "Starbucks Shanghai city mug", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-shanghai-character-goods", name: "Shanghai-themed character goods", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-hello-kitty-dimsum-doll", name: "Shanghai Hello Kitty dim sum doll", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-custom-magnet", name: "custom magnet", priceRange: "", note: "", shop_ids: ["gs-monogram"] },
  { id: "gsv-character-goods-family", name: "POP MART / MINISO / TOPTOY character goods", priceRange: "", note: "", shop_ids: ["gs-popmart", "gs-miniso-land", "gs-toptoy"] },
  { id: "gsv-adidas-cny-items", name: "Adidas China / Chinese New Year style items", priceRange: "", note: "정확한 모델은 아직 특정하지 않았습니다.", shop_ids: [] },
  { id: "gsv-dji-accessories", name: "DJI accessories", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-digital-camera", name: "digital camera", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-old-iphone", name: "old iPhone", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-cassette-player", name: "cassette player", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-levis", name: "Levi's", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-vintage-luxury-watch", name: "vintage luxury watch", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-kiehls-moisturizer", name: "Kiehl's moisturizer", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-colgate-toothpaste", name: "Colgate toothpaste", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-plum-wine", name: "plum wine", priceRange: "", note: "", shop_ids: [] },
  { id: "gsv-towel-cake", name: "towel cake", priceRange: "", note: "", shop_ids: [] },
];

// ===== GUIDE_SOUVENIR_CARDS (v0.11.6 · 기념품 사진 카드 — 화면 구성 전용) =====
// 위 GUIDE_SOUVENIRS 33개 항목(id)은 그대로 두고, 카드 표시에 필요한 한국어명·사진·구매처만 덧붙입니다.
// ▸ 사진: 사용자가 직접 수집해 전달한 원본(shanghai_souvenir_original_photos_for_claude_20261018, PHOTO_MANIFEST.csv)의
//   웹용 사본(assets/guide/souvenirs/*.webp — 긴 변 최대 640px, 업스케일·크롭·로고/워터마크 편집 없음).
//   원본 파일명·SHA256은 assets/guide/souvenirs/SOURCES.md에 기록했습니다.
// ▸ license: "unverified" — 원본 페이지·공개 재사용 권한이 아직 확인되지 않았습니다. 출처 표기만으로 허락된 것으로 보지 않습니다.
// ▸ shops: 기존 GUIDE_SOUVENIRS.shop_ids가 있는 경우에만 Guide 장소 카드로 연결합니다(새 판매처를 지정하지 않음).
//   where: 일반 업종 명칭(예: "마트 · 편의점") 또는 "구매처 확인 필요".
// ▸ tag: 사진의 성격 표시 — "예시 사진"(정확한 모델·판매처 미확인), "홍보 이미지", "추가 후보"(기존 33개 외 신규 후보).
// ▸ 사진이 없는 항목(GATHERING 다구 · 빈티지 시계)은 photo 없이 두고 화면 하단 "그 밖의 쇼핑 메모"에 표시합니다.
const GUIDE_SOUVENIR_GROUPS = [
  { key: "snack", label: "간식", en: "SNACKS" },
  { key: "drink", label: "음료 · 차 · 술", en: "DRINKS & TEA" },
  { key: "beauty", label: "뷰티 · 생활", en: "BEAUTY & DAILY" },
  { key: "goods", label: "굿즈 · 패션 · 전자", en: "GOODS" },
];
const GUIDE_SOUVENIR_DIR = "assets/guide/souvenirs/";
const GUIDE_SOUVENIR_CARDS = [
  // --- 간식 ---
  { id: "gsv-white-rabbit-candy", group: "snack", title: "화이트래빗 밀크캔디", orig: "White Rabbit · 大白兔奶糖", photo: GUIDE_SOUVENIR_DIR + "white-rabbit.webp", shops: ["gs-shanghai-first-food-store"] },
  { id: "gsv-shanghai-china-oreo", group: "snack", title: "중국 오레오", orig: "Oreo · 奥利奥", photo: GUIDE_SOUVENIR_DIR + "oreo-china.webp", where: "마트 · 편의점" },
  { id: "gsv-lays-cucumber", group: "snack", title: "레이즈 오이맛", orig: "Lay's · 乐事 黄瓜味", photo: GUIDE_SOUVENIR_DIR + "lays-cucumber.webp", where: "마트 · 편의점" },
  { id: "gsv-lays-tomato", group: "snack", title: "레이즈 토마토맛", orig: "Lay's · 乐事 番茄味", photo: GUIDE_SOUVENIR_DIR + "lays-tomato.webp", where: "마트 · 편의점" },
  { id: "gsv-franzzi-cookies", group: "snack", title: "프란찌 쿠키", orig: "Franzzi · 法丽兹", photo: GUIDE_SOUVENIR_DIR + "franzzi-cookies.webp", where: "마트 · 편의점" },
  { id: "gsv-jujube-nougat-cashew", group: "snack", title: "대추 누가 캐슈넛", orig: "腰果奶枣", photo: GUIDE_SOUVENIR_DIR + "jujube-nougat-cashew-user-corrected.webp", where: "마트 · 편의점" },
  { id: "gsv-kaman-egg-roll", group: "snack", title: "카만 에그롤", orig: "KAMAN · 咔曼", photo: GUIDE_SOUVENIR_DIR + "kaman-eggroll.webp", where: "마트 · 편의점" },
  { id: "gsv-three-squirrels-macadamia", group: "snack", title: "삼지송서 간식", orig: "Three Squirrels · 三只松鼠", photo: GUIDE_SOUVENIR_DIR + "three-squirrels-packaging.webp", where: "마트 · 편의점" }, // 마카다미아 제품인지 미확인 → 브랜드 간식으로 표기
  { id: "gsv-caramel-sunflower-seeds", group: "snack", title: "카라멜 해바라기씨", orig: "焦糖瓜子", photo: GUIDE_SOUVENIR_DIR + "caramel-sunflower-seeds.webp", where: "마트 · 편의점" },
  { id: "gsv-towel-cake", group: "snack", title: "수건 케이크", orig: "毛巾卷", photo: GUIDE_SOUVENIR_DIR + "towel-cake.webp", where: "구매처 확인 필요" },
  { id: "new-butterfly-pastry", group: "snack", isNew: true, title: "국제호텔 나비과자", orig: "国际饭店 蝴蝶酥", photo: GUIDE_SOUVENIR_DIR + "butterfly-pastry.webp", where: "국제호텔(国际饭店) · 매장 위치 확인 필요", tag: "추가 후보" },
  { id: "new-snackerco-snacks", group: "snack", isNew: true, title: "SNACKERCO 간식", orig: "SNACKERCO", photo: GUIDE_SOUVENIR_DIR + "snackerco-snacks.webp", where: "구매처 확인 필요", tag: "추가 후보" },
  // --- 음료 · 차 · 술 ---
  { id: "gsv-jiangxiaobai", group: "drink", title: "강소백 과일맛", orig: "江小白 果立方", photo: GUIDE_SOUVENIR_DIR + "jiangxiaobai-fruit-flavours-user-corrected.webp", where: "마트 · 편의점" },
  { id: "gsv-plum-wine", group: "drink", title: "매실주 Meijian", orig: "梅见", photo: GUIDE_SOUVENIR_DIR + "meijian-plum-wine-user-corrected.webp", where: "마트 · 편의점" },
  { id: "gsv-oolong-tea", group: "drink", title: "차 선물세트", orig: "Tea gift set", photo: GUIDE_SOUVENIR_DIR + "tea-gift-set-type-unverified.webp", where: "구매처 확인 필요" }, // 우롱차인지 미확인 → "차 선물세트"로만 표기
  { id: "gsv-luckin-liquid-coffee", group: "drink", title: "루이싱커피 액상커피", orig: "Luckin · 瑞幸咖啡", photo: GUIDE_SOUVENIR_DIR + "luckin-liquid-coffee.webp", where: "구매처 확인 필요" },
  { id: "gsv-mixue-mint-lemon", group: "drink", title: "미쉐 음료", orig: "Mixue · 蜜雪冰城", photo: GUIDE_SOUVENIR_DIR + "mixue-lemon-drink.webp", where: "미쉐 매장" }, // 정확한 맛·판매 지속 여부 미확인
  { id: "new-yantai-gaoliang", group: "drink", isNew: true, title: "연태고량주", orig: "烟台古酿", photo: GUIDE_SOUVENIR_DIR + "yantai-gaoliang-liquor.webp", where: "구매처 확인 필요", tag: "추가 후보" },
  { id: "new-blan-bunny-tea", group: "drink", isNew: true, title: "블랜버니 티 선물세트", orig: "Blan Bunny", photo: GUIDE_SOUVENIR_DIR + "blan-bunny-tea-gift-set.webp", where: "구매처 확인 필요", tag: "추가 후보" },
  { id: "new-saturnbird-coffee", group: "drink", isNew: true, title: "새턴버드 커피", orig: "Saturnbird · 三顿半", photo: GUIDE_SOUVENIR_DIR + "saturnbird-coffee.webp", where: "구매처 확인 필요", tag: "추가 후보" },
  // --- 뷰티 · 생활 ---
  { id: "gsv-qingzhi-hand-cream", group: "beauty", title: "칭즈 핸드크림", orig: "青稚 · 틴케이스", photo: GUIDE_SOUVENIR_DIR + "qingzhi-round-tin-handcream.webp", shops: ["gs-qingzhi-handcream"] },
  { id: "gsv-to-summer-fragrance", group: "beauty", title: "To Summer 향수", orig: "观夏", photo: GUIDE_SOUVENIR_DIR + "to-summer-fragrance.webp", shops: ["gs-to-summer"] },
  { id: "gsv-kiehls-moisturizer", group: "beauty", title: "키엘 수분크림", orig: "Kiehl's", photo: GUIDE_SOUVENIR_DIR + "kiehls-moisturizer.webp", where: "키엘 매장 · 백화점" },
  { id: "gsv-colgate-toothpaste", group: "beauty", title: "콜게이트 치약", orig: "Colgate · 高露洁", photo: GUIDE_SOUVENIR_DIR + "colgate-toothpaste.webp", where: "마트 · 편의점" },
  // --- 굿즈 · 패션 · 전자 ---
  { id: "gsv-character-goods-family", group: "goods", title: "캐릭터 굿즈", orig: "POP MART · MINISO LAND · TOP TOY", photo: GUIDE_SOUVENIR_DIR + "character-rabbit-keyring.webp", shops: ["gs-popmart", "gs-miniso-land", "gs-toptoy"], tag: "예시 사진" }, // 사진 속 키링의 브랜드 미확인 — 세 매장 상품이라고 단정하지 않음
  { id: "gsv-tagi-accessories", group: "goods", title: "TAGI 액세서리", orig: "TAGI.", photo: GUIDE_SOUVENIR_DIR + "tagi-bag-as-accessory-example.webp", shops: ["gs-tagi"] },
  { id: "gsv-custom-magnet", group: "goods", title: "상하이 마그넷", orig: "우캉맨션 · 동방명주", photos: [GUIDE_SOUVENIR_DIR + "wukang-mansion-magnet.webp", GUIDE_SOUVENIR_DIR + "shanghai-architecture-magnet.webp"], shops: ["gs-monogram"], tag: "예시 사진" }, // 커스텀 제작 여부·monogram 판매 상품인지 미확인
  { id: "gsv-starbucks-city-mug", group: "goods", title: "스타벅스 상하이 시티 머그", orig: "Starbucks Shanghai", photo: GUIDE_SOUVENIR_DIR + "starbucks-shanghai-mug.webp", where: "스타벅스 매장" },
  { id: "gsv-shanghai-character-goods", group: "goods", title: "상하이 디즈니 캐릭터 인형", orig: "Shanghai Disney", photo: GUIDE_SOUVENIR_DIR + "disney-linabell-plush.webp", where: "구매처 확인 필요" },
  { id: "gsv-hello-kitty-dimsum-doll", group: "goods", title: "헬로키티 딤섬 굿즈", orig: "Hello Kitty", photo: GUIDE_SOUVENIR_DIR + "hello-kitty-dimsum-promotional.webp", where: "구매처 확인 필요", tag: "홍보 이미지" },
  { id: "gsv-adidas-cny-items", group: "goods", title: "아디다스 중국풍 의류", orig: "adidas", photo: GUIDE_SOUVENIR_DIR + "adidas-china-style-clothing.webp", where: "아디다스 매장", tag: "예시 사진" },
  { id: "gsv-levis", group: "goods", title: "리바이스 의류", orig: "Levi's", photo: GUIDE_SOUVENIR_DIR + "levis-clothing.webp", where: "리바이스 매장", tag: "예시 사진" },
  { id: "gsv-dji-accessories", group: "goods", title: "DJI 액세서리", orig: "DJI · 大疆", photo: GUIDE_SOUVENIR_DIR + "dji-accessories.webp", where: "DJI 매장" },
  { id: "gsv-digital-camera", group: "goods", title: "디지털카메라 (CCD)", orig: "CCD camera", photo: GUIDE_SOUVENIR_DIR + "ccd-digital-camera.webp", where: "중고 · 빈티지 매장", tag: "예시 사진" },
  { id: "gsv-old-iphone", group: "goods", title: "구형 아이폰", orig: "iPhone", photo: GUIDE_SOUVENIR_DIR + "old-iphones.webp", where: "중고 · 빈티지 매장", tag: "예시 사진" },
  { id: "gsv-cassette-player", group: "goods", title: "카세트 플레이어", orig: "Cassette player", photo: GUIDE_SOUVENIR_DIR + "cassette-player.webp", where: "중고 · 빈티지 매장", tag: "예시 사진" },
  // --- 사진 없음 → 하단 "그 밖의 쇼핑 메모" ---
  { id: "gsv-gathering-ceramics", group: "memo", title: "GATHERING 도자기 · 다구", shops: ["gs-gathering"] }, // 사용자 요청: 추천 사진 카드에서 제외
  { id: "gsv-vintage-luxury-watch", group: "memo", title: "빈티지 명품 시계" },
];
GUIDE_SOUVENIR_CARDS.forEach((c) => { if (c.photo || c.photos) c.license = "unverified"; });

// ===== GUIDE_SPOT_DRAFTS (v0.11.7 · 화면에 표시하지 않는 내부 후보) =====
// 위치·지점·운영 근거를 확인한 신규 장소 후보입니다. 해당 장소와 정확히 일치하는 이미지를 확보하고
// 사용자가 승인한 뒤에만 GUIDE_SPOTS로 옮겨 카드로 공개합니다. 기존 56곳의 이미지를 재활용하지 않습니다.
// priority: "selected"(사용자 선정 신규 카드 우선 대상) | "confirmed"(2차 검증 통과 · 추가 승인 필요) | "address-pending"(입구 주소 확인 필요)
// image_status: "ready"(일치 실사 확보 · GUIDE_DRAFT_IMAGE_MANIFEST) | "pending"(확보 대기 — 임의 SVG·다른 장소 사진·기존 56곳 이미지 사용 금지)
// 확인일 2026-10-18. 가격·맛 평가·인스타 후기는 넣지 않았습니다.
// 제목(title/title_zh): 1행 = 사용자가 확정한 한국어 표기(2026-10-18) 또는 영문 브랜드, 2행 = 확인된 정확한 중국어 상호(1행과 같으면 생략).
//   확인되지 않은 지점명은 붙이지 않습니다.
// v0.11.7: 张园 · 静安雕塑公园은 사진·정보 확인 후 사용자 승인으로 GUIDE_SPOTS로 옮김(2026-10-18). 나머지 6곳은 사진 확보 대기.
// listed: true (사용자 승인 2026-10-18) → 사진 카드 없이 해당 지역 카드 아래 "추가 맛집" 정보형 목록과 검색에만 표시.
//   지역 지도 핀은 넣지 않습니다(스케매틱 지도 좌표를 검증할 근거 없음). 사진을 확보하면 같은 id로 GUIDE_SPOTS 정식 카드로 옮깁니다.
//   Matcha Wang · Apoli Itabakery 는 listed 없음 = 완전 비공개 후보.
//   name_zh = 출처로 확인된 상호(미쉐린·보도·上海市文旅推广网). NAME 복사·高德 검색어에 그대로 쓰이므로 확인되지 않은 지점 표기는 넣지 않고 별칭으로만 둡니다.
const GUIDE_SPOT_DRAFTS = [
  { id: "gs-nanxiang-mantou-yuyuan", listed: true, priority: "selected", region: "bund", tab: "eat", eatType: "restaurant", category: "RESTAURANT", area: "NANJING EAST · BUND",
    name: "Nanxiang Steamed Bun (City God Temple)", name_zh: "南翔馒头店", title: "난샹만두", title_zh: "南翔馒头店",
    address: "上海市黄浦区城隍庙豫园路85号", hours: "", note: "2026 미쉐린 가이드 빕구르망에 오른 샤오롱바오 집. 예원 관광과 같은 동선입니다.",
    aliases: ["南翔馒头店（城隍庙）", "남상만두점", "난샹만두", "남상만두", "샤오롱바오", "小笼包"], image_status: "pending — 해당 매장 실사 확보 필요",
    sources: ["https://guide.michelin.com/sg/zh_CN/shanghai-municipality/shanghai/restaurant/nanxiang-steamed-bun-city-god-temple"] },
  { id: "gs-sheng-yong-xing-bund", listed: true, priority: "selected", region: "bund", tab: "eat", eatType: "restaurant", category: "RESTAURANT", area: "NANJING EAST · BUND",
    name: "Sheng Yong Xing (The Bund)", name_zh: "晟永兴", title: "성용싱", title_zh: "晟永兴",
    address: "上海市黄浦区广东路20号外滩5号5楼", hours: "", note: "2026 미쉐린 가이드 1스타 베이징 요리(베이징덕)점. 예약은 식당에 직접 문의합니다.",
    tip: "미쉐린 가이드 안내: 예약은 식당이 직접 관리합니다(전화 +86 21 6330 2885).", aliases: ["Sheng Yong Xing", "晟永兴（外滩）", "성용싱", "베이징덕", "北京烤鸭"], image_status: "pending — 해당 매장 실사 확보 필요",
    sources: ["https://guide.michelin.com/hk/zh_HK/shanghai-municipality/shanghai/restaurant/sheng-yong-xing"] },
  { id: "gs-jiajia-tangbao-huanghe", listed: true, priority: "confirmed", region: "bund", tab: "eat", eatType: "restaurant", category: "RESTAURANT", area: "NANJING EAST · BUND",
    name: "Jia Jia Tang Bao (Huanghe Road)", name_zh: "佳家汤包（黄河路店）", title: "지아지아탕바오", title_zh: "佳家汤包（黄河路店）",
    address: "上海市黄浦区黄河路127号", hours: "07:00/07:30–20:30 (출처마다 시작 시각이 다름)", note: "인민광장 근처의 탕바오(汤包) 전문점.",
    aliases: ["지아지아탕바오", "탕바오", "汤包"], image_status: "pending — 해당 매장 실사 확보 필요",
    sources: ["https://www.trvlogue.com/ko/jiajia-tangbao-shanghai-review", "https://hk.trip.com/restaurant/china/shanghai/detail/jia-jia-tang-bao-11144394/"] },
  { id: "gs-luochunge-zhejiang", listed: true, priority: "confirmed", region: "bund", tab: "eat", eatType: "restaurant", category: "RESTAURANT", area: "NANJING EAST · BUND",
    name: "Luochunge Shengjian", name_zh: "萝春阁", title: "뤄춘거", title_zh: "萝春阁",
    address: "上海市黄浦区浙江中路425号", hours: "", note: "생지엔(生煎)으로 알려진 노포 브랜드. 2026년 1월 28일 21년 만에 浙江中路에서 다시 문을 열었습니다.",
    tip: "재개장 첫날 1시간 반 만에 매진됐다는 보도가 있어 이른 시간 방문이 좋습니다.", aliases: ["萝春阁（浙江中路）", "뤄춘거", "생지엔", "生煎"], image_status: "pending — 해당 매장 실사 확보 필요",
    sources: ["https://news.qq.com/rain/a/20260129A03MIQ00", "https://m.163.com/dy/article_cambrian/KKED126K0514QU8E.html"], user_original: "浙江中路425-427号 (원문 일치). 澎湃 기사의 '浙江路462号'는 1930년대 역사 기술" },
  { id: "gs-matcha-wang-hai550", priority: "confirmed", region: "xintiandi", tab: "eat", eatType: "cafe", category: "CAFE", area: "XINTIANDI",
    name: "Matcha Wang", name_zh: "Matcha Wang（HAI550）", title: "Matcha Wang", title_zh: "",
    address: "上海市黄浦区淮海中路550号 HAI550 1楼", hours: "", note: "우유 거품 위에 양 그림을 그린 말차 음료로 알려진 말차 전문점.",
    aliases: ["말차왕", "매치왕", "抹茶"], image_status: "pending — 해당 매장 실사 확보 필요",
    sources: ["https://www.36kr.com/p/4000981636468608"] },
  { id: "gs-apoli-itabakery", priority: "confirmed", region: "wukang-anfu", tab: "eat", eatType: "cafe", category: "CAFE / FOOD", area: "WUKANG · ANFU",
    name: "Apoli Itabakery", name_zh: "AP意大利料理面包坊", title: "Apoli Itabakery", title_zh: "AP意大利料理面包坊",
    address: "上海市徐汇区兴国路380号", hours: "09:00–21:00 (2026-04 방문기 기준)", note: "이탈리아식 베이커리·카페.",
    aliases: ["아폴리", "APOLI"], image_status: "pending — 해당 매장 실사 확보 필요",
    sources: ["https://hedonisthk.blogspot.com/2026/04/apoli-itabakery-ap-shanghai-china-famous-harry-potter-bakery-cafe-amazing-savory-sweet-bite-best-melt-in-the-mouth-nama-donut.html"] },
];

// ===== GUIDE_DRAFT_IMAGE_MANIFEST (v0.11.7 · 신규 후보 전용 실사, 화면 미표시) =====
// 카드 공개 승인 시 해당 항목을 GUIDE_IMAGE_MANIFEST로 옮깁니다. (张园 · 静安雕塑公园은 2026-10-18 이동 완료 → 현재 비어 있음)
const GUIDE_DRAFT_IMAGE_MANIFEST = {};

// ===== GUIDE_RESEARCH_NOTES =====
// 정확한 상호·주소를 확인하지 못한 자료입니다. Guide 메인 카드에는 렌더링하지
// 않고(어디에서도 화면에 노출하지 않음), 삭제하지 않고 이 배열에만 보존합니다.
// Claude가 이름·주소를 임의로 추측해 채우지 않았습니다.
const GUIDE_RESEARCH_NOTES = [
  "장옌",
  "후시라오농탕 미엔관",
  "홍이지아",
  "위엔위엔",
  "예상하이",
  "청gawa / 青gawa 火锅 (원문 표기 그대로)",
  "plusone",
  "voyage",
  "manual",
  "CC LAB",
  "wuming",
  "honky tonk",
  "kopi",
  "O.P.S",
  "neo topia",
  "Fruit Pops",
  "Cream Story",
  "천수恋",
  "0566咖啡所",
  "정확한 지점을 특정하지 못한 rooftop bar",
  "정확한 정식 명칭을 특정하지 못한 기타 OCR 깨진 장소",
];

// ===== GUIDE_RESEARCH_NOTES_EXTENDED (v0.7.1 QA 추가) =====
// compaction 이후 재정리 과정에서 GUIDE_SPOTS/GUIDE_RESEARCH_NOTES 어디에도
// 남지 않았던, 사용자가 이전에 수집한 원본 장소 33곳입니다. 삭제하거나
// 추측해서 공개 카드로 만들지 않고, 데이터 유실만 막기 위해 원문 그대로
// 보존합니다. GUIDE_RESEARCH_NOTES와 마찬가지로 화면에 렌더링하지 않으며,
// 주소·시간·중국어명을 새로 추측해서 채우지 않았습니다.
const GUIDE_RESEARCH_NOTES_EXTENDED = [
  "Park Dimanche / 星期天公园",
  "留白西餐厅",
  "THE VESSEL",
  "난징동루 Adidas / 阿迪达斯(南京东路旗舰店)",
  "大润发 / RT-Mart",
  "Metal Hands Coffee",
  "塘所",
  "The Berry",
  "Akalcha",
  "TWOI",
  "Matcha Wang",
  "袁记云饺",
  "泸溪河",
  "芳芳手作麻糍",
  "红唇串串香 / Red Lips",
  "APOLI ITABAKERY",
  "LA COUR Brunch & Bistro",
  "NUDAKE 淮海中路店",
  "CORNER CONE GELATO",
  "鹤茶所",
  "BUT MAY COFFEE",
  "Sheng Yong Xing",
  "Mi Shang Prada Rong Zhai",
  "3½ Three and a Half",
  "Captain George Flavor Museum",
  "YAN KUN KUN CHUAN CHUAN HOTPOT",
  "Dayin Bookmall / 大隐书局",
  "代串奇东北烧烤",
  "도원향 마사지",
  "翡悦里",
  "茂名南路",
  "何东旧居",
  "World Culture Park",
];

// ============================================================================
// v0.8 "REGION-FIRST GUIDE" — 추가 데이터 (기존 GUIDE_SPOTS 항목은 한 줄도 삭제·수정하지 않음)
// ============================================================================

// ===== 사진 로컬 호스팅 스위치 =====
// false: Wikimedia Commons 공식 썸네일 CDN(thumb.wikimedia.org)에서 직접 불러옵니다.
// true : tools/fetch_guide_photos.py 로 내려받은 assets/guide/photos/*.webp 를 먼저 쓰고,
//        파일이 없으면 Commons 썸네일 → 그래도 실패하면 기존 placeholder 순으로 되돌아갑니다.
const GUIDE_LOCAL_PHOTOS = false;

// ===== GUIDE_IMAGE_MANIFEST — spot별 대표 이미지 (v0.8 audit 결과) =====
// kind: "photo"        → 재사용 라이선스를 Commons API로 직접 확인한 실사 (저작자·라이선스 기록)
//                        file: 있으면 repo 안 웹용 사본(16:10, 1280x800 WebP)을 표시 (v0.11.1: 4장). license_url · date · modified 로
//                        라이선스 링크 · 촬영일 · 수정(크롭) 내용을 기록. CC BY-SA 사진은 credit 에 "(cropped)" 를 붙여 카드에도 수정 사실을 표시.
//                        context: 카드 좌상단 라벨 (예: "건물 외관 · 外滩22号" = 매장 자체가 아니라 입점 건물 사진)
//       "illustration" → ILLUSTRATION_NEEDED. 사용 가능한 실사가 없어 AI 일러스트로 교체할 대상.
//                        v0.11.2: ready: true 인 항목은 AI 생성 콘셉트 이미지(실제 매장 사진 아님)이며,
//                        카드에 "AI 이미지 · 실제 사진 아님" 라벨이 항상 표시됩니다. 업종·장면이 맞지 않거나
//                        실제 캐릭터·로고가 그려진 이미지는 ready: false 로 보류(기존 SVG placeholder 유지).
//                        file 경로에 이미지를 넣고 ready: true 로 바꾸면 카드에 자동 반영됩니다.
//                        그 전까지는 기존 inline SVG placeholder를 그대로 유지합니다(교체 대상 표시).
// 브리프(장소 특징·비율·파일명)는 assets/guide/ILLUSTRATION_BRIEF.md 참고.
const GUIDE_IMAGE_MANIFEST = {
  // ---------- REAL PHOTO (Wikimedia Commons, 라이선스 확인 2026-09-29 · v0.11.1 4장 2026-10-17 재확인) ----------
  "gs-the-louis": { kind: "photo", file: "assets/guide/photos/the-louis.webp", commons: "The Louis, Louis Vuitton Flagship Store 20251128.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/The_Louis%2C_Louis_Vuitton_Flagship_Store_20251128.jpg/1280px-The_Louis%2C_Louis_Vuitton_Flagship_Store_20251128.jpg", credit: "Supanut Arunoprayote", license: "CC BY 4.0", alt: "The Louis, Louis Vuitton flagship ship-shaped building, Shanghai", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "c2b4cfa9788556c1d7cd834ff3fde9efcbe62e1c56ef323e6a3dfe80bcfa0973" },
  "gs-starbucks-reserve-roastery": { kind: "photo", file: "assets/guide/photos/starbucks-reserve-roastery.webp", commons: "Starbucks Reserve Roastery Shanghai 02.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Starbucks_Reserve_Roastery_Shanghai_02.jpg/1280px-Starbucks_Reserve_Roastery_Shanghai_02.jpg", credit: "Codas", license: "CC BY-SA 4.0", alt: "Interior of Starbucks Reserve Roastery Shanghai with the copper roasting cask", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "8bbd1f70a123607b39888761fea155d16816bf0be0f20dc7c3f6843a10a1acf7" },
  "gs-the-stage": { kind: "photo", file: "assets/guide/photos/the-stage.webp", commons: "White Magnolia Plaza, view from Shangqiu road.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/White_Magnolia_Plaza%2C_view_from_Shangqiu_road.jpg/960px-White_Magnolia_Plaza%2C_view_from_Shangqiu_road.jpg", credit: "DmitryKvasov", license: "CC0", alt: "White Magnolia Plaza tower, North Bund — the building that houses The Stage observation deck", context: "WHITE MAGNOLIA PLAZA · EXTERIOR", focus: "50% 0%", modified: "16:10 crop 960x600 (WebP)", source_sha256: "bf60d7cdbb533232d741cd4892ace2a4323ce9343754bb8444785bb70a2772c1" },
  "gs-north-bund": { kind: "photo", file: "assets/guide/photos/north-bund.webp", commons: "The North Bund, Shanghai.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/The_North_Bund%2C_Shanghai.jpg/1280px-The_North_Bund%2C_Shanghai.jpg", credit: "钉钉", license: "CC BY-SA 4.0", alt: "North Bund riverside lawn with the Pudong skyline across the Huangpu River", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "eb47de6fe89d7f4133439d8a713ff717ef08908fb28e967849e823f686075598" },
  "gs-wukang-mansion": { kind: "photo", file: "assets/guide/photos/wukang-mansion.webp", commons: "Wukang Mansion 20251128.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Wukang_Mansion_20251128.jpg/1280px-Wukang_Mansion_20251128.jpg", credit: "Supanut Arunoprayote", license: "CC BY 4.0", alt: "Wukang Mansion, Shanghai", focus: "50% 35%", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "0919bb45583fbda3da59f33082e29d395fdd3277aecac5eb0089db76f2698abc" },
  "gs-wukang-road": { kind: "photo", file: "assets/guide/photos/wukang-road.webp", commons: "Wukang Road, Shanghai, May 2016.JPG", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Wukang_Road%2C_Shanghai%2C_May_2016.JPG/1280px-Wukang_Road%2C_Shanghai%2C_May_2016.JPG", credit: "SSYoung", license: "CC BY-SA 4.0", alt: "Tree-lined Wukang Road with low historic houses", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "e182881624cda7155fc5223a2dcfb14365d74c5aabd8a1564d0b9eb093bd5bf2" },
  "gs-anfu-road": { kind: "photo", file: "assets/guide/photos/anfu-road.webp", commons: "Anfulu 255 Hao Zhuzhai.JPG", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Anfulu_255_Hao_Zhuzhai.JPG/1280px-Anfulu_255_Hao_Zhuzhai.JPG", credit: "Fayhoo", license: "CC BY-SA 3.0", alt: "Historic residence at No. 255 Anfu Road under plane trees", context: "ANFU RD. NO.255", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "76df0c1a26f6db1833544feb714f1d893f02759a0beeb53bbcc22dfaafa03451" },
  "gs-columbia-circle": { kind: "photo", file: "assets/guide/photos/columbia-circle.webp", commons: "Columbia Country Club 06.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Columbia_Country_Club_06.jpg/1280px-Columbia_Country_Club_06.jpg", credit: "WQL", license: "CC BY-SA 4.0", alt: "The turquoise outdoor pool of the former Columbia Country Club at Columbia Circle", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "1ab829dbae1ff65005d58db69f47efc4d53b48efdbaa6f5d9e9dd2396e81fdc8" },
  "gs-andaz-itc": { kind: "photo", file: "assets/guide/photos/andaz-itc.webp", commons: "XuJiaHui-Complexe Shanghai ITC.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/XuJiaHui-Complexe_Shanghai_ITC.jpg/960px-XuJiaHui-Complexe_Shanghai_ITC.jpg", credit: "ShanghaiDream", license: "CC0", alt: "Shanghai ITC tower complex in Xujiahui, home of Andaz Shanghai ITC", context: "SHANGHAI ITC · EXTERIOR", focus: "50% 0%", modified: "16:10 crop 960x600 (WebP)", source_sha256: "a44bbad208b8fda0c113de6082da5c149e7eb84475f972be93a04a6b62e47341" },
  "gs-tian-an-1000-trees": { kind: "photo", file: "assets/guide/photos/tian-an-1000-trees.webp", commons: "1000 Trees 20251127.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/1000_Trees_20251127.jpg/1280px-1000_Trees_20251127.jpg", credit: "Supanut Arunoprayote", license: "CC BY 4.0", alt: "Tian An 1000 Trees, Shanghai", focus: "50% 40%", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "0e58e7013af2407eaa7337a9073f396019a089bbb3d5477d85913cb827ab6e40" },
  "gs-existing-bund": { kind: "photo", file: "assets/guide/photos/bund.webp", commons: "HSBC Building and Custom House, Shanghai at night 20260417.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/HSBC_Building_and_Custom_House%2C_Shanghai_at_night_20260417.jpg/1280px-HSBC_Building_and_Custom_House%2C_Shanghai_at_night_20260417.jpg", credit: "DvTor8303", license: "CC0", license_url: "https://creativecommons.org/publicdomain/zero/1.0/", date: "2026-04-17", modified: "16:10 crop + resize 1280x800 (WebP)", alt: "The Bund at night — Customs House clock tower and HSBC Building lit up along the Huangpu River" }, // v0.11.1: 출처 불명(pxfuel) 사진 교체
  "gs-existing-nanjing-east-road": { kind: "photo", file: "assets/guide/photos/nanjing-east-road.webp", commons: "2014.11.15.181406 Nanjing Road Pedestrian Zone Shanghai.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/2014.11.15.181406_Nanjing_Road_Pedestrian_Zone_Shanghai.jpg/1280px-2014.11.15.181406_Nanjing_Road_Pedestrian_Zone_Shanghai.jpg", credit: "Hermann Luyken", license: "CC0", alt: "Nanjing Road pedestrian street at night with neon signs", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "a594d252345c7e66c140add8618c2b6b7dc63df2de69d51c2fdfc8dde6994c64" },
  "gs-existing-peoples-square": { kind: "photo", file: "assets/guide/photos/peoples-square.webp", commons: "People's Square Shanghai November 2017 001.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/People%27s_Square_Shanghai_November_2017_001.jpg/1280px-People%27s_Square_Shanghai_November_2017_001.jpg", credit: "King of Hearts", license: "CC BY-SA 4.0", alt: "People's Square, Shanghai", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "366fbe652c8307308cd8f2e00ac04c6817020a4a8b829f618b6f832e1c73f282" },
  "gs-existing-oriental-pearl": { kind: "photo", file: "assets/guide/photos/oriental-pearl.webp", commons: "ShanghaiPearlTower.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/ShanghaiPearlTower.jpg/960px-ShanghaiPearlTower.jpg", credit: "", license: "Public Domain", alt: "Oriental Pearl Tower, Shanghai", focus: "50% 30%", modified: "16:10 crop 960x600 (WebP)", source_sha256: "4299bde89a3f970607f1feb80193e225c9e9e5cdc9dcdfcb52d8eb7df436f047" },
  "gs-existing-lujiazui": { kind: "photo", file: "assets/guide/photos/lujiazui.webp", commons: "Shanghai Lujiazui night skyline 2017 - Flickr.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Shanghai_Lujiazui_night_skyline_2017_-_Flickr.jpg/1280px-Shanghai_Lujiazui_night_skyline_2017_-_Flickr.jpg", credit: "Larry Qian", license: "CC0", alt: "Lujiazui skyline at night across the Huangpu River", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "6469bf6b52d5308c98ce2605492a01e02b06c9572f2912c50ec8616b108670ce" },
  "gs-existing-shanghai-tower": { kind: "photo", file: "assets/guide/photos/shanghai-tower.webp", commons: "Shanghai Shanghai Tower 5166304.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Shanghai_Shanghai_Tower_5166304.jpg/960px-Shanghai_Shanghai_Tower_5166304.jpg", credit: "Ermell", license: "CC0", alt: "Twisting glass facade of Shanghai Tower", focus: "50% 25%", modified: "16:10 crop 960x600 (WebP)", source_sha256: "7ab669330a91205aa4e9ab39497f2ebebefbcca5e1192127684382547ebecf6d" },
  "gs-existing-xintiandi": { kind: "photo", file: "assets/guide/photos/xintiandi.webp", commons: "新天地 = New Heaven & Earth (6033629189).jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/%E6%96%B0%E5%A4%A9%E5%9C%B0_%3D_New_Heaven_%26_Earth_%286033629189%29.jpg/1280px-%E6%96%B0%E5%A4%A9%E5%9C%B0_%3D_New_Heaven_%26_Earth_%286033629189%29.jpg", credit: "Can Pac Swire", license: "CC BY-SA 2.0", alt: "Shikumen stone-gate houses in Xintiandi", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "7190ffb05ff6edc79bbadc89ef2841bc9f26d7befc8b3fe9de59136a3473fcab" },
  "gs-existing-tianzifang": { kind: "photo", file: "assets/guide/photos/tianzifang.webp", commons: "Tianzifang 1.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Tianzifang_1.jpg/1280px-Tianzifang_1.jpg", credit: "钉钉", license: "CC BY-SA 4.0", alt: "Narrow shikumen lane lined with shops in Tianzifang", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "03ba9405821ec872147d6e1eeee0c6581d7ed72f5b9338b02c381ab71fa814c1" },
  "gs-existing-yuyuan": { kind: "photo", file: "assets/guide/photos/yuyuan.webp", commons: "Yu Garden 1.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Yu_Garden_1.jpg/1280px-Yu_Garden_1.jpg", credit: "", license: "Public Domain", alt: "Yu Garden, Shanghai", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "222b747f1e7421ae2ae6dd71dce10a33e68f480562c027eeed0a8ed8efa5cbd3" },
  "gs-existing-jingan-temple": { kind: "photo", file: "assets/guide/photos/jingan-temple.webp", commons: "Jing'an temple.JPG", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Jing%27an_temple.JPG/1280px-Jing%27an_temple.JPG", credit: "J. Patrick Fischer", license: "CC BY-SA 3.0", alt: "Jing'an Temple, Shanghai", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "a353131d0ea7dfdfa47b165e91a055d802ce48bc1b52d2a0eec3bdc1a8a92f46" },
  "gs-existing-korean-provisional-govt": { kind: "photo", file: "assets/guide/photos/korean-provisional-govt.webp", commons: "Entrance of Provisional Government of ROK in Shanghai.JPG", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Entrance_of_Provisional_Government_of_ROK_in_Shanghai.JPG/960px-Entrance_of_Provisional_Government_of_ROK_in_Shanghai.JPG", credit: "Ericmetro", license: "CC BY-SA 3.0", alt: "Entrance of the Site of the Provisional Government of the Republic of Korea in Shanghai", focus: "50% 45%", modified: "16:10 crop 960x600 (WebP)", source_sha256: "5bd4c1fa243bd57ad6000da34e5db35379006aa4e01bb02027ab9da6d6444a8c" },
  "gs-existing-longhua": { kind: "photo", file: "assets/guide/photos/longhua.webp", commons: "Longhua Pagoda, 2019-10-19 02.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Longhua_Pagoda%2C_2019-10-19_02.jpg/1280px-Longhua_Pagoda%2C_2019-10-19_02.jpg", credit: "Siyuwj", license: "CC BY-SA 4.0", alt: "Longhua Pagoda, Shanghai", focus: "50% 30%", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "fca84f33e394965337f89889136a0d295d7b57e9108290417443e50bd5a39e57" },
  "gs-existing-m50": { kind: "photo", file: "assets/guide/photos/m50.webp", commons: "201703 M50 Creative Park.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/201703_M50_Creative_Park.jpg/1280px-201703_M50_Creative_Park.jpg", credit: "MNXANL", license: "CC BY-SA 4.0", alt: "M50 Creative Park on Moganshan Road", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "5044de4ea69e60279750533c378c47a7cf5556efc417e3bfafd101bf59086afb" },
  "gs-existing-pudong-art-museum": { kind: "photo", file: "assets/guide/photos/pudong-art-museum.webp", commons: "Museum of Art Pudong from the Bund.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Museum_of_Art_Pudong_from_the_Bund.jpg/1280px-Museum_of_Art_Pudong_from_the_Bund.jpg", credit: "Simon Wade", license: "CC BY-SA 4.0", alt: "Museum of Art Pudong on the riverfront, seen from the Bund", context: "VIEW FROM THE BUND", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "fca074cd89e528c488065a9a14f0a00f9244a5e6ff76dec1fcf311ab63c82e44" },
  "gs-existing-xujiahui-library": { kind: "photo", file: "assets/guide/photos/xujiahui-library.webp", commons: "徐家汇书院 08.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/%E5%BE%90%E5%AE%B6%E6%B1%87%E4%B9%A6%E9%99%A2_08.jpg/1280px-%E5%BE%90%E5%AE%B6%E6%B1%87%E4%B9%A6%E9%99%A2_08.jpg", credit: "Nanhuajiaren", license: "CC BY-SA 4.0", alt: "Reading hall interior of Xujiahui Library (徐家汇书院)", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "3769dc03e218f4d0272765f37751d85b975d8e6c84dafd7a6e7898ead8269d80" },
  "gs-existing-xujiahui-cathedral": { kind: "photo", file: "assets/guide/photos/xujiahui-cathedral.webp", commons: "Xujiahui Cathedral, 2019-10-19 04.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Xujiahui_Cathedral%2C_2019-10-19_04.jpg/1280px-Xujiahui_Cathedral%2C_2019-10-19_04.jpg", credit: "Siyuwj", license: "CC BY-SA 4.0", alt: "Red-brick Gothic facade of Xujiahui Cathedral", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "12524ed96f3d6faf82cd1c426d215e07dfa9830b16cba1aa0336a7bab1a7fd61" },
  "gs-existing-zhujiajiao": { kind: "photo", file: "assets/guide/photos/zhujiajiao.webp", commons: "Zhujiajiao ancient water town, Nr. Shanghai, China - 1.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Zhujiajiao_ancient_water_town%2C_Nr._Shanghai%2C_China_-_1.jpg/1280px-Zhujiajiao_ancient_water_town%2C_Nr._Shanghai%2C_China_-_1.jpg", credit: "Lloyd Tudor", license: "CC BY-SA 4.0", alt: "Canal and traditional riverside houses in Zhujiajiao water town", modified: "16:10 crop 1280x800 (WebP)", source_sha256: "4e9e94cddbef2e4244e17f2a961977a5560fa342d9934a9ecbb5f4b0a220cecd" },
  "gs-existing-wuzhen": { kind: "photo", file: "assets/guide/photos/wuzhen.webp", commons: "One of the waterways in Wuzhen Ancient Town.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/One_of_the_waterways_in_Wuzhen_Ancient_Town.jpg/1280px-One_of_the_waterways_in_Wuzhen_Ancient_Town.jpg", credit: "Wanderingchina", license: "CC BY 4.0", alt: "Aerial view of a waterway in Wuzhen Ancient Town", modified: "16:10 crop 1152x720 (WebP)", source_sha256: "075be94db7ff8c631bcd05cc66830d7064d746ab7345df22fba2579a8bc0978c" },

  // ---------- ILLUSTRATION_NEEDED (라이선스가 확인된 실사 없음 → AI 일러스트 교체 대상) ----------
  // 현재는 기존 inline SVG placeholder를 유지합니다. file에 16:10 이미지를 넣고 ready: true로 바꾸세요.
  "gs-henjiuyiqian-yangroushuan": { kind: "illustration", file: "assets/guide/illustrations/henjiuyiqian-yangroushuan.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-manner-coffee-guoke": { kind: "illustration", file: "assets/guide/illustrations/manner-coffee-guoke.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: manner.webp)
  "gs-13demarzo-cafe-anfu": { kind: "illustration", file: "assets/guide/illustrations/13demarzo-cafe-anfu.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: 13-de-marzo.webp)
  "gs-harmay-wukang": { kind: "illustration", file: "assets/guide/illustrations/harmay-wukang.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: harmay.webp)
  "gs-photowith": { kind: "illustration", file: "assets/guide/illustrations/photowith.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-to-summer": { kind: "illustration", file: "assets/guide/illustrations/to-summer.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: to-summer.webp)
  "gs-tagi": { kind: "illustration", file: "assets/guide/illustrations/tagi.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-gathering": { kind: "illustration", file: "assets/guide/illustrations/gathering.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-pane-yongyuan": { kind: "illustration", file: "assets/guide/illustrations/pane-yongyuan.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-mondaysleepingclub": { kind: "illustration", file: "assets/guide/illustrations/mondaysleepingclub.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-tonton": { kind: "illustration", file: "assets/guide/illustrations/tonton.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: tonton.webp · 베이커리)
  "gs-sanlifang-dirty": { kind: "illustration", file: "assets/guide/illustrations/sanlifang-dirty.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-renhe-guan": { kind: "illustration", file: "assets/guide/illustrations/renhe-guan.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-rooftop-bar-andaz": { kind: "illustration", file: "assets/guide/illustrations/rooftop-bar-andaz.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-dongge-andaz": { kind: "illustration", file: "assets/guide/illustrations/dongge-andaz.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-charlietown": { kind: "illustration", file: "assets/guide/illustrations/charlietown.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-qingzhi-handcream": { kind: "illustration", file: "assets/guide/illustrations/qingzhi-handcream.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-popmart": { kind: "illustration", file: "assets/guide/illustrations/popmart.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: popmart.webp)
  "gs-miniso-land": { kind: "illustration", file: "assets/guide/illustrations/miniso-land.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-toptoy": { kind: "illustration", file: "assets/guide/illustrations/toptoy.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-shanghai-first-food-store": { kind: "photo", file: "assets/guide/photos/shanghai-first-food-store.webp", commons: "Shanghai First Foodhall 20250501.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Shanghai_First_Foodhall_20250501.jpg/1280px-Shanghai_First_Foodhall_20250501.jpg", credit: "Suicasmo", license: "CC0", license_url: "https://creativecommons.org/publicdomain/zero/1.0/", date: "2025-05-01", modified: "16:10 crop + resize 1280x800 (WebP)", alt: "Shanghai First Foodhall (上海第一食品商店) store building on East Nanjing Road" }, // v0.11.1 신규 실사 · 매장 외관
  "gs-mms-shanghai": { kind: "photo", file: "assets/guide/photos/mms-shanghai.webp", commons: "Shanghai M&M'S Facade.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Shanghai_M%26M%27S_Facade.jpg/1280px-Shanghai_M%26M%27S_Facade.jpg", credit: "Mepatm (cropped)", license: "CC BY-SA 4.0", license_url: "https://creativecommons.org/licenses/by-sa/4.0/", date: "2018-09-16", modified: "16:10 crop + resize 1280x800 (WebP) — CC BY-SA 4.0으로 재배포", alt: "M&M'S store front on East Nanjing Road, Shanghai" }, // v0.11.1 신규 실사 · 매장 정면
  "gs-monogram": { kind: "illustration", file: "assets/guide/illustrations/monogram.webp", ready: true, ai: true }, // v0.11.3 AI 콘셉트 이미지 (단독 생성본)
  "gs-libaixie": { kind: "illustration", file: "assets/guide/illustrations/libaixie.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: li-baixie.webp)
  "gs-hugongguan": { kind: "photo", file: "assets/guide/photos/hugongguan.webp", commons: "Butterfield & Swire.jpg", thumb: "https://upload.wikimedia.org/wikipedia/commons/0/00/Butterfield_%26_Swire.jpg", credit: "Fayhoo (cropped)", license: "CC BY-SA 3.0", license_url: "https://creativecommons.org/licenses/by-sa/3.0/", date: "2015-01 (Commons 업로드일)", modified: "16:10 crop + resize 1280x800 (WebP) — CC BY-SA 3.0으로 재배포", context: "건물 외관 · 外滩22号", alt: "No. 22 The Bund (former Butterfield & Swire building) — the building that houses Hu Gong Guan (2F)" }, // v0.11.1 신규 실사 · 입점 건물 외관
  "gs-diandude": { kind: "illustration", file: "assets/guide/illustrations/diandude.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: diandude.webp)
  "gs-feidachu": { kind: "illustration", file: "assets/guide/illustrations/feidachu.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: feidachu.webp)
  "gs-existing-panlong-tiandi": { kind: "illustration", file: "assets/guide/illustrations/panlong-tiandi.webp", ready: true, ai: true }, // v0.11.2 AI 콘셉트 이미지 (패키지: panlongtiandi.webp)
  // v0.11.7 신규 실사 2장 (Commons · 원본 SHA-1 일치 확인, 브라우저에서 16:10 crop + 1280x800 WebP q0.8)
  "gs-zhangyuan": { kind: "photo", file: "assets/guide/photos/zhangyuan.webp", commons: "Zhang Yuan, Shanghai, China 2024 (54281266880).jpg", credit: "Juan Antonio Segal (cropped)", license: "CC BY 2.0", license_url: "https://creativecommons.org/licenses/by/2.0/", date: "2024-12-30", source: "https://www.flickr.com/photos/jafsegal/54281266880/", alt: "Renovated shikumen buildings and lane at Zhangyuan, Shanghai, with the Zhangyuan sign", modified: "16:10 crop(왼쪽 기준, 4000x1844 중 2950x1844) + resize 1280x800 (WebP)", source_sha1: "d84620011cf1f663336c9b4e820271d302e636cb", sha256: "8f074a5a01ef1fdbb81a2473f3d0217e1c19b1c6ffe746cdf6df5a80a7e2c50e" },
  "gs-jingan-sculpture-park": { kind: "photo", file: "assets/guide/photos/jingan-sculpture-park.webp", commons: "Jing'an Sculpture Park.jpg", credit: "Zhou Guanhuai (cropped)", license: "CC BY-SA 4.0", license_url: "https://creativecommons.org/licenses/by-sa/4.0/", date: "2021-10-30", alt: "Entrance sign of Jing'an Sculpture Park (静安雕塑公园), Shanghai", modified: "16:10 crop(2272x1704 중 2272x1420) + resize 1280x800 (WebP) — CC BY-SA 4.0으로 재배포", source_sha1: "026733ccb34c198320d0923b031ff429c9138596", sha256: "86d3b3c227be94e865b32222109d6fdd657f9065f0eab952f36fd6b9dbf24c4c" },
};

// manifest → 기존 image 필드에 반영 (GUIDE_SPOTS 원본 항목은 그대로 두고 런타임에만 덮어씀)
GUIDE_SPOTS.forEach((s) => {
  const m = GUIDE_IMAGE_MANIFEST[s.id];
  s.image_kind = m ? m.kind : (s.image ? "photo" : "illustration");
  s.image_status = s.image_kind === "photo" ? "REAL_PHOTO" : "ILLUSTRATION_NEEDED";
  if (!m) return;
  if (m.kind === "photo") {
    const slug = s.id.replace(/^gs-(existing-)?/, "");
    // v0.11.1: file 이 있으면 repo 안 사본(assets/guide/photos)을 바로 사용 — 나머지 사진은 기존처럼 Commons 썸네일
    s.image = m.file || m.thumb;
    s.image_local = m.file || "assets/guide/photos/" + slug + ".webp";
    s.image_alt = m.alt || s.image_alt || s.name;
    s.image_source_url = "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(m.commons.replace(/ /g, "_")).replace(/%2C/g, ",").replace(/%28/g, "(").replace(/%29/g, ")");
    s.image_credit = m.credit ? "Photo: " + m.credit : "";
    s.image_license = m.license;
    s.image_context = m.context || "";
    s.image_focus = m.focus || "";
  } else {
    s.image = "";
    s.illustration_file = m.file;
    s.illustration_ready = !!m.ready;
  }
});

// ===== GUIDE_DISPLAY_NAMES — 카드 화면 표시용 장소명 (v0.11.4 · v0.11.7 한국어 1행 통일) =====
// v0.11.7: 1행 중국어였던 7곳을 사용자가 확정한 한국어 표기로 바꿈(2026-10-18). 三立方 · 上海第一食品商店은 사용자 지정 표기 유지.
// [1줄 대표 제목, 2줄 중국어명]. 2줄이 null 이면 기존 name_zh 를 그대로 쓰고, "" 이면 2줄을 표시하지 않습니다.
// 1줄과 2줄이 같으면 화면에서 자동으로 2줄을 생략합니다.
// ⚠️ 화면 표시 전용입니다. 기존 name · name_zh · aliases · address 는 바꾸지 않습니다 —
//    高德地图 검색어 · COPY NAME/ADDRESS · Google 이미지 검색어 · 지도 핀 라벨 · 검색은 계속 기존 필드를 씁니다.
const GUIDE_DISPLAY_NAMES = {
  "gs-the-louis": ["The Louis", null],
  "gs-starbucks-reserve-roastery": ["스타벅스 리저브 로스터리", "星巴克臻选上海烘焙工坊"],
  "gs-henjiuyiqian-yangroushuan": ["헌지우이치엔 양꼬치", null],
  "gs-the-stage": ["The Stage", null],
  "gs-manner-coffee-guoke": ["Manner Coffee", null],
  "gs-north-bund": ["북와이탄", null],
  "gs-13demarzo-cafe-anfu": ["13DE MARZO CAFÉ", null],
  "gs-harmay-wukang": ["HARMAY", null],
  "gs-photowith": ["PHOTOWITH", null],
  "gs-to-summer": ["To Summer", null],
  "gs-tagi": ["TAGI.", null],
  "gs-gathering": ["GATHERING", "集雅"],
  "gs-pane-yongyuan": ["PANE", null],
  "gs-mondaysleepingclub": ["MondaySleepingClub", null],
  "gs-wukang-mansion": ["우캉맨션", null],
  "gs-wukang-road": ["우캉루", null],
  "gs-anfu-road": ["안푸루", null],
  "gs-columbia-circle": ["Columbia Circle", null],
  "gs-tonton": ["TonTon", ""],
  "gs-sanlifang-dirty": ["三立方", ""],
  "gs-renhe-guan": ["런허관", null],
  "gs-andaz-itc": ["Andaz Shanghai ITC", null],
  "gs-rooftop-bar-andaz": ["The Rooftop Bar", ""],
  "gs-dongge-andaz": ["둥거", null],
  "gs-tian-an-1000-trees": ["천수", null],
  "gs-charlietown": ["CHARLIETOWN", null],
  "gs-qingzhi-handcream": ["칭즈 핸드크림", null],
  "gs-popmart": ["POP MART", null],
  "gs-miniso-land": ["MINISO LAND", null],
  "gs-toptoy": ["TOP TOY", null],
  "gs-shanghai-first-food-store": ["上海第一食品商店", ""],
  "gs-mms-shanghai": ["M&M'S Shanghai", ""],
  "gs-monogram": ["monogram", null],
  "gs-libaixie": ["이백게", null],
  "gs-hugongguan": ["호공관", null],
  "gs-diandude": ["점도덕", null],
  "gs-feidachu": ["페이다츄", null],
  "gs-existing-bund": ["와이탄", null],
  "gs-existing-nanjing-east-road": ["난징동루", null],
  "gs-existing-peoples-square": ["인민광장", null],
  "gs-existing-oriental-pearl": ["동방명주", null],
  "gs-existing-lujiazui": ["루자쭈이", null],
  "gs-existing-shanghai-tower": ["상하이타워", null],
  "gs-existing-xintiandi": ["신천지", null],
  "gs-existing-tianzifang": ["티엔즈팡", null],
  "gs-existing-yuyuan": ["예원", null],
  "gs-existing-jingan-temple": ["정안사", null],
  "gs-existing-korean-provisional-govt": ["대한민국 임시정부 청사", null],
  "gs-existing-longhua": ["용화사와 용화탑", null],
  "gs-existing-m50": ["M50", ""],
  "gs-existing-pudong-art-museum": ["푸동미술관", null],
  "gs-existing-xujiahui-library": ["쉬자후이 서원", "徐家汇书院"],
  "gs-existing-xujiahui-cathedral": ["쉬자후이 성당", null],
  "gs-existing-zhujiajiao": ["주자자오", "朱家角"],
  "gs-existing-wuzhen": ["우전", null],
  "gs-existing-panlong-tiandi": ["Panlong Tiandi", null],
  "gs-zhangyuan": ["장위안", null],
  "gs-jingan-sculpture-park": ["정안조각공원", null],
};
// ===== GUIDE_MAP_LABELS (v0.11.7) — 지역 지도 핀 전용 축약명 =====
// 핀 라벨은 기본적으로 카드 1행(GUIDE_DISPLAY_NAMES[0])과 같습니다. 지도에서 잘리거나 다른 라벨과 겹치는 곳만 여기서 짧게 씁니다.
// 원래 장소를 알아볼 수 있는 이름만 씁니다(검색 · 카드 제목 · 高德 · 복사에는 영향 없음).
const GUIDE_MAP_LABELS = {
  "gs-starbucks-reserve-roastery": "스타벅스 로스터리", // 카드 1행 '스타벅스 리저브 로스터리'가 PC 지도에서 잘림
  "gs-mms-shanghai": "M&M'S",                          // 'M&M'S Shanghai'가 768px에서 옆 핀(上海第一食品商店) 라벨과 겹침
};
// ===== GUIDE_MAP_LABEL_POS (v0.11.7) — 핀 라벨 위치만 조정 (핀 좌표 · 번호 · ID 변경 없음) =====
// pos: 라벨을 핀 위("above")/아래("below")에 둠(기본: 번호 홀짝으로 번갈아). dx: 라벨만 가로로 이동(지도 단위).
const GUIDE_MAP_LABEL_POS = {
  // gs-shanghai-first-food-store: 768px에서 라벨이 난징동루 핀에 닿지만, 위로 옮기면 600·520px에서 TOP TOY 라벨·monogram 핀과 새로 겹쳐 조정하지 않음(v0.11.6과 동일)
  "gs-andaz-itc": { dx: -12 },                      // 라벨 오른쪽 끝이 768px에서 둥거 핀에 닿음
  "gs-sanlifang-dirty": { pos: "below" },           // 위쪽 라벨이 도로명 '永康路 YONGKANG RD'와 겹침
};
// 표기 통일로 화면에서 빠진 대체 표기를 검색 별칭으로 보존합니다(기존 aliases 뒤에 덧붙임, 중복 제외).
const GUIDE_EXTRA_ALIASES = {
  "gs-existing-zhujiajiao": [
    "주가각",
    "주자자오"
  ],
  "gs-gathering": [
    "GATHERING"
  ],
  "gs-existing-xujiahui-library": [
    "쉬자후이 서원",
    "쉬자후이 도서관"
  ],
  "gs-wukang-mansion": [
    "우캉대루"
  ],
  "gs-existing-tianzifang": [
    "톈쯔팡"
  ],
  "gs-existing-jingan-temple": [
    "징안쓰"
  ],
  "gs-existing-longhua": [
    "룽화사",
    "룽화탑",
    "용화사",
    "용화탑"
  ],
  "gs-rooftop-bar-andaz": [
    "루프탑",
    "루프탑 바"
  ],
  "gs-sanlifang-dirty": [
    "Mahlkönig Dirty",
    "더티커피",
    "Dirty 커피"
  ],
  "gs-starbucks-reserve-roastery": [
    "스타벅스 리저브 로스터리",
    "星巴克臻选上海烘焙工坊"
  ],
  "gs-mms-shanghai": [
    "M&M'S Shanghai",
    "엠앤엠즈"
  ]
};
GUIDE_SPOTS.forEach((s) => {
  const d = GUIDE_DISPLAY_NAMES[s.id];
  if (d) { s.title = d[0]; s.title_zh = d[1] === null ? (s.name_zh || "") : d[1]; }
  const extra = GUIDE_EXTRA_ALIASES[s.id];
  if (extra) {
    const base = Array.isArray(s.aliases) ? s.aliases.slice() : (s.aliases ? [s.aliases] : []);
    extra.forEach((a) => { if (!base.includes(a)) base.push(a); });
    s.aliases = base;
  }
});

// ===== GUIDE_REGIONS — 지역 중심 탐색 (v0.8) =====
// areas: 기존 AREA_CLUSTERS id를 그대로 묶습니다(spot.area 값은 바꾸지 않음).
// include: area가 "OTHER"였던 spot을 실제 위치에 맞는 지역으로 편입.
// short: 좁은 화면·지역 전환 칩에 쓰는 짧은 이름
// ov: 전체 스케매틱 지도(800x560) 위 지역 중심 좌표.
// map: 지역 상세 스케매틱 지도(800x460) — roads/water는 대략적인 상대 위치이며 비례 지도가 아닙니다.
// pins: spot id → [x, y] (지역 상세 지도 좌표). 정확한 위치는 카드의 高德地图 버튼으로 확인.
const GUIDE_REGIONS = [
  {
    key: "bund", short: "와이탄", name_ko: "와이탄 · 난징동루 · 예원", name_en: "BUND · NANJING EAST · YUYUAN",
    areas: ["NANJING EAST · BUND"], include: ["gs-existing-yuyuan", "gs-existing-peoples-square"],
    cover: "gs-existing-bund", ov: [530, 285],
    desc: "인민광장에서 난징동루 보행가를 따라 황푸강변 와이탄까지 걸어가는 상하이 대표 동선. 남쪽으로 예원이 이어지고, 강 건너 푸동 스카이라인이 정면으로 보입니다.",
    map: {
      water: [{ d: "M 700 0 C 690 120, 720 250, 690 460", w: 46, label: "黄浦江", lx: 722, ly: 60 }],
      roads: [
        { d: "M 40 190 L 660 190", label: "南京东路 NANJING RD (E)", lx: 44, ly: 214, main: true },
        { d: "M 660 20 C 668 150, 672 300, 650 440", label: "中山东一路 THE BUND", lx: 604, ly: 430 },
        { d: "M 420 190 L 420 440", label: "", lx: 0, ly: 0 },
        { d: "M 40 330 L 650 330", label: "延安东路", lx: 90, ly: 320 },
      ],
      pins: {
        "gs-existing-peoples-square": [80, 250], "gs-mms-shanghai": [170, 190], "gs-monogram": [190, 150],
        "gs-shanghai-first-food-store": [260, 190], "gs-toptoy": [350, 190], "gs-miniso-land": [430, 150],
        "gs-popmart": [510, 190], "gs-existing-nanjing-east-road": [300, 230], "gs-qingzhi-handcream": [600, 150],
        "gs-existing-bund": [660, 230], "gs-libaixie": [600, 370], "gs-hugongguan": [560, 400], "gs-existing-yuyuan": [470, 410],
      },
    },
  },
  {
    key: "north-bund", short: "북와이탄", name_ko: "북와이탄", name_en: "NORTH BUND",
    areas: ["NORTH BUND"], include: [],
    cover: "gs-north-bund", ov: [575, 150],
    desc: "와이탄 북쪽, 쑤저우허 너머의 새 강변 산책로. 사람이 적고 동방명주·루자쭈이를 정면에서 볼 수 있어 산책과 야경 사진에 좋습니다.",
    map: {
      water: [{ d: "M 0 420 C 250 400, 520 380, 800 300", w: 60, label: "黄浦江 HUANGPU", lx: 620, ly: 380 },
              { d: "M 0 330 C 60 340, 110 360, 150 410", w: 16, label: "苏州河", lx: 30, ly: 316 }],
      roads: [
        { d: "M 120 250 L 780 180", label: "东大名路 DONGDAMING RD", lx: 300, ly: 214, main: true },
        { d: "M 160 360 C 350 330, 560 320, 780 250", label: "北外滩滨江 RIVERSIDE WALK", lx: 330, ly: 360 },
      ],
      pins: { "gs-the-stage": [420, 200], "gs-manner-coffee-guoke": [560, 305], "gs-north-bund": [330, 330] },
      compass_note: "강 건너 → 루자쭈이",
    },
  },
  {
    key: "pudong", short: "푸동", name_ko: "푸동 · 루자쭈이", name_en: "PUDONG · LUJIAZUI",
    areas: ["LUJIAZUI"], include: [],
    cover: "gs-existing-lujiazui", ov: [680, 300],
    desc: "황푸강 동쪽 금융지구. 동방명주·상하이타워 등 초고층 전망대가 모여 있고, 강변 미술관에서 와이탄 방향 뷰도 볼 수 있습니다.",
    map: {
      water: [{ d: "M 120 0 C 140 150, 60 260, 0 330", w: 58, label: "黄浦江 HUANGPU", lx: 20, ly: 60 }],
      roads: [
        { d: "M 150 220 C 300 230, 480 240, 780 250", label: "世纪大道 CENTURY AVE", lx: 520, ly: 268, main: true },
        { d: "M 170 120 C 220 250, 180 360, 120 460", label: "滨江大道 RIVERSIDE", lx: 196, ly: 440 },
      ],
      pins: { "gs-existing-pudong-art-museum": [200, 120], "gs-existing-oriental-pearl": [290, 170], "gs-existing-lujiazui": [420, 210], "gs-existing-shanghai-tower": [480, 300] },
    },
  },
  {
    key: "xintiandi", short: "신천지", name_ko: "신천지 · 티엔즈팡", name_en: "XINTIANDI · TIANZIFANG",
    areas: ["XINTIANDI"], include: [],
    cover: "gs-existing-xintiandi", ov: [470, 410],
    desc: "스쿠먼(石库门) 골목을 살린 신천지와, 좁은 골목 공방 거리 티엔즈팡. 대한민국 임시정부 유적도 신천지 바로 옆에 있습니다.",
    map: {
      water: [],
      roads: [
        { d: "M 20 110 L 780 110", label: "淮海中路 HUAIHAI RD (M)", lx: 560, ly: 98, main: true },
        { d: "M 360 30 L 360 440", label: "黄陂南路", lx: 368, ly: 440 },
        { d: "M 520 60 L 520 440", label: "马当路", lx: 528, ly: 440 },
        { d: "M 40 390 L 640 390", label: "泰康路", lx: 80, ly: 380 },
      ],
      pins: { "gs-feidachu": [440, 110], "gs-existing-xintiandi": [440, 190], "gs-existing-korean-provisional-govt": [520, 250], "gs-diandude": [360, 290], "gs-existing-tianzifang": [230, 390] },
    },
  },
  {
    key: "jingan", short: "정안", name_ko: "난징시루 · 정안", name_en: "NANJING WEST · JING'AN",
    areas: ["NANJING WEST · JING'AN"], include: [],
    cover: "gs-the-louis", ov: [345, 285],
    desc: "정안사에서 싱예타이구후이(太古汇)까지 이어지는 고급 쇼핑가. 배 모양의 The Louis와 스타벅스 리저브 로스터리가 같은 구역에 있습니다.",
    map: {
      water: [],
      roads: [
        { d: "M 20 240 L 780 240", label: "南京西路 NANJING RD (W)", lx: 520, ly: 228, main: true },
        { d: "M 20 380 L 780 380", label: "延安中路", lx: 40, ly: 370 },
      ],
      pins: { "gs-existing-jingan-temple": [140, 260], "gs-the-louis": [540, 290], "gs-starbucks-reserve-roastery": [610, 300], "gs-henjiuyiqian-yangroushuan": [580, 170], "gs-jingan-sculpture-park": [700, 130], "gs-zhangyuan": [680, 330] },
    },
  },
  {
    key: "wukang-anfu", short: "우캉·안푸", name_ko: "우캉루 · 안푸루", name_en: "WUKANG · ANFU",
    areas: ["WUKANG · ANFU"], include: [],
    cover: "gs-wukang-mansion", ov: [215, 380],
    desc: "플라타너스 가로수 아래 옛 서양식 저택과 카페·편집숍이 이어지는 City Walk 구역. 우캉맨션에서 시작해 안푸루·우루무치중루로 걸어가면 좋습니다.",
    map: {
      water: [],
      roads: [
        { d: "M 190 420 C 250 300, 320 170, 380 40", label: "武康路 WUKANG RD", lx: 150, ly: 300, main: true },
        { d: "M 330 150 L 760 150", label: "安福路 ANFU RD", lx: 470, ly: 138, main: true },
        { d: "M 620 30 L 620 440", label: "乌鲁木齐中路", lx: 628, ly: 440 },
        { d: "M 40 400 L 780 400", label: "淮海中路", lx: 520, ly: 390 },
        { d: "M 200 330 L 520 330", label: "湖南路", lx: 420, ly: 320 },
      ],
      pins: {
        "gs-columbia-circle": [70, 60], "gs-harmay-wukang": [360, 90], "gs-wukang-road": [300, 210], "gs-to-summer": [300, 330],
        "gs-wukang-mansion": [200, 400], "gs-anfu-road": [460, 150], "gs-13demarzo-cafe-anfu": [540, 150],
        "gs-mondaysleepingclub": [690, 60], "gs-tagi": [620, 220], "gs-gathering": [620, 290], "gs-pane-yongyuan": [470, 250], "gs-photowith": [740, 320],
      },
      edge_notes: [{ x: 70, y: 98, t: "↖ 延安西路 방면" }, { x: 740, y: 358, t: "襄阳南路 →" }],
    },
  },
  {
    key: "xuhui", short: "쉬자후이", name_ko: "융캉루 · 쉬자후이 · 룽화", name_en: "YONGKANG · XUHUI · LONGHUA",
    areas: ["YONGKANG · XUHUI"], include: ["gs-existing-longhua"],
    cover: "gs-existing-xujiahui-cathedral", ov: [320, 470],
    desc: "카페 골목 융캉루, 쉬자후이 성당·도서관과 ITC 루프탑, 조금 더 남쪽의 룽화사까지. 이동 거리가 있어 두 묶음(융캉루 / 쉬자후이)으로 나눠 보는 것을 추천합니다.",
    map: {
      water: [],
      roads: [
        { d: "M 460 70 L 780 70", label: "永康路 YONGKANG RD", lx: 560, ly: 58, main: true },
        { d: "M 60 190 L 780 170", label: "肇嘉浜路", lx: 560, ly: 162 },
        { d: "M 200 60 L 260 440", label: "漕溪北路", lx: 150, ly: 440 },
        { d: "M 40 260 L 400 250", label: "虹桥路", lx: 50, ly: 246 },
      ],
      pins: {
        "gs-sanlifang-dirty": [560, 70], "gs-tonton": [680, 70], "gs-renhe-guan": [520, 180],
        "gs-andaz-itc": [290, 230], "gs-rooftop-bar-andaz": [330, 205], "gs-dongge-andaz": [355, 245],
        "gs-existing-xujiahui-library": [150, 290], "gs-existing-xujiahui-cathedral": [240, 330], "gs-existing-longhua": [600, 380],
      },
      edge_notes: [{ x: 600, y: 446, t: "↓ 남쪽 (택시·지하철 이동)" }],
    },
  },
  {
    key: "1000-trees", short: "천수·M50", name_ko: "천수 · M50", name_en: "1000 TREES · M50",
    areas: ["1000 TREES"], include: ["gs-existing-m50"],
    cover: "gs-tian-an-1000-trees", ov: [300, 140],
    desc: "쑤저우허 남쪽 모간산루. 나무가 심어진 기둥들로 유명한 천수(1000 Trees)와 방직공장을 개조한 M50 예술지구가 걸어서 이어집니다.",
    map: {
      water: [{ d: "M 0 120 C 200 60, 420 170, 800 90", w: 30, label: "苏州河 SUZHOU CREEK", lx: 560, ly: 92 }],
      roads: [{ d: "M 60 230 C 300 200, 500 250, 780 220", label: "莫干山路 MOGANSHAN RD", lx: 300, ly: 262, main: true }],
      pins: { "gs-existing-m50": [230, 220], "gs-tian-an-1000-trees": [480, 225], "gs-charlietown": [560, 300] },
    },
  },
  {
    key: "outskirts", short: "근교", name_ko: "근교 · 수향마을", name_en: "DAY TRIPS · WATER TOWNS",
    areas: [], include: ["gs-existing-zhujiajiao", "gs-existing-wuzhen", "gs-existing-panlong-tiandi"],
    cover: "gs-existing-zhujiajiao", ov: [110, 470],
    desc: "시내에서 차로 이동하는 근교 스팟. 운하와 돌다리가 있는 수향 고진(古镇)과 전통 마을을 재생한 복합공간입니다. 반나절~하루 일정으로 따로 잡으세요.",
    map: {
      water: [{ d: "M 60 330 C 200 300, 300 360, 420 320", w: 14, label: "", lx: 0, ly: 0 }],
      roads: [{ d: "M 780 120 C 600 150, 420 200, 120 400", label: "시내 → 서쪽 근교", lx: 520, ly: 150, main: true }],
      pins: { "gs-existing-panlong-tiandi": [560, 190], "gs-existing-zhujiajiao": [330, 300], "gs-existing-wuzhen": [120, 400] },
      edge_notes: [{ x: 700, y: 100, t: "상하이 시내 →" }, { x: 120, y: 446, t: "↙ 저장성 (당일치기)" }],
    },
  },
];
