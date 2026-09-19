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
    note: "Michelin Guide 등재 상하이 요리점. (과거 자료의 '人管' 표기는 '人和馆'으로 교정)",
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
    note: "",
    aliases: ["페이다추", "고추고기볶음"],
  
    image_search_query: "费大厨辣椒炒肉 新天地店 上海",},

  // ---------- 기존 기본 관광지 (유지) ----------
  // 아래 19곳은 기존에 이미 저장되어 있던 장소이며, 검증되지 않은 candidate/TBD
  // 표현만 제거했습니다. area는 지명 자체가 속한 지역을 근거로 한 스케매틱
  // 지도용 근사 분류이며, 정확한 주소/영업시간은 표시하지 않습니다.
  { id: "gs-existing-bund", tab: "see", category: "SEE", area: "NANJING EAST · BUND", name: "The Bund", name_zh: "外滩", address: "", hours: "", note: "상하이를 대표하는 강변 산책로 · 야경 명소.", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Shanghai_skyline_from_the_bund.jpg/1280px-Shanghai_skyline_from_the_bund.jpg", image_alt: "Pudong skyline seen from the Bund, Shanghai", image_source_url: "https://commons.wikimedia.org/wiki/File:Shanghai_skyline_from_the_bund.jpg", image_credit: "", image_license: "CC0", image_search_query: "外滩 The Bund Shanghai"},
  { id: "gs-existing-nanjing-east-road", tab: "see", category: "SEE", area: "NANJING EAST · BUND", name: "Nanjing East Road", name_zh: "南京东路", address: "", hours: "", note: "와이탄과 이어지는 대표 쇼핑가.", image_search_query: "南京东路步行街 上海"},
  { id: "gs-existing-peoples-square", tab: "see", category: "SEE", area: "OTHER", name: "People's Square", name_zh: "人民广场", address: "", hours: "", note: "상하이 도심 중앙 광장 · 지하철 환승 거점.", image_search_query: "人民广场 People's Square Shanghai"},
  { id: "gs-existing-oriental-pearl", tab: "see", category: "SEE", area: "LUJIAZUI", name: "Oriental Pearl Tower", name_zh: "东方明珠", address: "", hours: "", note: "푸동 스카이라인의 상징적인 전망 타워.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/ShanghaiPearlTower.jpg/960px-ShanghaiPearlTower.jpg", image_alt: "Oriental Pearl Tower, Shanghai", image_source_url: "https://commons.wikimedia.org/wiki/File:ShanghaiPearlTower.jpg", image_credit: "", image_license: "Public Domain", image_search_query: "东方明珠 Oriental Pearl Tower Shanghai"},
  { id: "gs-existing-lujiazui", tab: "see", category: "SEE", area: "LUJIAZUI", name: "Lujiazui", name_zh: "陆家嘴", address: "", hours: "", note: "상하이 금융 중심지 · 초고층 스카이라인 지역.", image_search_query: "陆家嘴 Lujiazui skyline Shanghai"},
  { id: "gs-existing-shanghai-tower", tab: "see", category: "SEE", area: "LUJIAZUI", name: "Shanghai Tower", name_zh: "上海中心大厦", address: "", hours: "", note: "중국에서 가장 높은 초고층 빌딩.", image_search_query: "上海中心大厦 Shanghai Tower"},
  { id: "gs-existing-xintiandi", tab: "see", category: "SEE", area: "XINTIANDI", name: "Xintiandi", name_zh: "新天地", address: "", hours: "", note: "스쿠먼(石库门) 골목을 재개발한 상업지구.", image_search_query: "新天地 Xintiandi Shanghai"},
  { id: "gs-existing-tianzifang", tab: "see", category: "SEE", area: "XINTIANDI", name: "Tianzifang", name_zh: "田子坊", address: "", hours: "", note: "좁은 골목 사이 공방·카페·편집숍이 모인 구역.", image_search_query: "田子坊 Tianzifang Shanghai"},
  { id: "gs-existing-yuyuan", tab: "see", category: "SEE", area: "OTHER", name: "Yuyuan Garden", name_zh: "豫园", address: "", hours: "", note: "전통 정원과 주변 상가(예원상성)를 함께 둘러볼 수 있음.", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Yu_Garden_1.jpg/1280px-Yu_Garden_1.jpg", image_alt: "Yu Garden, Shanghai", image_source_url: "https://commons.wikimedia.org/wiki/File:Yu_Garden_1.jpg", image_credit: "", image_license: "Public Domain", image_search_query: "豫园 Yu Garden Shanghai"},
  { id: "gs-existing-jingan-temple", tab: "see", category: "SEE", area: "NANJING WEST · JING'AN", name: "Jing'an Temple", name_zh: "静安寺", address: "", hours: "", note: "난징시루 인근의 대표 사찰.", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Jing%27an_temple.JPG/1280px-Jing%27an_temple.JPG", image_alt: "Jing'an Temple, Shanghai", image_source_url: "https://commons.wikimedia.org/wiki/File:Jing%27an_temple.JPG", image_credit: "Photo: J. Patrick Fischer", image_license: "CC BY-SA 3.0", image_search_query: "静安寺 Jing'an Temple Shanghai"},
  { id: "gs-existing-korean-provisional-govt", tab: "see", category: "SEE", area: "XINTIANDI", name: "Site of the Provisional Government of the Republic of Korea", name_zh: "大韩民国临时政府旧址", address: "", hours: "", note: "신천지 인근의 대한민국 임시정부 관련 유적.", image_search_query: "大韩民国临时政府旧址 上海"},
  { id: "gs-existing-longhua", tab: "see", category: "SEE", area: "OTHER", name: "Longhua Temple / Longhua Pagoda", name_zh: "龙华寺 / 龙华塔", address: "", hours: "", note: "상하이에서 가장 오래된 사찰·탑 중 하나.", image_search_query: "龙华寺 龙华塔 上海"},
  { id: "gs-existing-m50", tab: "see", category: "SEE", area: "OTHER", name: "M50", name_zh: "M50", address: "", hours: "", note: "옛 방직공장을 개조한 현대미술 갤러리 단지.", image_search_query: "M50 创意园 上海"},
  { id: "gs-existing-pudong-art-museum", tab: "see", category: "SEE", area: "LUJIAZUI", name: "Pudong Museum of Art", name_zh: "浦东美术馆", address: "", hours: "", note: "와이탄 건너편 강변에 위치한 미술관.", image_search_query: "浦东美术馆 上海"},
  { id: "gs-existing-xujiahui-library", tab: "see", category: "SEE", area: "YONGKANG · XUHUI", name: "Xujiahui Library", name_zh: "徐家汇书院", address: "", hours: "", note: "徐家汇 지역의 대표 도서관·복합문화공간.", image_search_query: "徐家汇书院 上海"},
  { id: "gs-existing-xujiahui-cathedral", tab: "see", category: "SEE", area: "YONGKANG · XUHUI", name: "Xujiahui Cathedral (St. Ignatius Cathedral)", name_zh: "徐家汇天主教堂", address: "", hours: "", note: "쉬자후이의 대표 성당 건축물.", image_search_query: "徐家汇天主教堂 上海"},
  { id: "gs-existing-zhujiajiao", tab: "see", category: "SEE", area: "OTHER", name: "Zhujiajiao Water Town", name_zh: "朱家角", address: "", hours: "", note: "상하이 외곽의 수향(水乡) 고진(古镇).", image_search_query: "朱家角古镇 上海"},
  { id: "gs-existing-wuzhen", tab: "see", category: "SEE", area: "OTHER", name: "Wuzhen Water Town", name_zh: "乌镇", address: "", hours: "", note: "장쑤·저장 지역의 대표 수향 고진.", image_search_query: "乌镇 Wuzhen Water Town"},
  { id: "gs-existing-panlong-tiandi", tab: "see", category: "SEE", area: "OTHER", name: "Panlong Tiandi", name_zh: "蟠龙天地", address: "", hours: "", note: "장강 삼각주 전통 마을을 재생한 복합공간.", image_search_query: "蟠龙天地 上海"},
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
