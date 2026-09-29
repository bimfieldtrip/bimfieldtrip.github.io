#!/usr/bin/env python3
"""
fetch_guide_photos.py — Shanghai Guide 실사(Wikimedia Commons)를 repo 안으로 가져오기

js/data-guide.js 의 GUIDE_IMAGE_MANIFEST 에서 kind: "photo" 항목을 읽어
Commons 공식 썸네일(1280px)을 내려받고, 카드 비율(16:10)에 맞춰 1280x800으로
잘라 assets/guide/photos/<slug>.webp 로 저장합니다(원본 Commons 파일은 수정하지 않음).

사용법 (repo 루트에서):
    pip install pillow
    python3 tools/fetch_guide_photos.py

끝나면 js/data-guide.js 의 `const GUIDE_LOCAL_PHOTOS = false;` 를 true 로 바꾸세요.
그러면 로컬 webp → (없으면) Commons 썸네일 → (그래도 실패하면) placeholder 순으로 표시됩니다.
저작자 표기(CC BY / CC BY-SA)는 카드 우하단 크레딧으로 계속 표시되므로 지우지 마세요.
"""
import io
import re
import sys
import urllib.request
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow가 필요합니다:  pip install pillow")

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "js" / "data-guide.js"
OUT = ROOT / "assets" / "guide" / "photos"
W, H = 1280, 800  # 16:10
UA = "BIMFieldTripHub/0.8 (https://bimfieldtrip.github.io; guide photo localization)"

src = DATA.read_text(encoding="utf-8")
block = src.split("const GUIDE_IMAGE_MANIFEST", 1)[1].split("\n};", 1)[0]
rows = re.findall(r'"(gs-[^"]+)":\s*\{\s*kind:\s*"photo"(.*?)\},?\n', block)
if not rows:
    sys.exit("GUIDE_IMAGE_MANIFEST 에서 photo 항목을 찾지 못했습니다.")

OUT.mkdir(parents=True, exist_ok=True)


def focus_of(body):
    m = re.search(r'focus:\s*"(\d+)% (\d+)%"', body)
    return (int(m.group(1)) / 100, int(m.group(2)) / 100) if m else (0.5, 0.5)


ok = 0
for spot_id, body in rows:
    thumb = re.search(r'thumb:\s*"([^"]+)"', body).group(1)
    slug = re.sub(r"^gs-(existing-)?", "", spot_id)
    dest = OUT / f"{slug}.webp"
    if dest.exists():
        print(f"skip  {dest.name} (이미 있음)")
        ok += 1
        continue
    try:
        req = urllib.request.Request(thumb, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=30) as r:
            im = Image.open(io.BytesIO(r.read())).convert("RGB")
    except Exception as e:  # noqa: BLE001
        print(f"FAIL  {spot_id}: {e}")
        continue
    fx, fy = focus_of(body)
    # object-fit: cover + object-position 과 같은 방식으로 16:10 crop
    scale = max(W / im.width, H / im.height)
    rw, rh = round(im.width * scale), round(im.height * scale)
    im = im.resize((rw, rh), Image.LANCZOS)
    left, top = round((rw - W) * fx), round((rh - H) * fy)
    im = im.crop((left, top, left + W, top + H))
    im.save(dest, "WEBP", quality=80, method=6)
    print(f"ok    {dest.name}  {dest.stat().st_size // 1024} KB")
    ok += 1

print(f"\n{ok}/{len(rows)} 완료 → {OUT.relative_to(ROOT)}")
print("js/data-guide.js 에서 GUIDE_LOCAL_PHOTOS = true 로 바꾸면 로컬 사진을 사용합니다.")
