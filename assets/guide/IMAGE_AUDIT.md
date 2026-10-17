# Shanghai Guide — 이미지 audit (v0.8, 2026-09-29)

대상: `js/data-guide.js`의 GUIDE_SPOTS 56곳 전체 (삭제·이름 변경 없음). 실사는 Wikimedia Commons API로 저작자·라이선스를 직접 확인한 것만 사용했습니다.

**요약 (v0.11.3, 2026-10-17):** REAL PHOTO 31곳 · **AI IMAGE 25곳** · ILLUSTRATION_NEEDED 0곳 · INFO CARD 0곳 — **56곳 전체 이미지 확보**

> v0.11.3 변경: 남은 15곳에 장소별 단독 생성 AI 콘셉트 이미지 적용(콜라주 크롭·업스케일 아님). 업종·상품·입점 형태와 글자·간판·로고·실제 캐릭터 여부를 검토해 통과한 것만 연결.
>
> v0.11.2 변경: 실사를 구할 수 없는 10곳에 AI 생성 콘셉트 이미지 적용(카드에 "AI 이미지 · 실제 사진 아님" 표시). 업종·장면·입점 형태·브리프 조건을 검토해 통과한 것만 연결했고, 나머지 15곳은 기존 SVG placeholder 유지.

> v0.11.1 변경: M&M'S 上海 · 上海第一食品商店 · 沪公馆(건물 외관) 실사 추가, 외탄 사진 교체(출처 불명 → CC0). 출처표는 [README.md](README.md) 하단 참고.
> (v0.8 기준: REAL PHOTO 28곳 · ILLUSTRATION_NEEDED 28곳)

## 와이탄 · 난징동루 · 예원 (BUND · NANJING EAST · YUYUAN) — 13곳

| 장소명 | 현재 이미지 (변경 전) | 실사 확보 | 최종 권장 방식 | Google Images 검색어 | 비고 |
|---|---|---|---|---|---|
| 青稚护手霜（上海南京东路店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/qingzhi-handcream.webp) | `青稚护手霜（上海南京东路店） Shanghai` | 매장 실사 라이선스 없음 |
| POP MART 泡泡玛特全球旗舰店 | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/popmart.webp) | `POP MART 泡泡玛特全球旗舰店 Shanghai` | 매장 실사 라이선스 없음 · 캐릭터 IP |
| MINISO LAND / 名创优品全球壹号店 | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/miniso-land.webp) | `MINISO LAND 名创优品全球壹号店 Shanghai` | 매장 실사 라이선스 없음 · 캐릭터 IP · v0.11.1: Flickr CC BY-NC 2.0 입구 사진(2024-12) 확인했으나 비상업 조건 판단 보류로 미적용 |
| TOP TOY 上海全球旗舰店 | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/toptoy.webp) | `TOP TOY 上海全球旗舰店 Shanghai` | 매장 실사 라이선스 없음 · 캐릭터 IP |
| 上海第一食品商店 | SVG 선아이콘 placeholder | 가능 — CC0 · Suicasmo (2025-05-01) | **REAL PHOTO** (v0.11.1, 매장 외관) | `上海第一食品商店 Shanghai` | Commons: Shanghai First Foodhall 20250501.jpg · repo 사본 photos/shanghai-first-food-store.webp |
| M&M'S 上海 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · Mepatm (2018-09-16) | **REAL PHOTO** (v0.11.1, 매장 정면) | `M&M'S 上海 Shanghai` | Commons: Shanghai M&M'S Facade.jpg · 2026-04 사진으로 현재 외관 동일 확인 · repo 사본 photos/mms-shanghai.webp |
| monogram 墨格（上海世茂广场店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/monogram.webp) | `monogram 墨格（上海世茂广场店） Shanghai` | 매장 실사 라이선스 없음 · v0.11.1: 世茂广场 CC0 사진은 M&M'S 정면이 주로 보여 미적용 |
| 李百蟹·蟹黄面·江景餐厅（外滩·豫园店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/libaixie.webp) | `李百蟹·蟹黄面·江景餐厅（外滩·豫园店） Shanghai` | 매장 실사 라이선스 없음 · v0.11.1: 외탄 22호 건물 사진은 沪公馆에만 사용(반복 방지) |
| Hu Gong Guan / 沪公馆·上海菜（外滩豫园店） | SVG 선아이콘 placeholder | 가능 — CC BY-SA 3.0 · Fayhoo (입점 건물) | **REAL PHOTO** (v0.11.1, 건물 외관 · 外滩22号) | `Hu Gong Guan 沪公馆·上海菜（外滩豫园店） Shanghai` | Commons: Butterfield & Swire.jpg (太古洋行旧址 中山东二路22号) · repo 사본 photos/hugongguan.webp |
| The Bund / 外滩 | Commons 실사 (hotlink) — 출처 불명(pxfuel) | 가능 — CC0 · DvTor8303 (2026-04-17) | **REAL PHOTO** (v0.11.1 교체) | `The Bund 外滩 Shanghai` | Commons: HSBC Building and Custom House, Shanghai at night 20260417.jpg · repo 사본 photos/bund.webp · 기존 Shanghai skyline from the bund.jpg 는 출처·저작자가 pxfuel 주소뿐이라 교체 |
| Nanjing East Road / 南京东路 | SVG 선아이콘 placeholder | 가능 — CC0 · Hermann Luyken | **REAL PHOTO** | `Nanjing East Road 南京东路 Shanghai` | Commons: 2014.11.15.181406 Nanjing Road Pedestrian Zone Shanghai.jpg |
| People's Square / 人民广场 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · King of Hearts | **REAL PHOTO** | `People's Square 人民广场 Shanghai` | Commons: People's Square Shanghai November 2017 001.jpg |
| Yuyuan Garden / 豫园 | Commons 실사 (hotlink) | 가능 — Public Domain | **REAL PHOTO** | `Yuyuan Garden 豫园 Shanghai` | Commons: Yu Garden 1.jpg |

