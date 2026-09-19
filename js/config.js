/**
 * config.js — v0.6: 외부 서비스 연결 정보를 이 파일 한 곳에서만 관리합니다.
 *
 * 이 프로젝트(GitHub Pages, Public Frontend)는 실제 참가자 인증·개인정보를 절대
 * 다루지 않습니다. 실제 Room/Roommate/Taxi Team/Check-in/Admin 운영 기능은 전부
 * Google Apps Script 기반 Private Participant Portal(별도 프로젝트)에서 처리되며,
 * 여기에는 그 Portal의 공개 Web App URL만 둡니다.
 *
 * ⚠️ 이 파일에는 절대 다음을 넣지 마세요:
 *   - 실제 참가자 4자리 코드(개인 코드) / 코드 hash / ACCESS_SECRET
 *   - 실제 참가자 이름·연락처·방 배정·Taxi Team 등 개인정보
 *   - Google Sheet ID, Apps Script 내부 로직
 * Apps Script Web App URL 자체는 공개 웹 링크이므로 프론트엔드에 두어도 되지만,
 * 로그인·개인정보 검증은 계속 Apps Script 쪽에서만 이루어집니다 — 이 프로젝트는
 * "GitHub → Private Portal 이동"까지만 담당합니다.
 *
 * ⚠️ 아래 값은 지금 <APPS_SCRIPT_WEB_APP_URL> placeholder 상태입니다. 실제 Apps
 * Script Web App을 배포한 뒤, 이 한 줄만 실제 /exec URL로 바꾸면 상단/하단 내비게이션의
 * MY TRIP, Home의 My Trip CTA, Schedule의 My Trip 링크가 전부 이 URL로 같은 탭에서
 * 바로 이동합니다(goToPrivatePortal(), main.js). placeholder가 남아 있는 동안은
 * isPortalConfigured()(main.js)가 false를 반환해, 이동하지 않고 간단한 안내만 보여줍니다.
 *
 * v0.6.2부터 GitHub 쪽에는 Private Portal로 가는 중간 안내 페이지(과거 my-trip.html)를
 * 두지 않습니다. Public UI(index.html, itinerary.html, guide.html, prep.html 등)가
 * 앞으로 계속 바뀌어도, Private Portal 연결 지점은 이 파일과 main.js의
 * participantPortalUrl()/goToPrivatePortal() 두 곳만 그대로 유지하면 됩니다.
 */
const APP_CONFIG = {
  // Google Apps Script — Private Participant Portal Web App URL
  participantPortalUrl: "https://script.google.com/macros/s/AKfycbyrTeY01HyPuHs9xSrV8iMRZYGdYNMFclAFt2NrRAuJzLa23g818IwS4ULvmLA959AX/exec",
};
