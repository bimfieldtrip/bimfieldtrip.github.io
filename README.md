# Shanghai Field Trip Hub — v0.6.3 · Portal Link Hotfix

KAIST BIM Shanghai Field Trip(2026.12.27~12.31)을 위한 **공개 여행 안내 허브**입니다.
"상하이에서 무엇을 하고, 무엇을 준비하고, 어디를 볼 수 있는가"에만 집중하며, 실제 참가자 운영
(체크인·버스 탑승·룸 배정·택시팀·정산 등)은 별도의 Private Participant Portal에서 처리합니다.

v0.6.2는 **MY TRIP 동작만 수정한 라운드**입니다. 지금까지는 MY TRIP을 누르면 GitHub의 안내
페이지(`my-trip.html`)로 먼저 이동한 뒤 ENTER PRIVATE PORTAL 버튼을 한 번 더 눌러야
Private Portal로 갈 수 있었는데, 이 중간 단계를 없앴습니다. 이제 MY TRIP을 누르면 같은 탭에서
바로 Private Portal(Apps Script)로 이동하며, GitHub 쪽에는 그 중간 안내 페이지를 두지 않습니다.

v0.6.3은 v0.6.2의 MY TRIP 이동 로직을 다시 점검한 **작은 hotfix**입니다. 코드 감사 결과
`goToPrivatePortal()`/`participantPortalUrl()`/`isPortalConfigured()`(모두 `js/main.js`)와
nav/Home CTA/Schedule 링크의 `onclick="goToPrivatePortal(event)"` 연결 자체는 이미 올바르게
동작했지만, `js/config.js`에 URL을 붙여넣을 때 앞뒤 공백이나 줄바꿈이 섞여 들어오는 경우에도
항상 안전하게 이동하도록 `participantPortalUrl()`이 값을 `trim()`하도록 방어 코드를
추가했습니다. 클릭이 안 되는 것처럼 보였다면, 대부분 GitHub Pages/브라우저가 이전 버전의
`js/main.js`(아직 `my-trip.html`을 가리키던 버전)를 캐시해서 보여주고 있었을 가능성이 큽니다 —
강력 새로고침(아래 "테스트 방법" 참고)으로 먼저 확인해 주세요. 그 외 navigation 구성·
Schedule·Shanghai Guide·Prep·디자인은 이번 라운드에서도 건드리지 않았습니다. (v0.6.1까지의
정리 내역은 아래 "v0.6에서 삭제된 파일"/"v0.6.1에서 삭제된 파일" 섹션 참고.)

**테스트 방법 (브라우저 캐시 문제 피하기)** — GitHub Pages에 새로 배포한 뒤에도 옛날 화면이
보인다면, 캐시된 옛 `js/main.js`/`index.html`을 보고 있을 가능성이 큽니다. 강력 새로고침
(Windows/Linux: `Ctrl+Shift+R`, Mac: `Cmd+Shift+R`, 또는 개발자도구를 연 상태에서 새로고침
버튼을 길게 눌러 "캐시 비우기 및 강력 새로고침" 선택)으로 다시 테스트해 주세요.

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
- **SAMPLE 데이터는 실제로 확정되고 공개해도 안전할 때만 교체합니다.**

## 🔐 PUBLIC / PRIVATE 역할 분리

이 프로젝트는 두 개의 서로 다른 시스템으로 나뉘어 있습니다. **절대 섞지 마세요.**

**PUBLIC — 이 저장소 (GitHub Pages)**
- HOME · SCHEDULE · SHANGHAI GUIDE · PREP · MY TRIP(Private Portal로 바로 이동하는 링크) 5개 핵심 메뉴
- 공개 가능한 여행 정보: 여행이 무엇인지, Day별 대략적인 이동 흐름, 출국 전 준비, 상하이 자유시간
  정보(SEE/EAT/SHOP/SOUVENIRS)
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