## 북와이탄 (NORTH BUND) — 3곳

| 장소명 | 현재 이미지 (변경 전) | 실사 확보 | 최종 권장 방식 | Google Images 검색어 | 비고 |
|---|---|---|---|---|---|
| The Stage 白玉兰观景台 | Commons 실사 (hotlink) | 가능 — CC0 · DmitryKvasov | **REAL PHOTO** | `The Stage 白玉兰观景台 Shanghai` | Commons: White Magnolia Plaza, view from Shangqiu road.jpg · 라벨 "WHITE MAGNOLIA PLAZA · EXTERIOR" · 기존 사진 498px 저해상도 → 교체 |
| Manner Coffee（国客滨江店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/manner-coffee-guoke.webp) | `Manner Coffee（国客滨江店） Shanghai` | 매장 실사 라이선스 없음 |
| North Bund / 北外滩滨江 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · 钉钉 | **REAL PHOTO** | `North Bund 北外滩滨江 Shanghai` | Commons: The North Bund, Shanghai.jpg |

## 푸동 · 루자쭈이 (PUDONG · LUJIAZUI) — 4곳

| 장소명 | 현재 이미지 (변경 전) | 실사 확보 | 최종 권장 방식 | Google Images 검색어 | 비고 |
|---|---|---|---|---|---|
| Oriental Pearl Tower / 东方明珠 | Commons 실사 (hotlink) | 가능 — Public Domain | **REAL PHOTO** | `Oriental Pearl Tower 东方明珠 Shanghai` | Commons: ShanghaiPearlTower.jpg |
| Lujiazui / 陆家嘴 | SVG 선아이콘 placeholder | 가능 — CC0 · Larry Qian | **REAL PHOTO** | `Lujiazui 陆家嘴 Shanghai` | Commons: Shanghai Lujiazui night skyline 2017 - Flickr.jpg |
| Shanghai Tower / 上海中心大厦 | SVG 선아이콘 placeholder | 가능 — CC0 · Ermell | **REAL PHOTO** | `Shanghai Tower 上海中心大厦` | Commons: Shanghai Shanghai Tower 5166304.jpg |
| Pudong Museum of Art / 浦东美术馆 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · Simon Wade | **REAL PHOTO** | `Pudong Museum of Art 浦东美术馆 Shanghai` | Commons: Museum of Art Pudong from the Bund.jpg · 라벨 "VIEW FROM THE BUND" |

## 신천지 · 티엔즈팡 (XINTIANDI · TIANZIFANG) — 5곳

| 장소명 | 현재 이미지 (변경 전) | 실사 확보 | 최종 권장 방식 | Google Images 검색어 | 비고 |
|---|---|---|---|---|---|
| 点都德（中海环宇荟店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/diandude.webp) | `点都德（中海环宇荟店） Shanghai` | 매장 실사 라이선스 없음 · v0.11.1: 中海环宇荟 사무동 사진은 B1 식당을 설명하지 못해 미적용 |
| 费大厨辣椒炒肉（新天地店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/feidachu.webp) | `费大厨辣椒炒肉（新天地店） Shanghai` | 매장 실사 라이선스 없음 |
| Xintiandi / 新天地 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 2.0 · Can Pac Swire | **REAL PHOTO** | `Xintiandi 新天地 Shanghai` | Commons: 新天地 = New Heaven & Earth (6033629189).jpg |
| Tianzifang / 田子坊 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · 钉钉 | **REAL PHOTO** | `Tianzifang 田子坊 Shanghai` | Commons: Tianzifang 1.jpg |
| Site of the Provisional Government of the Republic of Korea / 大韩民国临时政府旧址 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 3.0 · Ericmetro | **REAL PHOTO** | `Site of the Provisional Government of the Republic of Korea 大韩民国临时政府旧址 Shanghai` | Commons: Entrance of Provisional Government of ROK in Shanghai.JPG |

