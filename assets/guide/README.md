# assets/guide — Shanghai Guide 이미지

이미지 우선순위: **실사(라이선스 확인) > 장소를 묘사한 완성 일러스트 > 기존 SVG placeholder**

- `photos/` — Wikimedia Commons 실사의 웹용 16:10 WebP 사본(1280×800). **v0.11.1부터 4장(`bund`, `mms-shanghai`, `shanghai-first-food-store`, `hugongguan`)은 repo에 포함되어 바로 표시됩니다**(`GUIDE_IMAGE_MANIFEST`의 `file` 필드). **v0.11.7부터 나머지 27장도 repo에 포함**되어(`GUIDE_IMAGE_MANIFEST`의 `file` 필드) 실사 31장 모두 외부(Wikimedia) 접속 없이 표시됩니다. 27장은 Commons 썸네일 원본(1280px, 일부 960px)을 16:10으로 자르고 1280×800 이하로 저장했으며(업스케일 없음), 가공 내역은 `modified`, 받은 원본의 SHA256은 `source_sha256`에 기록했습니다. 저작자·라이선스·Commons 출처 링크는 카드 크레딧에 그대로 표시됩니다. 데이터의 `thumb` 주소는 출처 기록용으로 남겨 두었습니다.
- `illustrations/` — ILLUSTRATION_NEEDED 장소용 AI 일러스트(16:10). 제작 목록은 [ILLUSTRATION_BRIEF.md](ILLUSTRATION_BRIEF.md)에 있습니다.
  **v0.11.3: 25장 적용(v0.11.2 10장 + v0.11.3 15장)** — 모두 AI 생성 콘셉트 이미지이며 실제 매장 사진이 아닙니다(카드에 `AI 이미지 · 실제 사진 아님` 표시). 실사 라이선스 표(아래)와 별개이며, 실사를 대체하지 않습니다. 업종·장면·입점 형태가 맞지 않거나 실제 캐릭터·로고·간판 글자가 들어간 이미지는 넣지 않습니다.
- 전체 장소별 점검 결과는 [IMAGE_AUDIT.md](IMAGE_AUDIT.md)에 있습니다.

SNS(Instagram/Xiaohongshu)·블로그·Google 이미지 검색 결과·라이선스 미확인 사진은 넣지 않습니다. Google 이미지 검색은 카드의 **PHOTOS ↗** 링크로만 연결합니다.

## 실사 출처 · 라이선스 (2026-09-29 Commons API로 확인 · v0.11.1 4장은 2026-10-17 재확인)

CC BY-SA 사진을 잘라 만든 사본은 원본과 같은 CC BY-SA 라이선스로 배포하며, 카드 크레딧에 `(cropped)`로 수정 사실을 표시합니다.

