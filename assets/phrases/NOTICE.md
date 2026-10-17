# 중국어 회화 음성 파일 (assets/phrases/*.mp3) — 출처 및 고지

이 폴더의 MP3 25개는 `js/data-phrases.js`의 중국어 문장(`zh`)을 음성 합성 모델로 **사전에 생성한 합성 음성**입니다.
실제 사람의 녹음이 아니며, 외부 TTS API를 사용하지 않고 오프라인에서 생성했습니다.

## 사용 모델

| 항목 | 내용 |
| --- | --- |
| 모델 | Kokoro-82M **v1.1-zh** (hexgrad) — https://huggingface.co/hexgrad/Kokoro-82M-v1.1-zh |
| 배포본 | sherpa-onnx `kokoro-multi-lang-v1_1` (k2-fsa) — https://github.com/k2-fsa/sherpa-onnx/releases/tag/tts-models |
| 실행 도구 | sherpa-onnx v1.13.8 (`sherpa-onnx-offline-tts`, Linux x64) |
| 화자 | **75번 = `zm_041`** (중국어 남성) |
| 속도 | 1.0 (모델 기본값, 늘리거나 줄이지 않음) |
| 발음 보정 | 보조 발음 사전 2개 항목만 추가: `一下` → yí xià, `不太` → bú tài (원문은 변경하지 않음) |
| 후처리 | 앞뒤 무음 정리(앞 0.1초 · 뒤 0.15초 여유), 음량 -18 LUFS로 통일, 피크 -1.5 dBFS 제한 |
| 형식 | MP3, 모노, 24 kHz, 48 kbps (메타데이터 제거) |

## 라이선스

- **모델 가중치:** Apache License 2.0 — 배포 파일에 포함된 라이선스 원문을 `LICENSE-Kokoro-Apache-2.0.txt`로 함께 둡니다.
- **생성된 음성:** 모델 페이지에 생성 음성의 사용을 제한하는 조건은 적혀 있지 않습니다.
- **학습 데이터(중국어 화자):** 모델 페이지는 데이터 회사 LongMaoData가 제공한 전문 데이터셋이며
  "자유롭고 허용적으로(freely and permissively)" 제공되었다고만 밝히고 있습니다. **해당 데이터의 구체적인 이용 조건은 공개되어 있지 않아 확인하지 못했습니다.**

이 고지는 법률 자문이 아니며, 확인 시점(2026-10-17)의 공개 자료를 기준으로 합니다.

## 감사

- Kokoro: hexgrad · 중국어 데이터: LongMaoData · ONNX 변환/실행: k2-fsa sherpa-onnx

## 문장을 바꿀 때

`js/data-phrases.js`의 `zh`를 고치면 같은 이름(`audio` 값)의 MP3를 위 설정으로 다시 생성해야 합니다.
MP3를 다시 만들지 않으면 화면의 문장과 소리가 달라집니다.