## 난징시루 · 정안 (NANJING WEST · JING'AN) — 4곳

| 장소명 | 현재 이미지 (변경 전) | 실사 확보 | 최종 권장 방식 | Google Images 검색어 | 비고 |
|---|---|---|---|---|---|
| The Louis / 路易号 | Commons 실사 (hotlink) | 가능 — CC BY 4.0 · Supanut Arunoprayote | **REAL PHOTO** | `The Louis 路易号 Shanghai` | Commons: The Louis, Louis Vuitton Flagship Store 20251128.jpg |
| Starbucks Reserve Shanghai Roastery | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · Codas | **REAL PHOTO** | `星巴克臻选上海烘焙工坊 Starbucks Reserve Roastery Shanghai 南京西路789号` | Commons: Starbucks Reserve Roastery Shanghai 02.jpg |
| 很久以前羊肉串（南京西路818广场店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/henjiuyiqian-yangroushuan.webp) | `很久以前羊肉串（南京西路818广场店） Shanghai` | 체인 매장 — Commons에 해당 지점 사진 없음 |
| Jing'an Temple / 静安寺 | Commons 실사 (hotlink) | 가능 — CC BY-SA 3.0 · J. Patrick Fischer | **REAL PHOTO** | `Jing'an Temple 静安寺 Shanghai` | Commons: Jing'an temple.JPG |

## 우캉루 · 안푸루 (WUKANG · ANFU) — 12곳

| 장소명 | 현재 이미지 (변경 전) | 실사 확보 | 최종 권장 방식 | Google Images 검색어 | 비고 |
|---|---|---|---|---|---|
| 13DE MARZO CAFÉ（上海安福路店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/13demarzo-cafe-anfu.webp) | `13DE MARZO CAFÉ（上海安福路店） Shanghai` | 매장 실사 라이선스 없음 |
| HARMAY 上海武康路店 | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/harmay-wukang.webp) | `HARMAY 上海武康路店 Shanghai` | 매장 실사 라이선스 없음 |
| PHOTOWITH 自助照相馆 | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/photowith.webp) | `PHOTOWITH 自助照相馆 Shanghai` | 매장 실사 라이선스 없음 |
| To Summer / 观夏闲庭 | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/to-summer.webp) | `To Summer 观夏闲庭 Shanghai` | 매장 실사 라이선스 없음 |
| TAGI.（乌鲁木齐中路店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/tagi.webp) | `TAGI.（乌鲁木齐中路店） Shanghai` | 매장 실사 라이선스 없음 |
| 集雅 GATHERING（乌鲁木齐中路店） / 集雅（乌鲁木齐中路店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/gathering.webp) | `GATHERING 集雅（乌鲁木齐中路店） Shanghai` | 매장 실사 라이선스 없음 |
| PANE 永源路店 | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/pane-yongyuan.webp) | `PANE 永源路店 Shanghai` | 매장 실사 라이선스 없음 |
| MondaySleepingClub / 周一睡觉俱乐部 | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/mondaysleepingclub.webp) | `MondaySleepingClub 周一睡觉俱乐部 Shanghai` | 매장 실사 라이선스 없음 |
| Wukang Mansion / 武康大楼 | Commons 실사 (hotlink) | 가능 — CC BY 4.0 · Supanut Arunoprayote | **REAL PHOTO** | `Wukang Mansion 武康大楼 Shanghai` | Commons: Wukang Mansion 20251128.jpg |
| Wukang Road / 武康路 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · SSYoung | **REAL PHOTO** | `Wukang Road 武康路 Shanghai` | Commons: Wukang Road, Shanghai, May 2016.JPG |
| Anfu Road / 安福路 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 3.0 · Fayhoo | **REAL PHOTO** | `Anfu Road 安福路 Shanghai` | Commons: Anfulu 255 Hao Zhuzhai.JPG · 라벨 "ANFU RD. NO.255" |
| Columbia Circle / 上生·新所 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · WQL | **REAL PHOTO** | `Columbia Circle 上生·新所 Shanghai` | Commons: Columbia Country Club 06.jpg |

## 융캉루 · 쉬자후이 · 룽화 (YONGKANG · XUHUI · LONGHUA) — 9곳

| 장소명 | 현재 이미지 (변경 전) | 실사 확보 | 최종 권장 방식 | Google Images 검색어 | 비고 |
|---|---|---|---|---|---|
| TonTon | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/tonton.webp) | `TonTon Shanghai` | 매장 실사 라이선스 없음 |
| 三立方 × Mahlkönig Dirty | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/sanlifang-dirty.webp) | `Mahlkönig Dirty 三立方 Shanghai` | 매장 실사 라이선스 없음 |
| 人和馆·上海菜（徐汇店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/renhe-guan.webp) | `人和馆·上海菜（徐汇店） Shanghai` | 매장 실사 라이선스 없음 |
| Andaz Shanghai ITC / 上海徐家汇中心安达仕酒店 | SVG 선아이콘 placeholder | 가능 — CC0 · ShanghaiDream | **REAL PHOTO** | `Andaz Shanghai ITC 上海徐家汇中心安达仕酒店` | Commons: XuJiaHui-Complexe Shanghai ITC.jpg · 라벨 "SHANGHAI ITC · EXTERIOR" |
| The Rooftop Bar — Andaz Shanghai ITC | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/rooftop-bar-andaz.webp) | `The Rooftop Bar Andaz Shanghai ITC 徐家汇 上海` | 매장 실사 라이선스 없음 |
| 东阁 — Andaz Shanghai ITC | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/dongge-andaz.webp) | `Andaz Shanghai ITC 东阁` | 매장 실사 라이선스 없음 |
| Longhua Temple / Longhua Pagoda / 龙华寺 / 龙华塔 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · Siyuwj | **REAL PHOTO** | `Longhua Temple 龙华寺 / 龙华塔 Shanghai` | Commons: Longhua Pagoda, 2019-10-19 02.jpg |
| Xujiahui Library / 徐家汇书院 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · Nanhuajiaren | **REAL PHOTO** | `Xujiahui Library 徐家汇书院 Shanghai` | Commons: 徐家汇书院 08.jpg |
| Xujiahui Cathedral (St. Ignatius Cathedral) / 徐家汇天主教堂 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · Siyuwj | **REAL PHOTO** | `Xujiahui Cathedral 徐家汇天主教堂 Shanghai` | Commons: Xujiahui Cathedral, 2019-10-19 04.jpg |

## 천수 · M50 (1000 TREES · M50) — 3곳

| 장소명 | 현재 이미지 (변경 전) | 실사 확보 | 최종 권장 방식 | Google Images 검색어 | 비고 |
|---|---|---|---|---|---|
| Tian An 1000 Trees / 天安千树 | Commons 실사 (hotlink) | 가능 — CC BY 4.0 · Supanut Arunoprayote | **REAL PHOTO** | `Tian An 1000 Trees 天安千树 Shanghai` | Commons: 1000 Trees 20251127.jpg |
| CHARLIETOWN 红茶公司（天安千树店） | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.3 · 실제 사진 아님 · illustrations/charlietown.webp) | `CHARLIETOWN 红茶公司（天安千树店） Shanghai` | 매장 실사 라이선스 없음 |
| M50 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · MNXANL | **REAL PHOTO** | `M50 Shanghai` | Commons: 201703 M50 Creative Park.jpg |

## 근교 · 수향마을 (DAY TRIPS · WATER TOWNS) — 3곳

| 장소명 | 현재 이미지 (변경 전) | 실사 확보 | 최종 권장 방식 | Google Images 검색어 | 비고 |
|---|---|---|---|---|---|
| Zhujiajiao Water Town / 朱家角 | SVG 선아이콘 placeholder | 가능 — CC BY-SA 4.0 · Lloyd Tudor | **REAL PHOTO** | `Zhujiajiao Water Town 朱家角 Shanghai` | Commons: Zhujiajiao ancient water town, Nr. Shanghai, China - 1.jpg |
| Wuzhen Water Town / 乌镇 | SVG 선아이콘 placeholder | 가능 — CC BY 4.0 · Wanderingchina | **REAL PHOTO** | `Wuzhen Water Town 乌镇 Shanghai` | Commons: One of the waterways in Wuzhen Ancient Town.jpg |
| Panlong Tiandi / 蟠龙天地 | SVG 선아이콘 placeholder | 불가 (재사용 가능한 실사 없음) | **AI IMAGE** (v0.11.2 · 실제 사진 아님 · illustrations/panlong-tiandi.webp) | `Panlong Tiandi 蟠龙天地 Shanghai` | Commons 검색 결과 없음 |

## 요청 목록에 있었지만 현재 guide.html 데이터에 없는 장소

- **Prada Rong Zhai** — `GUIDE_RESEARCH_NOTES_EXTENDED`에 "Mi Shang Prada Rong Zhai"로만 보존(화면 비노출). 주소·중국어명 미검증이라 카드로 만들지 않았습니다.
- **一尺花园**, **朱光玉火锅馆**, **塔影空间** — guide.html/data-guide.js 어디에도 없습니다. 카드로 추가하려면 중국어명·주소를 확인해 주세요.
