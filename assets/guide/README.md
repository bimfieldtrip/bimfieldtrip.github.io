# assets/guide — Shanghai Guide 이미지

이미지 우선순위: **실사(라이선스 확인) > 장소를 묘사한 완성 일러스트 > 기존 SVG placeholder**

- `photos/` — Wikimedia Commons 실사의 웹용 16:10 WebP derivative(1280×800). `python3 tools/fetch_guide_photos.py`로 생성하고, `js/data-guide.js`의 `GUIDE_LOCAL_PHOTOS`를 `true`로 바꾸면 사용됩니다. 그 전에는 Commons 공식 썸네일 CDN(thumb.wikimedia.org)에서 불러옵니다.
- `illustrations/` — ILLUSTRATION_NEEDED 장소용 AI 일러스트(16:10). 제작 목록은 [ILLUSTRATION_BRIEF.md](ILLUSTRATION_BRIEF.md)에 있습니다.
- 전체 장소별 점검 결과는 [IMAGE_AUDIT.md](IMAGE_AUDIT.md)에 있습니다.

SNS(Instagram/Xiaohongshu)·블로그·Google 이미지 검색 결과·라이선스 미확인 사진은 넣지 않습니다. Google 이미지 검색은 카드의 **PHOTOS ↗** 링크로만 연결합니다.

## 실사 출처 · 라이선스 (2026-09-29 Commons API로 확인)

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
| photos/bund.webp | gs-existing-bund | [Shanghai skyline from the bund.jpg](https://commons.wikimedia.org/wiki/File:Shanghai_skyline_from_the_bund.jpg) | — | CC0 |
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
