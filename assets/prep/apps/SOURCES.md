# PREP 앱 아이콘 출처 (v0.11.9)

PREP "03 필수 앱" 카드에서 각 앱을 알아보는 용도로만 표시합니다. 아이콘은 각 회사의 상표입니다.

- 받은 곳: Apple App Store 공식 조회 API(`itunes.apple.com/lookup?id=…&country=cn`)의 `artworkUrl512` — 앱 개발사가 App Store에 등록한 아이콘
- 받은 날: 2026-10-29 (사용자 Mac에서 `tools/download_prep_app_icons.sh`와 같은 명령으로 받음)
- 가공: 512×512 JPEG → 128×128 WebP로 축소만 함(자르기 · 색 · 모양 편집 없음). 화면에서는 40px, 모서리는 CSS로 둥글게 표시

| 파일 | App Store ID | App Store 앱 이름 | 원본 URL |
| --- | --- | --- | --- |
| `alipay.webp` | 333206289 | 支付宝-你的AI生活伙伴 | https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9d/f5/0b/9df50b9c-2ebe-bb6b-bcc0-fb4ac366ba94/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg |
| `wechat.webp` | 414478124 | 微信 | https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/84/6b/3a/846b3ab8-9dea-e3e5-861e-f6ecaa0b3387/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-0-0-85-220.png/512x512bb.jpg |
| `amap.webp` | 461703208 | 高德地图-高德打车,导航公交地铁出行 | https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f6/c8/a5/f6c8a5d8-478e-5b1c-47a4-f4fe72fafcee/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg |
| `didi.webp` | 554499054 | 滴滴-打车骑车顺风车火车票租车代驾送货 | https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7c/e5/49/7ce5491b-3995-e441-16e8-40b447cb34ea/AppIcon_default-0-0-1x_U007emarketing-0-6-0-0-85-220.png/512x512bb.jpg |
| `meituan.webp` | 423084029 | 美团-问美团，都安排 | https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d0/f8/fa/d0f8fa57-8cec-b526-d19e-3bc52a2c8d8b/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-85-220.png/512x512bb.jpg |
| `dianping.webp` | 351091731 | 大众点评 - 吃喝玩乐指南 | https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/32/90/f1/3290f10b-2410-9fd3-5a85-b9db97871377/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg |
| `xiaohongshu.webp` | 741292507 | 小红书 - 你的生活兴趣社区 | https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/01/f5/1e/01f51e82-86bf-2056-0e8d-ba7efb3dca55/AppIcon-0-0-1x_U007epad-0-11-0-85-220.png/512x512bb.jpg |

앱 아이콘이 바뀌면 같은 스크립트를 다시 실행해 이 표와 파일을 함께 갱신하세요.