**v0.6.2부터 MY TRIP은 중간 안내 페이지 없이 Private Portal로 바로 나갑니다.** 상단·하단
내비게이션의 MY TRIP, Home의 My Trip CTA, Schedule 상단의 My Trip 링크는 모두
`goToPrivatePortal()`(`js/main.js`)을 호출합니다 — `participantPortalUrl()`이 설정되어 있으면
같은 탭에서 바로 그 URL로 이동하고, 아직 `<APPS_SCRIPT_WEB_APP_URL>` placeholder면 이동하지
않고 `alert()`로 간단한 안내만 보여줍니다. 과거에 있던 내부 게이트웨이 페이지
(`my-trip.html`)는 더 이상 필요하지 않아 삭제했습니다. Public UI가 앞으로 계속 바뀌어도 Private
연결 지점을 다시 만들 필요가 없도록, 실제 연결은 `js/config.js`의 값 하나와 `main.js`의
`participantPortalUrl()`/`isPortalConfigured()`/`goToPrivatePortal()` 세 함수로만 관리합니다.
로그인 방법(재학생: 학번 뒤 4자리 / 그 외 참가자: 별도 안내된 4자리 코드) 안내와 "실제 코드
값을 GitHub에 저장하지 않는다"는 보안 설명은 사용자 화면이 아니라 이 README에만 남겨둡니다.

**Apps Script URL 설정 방법** — `js/config.js`의 `APP_CONFIG.participantPortalUrl`은 지금
`"<APPS_SCRIPT_WEB_APP_URL>"` placeholder 상태입니다. 실제 Apps Script Web App을 배포한 뒤,
이 한 줄만 실제 `/exec` URL로 교체하면 MY TRIP을 누르는 모든 지점(상단/하단 내비게이션, Home
CTA, Schedule 링크)이 그 URL로 바로 이동하도록 자동 반영됩니다. placeholder가 남아 있는 동안은
`isPortalConfigured()`(main.js)가 `false`를 반환해, 깨진 링크로 이동하지 않고 "Private Portal
연결 주소가 아직 설정되지 않았습니다." 안내를 대신 보여줍니다.

## ⚠️ 여전히 SAMPLE MODE입니다

날짜(2026.12.27~12.31)는 확정이지만, 화면에 보이는 방문기관·동선·식당은 기능 검증을 위한
SAMPLE입니다. 실제 공식 일정이 확정되면 데이터만 교체하면 되도록 만들어졌습니다.

- H+ Hotel, Sanofi China, Zai Lab, WuXi Biologics, Shanghai Henlius Biotech, Alibaba Cloud는
  전부 **실존하는** 호텔/기관입니다. 하지만 KAIST BIM Field Trip의 **실제 확정 숙소/방문기관이
  아닙니다.** 화면 어디서나 `REAL HOTEL`/`REAL ORGANIZATION` · `SAMPLE ACCOMMODATION`/
  `SAMPLE VISIT` · `NOT CONFIRMED` 배지를 함께 표시해, "실존 여부"와 "확정 여부"를 항상
  구분합니다.
- 상단 **DEMO MODE** strip(수업 과제 프로토타입 표시)은 이번 수업 과제 제출 전까지 그대로
  유지합니다.

## 미리보기 (로컬에서 바로 열어보기)

빌드 과정이나 서버가 필요 없습니다. 압축을 풀고 `index.html`을 더블클릭해서 브라우저로 열면 바로
동작합니다. (모든 데이터가 `<script>` 태그로 직접 로드되기 때문에 `file://`로 열어도 정상
동작합니다.)

- 상단·하단 내비게이션은 **HOME · SCHEDULE · SHANGHAI GUIDE · PREP · MY TRIP** 5개뿐입니다.
  역할별로 메뉴가 달라지지 않고, 모든 방문자가 동일한 메뉴를 봅니다.
- **HOME**은 Hero(D-Day) + Trip at a Glance(Day 1~5 아주 짧은 요약) + My Trip 단일 CTA로만
  구성됩니다. Simulator 미리보기 버튼, Quick Links, Notice, 참가자 체크인/탑승 데모 액션은
  존재하지 않습니다. 화면은 오늘 날짜를 기준으로 자동으로 Phase(출국 전/Day N/종료 후)를
  전환합니다. SAMPLE 안내 문구는 "일정 · 숙소 · 방문기관 등 아직 확정되지 않은 여행 정보는
  프로토타입 확인을 위한 SAMPLE" 수준으로 단순화되어, 실제 참가자 운영 데이터가 GitHub에 있는
  것처럼 보이는 표현은 없습니다.
- **SCHEDULE**은 상세 시간표가 아니라 Day별 "대략적인 이동 흐름"만 보여줍니다(예: `DAY 1: Hotel
  → Welcome Dinner → Nanjing East Road → The Bund`). 정확한 시간·집합 장소·버스 탑승 정보는 MY
  TRIP을 거쳐 Private Portal에서만 확인합니다. 각 Day 카드의 방문기관 칩을 누르면 그 기관의 상세
  프로필(`host-orgs/`)로 이동합니다.
