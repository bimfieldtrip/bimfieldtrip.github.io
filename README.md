# Shanghai Field Trip Hub — v0.7.5 · Shanghai Guide Illustration System

KAIST BIM Shanghai Field Trip(2026.12.27~12.31)을 위한 **공개 여행 안내 허브**입니다.
"상하이에서 무엇을 하고, 무엇을 준비하고, 어디를 볼 수 있는가"에만 집중하며, 실제 참가자 운영
(체크인·버스 탑승·룸 배정·택시팀·정산 등)은 별도의 Private Participant Portal에서 처리합니다.

## 🎨 v0.7.5 — Guide 카드 일러스트 시스템 + v0.7.4 데이터 보존

사진이 없는 카드의 placeholder를 "6개 타입 × 여러 변형(총 30종)" 일러스트 시스템으로 교체했습니다. 사진이 있는
카드는 그대로입니다. 모든 일러스트는 외부 파일 없이 `guide.html` 안의 inline SVG이며, 공통 아치 프레임 ·
같은 선 굵기 · 화이트/네이비/연한 블루 팔레트를 공유해 같은 시리즈처럼 보입니다.

| 타입 | 자동 적용 조건 (기존 필드만 읽음) | 변형(모티프) |
| --- | --- | --- |
| `see` | `tab: "see"` | skyline · map · street · watertown · temple · building · camera |
| `cafe` | `tab: "eat"` + `eatType: "cafe"` 또는 `"dessert"` | cup · teapot · cake · togo |
| `eat` | `tab: "eat"` + `eatType: "restaurant"` | table · bowl · steamer · skewer · wok |
| `shop` | `tab: "shop"` (category에 SOUVENIR/FOOD/GIFT가 없을 때) | bag · hanger · perfume · shelf · blindbox |
| `gift` | `tab: "shop"` + category에 `SOUVENIR` / `FOOD` / `GIFT` 포함 | box · snack · tote · postcard |
| `view` | `tab: "see"` + 이름/keywords에 night view·rooftop·observation·北外滩 등, 또는 `eatType: "bar"` | night · river · deck · rooftop |

**새 장소를 추가할 때**: `GUIDE_SPOTS`에 지금처럼 `tab`(+ 먹거리면 `eatType`)과 `category`만 맞게 넣으면 타입이
자동으로 정해집니다. 변형은 이름·중국어명·keywords·signature·aliases의 키워드(예: `羊肉串`→skewer, `茶`→teapot,
`点心`→steamer, `Water Town`→watertown)로 고르고, 매칭되는 키워드가 없으면 그 타입의 "중립" 변형 중에서 spot id
해시로 골라 카드마다 조금씩 다르게 보입니다. 원하는 모티프를 직접 고르고 싶으면 spot에 선택 필드
`illustration: "cafe"` 또는 `illustration: "eat:steamer"`를 추가하면 됩니다(필수 아님).
새 모티프를 만들려면 `guide.html`의 `GUIDE_ILLUSTRATIONS`에 `{ label, art }` 한 항목을 추가하고,
필요하면 `guideIllustrationFor()`에 키워드 한 줄을 추가하세요.

## 🔎 v0.7.3 — 사진 없는 카드 정리 + Google 이미지 검색 연결 (Guide만 수정)

- 사진이 없는 모든 카드에 카테고리별 inline SVG 일러스트 placeholder(스카이라인/지도/카메라/쇼핑백/선물상자/
  접시·포크/컵/케이크/칵테일)와 옅은 패턴 배경을 적용 — 외부 이미지 파일 없음
- 상단 hero 영역 전체(카드 전체 아님)가 새 탭 Google 이미지 검색으로 연결
  (`https://www.google.com/search?tbm=isch&q=<encodeURIComponent(query)>`, `target="_blank" rel="noopener noreferrer"`),
  우상단에 작은 `PHOTOS ↗` 배지
- `data-guide.js`에 optional 필드 `image_search_query` 추가(56곳 모두 채움). 비어 있으면 `guide.html`이
  (1) 중국어명 + 上海 → (2) 영문명 + Shanghai 순으로 자동 생성
- 실제 사진이 있는 카드도 같은 hero 링크를 가지며, 사진 파일이 없거나 로드 실패 시 일러스트 placeholder로 자동 복귀
- Google 이미지 자체는 다운로드/저장하지 않습니다. Instagram 기능 없음. HOME/SCHEDULE/PREP/MY TRIP/Apps Script 미수정.

## 🖼 v0.7.2 — Shanghai Guide 이미지 레이어 (이 라운드에서 바뀐 것)

Guide의 **이미지 레이어만** 고쳤습니다. Guide 데이터·카드 구조·검색·지도·Apps Script 연결과
HOME/SCHEDULE/PREP/MY TRIP은 건드리지 않았습니다.

