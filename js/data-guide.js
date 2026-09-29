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
//       "illustration" → ILLUSTRATION_NEEDED. 사용 가능한 실사가 없어 AI 일러스트로 교체할 대상.
//                        file 경로에 이미지를 넣고 ready: true 로 바꾸면 카드에 자동 반영됩니다.
//                        그 전까지는 기존 inline SVG placeholder를 그대로 유지합니다(교체 대상 표시).
// 브리프(장소 특징·비율·파일명)는 assets/guide/ILLUSTRATION_BRIEF.md 참고.
const GUIDE_IMAGE_MANIFEST = {
  // ---------- REAL PHOTO (Wikimedia Commons, 라이선스 확인 2026-09-29) ----------
  "gs-the-louis": { kind: "photo", commons: "The Louis, Louis Vuitton Flagship Store 20251128.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/The_Louis%2C_Louis_Vuitton_Flagship_Store_20251128.jpg/1280px-The_Louis%2C_Louis_Vuitton_Flagship_Store_20251128.jpg", credit: "Supanut Arunoprayote", license: "CC BY 4.0", alt: "The Louis, Louis Vuitton flagship ship-shaped building, Shanghai" },
  "gs-starbucks-reserve-roastery": { kind: "photo", commons: "Starbucks Reserve Roastery Shanghai 02.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Starbucks_Reserve_Roastery_Shanghai_02.jpg/1280px-Starbucks_Reserve_Roastery_Shanghai_02.jpg", credit: "Codas", license: "CC BY-SA 4.0", alt: "Interior of Starbucks Reserve Roastery Shanghai with the copper roasting cask" },
  "gs-the-stage": { kind: "photo", commons: "White Magnolia Plaza, view from Shangqiu road.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/White_Magnolia_Plaza%2C_view_from_Shangqiu_road.jpg/960px-White_Magnolia_Plaza%2C_view_from_Shangqiu_road.jpg", credit: "DmitryKvasov", license: "CC0", alt: "White Magnolia Plaza tower, North Bund — the building that houses The Stage observation deck", context: "WHITE MAGNOLIA PLAZA · EXTERIOR", focus: "50% 0%" },
  "gs-north-bund": { kind: "photo", commons: "The North Bund, Shanghai.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/The_North_Bund%2C_Shanghai.jpg/1280px-The_North_Bund%2C_Shanghai.jpg", credit: "钉钉", license: "CC BY-SA 4.0", alt: "North Bund riverside lawn with the Pudong skyline across the Huangpu River" },
  "gs-wukang-mansion": { kind: "photo", commons: "Wukang Mansion 20251128.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Wukang_Mansion_20251128.jpg/1280px-Wukang_Mansion_20251128.jpg", credit: "Supanut Arunoprayote", license: "CC BY 4.0", alt: "Wukang Mansion, Shanghai", focus: "50% 35%" },
  "gs-wukang-road": { kind: "photo", commons: "Wukang Road, Shanghai, May 2016.JPG", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Wukang_Road%2C_Shanghai%2C_May_2016.JPG/1280px-Wukang_Road%2C_Shanghai%2C_May_2016.JPG", credit: "SSYoung", license: "CC BY-SA 4.0", alt: "Tree-lined Wukang Road with low historic houses" },
  "gs-anfu-road": { kind: "photo", commons: "Anfulu 255 Hao Zhuzhai.JPG", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Anfulu_255_Hao_Zhuzhai.JPG/1280px-Anfulu_255_Hao_Zhuzhai.JPG", credit: "Fayhoo", license: "CC BY-SA 3.0", alt: "Historic residence at No. 255 Anfu Road under plane trees", context: "ANFU RD. NO.255" },
  "gs-columbia-circle": { kind: "photo", commons: "Columbia Country Club 06.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Columbia_Country_Club_06.jpg/1280px-Columbia_Country_Club_06.jpg", credit: "WQL", license: "CC BY-SA 4.0", alt: "The turquoise outdoor pool of the former Columbia Country Club at Columbia Circle" },
  "gs-andaz-itc": { kind: "photo", commons: "XuJiaHui-Complexe Shanghai ITC.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/XuJiaHui-Complexe_Shanghai_ITC.jpg/960px-XuJiaHui-Complexe_Shanghai_ITC.jpg", credit: "ShanghaiDream", license: "CC0", alt: "Shanghai ITC tower complex in Xujiahui, home of Andaz Shanghai ITC", context: "SHANGHAI ITC · EXTERIOR", focus: "50% 0%" },
  "gs-tian-an-1000-trees": { kind: "photo", commons: "1000 Trees 20251127.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/1000_Trees_20251127.jpg/1280px-1000_Trees_20251127.jpg", credit: "Supanut Arunoprayote", license: "CC BY 4.0", alt: "Tian An 1000 Trees, Shanghai", focus: "50% 40%" },
  "gs-existing-bund": { kind: "photo", commons: "Shanghai skyline from the bund.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Shanghai_skyline_from_the_bund.jpg/1280px-Shanghai_skyline_from_the_bund.jpg", credit: "", license: "CC0", alt: "Pudong skyline seen from the Bund, Shanghai" },
  "gs-existing-nanjing-east-road": { kind: "photo", commons: "2014.11.15.181406 Nanjing Road Pedestrian Zone Shanghai.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/2014.11.15.181406_Nanjing_Road_Pedestrian_Zone_Shanghai.jpg/1280px-2014.11.15.181406_Nanjing_Road_Pedestrian_Zone_Shanghai.jpg", credit: "Hermann Luyken", license: "CC0", alt: "Nanjing Road pedestrian street at night with neon signs" },
  "gs-existing-peoples-square": { kind: "photo", commons: "People's Square Shanghai November 2017 001.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/People%27s_Square_Shanghai_November_2017_001.jpg/1280px-People%27s_Square_Shanghai_November_2017_001.jpg", credit: "King of Hearts", license: "CC BY-SA 4.0", alt: "People's Square, Shanghai" },
  "gs-existing-oriental-pearl": { kind: "photo", commons: "ShanghaiPearlTower.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/ShanghaiPearlTower.jpg/960px-ShanghaiPearlTower.jpg", credit: "", license: "Public Domain", alt: "Oriental Pearl Tower, Shanghai", focus: "50% 30%" },
  "gs-existing-lujiazui": { kind: "photo", commons: "Shanghai Lujiazui night skyline 2017 - Flickr.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Shanghai_Lujiazui_night_skyline_2017_-_Flickr.jpg/1280px-Shanghai_Lujiazui_night_skyline_2017_-_Flickr.jpg", credit: "Larry Qian", license: "CC0", alt: "Lujiazui skyline at night across the Huangpu River" },
  "gs-existing-shanghai-tower": { kind: "photo", commons: "Shanghai Shanghai Tower 5166304.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Shanghai_Shanghai_Tower_5166304.jpg/960px-Shanghai_Shanghai_Tower_5166304.jpg", credit: "Ermell", license: "CC0", alt: "Twisting glass facade of Shanghai Tower", focus: "50% 25%" },
  "gs-existing-xintiandi": { kind: "photo", commons: "新天地 = New Heaven & Earth (6033629189).jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/%E6%96%B0%E5%A4%A9%E5%9C%B0_%3D_New_Heaven_%26_Earth_%286033629189%29.jpg/1280px-%E6%96%B0%E5%A4%A9%E5%9C%B0_%3D_New_Heaven_%26_Earth_%286033629189%29.jpg", credit: "Can Pac Swire", license: "CC BY-SA 2.0", alt: "Shikumen stone-gate houses in Xintiandi" },
  "gs-existing-tianzifang": { kind: "photo", commons: "Tianzifang 1.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Tianzifang_1.jpg/1280px-Tianzifang_1.jpg", credit: "钉钉", license: "CC BY-SA 4.0", alt: "Narrow shikumen lane lined with shops in Tianzifang" },
  "gs-existing-yuyuan": { kind: "photo", commons: "Yu Garden 1.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Yu_Garden_1.jpg/1280px-Yu_Garden_1.jpg", credit: "", license: "Public Domain", alt: "Yu Garden, Shanghai" },
  "gs-existing-jingan-temple": { kind: "photo", commons: "Jing'an temple.JPG", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Jing%27an_temple.JPG/1280px-Jing%27an_temple.JPG", credit: "J. Patrick Fischer", license: "CC BY-SA 3.0", alt: "Jing'an Temple, Shanghai" },
  "gs-existing-korean-provisional-govt": { kind: "photo", commons: "Entrance of Provisional Government of ROK in Shanghai.JPG", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Entrance_of_Provisional_Government_of_ROK_in_Shanghai.JPG/960px-Entrance_of_Provisional_Government_of_ROK_in_Shanghai.JPG", credit: "Ericmetro", license: "CC BY-SA 3.0", alt: "Entrance of the Site of the Provisional Government of the Republic of Korea in Shanghai", focus: "50% 45%" },
  "gs-existing-longhua": { kind: "photo", commons: "Longhua Pagoda, 2019-10-19 02.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Longhua_Pagoda%2C_2019-10-19_02.jpg/1280px-Longhua_Pagoda%2C_2019-10-19_02.jpg", credit: "Siyuwj", license: "CC BY-SA 4.0", alt: "Longhua Pagoda, Shanghai", focus: "50% 30%" },
  "gs-existing-m50": { kind: "photo", commons: "201703 M50 Creative Park.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/201703_M50_Creative_Park.jpg/1280px-201703_M50_Creative_Park.jpg", credit: "MNXANL", license: "CC BY-SA 4.0", alt: "M50 Creative Park on Moganshan Road" },
  "gs-existing-pudong-art-museum": { kind: "photo", commons: "Museum of Art Pudong from the Bund.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Museum_of_Art_Pudong_from_the_Bund.jpg/1280px-Museum_of_Art_Pudong_from_the_Bund.jpg", credit: "Simon Wade", license: "CC BY-SA 4.0", alt: "Museum of Art Pudong on the riverfront, seen from the Bund", context: "VIEW FROM THE BUND" },
  "gs-existing-xujiahui-library": { kind: "photo", commons: "徐家汇书院 08.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/%E5%BE%90%E5%AE%B6%E6%B1%87%E4%B9%A6%E9%99%A2_08.jpg/1280px-%E5%BE%90%E5%AE%B6%E6%B1%87%E4%B9%A6%E9%99%A2_08.jpg", credit: "Nanhuajiaren", license: "CC BY-SA 4.0", alt: "Reading hall interior of Xujiahui Library (徐家汇书院)" },
  "gs-existing-xujiahui-cathedral": { kind: "photo", commons: "Xujiahui Cathedral, 2019-10-19 04.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Xujiahui_Cathedral%2C_2019-10-19_04.jpg/1280px-Xujiahui_Cathedral%2C_2019-10-19_04.jpg", credit: "Siyuwj", license: "CC BY-SA 4.0", alt: "Red-brick Gothic facade of Xujiahui Cathedral" },
  "gs-existing-zhujiajiao": { kind: "photo", commons: "Zhujiajiao ancient water town, Nr. Shanghai, China - 1.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Zhujiajiao_ancient_water_town%2C_Nr._Shanghai%2C_China_-_1.jpg/1280px-Zhujiajiao_ancient_water_town%2C_Nr._Shanghai%2C_China_-_1.jpg", credit: "Lloyd Tudor", license: "CC BY-SA 4.0", alt: "Canal, stone bridge and traditional houses in Zhujiajiao water town" },
  "gs-existing-wuzhen": { kind: "photo", commons: "One of the waterways in Wuzhen Ancient Town.jpg", thumb: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/One_of_the_waterways_in_Wuzhen_Ancient_Town.jpg/1280px-One_of_the_waterways_in_Wuzhen_Ancient_Town.jpg", credit: "Wanderingchina", license: "CC BY 4.0", alt: "Aerial view of a waterway in Wuzhen Ancient Town" },

  // ---------- ILLUSTRATION_NEEDED (라이선스가 확인된 실사 없음 → AI 일러스트 교체 대상) ----------
  // 현재는 기존 inline SVG placeholder를 유지합니다. file에 16:10 이미지를 넣고 ready: true로 바꾸세요.
  "gs-henjiuyiqian-yangroushuan": { kind: "illustration", file: "assets/guide/illustrations/henjiuyiqian-yangroushuan.webp", ready: false },
  "gs-manner-coffee-guoke": { kind: "illustration", file: "assets/guide/illustrations/manner-coffee-guoke.webp", ready: false },
  "gs-13demarzo-cafe-anfu": { kind: "illustration", file: "assets/guide/illustrations/13demarzo-cafe-anfu.webp", ready: false },
  "gs-harmay-wukang": { kind: "illustration", file: "assets/guide/illustrations/harmay-wukang.webp", ready: false },
  "gs-photowith": { kind: "illustration", file: "assets/guide/illustrations/photowith.webp", ready: false },
  "gs-to-summer": { kind: "illustration", file: "assets/guide/illustrations/to-summer.webp", ready: false },
  "gs-tagi": { kind: "illustration", file: "assets/guide/illustrations/tagi.webp", ready: false },
  "gs-gathering": { kind: "illustration", file: "assets/guide/illustrations/gathering.webp", ready: false },
  "gs-pane-yongyuan": { kind: "illustration", file: "assets/guide/illustrations/pane-yongyuan.webp", ready: false },
  "gs-mondaysleepingclub": { kind: "illustration", file: "assets/guide/illustrations/mondaysleepingclub.webp", ready: false },
  "gs-tonton": { kind: "illustration", file: "assets/guide/illustrations/tonton.webp", ready: false },
  "gs-sanlifang-dirty": { kind: "illustration", file: "assets/guide/illustrations/sanlifang-dirty.webp", ready: false },
  "gs-renhe-guan": { kind: "illustration", file: "assets/guide/illustrations/renhe-guan.webp", ready: false },
  "gs-rooftop-bar-andaz": { kind: "illustration", file: "assets/guide/illustrations/rooftop-bar-andaz.webp", ready: false },
  "gs-dongge-andaz": { kind: "illustration", file: "assets/guide/illustrations/dongge-andaz.webp", ready: false },
  "gs-charlietown": { kind: "illustration", file: "assets/guide/illustrations/charlietown.webp", ready: false },
  "gs-qingzhi-handcream": { kind: "illustration", file: "assets/guide/illustrations/qingzhi-handcream.webp", ready: false },
  "gs-popmart": { kind: "illustration", file: "assets/guide/illustrations/popmart.webp", ready: false },
  "gs-miniso-land": { kind: "illustration", file: "assets/guide/illustrations/miniso-land.webp", ready: false },
  "gs-toptoy": { kind: "illustration", file: "assets/guide/illustrations/toptoy.webp", ready: false },
  "gs-shanghai-first-food-store": { kind: "illustration", file: "assets/guide/illustrations/shanghai-first-food-store.webp", ready: false },
  "gs-mms-shanghai": { kind: "illustration", file: "assets/guide/illustrations/mms-shanghai.webp", ready: false },
  "gs-monogram": { kind: "illustration", file: "assets/guide/illustrations/monogram.webp", ready: false },
  "gs-libaixie": { kind: "illustration", file: "assets/guide/illustrations/libaixie.webp", ready: false },
  "gs-hugongguan": { kind: "illustration", file: "assets/guide/illustrations/hugongguan.webp", ready: false },
  "gs-diandude": { kind: "illustration", file: "assets/guide/illustrations/diandude.webp", ready: false },
  "gs-feidachu": { kind: "illustration", file: "assets/guide/illustrations/feidachu.webp", ready: false },
  "gs-existing-panlong-tiandi": { kind: "illustration", file: "assets/guide/illustrations/panlong-tiandi.webp", ready: false },
};

// manifest → 기존 image 필드에 반영 (GUIDE_SPOTS 원본 항목은 그대로 두고 런타임에만 덮어씀)
GUIDE_SPOTS.forEach((s) => {
  const m = GUIDE_IMAGE_MANIFEST[s.id];
  s.image_kind = m ? m.kind : (s.image ? "photo" : "illustration");
  s.image_status = s.image_kind === "photo" ? "REAL_PHOTO" : "ILLUSTRATION_NEEDED";
  if (!m) return;
  if (m.kind === "photo") {
    const slug = s.id.replace(/^gs-(existing-)?/, "");
    s.image = m.thumb;
    s.image_local = "assets/guide/photos/" + slug + ".webp";
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
      pins: { "gs-existing-jingan-temple": [140, 260], "gs-the-louis": [540, 290], "gs-starbucks-reserve-roastery": [610, 300], "gs-henjiuyiqian-yangroushuan": [580, 170] },
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