- **SHANGHAI GUIDE**는 SEE/EAT/SHOP/SOUVENIRS 탭을 그대로 유지하는 독립된 핵심 메뉴입니다.
  SOUVENIRS 탭에는 사용자가 이미 모아둔 기념품 위시리스트 30개 품목이 반영되어 있습니다.
- **PREP**은 01 BEFORE YOU FLY(기본으로 펼쳐진 체크리스트) 아래로 02 ESSENTIAL APPS / 03
  PAYMENT / 04 CONNECTIVITY / 05 PACKING·POWER / 06 LOCAL TIPS 5개 카테고리가 각각 하나의 큰
  accordion(`<details class="details-box--category">`)으로 접혀 있습니다. 처음 페이지를 열면
  카테고리 이름만 한눈에 훑을 수 있고, 필요한 카테고리를 눌러야 세부 내용이 펼쳐집니다. 기존
  OPTIONAL APPS·백업 결제 수단·eSIM 참고 링크 같은 세부 항목은 각 카테고리 accordion 내부의 더
  작은 accordion으로 자연스럽게 들어가 있습니다. 별도 Quick Links는 만들지 않았습니다.
- **MY TRIP**은 더 이상 별도 페이지가 아닙니다. 상단·하단 내비게이션의 MY TRIP, Home의 My
  Trip CTA, Schedule 상단의 My Trip 링크를 누르면 `goToPrivatePortal()`(`js/main.js`)이
  `participantPortalUrl()`로 **같은 탭에서 바로** 이동시킵니다. URL이 아직 placeholder면
  이동하지 않고 `alert()`로 "Private Portal 연결 주소가 아직 설정되지 않았습니다." 안내만
  보여줍니다. 로그인 방법("재학생: 학번 뒤 4자리 / 그 외 참가자: 별도 안내된 4자리 코드")과
  "실제 코드 값을 GitHub에 저장하지 않는다"는 보안 설명은 사용자 화면에는 노출하지 않고 이
  README에만 남겼습니다.
- `host-orgs.html`, `host-orgs/*.html`은 최상단 내비게이션에는 없지만 Schedule의 방문기관 칩과
  Shanghai Guide를 통해 계속 접근할 수 있어 그대로 유지합니다. 과거의 `eat.html`/`explore.html`/
  `shop.html`/`stay.html`은 다른 어떤 페이지에서도 참조되지 않는 것을 확인한 뒤 삭제했습니다 —
  그 콘텐츠(음식/장소/매장/기념품)는 전부 `js/data-trip.js`의 원본 데이터와 Shanghai Guide의
  SEE/EAT/SHOP/SOUVENIRS 탭에 그대로 남아 있으므로 실제로 소실된 정보는 없습니다. 다만 숙소
  이름·주소를 단독으로 보여주던 화면(`stay.html`)이 없어지면서, 현재 공개 사이트에는 호텔 정보를
  전용으로 보여주는 화면이 없습니다 — 필요하다면 다음 라운드에서 Shanghai Guide나 Schedule
  어딘가에 짧게 다시 노출하는 것을 검토해 주세요 (이번 라운드는 정리만 진행했습니다).

## 폴더 구조

