#!/bin/bash
# PREP "03 필수 앱" 카드용 공식 앱 아이콘 받기 (Mac 터미널에서 실행)
# - Apple App Store 공식 조회 API(itunes.apple.com/lookup)에서 각 앱 개발사가 등록한 아이콘(512px)을 받습니다.
# - 결과: ~/Downloads/prep_app_icons/<id>.jpg 7개 + SOURCES.txt (앱 이름 · App Store ID · 원본 URL)
# - 저장소에는 이 파일들을 웹용(128px webp)으로 줄인 assets/prep/apps/<id>.webp 가 들어갑니다.
# - 아이콘은 각 회사의 상표입니다. Hub에서는 "어떤 앱인지 알아보는 용도"로만 표시합니다.
set -euo pipefail
OUT="${1:-$HOME/Downloads/prep_app_icons}"
mkdir -p "$OUT"
: > "$OUT/SOURCES.txt"

# id(사이트 데이터의 앱 id) : App Store ID
APPS="alipay:333206289 wechat:414478124 amap:461703208 didi:554499054 meituan:423084029 dianping:351091731 xiaohongshu:741292507"

for pair in $APPS; do
  id="${pair%%:*}"; aid="${pair##*:}"
  json="$(curl -fsSL "https://itunes.apple.com/lookup?id=${aid}&country=cn")"
  url="$(printf '%s' "$json" | grep -o '"artworkUrl512":"[^"]*"' | head -1 | cut -d'"' -f4)"
  name="$(printf '%s' "$json" | grep -o '"trackName":"[^"]*"' | head -1 | cut -d'"' -f4)"
  if [ -z "$url" ]; then echo "✗ ${id}: 아이콘 주소를 찾지 못했습니다 (App Store ID ${aid})"; continue; fi
  curl -fsSL "$url" -o "$OUT/${id}.jpg"
  printf '%s\t%s\t%s\t%s\n' "$id" "$aid" "$name" "$url" >> "$OUT/SOURCES.txt"
  echo "✓ ${id}  ${name}"
done
echo "완료: $OUT"