CC BY / CC BY-SA 사진은 **저작자·라이선스 표기가 의무**입니다. 카드 우하단 크레딧(클릭 시 Commons 파일 페이지)으로 표기하고 있으니 지우지 마세요. CC BY-SA 사진을 잘라 쓴 derivative(photos/*.webp)도 같은 CC BY-SA 조건이 적용됩니다.

| 로컬 파일 | spot id | Commons 파일 | 저작자 | 라이선스 |
|---|---|---|---|---|
| photos/the-louis.webp | gs-the-louis | [The Louis, Louis Vuitton Flagship Store 20251128.jpg](https://commons.wikimedia.org/wiki/File:The_Louis,_Louis_Vuitton_Flagship_Store_20251128.jpg) | Supanut Arunoprayote | CC BY 4.0 |
| photos/starbucks-reserve-roastery.webp | gs-starbucks-reserve-roastery | [Starbucks Reserve Roastery Shanghai 02.jpg](https://commons.wikimedia.org/wiki/File:Starbucks_Reserve_Roastery_Shanghai_02.jpg) | Codas | CC BY-SA 4.0 |
| photos/the-stage.webp | gs-the-stage | [White Magnolia Plaza, view from Shangqiu road.jpg](https://commons.wikimedia.org/wiki/File:White_Magnolia_Plaza,_view_from_Shangqiu_road.jpg) | DmitryKvasov | CC0 |
| photos/north-bund.webp | gs-north-bund | [The North Bund, Shanghai.jpg](https://commons.wikimedia.org/wiki/File:The_North_Bund,_Shanghai.jpg) | 钉钉 | CC BY-SA 4.0 |
| photos/wukang-mansion.webp | gs-wukang-mansion | [Wukang Mansion 20251128.jpg](https://commons.wikimedia.org/wiki/File:Wukang_Mansion_20251128.jpg) | Supanut Arunoprayote | CC BY 4.0 |
| photos/wukang-road.webp | gs-wukang-road | [Wukang Road, Shanghai, May 2016.JPG](https://commons.wikimedia.org/wiki/File:Wukang_Road,_Shanghai,_May_2016.JPG) | SSYoung | CC BY-SA 4.0 |
| photos/anfu-road.webp | gs-anfu-road | [Anfulu 255 Hao Zhuzhai.JPG](https://commons.wikimedia.org/wiki/File:Anfulu_255_Hao_Zhuzhai.JPG) | Fayhoo | CC BY-SA 3.0 |
| photos/columbia-circle.webp | gs-columbia-circle | [Columbia Country Club 06.jpg](https://commons.wikimedia.org/wiki/File:Columbia_Country_Club_06.jpg) | WQL | CC BY-SA 4.0 |
| photos/andaz-itc.webp | gs-andaz-itc | [XuJiaHui-Complexe Shanghai ITC.jpg](https://commons.wikimedia.org/wiki/File:XuJiaHui-Complexe_Shanghai_ITC.jpg) | ShanghaiDream | CC0 |
| photos/tian-an-1000-trees.webp | gs-tian-an-1000-trees | [1000 Trees 20251127.jpg](https://commons.wikimedia.org/wiki/File:1000_Trees_20251127.jpg) | Supanut Arunoprayote | CC BY 4.0 |
| photos/bund.webp | gs-existing-bund | [HSBC Building and Custom House, Shanghai at night 20260417.jpg](https://commons.wikimedia.org/wiki/File:HSBC_Building_and_Custom_House,_Shanghai_at_night_20260417.jpg) | DvTor8303 | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| photos/nanjing-east-road.webp | gs-existing-nanjing-east-road | [2014.11.15.181406 Nanjing Road Pedestrian Zone Shanghai.jpg](https://commons.wikimedia.org/wiki/File:2014.11.15.181406_Nanjing_Road_Pedestrian_Zone_Shanghai.jpg) | Hermann Luyken | CC0 |
| photos/peoples-square.webp | gs-existing-peoples-square | [People's Square Shanghai November 2017 001.jpg](https://commons.wikimedia.org/wiki/File:People's_Square_Shanghai_November_2017_001.jpg) | King of Hearts | CC BY-SA 4.0 |
| photos/oriental-pearl.webp | gs-existing-oriental-pearl | [ShanghaiPearlTower.jpg](https://commons.wikimedia.org/wiki/File:ShanghaiPearlTower.jpg) | — | Public Domain |
| photos/lujiazui.webp | gs-existing-lujiazui | [Shanghai Lujiazui night skyline 2017 - Flickr.jpg](https://commons.wikimedia.org/wiki/File:Shanghai_Lujiazui_night_skyline_2017_-_Flickr.jpg) | Larry Qian | CC0 |
| photos/shanghai-tower.webp | gs-existing-shanghai-tower | [Shanghai Shanghai Tower 5166304.jpg](https://commons.wikimedia.org/wiki/File:Shanghai_Shanghai_Tower_5166304.jpg) | Ermell | CC0 |
| photos/xintiandi.webp | gs-existing-xintiandi | [新天地 = New Heaven & Earth (6033629189).jpg](https://commons.wikimedia.org/wiki/File:%E6%96%B0%E5%A4%A9%E5%9C%B0_%3D_New_Heaven_%26_Earth_(6033629189).jpg) | Can Pac Swire | CC BY-SA 2.0 |
| photos/tianzifang.webp | gs-existing-tianzifang | [Tianzifang 1.jpg](https://commons.wikimedia.org/wiki/File:Tianzifang_1.jpg) | 钉钉 | CC BY-SA 4.0 |
| photos/yuyuan.webp | gs-existing-yuyuan | [Yu Garden 1.jpg](https://commons.wikimedia.org/wiki/File:Yu_Garden_1.jpg) | — | Public Domain |
| photos/jingan-temple.webp | gs-existing-jingan-temple | [Jing'an temple.JPG](https://commons.wikimedia.org/wiki/File:Jing'an_temple.JPG) | J. Patrick Fischer | CC BY-SA 3.0 |
| photos/korean-provisional-govt.webp | gs-existing-korean-provisional-govt | [Entrance of Provisional Government of ROK in Shanghai.JPG](https://commons.wikimedia.org/wiki/File:Entrance_of_Provisional_Government_of_ROK_in_Shanghai.JPG) | Ericmetro | CC BY-SA 3.0 |
| photos/longhua.webp | gs-existing-longhua | [Longhua Pagoda, 2019-10-19 02.jpg](https://commons.wikimedia.org/wiki/File:Longhua_Pagoda,_2019-10-19_02.jpg) | Siyuwj | CC BY-SA 4.0 |
| photos/m50.webp | gs-existing-m50 | [201703 M50 Creative Park.jpg](https://commons.wikimedia.org/wiki/File:201703_M50_Creative_Park.jpg) | MNXANL | CC BY-SA 4.0 |
| photos/pudong-art-museum.webp | gs-existing-pudong-art-museum | [Museum of Art Pudong from the Bund.jpg](https://commons.wikimedia.org/wiki/File:Museum_of_Art_Pudong_from_the_Bund.jpg) | Simon Wade | CC BY-SA 4.0 |
| photos/xujiahui-library.webp | gs-existing-xujiahui-library | [徐家汇书院 08.jpg](https://commons.wikimedia.org/wiki/File:%E5%BE%90%E5%AE%B6%E6%B1%87%E4%B9%A6%E9%99%A2_08.jpg) | Nanhuajiaren | CC BY-SA 4.0 |
| photos/xujiahui-cathedral.webp | gs-existing-xujiahui-cathedral | [Xujiahui Cathedral, 2019-10-19 04.jpg](https://commons.wikimedia.org/wiki/File:Xujiahui_Cathedral,_2019-10-19_04.jpg) | Siyuwj | CC BY-SA 4.0 |
| photos/zhujiajiao.webp | gs-existing-zhujiajiao | [Zhujiajiao ancient water town, Nr. Shanghai, China - 1.jpg](https://commons.wikimedia.org/wiki/File:Zhujiajiao_ancient_water_town,_Nr._Shanghai,_China_-_1.jpg) | Lloyd Tudor | CC BY-SA 4.0 |
| photos/wuzhen.webp | gs-existing-wuzhen | [One of the waterways in Wuzhen Ancient Town.jpg](https://commons.wikimedia.org/wiki/File:One_of_the_waterways_in_Wuzhen_Ancient_Town.jpg) | Wanderingchina | CC BY 4.0 |

## v0.11.1 — repo에 포함한 사진 4장 (2026-10-17)

| 로컬 파일 | 카드 | 표시 | Commons 원본 | 저작자 | 촬영일 | 라이선스 | 수정 |
|---|---|---|---|---|---|---|---|
| photos/mms-shanghai.webp | M&M'S 上海 | 매장 정면 | [Shanghai M&M'S Facade.jpg](https://commons.wikimedia.org/wiki/File:Shanghai_M%26M%27S_Facade.jpg) (6138×4092) | Mepatm (본인 촬영) | 2018-09-16 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 16:10 크롭 + 1280×800 축소 · WebP. 사본도 CC BY-SA 4.0 |
| photos/shanghai-first-food-store.webp | 上海第一食品商店 | 매장 외관 | [Shanghai First Foodhall 20250501.jpg](https://commons.wikimedia.org/wiki/File:Shanghai_First_Foodhall_20250501.jpg) (5184×3456) | Suicasmo (본인 촬영) | 2025-05-01 | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 16:10 크롭 + 1280×800 축소 · WebP |
| photos/hugongguan.webp | 沪公馆 | **건물 외관 · 外滩22号** | [Butterfield & Swire.jpg](https://commons.wikimedia.org/wiki/File:Butterfield_%26_Swire.jpg) (2107×1403) | Fayhoo (본인 촬영) | 2015-01 이전 (Commons 업로드일 2015-01-25) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | 16:10 크롭 + 1280×800 축소 · WebP. 사본도 CC BY-SA 3.0 |
| photos/bund.webp | 외탄 (카드 + 지역 선택 타일) | 장소 | [HSBC Building and Custom House, Shanghai at night 20260417.jpg](https://commons.wikimedia.org/wiki/File:HSBC_Building_and_Custom_House,_Shanghai_at_night_20260417.jpg) (3767×2799) | DvTor8303 (본인 촬영) | 2026-04-17 | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | 16:10 크롭 + 1280×800 축소 · WebP |

장소 일치 근거
- M&M'S: Commons 분류 "M&M's World" · "East Nanjing Road". 2026-04-17 世茂广场 사진(DvTor8303, CC0)에서도 같은 정면 디자인 확인.
- 上海第一食品商店: Commons 분류 "Shanghai First Foodhall", 사진에 매장 세로 간판. 건물 전체가 이 매장.
- 沪公馆: 원본 설명 "太古洋行旧址 中山东二路22号" = 카드 주소(中山东二路22号 2楼). 사진 안 도로 표지판 "新永安路"(건물 모퉁이 도로).
- 외탄: 해관 시계탑 · HSBC 빌딩, 촬영 GPS 31.241161, 121.486050(외탄 앞 황푸강).

교체된 사진: 기존 외탄 사진 `Shanghai skyline from the bund.jpg`는 Commons의 출처·저작자 칸이 모두 pxfuel.com 주소뿐이어서 실제 촬영자와 라이선스를 확인할 수 없어 v0.11.1에서 교체했습니다.

검토했지만 적용하지 않은 후보: MINISO LAND(Flickr CC BY-NC 2.0 — 비상업 조건 판단을 보수적으로 보류), 李百蟹(沪公馆과 같은 외탄 22호 건물 → 반복 방지), monogram(世茂广场 사진에 M&M'S 정면이 크게 보여 오해 소지 · 같은 건물 반복), 点都德(사무동 외관만 보여 B1 식당을 설명하지 못함).


## v0.11.7 — 신규 장소 실사 2장 (2026-10-18 공개 승인)

신규 카드 张园 · 静安雕塑公园에 사용합니다(`GUIDE_IMAGE_MANIFEST`). 기존 56곳 사진과 파일명이 겹치지 않는 새 파일이며, 이로써 repo 안 실사는 33장(기존 31 + 신규 2), AI 이미지는 25장입니다. 카드 크레딧에는 두 장 모두 "(cropped)"로 가공 사실을 표시합니다.

| 로컬 파일 | 후보 | 표시 | Commons 원본 | 저작자 | 촬영일 | 라이선스 | 수정 |
|---|---|---|---|---|---|---|---|
| photos/zhangyuan.webp | 张园 (gs-zhangyuan) | 장소 | [Zhang Yuan, Shanghai, China 2024 (54281266880).jpg](https://commons.wikimedia.org/wiki/File:Zhang_Yuan,_Shanghai,_China_2024_(54281266880).jpg) (4000×1844, 원출처 [Flickr](https://www.flickr.com/photos/jafsegal/54281266880/)) | Juan Antonio Segal (카드 표기: "Juan Antonio Segal (cropped)") | 2024-12-30 | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | 16:10 크롭(왼쪽 기준) + 1280×800 축소 · WebP |
| photos/jingan-sculpture-park.webp | 静安雕塑公园 (gs-jingan-sculpture-park) | 입구 표지 | [Jing'an Sculpture Park.jpg](https://commons.wikimedia.org/wiki/File:Jing%27an_Sculpture_Park.jpg) (2272×1704) | Zhou Guanhuai (본인 촬영) | 2021-10-30 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 16:10 크롭 + 1280×800 축소 · WebP. 사본도 CC BY-SA 4.0 |

장소 일치 근거
- 张园: Commons 분류 "Zhangyuan (Swire)", 촬영 좌표 31.230555, 121.455509(威海路·茂名北路 일대), 사진 속 건물에 '张园 ZHANG YUAN' 간판.
- 静安雕塑公园: Commons 분류 "Jing'an Sculptures Park", 사진 속 입구 표지 '静安雕塑公园 JING'AN SCULPTURE PARK'.
- 내려받은 원본의 SHA-1이 Commons 기록과 일치(张园 d846200…, 静安 026733c…).