```
shanghai-field-trip-hub/
├── index.html               HOME — Hero + Trip at a Glance + My Trip CTA (날짜 기반 자동 Phase)
├── itinerary.html            SCHEDULE — Day별 대략적인 이동 흐름 요약 (상세 시간표 없음)
├── guide.html                SHANGHAI GUIDE — SEE/EAT/SHOP/SOUVENIRS 탭 (독립 핵심 메뉴,
│                              SOUVENIRS에 사용자 위시리스트 30개 품목 반영)
├── prep.html                 PREP — BEFORE YOU FLY(기본 펼침) + 5개 카테고리 accordion
│                              (ESSENTIAL APPS/PAYMENT/CONNECTIVITY/PACKING·POWER/LOCAL TIPS)
├── host-orgs.html             Field Visits 전체 목록 (내비게이션에는 없음 · Schedule/Guide에서 링크)
├── host-orgs/
│   ├── wuxi-biologics.html      방문기관 상세 페이지 (REAL ORGANIZATION · SAMPLE VISIT)
│   ├── sanofi-china.html        〃
│   ├── zai-lab.html             〃
│   ├── henlius-biotech.html     〃
│   └── alibaba-cloud.html       〃
├── css/
│   └── style.css              공통 스타일 (외부 폰트·CDN 없음, 반응형, White + Navy 디자인,
│                              v0.6.1 — Prep 카테고리용 큰 accordion 스타일
│                              (.details-box--category) 추가)
├── js/
│   ├── config.js                Private Participant Portal(Google Apps Script) 연결 URL을 한
│   │                          곳에서만 관리 (`APP_CONFIG.participantPortalUrl`). 실제 참가자
│   │                          데이터·개인 4자리 코드·secret은 이 파일에 절대 넣지 않음. 실제
│   │                          URL을 넣기 전까지는 `"<APPS_SCRIPT_WEB_APP_URL>"` placeholder
│   │                          상태를 유지함
│   ├── data-trip.js             여행 콘텐츠 데이터 (장소/일정/방문기관/SAMPLE 저녁식사/Prep
│   │                          정보/기념품 위시리스트). v0.6.1에서 SOUVENIR_ITEMS[]에 사용자
│   │                          위시리스트 30개 품목을 반영했고, 어떤 화면에서도 더 이상 쓰이지
│   │                          않던 Map-ready 파생 데이터(LOCATIONS/toLocationRecord/
│   │                          MAP_PREVIEW_ENABLED 등)와 route_location_ids 계산 로직, 그리고
│   │                          schedule[] 항목의 미사용 action{key,label} 필드를 정리함
│   ├── main.js                  공통 기능 (5개 고정 메뉴 내비게이션, 상태 배지, REAL+SAMPLE 이중
│   │                          라벨, 장소/식사 카드, participantPortalUrl()/isPortalConfigured()/
│   │                          goToPrivatePortal()). v0.6.2 — goToPrivatePortal()이 MY TRIP이
│   │                          나가는 모든 지점(nav/Home CTA/Schedule 링크)의 공통 이동 함수
│   └── home.js                  HOME 화면 로직 — 날짜 기반 자동 Phase 판정(computeAutoPhase) +
│                              Hero + Trip at a Glance + My Trip CTA (CTA는 goToPrivatePortal()
│                              로 바로 이동)
└── README.md
```

### v0.6에서 삭제된 파일 (이전 라운드)

- `group-ops.html`, `js/group-ops.js` — Demo Persona 기반 Group Ops 관리자 대시보드.
- `js/data-groupops.js` — Demo 참가자/방/우시버스/택시팀/재정 데이터.
- `notice.html` — 사용하지 않던 공지 기능.

### v0.6.2에서 삭제된 파일 (이번 라운드)

- `my-trip.html` — Private Portal로 가기 전 거치던 내부 게이트웨이 페이지. 삭제 전 저장소
  전체에서 이 파일을 참조하는 링크가 있는지 확인했고, `itinerary.html`의 안내 문구 링크 1곳만
  발견되어 그 링크도 함께 `goToPrivatePortal()` 호출로 바꾼 뒤 삭제했습니다. 이제 MY TRIP을
  누르는 모든 지점이 이 페이지를 거치지 않고 Private Portal로 바로 이동합니다.

### v0.6.1에서 삭제된 파일 (이전 라운드)

- `eat.html`, `explore.html`, `shop.html`, `stay.html` — 삭제 전 저장소 전체에서 이 네 파일을
  참조하는 링크나 스크립트가 있는지 확인했고, `guide.html` 안의 설명 주석 외에는 어디에서도
  참조되지 않는 것을 확인한 뒤 삭제했습니다. 이 페이지들이 보여주던 음식/관광/쇼핑/숙소 데이터는
  `js/data-trip.js`(`FOOD_ITEMS`/`RESTAURANTS`/`PLACES`/`SOUVENIR_ITEMS`)에 그대로 남아 있고,
  Shanghai Guide(SEE/EAT/SHOP/SOUVENIRS 탭)가 동일한 데이터를 계속 보여주므로 콘텐츠 자체는
  소실되지 않았습니다. 단, `stay.html`이 담당하던 "호텔 이름/주소 전용 화면"은 대체 화면이 아직
  없습니다(위 미리보기 섹션 참고).

## 데이터 수정 방법 (앞으로 정보가 확정될 때마다)

HTML이나 CSS를 건드릴 필요 없이 `js/data-trip.js` 한 파일만 고치면 됩니다.