- 재사용 라이선스가 명확한 Wikimedia Commons 랜드마크 8곳(The Louis, The Stage(White Magnolia
  Plaza 외관), Wukang Mansion, 1000 Trees, The Bund, Oriental Pearl, Yu Garden, Jing'an Temple)에
  `image` / `image_alt` / `image_source_url` / `image_credit` / `image_license`(+선택 `image_context`)를 연결
- 카드 사진 우하단에 작은 `Photo: Author · License` 크레딧(누르면 Commons file page가 새 탭). CC0 /
  Public Domain은 라이선스명만 표시. `image_context`가 있으면 좌상단에 라벨 표시
  (The Stage → `WHITE MAGNOLIA PLAZA · EXTERIOR`, 지역 사진이면 `AREA VIEW`)
- 이미지 파일이 없거나 로드 실패 시 깨진 이미지 대신 기존 category placeholder로 자동 복귀
- 상업 매장(카페/식당/편집숍/팝마트 등)은 SNS·블로그·검색 이미지를 쓰지 않고 placeholder 유지
- 사진 파일은 `assets/guide/`에 두며(웹용 1200~1600px, 가능하면 500KB 이하), 원본 Commons 파일은 수정하지 않고
  리사이즈한 derivative만 저장합니다. 필요한 파일명은 `assets/guide/README.md` 참고.

v0.7.1은 **v0.7 "Shanghai Guide FINAL"의 QA/보완 라운드**입니다. Shanghai Guide 화면·데이터만
고쳤고, HOME · SCHEDULE · PREP · MY TRIP과 Apps Script 연결은 이번 라운드에서도 건드리지
않았습니다. 이번 라운드에서 바뀐 것:

- 한국어 별칭(`aliases[]`) 검색 지원 — "양꼬치", "곰돌이", "팝마트" 같은 실제 검색어로도 찾아짐
- 高德地图 링크를 `uri.amap.com/search` URI API 방식으로 교체 (API key 없이 PC 웹검색 + 모바일
  앱 실행 시도)
- COPY 버튼을 COPY NAME(중국어명) / COPY ADDRESS(주소)로 분리
- `guide.html#spot=<id>` 딥링크 지원 (특정 카드로 바로 스크롤 + 하이라이트) — Guide 쪽만 준비,
  Schedule에서 실제로 연결하는 것은 다음 라운드 과제
- Guide 카드 사진 placeholder를 카테고리(SEE/CAFE/RESTAURANT/DESSERT/SHOP/BAR)별로 구분되는
  톤/아이콘으로 개선, `image`/`image_alt`/`image_source_url`/`image_credit` 필드 구조 추가(전부
  빈 값 — 실제 사진 없음)
- compaction 과정에서 누락됐던 사용자의 기존 수집 장소 33곳을 `GUIDE_RESEARCH_NOTES_EXTENDED`에
  원문 그대로 보존(화면 미노출)
- Guide 상단 DEMO strip 문구를 "FIELD GUIDE · Information Reference"로 교체 (다른 페이지의
  DEMO MODE strip은 그대로 유지)
- README를 현재 구조(Guide/Schedule 데이터 분리)에 맞게 정리

v0.7 "Shanghai Guide FINAL"에서 이미 만들어진 것 (이번 라운드에서 유지):

- Shanghai Guide를 SEE / EAT / SHOP / SOUVENIRS / MAP 5탭 구조로 개편
- Guide 전용 독립 데이터 파일 `js/data-guide.js` 도입 (`js/data-trip.js`와 완전 분리)
- AREA 공유 필터(8개 클러스터 + OTHER), EAT 내부 필터(RESTAURANT/CAFE/DESSERT/BAR)
- CANDIDATE/후보/SAMPLE/TBD/VERIFY/NOT CONFIRMED 같은 "일정 확정 여부" 표현을 Guide 화면에서
  전부 제거 (Guide는 일정관리 페이지가 아니라 정보공유형 가이드)

## 🗂 Shanghai Guide와 Schedule — 데이터가 분리되어 있습니다

이 프로젝트는 이제 **두 개의 서로 다른 데이터 도메인**을 가집니다. 하나를 고친다고 다른 하나가
바뀌지 않으니, 어디를 고쳐야 할지 헷갈리지 마세요.

| | Schedule (+ Home, Prep) | Shanghai Guide |
| --- | --- | --- |
| 데이터 파일 | `js/data-trip.js` | `js/data-guide.js` (완전 독립) |
| 성격 | 이번 Field Trip의 **일정** — 날짜·집합시간·방문기관·SAMPLE 저녁식사 | 상하이의 **정보 라이브러리** — 언제든 참고할 수 있는 볼거리/먹거리/쇼핑/기념품 |
| 상태 표현 | `confirmed`/`candidate`/`tbd`/`demo`/`sample` 배지를 계속 사용 (일정이 아직 확정 전이라는 뜻이므로 의도적으로 유지) | CANDIDATE/후보/SAMPLE/TBD/VERIFY/NOT CONFIRMED 같은 "확정 여부" 표현을 쓰지 않음 |
| 주요 배열 | `ITINERARY`, `PLACES`, `ORGS`, `SAMPLE_DINNERS`, `FOOD_ITEMS`, `RESTAURANTS`, `SOUVENIR_ITEMS`, `PREP` | `GUIDE_SPOTS`(55곳), `GUIDE_SOUVENIRS`(33개 품목), `GUIDE_RESEARCH_NOTES` + `GUIDE_RESEARCH_NOTES_EXTENDED`(미검증 장소, 화면에 렌더링하지 않음) |
| 화면 | `index.html`, `itinerary.html`, `prep.html` | `guide.html` (SEE/EAT/SHOP/SOUVENIRS/MAP) |

`SOUVENIR_ITEMS[]`(data-trip.js)는 v0.6.1 당시 사용자 위시리스트를 옮겨둔 레거시 배열로, 이제
어떤 화면도 읽지 않습니다(더 이상 수정하지 말라는 지시에 따라 그대로 남겨둠). 현재 화면에 보이는
기념품은 전부 `js/data-guide.js`의 `GUIDE_SOUVENIRS`입니다.

**실제 일정이 확정되면**: 예를 들어 Day 3 자유시간에 실제로 방문할 식당이 정해지면, Schedule
쪽(`data-trip.js`)에 그 사실을 반영하는 것과는 별개로, 그 식당이 Guide에도 이미 있다면
`guide.html#spot=<GUIDE_SPOTS의 id>` 형태의 링크로 Schedule에서 Guide 카드로 바로 연결할 수
있습니다(딥링크 기능은 Guide 쪽에 준비되어 있고, Schedule에서 실제로 이 링크를 거는 작업은 아직
하지 않았습니다).

## 🔎 Shanghai Guide 사용법

- **탭**: SEE(볼거리) / EAT(먹거리·카페·바) / SHOP(쇼핑) / SOUVENIRS(기념품 품목) / MAP(지역
  스케매틱 지도)
- **AREA 필터** (SEE/EAT/SHOP 공유): ALL, NANJING EAST·BUND, NORTH BUND, NANJING
  WEST·JING'AN, WUKANG·ANFU, YONGKANG·XUHUI, XINTIANDI, LUJIAZUI, 1000 TREES, OTHER
- **EAT 내부 필터**: ALL / RESTAURANT / CAFE / DESSERT / BAR
- **검색창**: 이름(한/영/중) · 한국어 별칭(`aliases`) · 대표메뉴(`signature`) · 노트·팁·키워드를
  한 번에 검색합니다. 예: "양꼬치", "곰돌이", "팝마트", "게살국수"로 검색해도 해당 카드가
  나옵니다.
- **카드 기본 표시**: 사진(또는 카테고리별 placeholder) · 이름(한/영) · 중국어명 · category ·
  area · 한 줄 설명 · 주소 · 高德地图 버튼 · COPY NAME/ADDRESS 버튼
- **MORE(펼치기)**: 대표 메뉴/무엇을 사는 곳인지, 여행자 팁, 웨이팅·예약 참고, 신뢰 가능한
  영업시간, 키워드 — 전부 "변동 가능 · 당일 현지 지도앱 확인" 전제로 표시합니다.
- **高德地图 버튼**: `https://uri.amap.com/search?keyword=...&city=310000&view=map&src=bimfieldtrip&callnative=1`
  형태의 URI API 링크입니다. API key가 필요 없고, PC에서는 高德 웹검색, 모바일에서는 설치된
  高德地图 앱 실행을 시도합니다. keyword는 가능하면 중국어 상호명+주소를 함께 사용합니다.
- **MAP 탭**: 정확한 축척 지도가 아니라, 8개 지역 클러스터의 상대적 위치와 장소 수를 보여주는
  인라인 SVG 스케매틱 지도입니다(외부 지도 iframe·API key 없음). 핀을 누르면 그 지역 장소가
  아래에 나열됩니다.
- **딥링크**: `guide.html#spot=<GUIDE_SPOTS id>`로 접속하면 해당 카드가 속한 탭이 자동 선택되고,
  AREA/EAT 필터가 초기화된 뒤 그 카드로 스크롤 + 잠깐 하이라이트됩니다. 기존
  `#see`/`#eat`/`#shop`/`#souvenirs`/`#map` 해시도 그대로 동작합니다.
- **미검증 장소 보존**: 정확한 상호·주소를 확인하지 못한 장소는 `GUIDE_RESEARCH_NOTES`/
  `GUIDE_RESEARCH_NOTES_EXTENDED`(js/data-guide.js)에 원문 그대로 보존만 하고, 화면 어디에도
  렌더링하지 않습니다. 검증되면 `GUIDE_SPOTS`로 옮기면 됩니다.

## 🔐 Architecture at a glance

- **GitHub Pages = 공개 여행 안내(public travel info)만 담당.** 참가자 인증·개인정보·실시간 운영
  상태를 전혀 다루지 않습니다.
- **Google Apps Script = 실제 참가자 운영 앱(private participant portal).** 상세 일정, 집합
  시간/장소, 숙소/객실/룸메이트, Check-in, Bus Boarding, Taxi Team/정산, 참가자 정보, Admin
  운영은 전부 여기서만 확인합니다.
- **Private Google Sheet = 참가자/방/택시팀/상태/정산 데이터.**
- **실제 참가자 4자리 코드 값은 GitHub에 절대 저장하지 않습니다.** (이 설명은 개발 문서인 이
  README에만 남기고, 사용자 화면인 My Trip에는 노출하지 않습니다.)
- **Apps Script URL은 한 곳(`js/config.js` → `APP_CONFIG.participantPortalUrl`)에서만 관리합니다.**
  현재 실제 Web App URL이 설정되어 있습니다 — 재배포 등으로 URL이 바뀌면 이 한 줄만 교체하면
  MY TRIP이 나가는 모든 지점에 자동 반영됩니다.
- **일정(Schedule/Home/Prep) SAMPLE 데이터는 실제로 확정되고 공개해도 안전할 때만 교체합니다.**
  Shanghai Guide는 일정과 무관한 정보 라이브러리이므로 이 SAMPLE 교체 대상이 아닙니다.

## 🔐 PUBLIC / PRIVATE 역할 분리

이 프로젝트는 두 개의 서로 다른 시스템으로 나뉘어 있습니다. **절대 섞지 마세요.**

**PUBLIC — 이 저장소 (GitHub Pages)**
- HOME · SCHEDULE · SHANGHAI GUIDE · PREP · MY TRIP(Private Portal로 바로 이동하는 링크) 5개 핵심 메뉴
- 공개 가능한 여행 정보: 여행이 무엇인지, Day별 대략적인 이동 흐름, 출국 전 준비, 상하이 정보
  라이브러리(SEE/EAT/SHOP/SOUVENIRS/MAP)
- 실제 참가자를 흉내 내는 화면(Demo Persona, Group Ops 대시보드 등)은 존재하지 않습니다.

**PRIVATE — Google Apps Script (별도 프로젝트, 이 저장소에 코드 없음)**
- Participant Login (이름 + 개인 4자리 코드 — 재학생은 학번 뒤 4자리, 그 외 참가자는 별도 안내된
  4자리 코드)
- 상세 일정 · 집합 시간/장소
- 숙소 · 객실 · 룸메이트, Check-in
- Bus Boarding
- Taxi Team · 정산
- 참가자 정보, Admin 운영(권한 사용자만)

**PRIVATE DATA — Google Sheet (Restricted, 이 저장소에 없음)**
- 실제 참가자 이름·Role·Room·Roommate·Taxi Team
- 개인 4자리 코드 / 코드 hash
- 실제 운영 상태

> ⚠️ **DO NOT PLACE REAL PARTICIPANT DATA IN GITHUB.**
> 실제 참가자 이름·연락처·Room 배정·Taxi Team·정산·개인 4자리 코드·코드 hash·Apps Script
> secret은 어떤 형태로도(HTML/JS/JSON/데이터 파일/커밋 메시지) 이 저장소에 넣지 마세요. 이
> 저장소에는 Private Portal의 **Web App URL 하나만** 존재합니다(`js/config.js`). 로그인·개인정보
> 검증은 항상 Apps Script 쪽에서만 이루어집니다.

MY TRIP은 중간 안내 페이지 없이 Private Portal로 바로 나갑니다. 상단·하단 내비게이션의 MY TRIP,
Home의 My Trip CTA, Schedule 상단의 My Trip 링크는 모두 `goToPrivatePortal()`(`js/main.js`)을
호출합니다 — `participantPortalUrl()`이 설정되어 있으면 같은 탭에서 바로 그 URL로 이동하고,
`<APPS_SCRIPT_WEB_APP_URL>` placeholder 상태라면 이동하지 않고 `alert()`로 간단한 안내만
보여줍니다. 실제 연결은 `js/config.js`의 값 하나와 `main.js`의
`participantPortalUrl()`/`isPortalConfigured()`/`goToPrivatePortal()` 세 함수로만 관리합니다.
로그인 방법(재학생: 학번 뒤 4자리 / 그 외 참가자: 별도 안내된 4자리 코드) 안내와 "실제 코드 값을
GitHub에 저장하지 않는다"는 보안 설명은 사용자 화면이 아니라 이 README에만 남겨둡니다.

## ⚠️ Schedule/Home/Prep은 여전히 SAMPLE MODE입니다 (Shanghai Guide는 해당 없음)

날짜(2026.12.27~12.31)는 확정이지만, Schedule/Home 화면에 보이는 방문기관·동선·식당은 기능
검증을 위한 SAMPLE입니다. 실제 공식 일정이 확정되면 `js/data-trip.js` 데이터만 교체하면 되도록
만들어졌습니다. (Shanghai Guide는 일정과 무관한 정보 라이브러리라서 이 SAMPLE 표시 대상이
아닙니다 — 위 "Shanghai Guide와 Schedule — 데이터가 분리되어 있습니다" 참고.)

- H+ Hotel, Sanofi China, Zai Lab, WuXi Biologics, Shanghai Henlius Biotech, Alibaba Cloud는
  전부 **실존하는** 호텔/기관입니다. 하지만 KAIST BIM Field Trip의 **실제 확정 숙소/방문기관이
  아닙니다.** 화면 어디서나 `REAL HOTEL`/`REAL ORGANIZATION` · `SAMPLE ACCOMMODATION`/
  `SAMPLE VISIT` · `NOT CONFIRMED` 배지를 함께 표시해, "실존 여부"와 "확정 여부"를 항상
  구분합니다.
- 상단 **DEMO MODE** strip(수업 과제 프로토타입 표시)은 HOME/SCHEDULE/PREP에서 그대로
  유지합니다. Shanghai Guide 페이지만 "FIELD GUIDE · Information Reference"로 문구를
  바꿨습니다(장소 정보 자체가 가짜처럼 보이지 않도록 — 이 페이지의 성격이 다르기 때문).

## 미리보기 (로컬에서 바로 열어보기)

빌드 과정이나 서버가 필요 없습니다. 압축을 풀고 `index.html`을 더블클릭해서 브라우저로 열면 바로
동작합니다. (모든 데이터가 `<script>` 태그로 직접 로드되기 때문에 `file://`로 열어도 정상
동작합니다.)

- 상단·하단 내비게이션은 **HOME · SCHEDULE · SHANGHAI GUIDE · PREP · MY TRIP** 5개뿐입니다.
  역할별로 메뉴가 달라지지 않고, 모든 방문자가 동일한 메뉴를 봅니다.
- **HOME**은 Hero(D-Day) + Trip at a Glance(Day 1~5 아주 짧은 요약) + My Trip 단일 CTA로만
  구성됩니다. 화면은 오늘 날짜를 기준으로 자동으로 Phase(출국 전/Day N/종료 후)를 전환합니다.
- **SCHEDULE**은 상세 시간표가 아니라 Day별 "대략적인 이동 흐름"만 보여줍니다(예: `DAY 1: Hotel
  → Welcome Dinner → Nanjing East Road → The Bund`). 정확한 시간·집합 장소·버스 탑승 정보는 MY
  TRIP을 거쳐 Private Portal에서만 확인합니다. 각 Day 카드의 방문기관 칩을 누르면 그 기관의 상세
  프로필(`host-orgs/`)로 이동합니다.
- **SHANGHAI GUIDE**는 이제 SEE/EAT/SHOP/SOUVENIRS/MAP 5탭 구조이며, `js/data-guide.js`의
  독립 데이터(`GUIDE_SPOTS` 55곳, `GUIDE_SOUVENIRS` 33개 품목)를 사용합니다. 자세한 사용법은 위
  "🔎 Shanghai Guide 사용법" 참고.
- **PREP**은 01 BEFORE YOU FLY(기본으로 펼쳐진 체크리스트) 아래로 02 ESSENTIAL APPS / 03
  PAYMENT / 04 CONNECTIVITY / 05 PACKING·POWER / 06 LOCAL TIPS 5개 카테고리가 각각 하나의 큰
  accordion(`<details class="details-box--category">`)으로 접혀 있습니다.
- **MY TRIP**은 별도 페이지가 아닙니다. 상단·하단 내비게이션의 MY TRIP, Home의 My Trip CTA,
  Schedule 상단의 My Trip 링크를 누르면 `goToPrivatePortal()`(`js/main.js`)이
  `participantPortalUrl()`로 **같은 탭에서 바로** 이동시킵니다.
- `host-orgs.html`, `host-orgs/*.html`은 최상단 내비게이션에는 없지만 Schedule의 방문기관 칩을
  통해 계속 접근할 수 있어 그대로 유지합니다.

## 폴더 구조

```
shanghai-field-trip-hub/
├── index.html               HOME — Hero + Trip at a Glance + My Trip CTA (날짜 기반 자동 Phase)
├── itinerary.html            SCHEDULE — Day별 대략적인 이동 흐름 요약 (상세 시간표 없음)
├── guide.html                SHANGHAI GUIDE — SEE/EAT/SHOP/SOUVENIRS/MAP 5탭.
│                              js/data-guide.js만 읽음(js/data-trip.js와 완전 분리)
├── prep.html                 PREP — BEFORE YOU FLY(기본 펼침) + 5개 카테고리 accordion
│                              (ESSENTIAL APPS/PAYMENT/CONNECTIVITY/PACKING·POWER/LOCAL TIPS)
├── host-orgs.html             Field Visits 전체 목록 (내비게이션에는 없음 · Schedule에서 링크)
├── host-orgs/
│   ├── wuxi-biologics.html      방문기관 상세 페이지 (REAL ORGANIZATION · SAMPLE VISIT)
│   ├── sanofi-china.html        〃
│   ├── zai-lab.html             〃
│   ├── henlius-biotech.html     〃
│   └── alibaba-cloud.html       〃
├── css/
│   └── style.css              공통 스타일 (외부 폰트·CDN 없음, 반응형, White + Navy 디자인).
│                              guide.html 전용 스타일(카드/필터/검색/MAP 핀/COPY 버튼/카테고리별
│                              사진 placeholder)은 파일 맨 끝에 별도 섹션으로 추가됨
├── js/
│   ├── config.js                Private Participant Portal(Google Apps Script) 연결 URL을 한
│   │                          곳에서만 관리 (`APP_CONFIG.participantPortalUrl`). 실제 참가자
│   │                          데이터·개인 4자리 코드·secret은 이 파일에 절대 넣지 않음
│   ├── data-trip.js             Schedule/Home/Prep 콘텐츠 데이터 (일정/장소/방문기관/SAMPLE
│   │                          저녁식사/Prep 정보). Shanghai Guide는 이 파일을 더 이상 읽지 않음
│   ├── data-guide.js            ★ Shanghai Guide 전용 독립 데이터 (v0.7 신설). GUIDE_SPOTS(56),
│   │                          GUIDE_SOUVENIRS(33), GUIDE_RESEARCH_NOTES + _EXTENDED(미검증,
│   │                          화면 미노출), AREA_CLUSTERS(MAP 탭용 8개 지역)
│   ├── main.js                  공통 기능 (5개 고정 메뉴 내비게이션, 상태 배지, REAL+SAMPLE 이중
│   │                          라벨, 장소/식사 카드, participantPortalUrl()/isPortalConfigured()/
│   │                          goToPrivatePortal())
│   └── home.js                  HOME 화면 로직 — 날짜 기반 자동 Phase 판정(computeAutoPhase) +
│                              Hero + Trip at a Glance + My Trip CTA
└── README.md
```

### 이전 라운드 삭제 이력 (요약)

- **v0.6**: `group-ops.html`/`js/group-ops.js`/`js/data-groupops.js`(Demo Persona 기반 Group
  Ops 대시보드), `notice.html`(공지 기능) 삭제.
- **v0.6.1**: `eat.html`/`explore.html`/`shop.html`/`stay.html` 삭제 — 콘텐츠는
  `js/data-trip.js`에 남아 있었고 당시 Shanghai Guide가 그대로 재사용(현재는 `guide.html`이
  `js/data-guide.js`를 쓰므로 이 레거시 데이터는 더 이상 화면에 쓰이지 않음). `stay.html`이
  담당하던 "호텔 전용 화면"은 대체 화면 없음.
- **v0.6.2**: `my-trip.html`(Private Portal 가기 전 내부 게이트웨이 페이지) 삭제 — MY TRIP이
  모든 지점에서 이 페이지 없이 바로 이동하도록 변경.
- **v0.7**: Shanghai Guide를 SEE/EAT/SHOP/SOUVENIRS/MAP로 개편, `js/data-guide.js` 신설.
- **v0.7.1**: 이번 라운드 — 위 상단 변경점 참고. 삭제한 파일 없음.

## 데이터 수정 방법 (앞으로 정보가 확정될 때마다)

**Schedule / Home / Prep**은 `js/data-trip.js` 한 파일만 고치면 됩니다.
- 일정(`ITINERARY[]`), 장소(호텔/공항/관광지/방문기관 위치), 방문기관 소개(`ORGS`), SAMPLE
  저녁식사(`SAMPLE_DINNERS`), 준비 정보(`PREP`)가 모두 이 파일에 있습니다.
- 예: 호텔이 확정되면 `PLACES` 배열의 `hplus-hotel` 항목 이름·중국어 이름·주소·상태(`status`)를
  실제 정보로 교체하면 됩니다.
- Day별 이동 흐름을 바꾸려면 `ITINERARY[].officialSchedule.note`만 수정하면 Schedule 화면에
  바로 반영됩니다.

**Shanghai Guide**는 `js/data-guide.js` 한 파일만 고치면 됩니다.
- 새 장소를 추가하거나 정보를 갱신하려면 `GUIDE_SPOTS[]`에 항목을 추가/수정하세요
  (`tab`/`eatType`/`area`/`name`/`name_zh`/`address`/`hours`/`note`/`tip`/`signature`/
  `keywords`/`aliases` 필드 참고 — 기존 항목을 보고 그대로 따라 하면 됩니다).
- 기념품은 `GUIDE_SOUVENIRS[]`, 미검증 장소는 `GUIDE_RESEARCH_NOTES`/
  `GUIDE_RESEARCH_NOTES_EXTENDED`에 검증 전까지 보존하세요(화면에 렌더링되지 않음). 검증되면
  `GUIDE_SPOTS`로 옮기면 됩니다.
- 실제 사진이 생기면 해당 항목의 `image`/`image_alt`/`image_source_url`/`image_credit`만
  채우면 카드에 자동 반영됩니다(사용권이 확인된 이미지만 사용하세요).
- Guide 화면에는 CANDIDATE/후보/SAMPLE/TBD/VERIFY/NOT CONFIRMED 같은 표현을 쓰지 않는 것이
  원칙입니다 — 정보가 불확실하면 `note`/`tip`에 "변동 가능" 정도로만 안내하세요.

각 Schedule 데이터 항목의 `status` 값은 `confirmed`(확정) / `candidate`(후보) / `tbd`(미정) /
`demo`(예시) / `sample`(실존 장소·기관을 SAMPLE로 사용) 중 하나입니다. `real: true`가 있는
항목은 `realLabel`/`sampleLabel`을 함께 지정하면 화면에 `REAL X · SAMPLE Y · NOT CONFIRMED`가
자동으로 표시됩니다 (`main.js`의 `realSampleTagsHtml`/`statusOrRealTagsHtml`). 이 상태 체계는
Shanghai Guide에는 적용하지 않습니다.

새 방문기관을 추가하려면 `ORGS`에 항목을 추가하고, `host-orgs/` 폴더에 그 기관의 id로 새 HTML
파일을 하나 만들면 됩니다 (기존 파일을 복사해서 `data-org-id`만 바꾸는 방식이 가장 빠릅니다).

## 실제 데이터 교체 가이드 (REAL DATA REPLACEMENT GUIDE)

| 바꿀 내용 | 파일 / 데이터 영역 | 비고 |
| --- | --- | --- |
| Day별 이동 흐름 요약 | `js/data-trip.js` → `ITINERARY[].officialSchedule.note` | Schedule 화면이 이 필드를 그대로 표시함 |
| 집합 시간 | `js/data-trip.js` → `ITINERARY[].meetup` | 정확한 시간·장소는 원칙적으로 Private Portal에서만 안내하며, 이 필드는 참고용 |
| 호텔 정보 | `js/data-trip.js` → `PLACES[]`의 `category: "hotel"` 항목 (지금은 `hplus-hotel`) | `status`를 `confirmed`로, `real`/`realLabel`/`sampleLabel` 제거 |
| 방문기관 정보 | `js/data-trip.js` → `ORGS[]` + `host-orgs/*.html` | |
| Shanghai Guide 장소·식당·매장·기념품 | `js/data-guide.js` → `GUIDE_SPOTS[]`/`GUIDE_SOUVENIRS[]` | `guide.html`이 이 데이터를 그대로 읽으므로 별도 HTML 수정 불필요 |
| 미검증 Guide 장소가 확인되면 | `js/data-guide.js` → `GUIDE_RESEARCH_NOTES`/`_EXTENDED`에서 `GUIDE_SPOTS[]`로 이동 | 이동 전까지는 화면에 노출하지 않음 |
| 장소의 중국어명·주소 | 해당 파일의 각 장소 객체의 `name_zh`/`address`(Guide) 또는 `address_zh`(Schedule) | |
| Prep 체크리스트/앱/결제/통신/팁 문구 | `js/data-trip.js` → `PREP` | |
| Private Participant Portal 연결 URL | `js/config.js` → `APP_CONFIG.participantPortalUrl` | 현재 실제 `/exec` URL이 설정되어 있음. 재배포로 URL이 바뀌면 이 한 줄만 교체하면 MY TRIP이 나가는 모든 지점(nav/Home CTA/Schedule 링크)에 자동 반영됨 |
| **실제** 참가자/방 배정/룸메이트/택시팀/정산/개인 4자리 코드 | ❌ GitHub 아님 → **Private Google Sheet + Apps Script** | GitHub 코드는 전혀 건드리지 않음. 이 저장소에는 이런 데이터를 담는 파일 자체가 없음 |

## v0.7.1에서 실제로 되는 것 / Private Portal이 담당하는 것

**정적 페이지로 완성한 부분**
- 날짜 기준으로 자동 전환되는 Home 화면 (Hero + Trip at a Glance + My Trip CTA)
- Schedule — Day별 대략적인 이동 흐름 + 방문기관 칩 링크
- Shanghai Guide — SEE/EAT/SHOP/SOUVENIRS/MAP 5탭, AREA·EAT 필터, 한/영/중+별칭 검색,
  高德地图 URI 링크, COPY NAME/ADDRESS, `#spot=<id>` 딥링크
- Prep — BEFORE YOU FLY(기본 펼침) + 5개 카테고리 accordion으로 정리된 출국 전 준비
  체크리스트(이 브라우저에만 저장)
- **MY TRIP 바로 이동(`goToPrivatePortal()`, `js/main.js`)** — 상단·하단 내비게이션의 MY
  TRIP, Home의 My Trip CTA, Schedule 상단의 My Trip 링크를 누르면 중간 안내 페이지 없이
  `participantPortalUrl()`로 같은 탭에서 바로 이동합니다.

**Google Apps Script Private Portal이 담당하는 부분** (이 저장소에는 코드 없음)
- Participant Login (이름 + 개인 4자리 코드, hash 저장)
- 상세 일정 · 집합 시간/장소
- Room 조회 · Roommate · Check-in
- Bus Boarding
- Taxi Team 조회 · 정산
- Admin 운영정보 (권한 사용자만)
- 로그인 세션 · Logout

## GitHub Pages 배포 방법

1. GitHub에 새 저장소를 만듭니다 (예: `shanghai-field-trip-hub`).
2. 이 폴더의 파일 전체를 저장소에 업로드(Upload files)하고 Commit합니다. **폴더 일부만 바꾸지
   말고 전체를 통째로 업로드하세요** — 예전 라운드에서 `js/config.js`만 갱신하고
   `js/main.js`/`guide.html` 등은 옛 버전이 남아 있어 MY TRIP이 옛 동작을 하는 문제가 있었습니다.
3. 저장소 Settings → Pages → Branch를 `main`으로 설정하고 저장합니다.
4. 1~2분 후 `https://[내 아이디].github.io/shanghai-field-trip-hub/`로 접속됩니다.
5. 예전 화면이 계속 보이면 강력 새로고침(Windows/Linux: `Ctrl+Shift+R`, Mac: `Cmd+Shift+R`)으로
   브라우저 캐시를 비우고 다시 확인하세요.

호스팅을 나중에 다른 정적 호스팅으로 옮기더라도, 이 프로젝트는 특정 플랫폼 기능에 의존하지 않는
순수 정적 파일이라 폴더를 그대로 옮기면 됩니다.

## 개인정보 · SAMPLE 데이터 안내

- **DO NOT PLACE REAL PARTICIPANT DATA IN GITHUB.** 실제 참가자 이름·연락처·Room 배정·Taxi
  Team·개인 4자리 코드·코드 hash·정산 내역·Apps Script secret 중 어떤 것도 이 공개 저장소
  (HTML/JS/JSON/데이터 파일/커밋 메시지 포함)에 절대 입력하지 마세요. 실제 참가자 데이터는
  Private Google Sheet에만 있어야 합니다.
- `js/config.js`의 Apps Script Web App URL은 그 자체로는 공개 웹 링크이므로 프론트엔드에 두어도
  되지만, URL이 있다고 해서 인증 없이 개인정보가 노출되면 안 됩니다 — 로그인·개인정보 검증은
  항상 Apps Script 쪽에서만 이루어지며, 이 프로젝트는 "GitHub → Private Portal 이동"까지만
  담당합니다.
- `js/data-trip.js`의 H+ Hotel · Sanofi China · Zai Lab · WuXi Biologics · Shanghai Henlius
  Biotech · Alibaba Cloud는 실존하는 호텔/기관이지만, 이 프로젝트에서는 기능 검증용 SAMPLE
  데이터로만 사용됩니다. 실제로 확정되기 전까지는 절대 "확정된 일정"처럼 안내하지 마세요.
- `js/data-guide.js`의 `GUIDE_SPOTS`/`GUIDE_SOUVENIRS`는 사용자가 직접 수집·검증해 제공한
  장소/품목만 담았습니다. 확인되지 않은 중국어명·주소·영업시간·가격은 임의로 채우지 않고 빈
  값으로 남겨두었으며, 정확한 상호를 특정하지 못한 자료는 `GUIDE_RESEARCH_NOTES`/
  `_EXTENDED`에만 보존하고 화면에는 렌더링하지 않습니다.