- 일정(`ITINERARY[]`), 장소(호텔/공항/관광지/방문기관 위치), 방문기관 소개(`ORGS`), SAMPLE
  저녁식사(`SAMPLE_DINNERS`), 준비 정보(`PREP`), 기념품 위시리스트(`SOUVENIR_ITEMS`)가 모두 이
  파일에 있습니다.
- 예: 호텔이 확정되면 `PLACES` 배열의 `hplus-hotel` 항목 이름·중국어 이름·주소·상태(`status`)를
  실제 정보로 교체하면 이 장소를 참조하는 모든 화면에 자동으로 반영됩니다.
- Day별 이동 흐름을 바꾸려면 `ITINERARY[].officialSchedule.note`만 수정하면 Schedule 화면에
  바로 반영됩니다.
- 기념품 품목의 정확한 중국어명·가격대·구매처가 확인되면 `SOUVENIR_ITEMS[]`의 해당 항목
  `name_zh`/`priceRange`/`shop_ids`만 채우면 됩니다 (`shop_ids`는 `PLACES[]`의
  `category: "shop"` 항목 id를 가리킵니다).

각 데이터 항목의 `status` 값은 `confirmed`(확정) / `candidate`(후보) / `tbd`(미정) / `demo`(예시) /
`sample`(실존 장소·기관을 SAMPLE로 사용) 중 하나입니다. `real: true`가 있는 항목은
`realLabel`/`sampleLabel`을 함께 지정하면 화면에 `REAL X · SAMPLE Y · NOT CONFIRMED`가 자동으로
표시됩니다 (`main.js`의 `realSampleTagsHtml`/`statusOrRealTagsHtml`).

새 방문기관을 추가하려면 `ORGS`에 항목을 추가하고, `host-orgs/` 폴더에 그 기관의 id로 새 HTML
파일을 하나 만들면 됩니다 (기존 파일을 복사해서 `data-org-id`만 바꾸는 방식이 가장 빠릅니다 —
상세 페이지는 `data-org-id`를 기준으로 `ORGS`에서 내용을 읽어와 렌더링하는 공용 템플릿입니다).

## 실제 데이터 교체 가이드 (REAL DATA REPLACEMENT GUIDE)

이 프로젝트는 "SAMPLE 데이터 + 거의 완성된 UX"로 만들어졌습니다. 실제 정보가 확정되면 아래 표에
있는 데이터 필드만 실제 값으로 바꾸면 되고, HTML/CSS 레이아웃은 대부분 그대로 재사용됩니다.

| 바꿀 내용 | 파일 / 데이터 영역 | 비고 |
| --- | --- | --- |
| Day별 이동 흐름 요약 | `js/data-trip.js` → `ITINERARY[].officialSchedule.note` | Schedule 화면이 이 필드를 그대로 표시함 |
| 집합 시간 | `js/data-trip.js` → `ITINERARY[].meetup` | 정확한 시간·장소는 원칙적으로 Private Portal에서만 안내하며, 이 필드는 참고용 |
| 호텔 정보 | `js/data-trip.js` → `PLACES[]`의 `category: "hotel"` 항목 (지금은 `hplus-hotel`) | `status`를 `confirmed`로, `real`/`realLabel`/`sampleLabel` 제거. 현재 공개 화면에는 이 장소를 전용으로 보여주는 페이지가 없음(위 참고) |
| 방문기관 정보 | `js/data-trip.js` → `ORGS[]` + `host-orgs/*.html` | |
| 식당·음식·매장 (Shanghai Guide) | `js/data-trip.js` → `FOOD_ITEMS[]`/`RESTAURANTS[]`, `PLACES[]`의 `category: "see"/"shop"` 항목 | `guide.html`은 이 데이터를 그대로 읽으므로 별도 수정 불필요 |
| 기념품 위시리스트 (Shanghai Guide · SOUVENIRS) | `js/data-trip.js` → `SOUVENIR_ITEMS[]` | 정확한 중국어명·가격·구매처가 확인되는 항목만 채우고, 확인 안 된 항목은 TBD/빈 배열로 유지 |
| 장소의 중국어명·주소 | `js/data-trip.js` → 각 장소 객체의 `name_zh`/`address_zh` | |
| Prep 체크리스트/앱/결제/통신/팁 문구 | `js/data-trip.js` → `PREP` | |
| Private Participant Portal 연결 URL | `js/config.js` → `APP_CONFIG.participantPortalUrl` | 지금은 `"<APPS_SCRIPT_WEB_APP_URL>"` placeholder. Apps Script Web App을 배포/재배포해 URL이 정해지면 이 한 줄만 실제 `/exec` URL로 바꾸면 MY TRIP이 나가는 모든 지점(nav/Home CTA/Schedule 링크)이 바로 그 URL로 이동하도록 자동 반영됨 |
| **실제** 참가자/방 배정/룸메이트/택시팀/정산/개인 4자리 코드 | ❌ GitHub 아님 → **Private Google Sheet + Apps Script** | GitHub 코드는 전혀 건드리지 않음. 이 저장소에는 이런 데이터를 담는 파일 자체가 없음 |

## v0.6.2에서 실제로 되는 것 / Private Portal이 담당하는 것

**정적 페이지로 완성한 부분**
- 날짜 기준으로 자동 전환되는 Home 화면 (Hero + Trip at a Glance + My Trip CTA, 수동 미리보기
  버튼 없음)
- Schedule — Day별 대략적인 이동 흐름 + 방문기관 칩 링크
- Shanghai Guide (SEE/EAT/SHOP/SOUVENIRS 통합 탭, SOUVENIRS 30개 품목 반영)
- Prep — BEFORE YOU FLY(기본 펼침) + 5개 카테고리 accordion으로 정리된 출국 전 준비
  체크리스트(이 브라우저에만 저장)
- 중국어 이름/주소 원터치 복사, 지도 연결 버튼 자리(서비스 검증 후 연결 예정 · "MAP · TBD")
- **MY TRIP 바로 이동(`goToPrivatePortal()`, `js/main.js`)** — 상단·하단 내비게이션의 MY
  TRIP, Home의 My Trip CTA, Schedule 상단의 My Trip 링크를 누르면 중간 안내 페이지 없이
  `participantPortalUrl()`로 같은 탭에서 바로 이동합니다. URL이 placeholder면 이동하지 않고
  `alert()`로 "Private Portal 연결 주소가 아직 설정되지 않았습니다." 안내만 보여줍니다.

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
2. 이 폴더의 파일 전체를 저장소에 업로드(Upload files)하고 Commit합니다.
3. 저장소 Settings → Pages → Branch를 `main`으로 설정하고 저장합니다.
4. 1~2분 후 `https://[내 아이디].github.io/shanghai-field-trip-hub/`로 접속됩니다.

호스팅을 나중에 다른 정적 호스팅으로 옮기더라도, 이 프로젝트는 특정 플랫폼 기능에 의존하지 않는
순수 정적 파일이라 폴더를 그대로 옮기면 됩니다.

## 개인정보 · SAMPLE 데이터 안내

- **DO NOT PLACE REAL PARTICIPANT DATA IN GITHUB.** 실제 참가자 이름·연락처·Room 배정·Taxi
  Team·개인 4자리 코드·코드 hash·정산 내역·Apps Script secret 중 어떤 것도 이 공개 저장소
  (HTML/JS/JSON/데이터 파일/커밋 메시지 포함)에 절대 입력하지 마세요. 실제 참가자 데이터는
  Private Google Sheet에만 있어야 합니다. (이 원칙은 개발 문서인 이 README에서만 자세히
  설명하고, MY TRIP을 눌렀을 때 도달하는 Private Portal 화면에는 로그인 방법만 간단히
  안내합니다.)
- `js/config.js`의 Apps Script Web App URL은 그 자체로는 공개 웹 링크이므로 프론트엔드에 두어도
  되지만, URL이 있다고 해서 인증 없이 개인정보가 노출되면 안 됩니다 — 로그인·개인정보 검증은
  항상 Apps Script 쪽에서만 이루어지며, 이 프로젝트는 "GitHub → Private Portal 이동"까지만
  담당합니다.
- `js/data-trip.js`의 H+ Hotel · Sanofi China · Zai Lab · WuXi Biologics · Shanghai Henlius
  Biotech · Alibaba Cloud는 실존하는 호텔/기관이지만, 이 프로젝트에서는 기능 검증용 SAMPLE
  데이터로만 사용됩니다. 실제로 확정되기 전까지는 절대 "확정된 일정"처럼 안내하지 마세요.
- `SOUVENIR_ITEMS[]`의 기념품 위시리스트는 사용자가 이미 직접 모아둔 후보 목록을 그대로 옮긴
  것입니다. 정확한 중국어 표기·가격·구매처가 확인되지 않은 항목은 임의로 추측해 채우지
  않았습니다 (`GATHERING / 集雅`는 명칭·실체 확인이 아직 필요한 상태로 남겨두었습니다).
