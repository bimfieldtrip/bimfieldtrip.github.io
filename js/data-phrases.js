/**
 * data-phrases.js — v0.10 중국어 회화 탭 데이터 (정적 데이터 · 외부 요청 없음)
 *
 * 상하이 여행 중 바로 꺼내 쓰는 짧은 문장 위주입니다(교재용 아님).
 *   ko     : 한국어 뜻 (화면 1순위)
 *   zh     : 중국 본토 간체자 문장 (복사 · 음성 재생 대상은 이 값뿐)
 *   pinyin : 성조 포함 병음 (不/一 는 실제 발음대로 성조 변화를 반영)
 *   kr     : 한글 발음 — 중국어를 전혀 모르는 사람을 위한 "대략적인" 보조 표기
 *   tip    : (선택) 언제 쓰면 좋은지 한 줄
 *
 * 문장을 추가·수정할 때는 이 파일만 고치면 phrases.html에 그대로 반영됩니다.
 */
const PHRASE_CATEGORIES = [
  {
    id: "basic",
    label: "기본 인사 및 감사",
    short: "인사",
    phrases: [
      { ko: "안녕하세요", zh: "你好", pinyin: "nǐ hǎo", kr: "니 하오" },
      { ko: "감사합니다", zh: "谢谢", pinyin: "xièxie", kr: "씨에시에" },
      { ko: "실례합니다 · 죄송합니다", zh: "不好意思", pinyin: "bù hǎo yìsi", kr: "뿌 하오 이쓰", tip: "길을 묻거나 사람을 부를 때, 가볍게 사과할 때" },
      { ko: "저는 한국 사람이라 중국어를 잘 못해요", zh: "我是韩国人，不太会说中文。", pinyin: "Wǒ shì Hánguó rén, bú tài huì shuō Zhōngwén.", kr: "워 스 한궈런, 부 타이 후이 숴 중원" },
    ],
  },
  {
    id: "taxi",
    label: "택시 및 길 찾기",
    short: "택시 · 길",
    phrases: [
      { ko: "이 주소로 가 주세요", zh: "请带我去这个地址。", pinyin: "Qǐng dài wǒ qù zhège dìzhǐ.", kr: "칭 따이 워 취 쩌거 띠즈", tip: "Shanghai Guide 장소 카드의 중국어 주소와 함께 보여주세요" },
      { ko: "여기서 세워 주세요", zh: "请在这里停车。", pinyin: "Qǐng zài zhèlǐ tíngchē.", kr: "칭 짜이 쩌리 팅처" },
      { ko: "트렁크 좀 열어 주세요", zh: "请帮我开一下后备箱。", pinyin: "Qǐng bāng wǒ kāi yíxià hòubèixiāng.", kr: "칭 빵 워 카이 이샤 허우뻬이샹" },
      { ko: "지하철역이 어디예요?", zh: "地铁站在哪里？", pinyin: "Dìtiězhàn zài nǎlǐ?", kr: "띠티에짠 짜이 나리" },
      { ko: "화장실이 어디예요?", zh: "洗手间在哪里？", pinyin: "Xǐshǒujiān zài nǎlǐ?", kr: "시서우지엔 짜이 나리" },
    ],
  },
  {
    id: "food",
    label: "음식 주문",
    short: "음식",
    phrases: [
      { ko: "이거 주세요", zh: "我要这个。", pinyin: "Wǒ yào zhège.", kr: "워 야오 쩌거", tip: "메뉴판이나 사진을 손가락으로 가리키며" },
      { ko: "맵지 않게 해 주세요", zh: "请不要放辣。", pinyin: "Qǐng bú yào fàng là.", kr: "칭 부 야오 팡 라" },
      { ko: "고수는 빼 주세요", zh: "请不要放香菜。", pinyin: "Qǐng bú yào fàng xiāngcài.", kr: "칭 부 야오 팡 샹차이" },
      { ko: "차가운 걸로 주세요", zh: "我要冰的。", pinyin: "Wǒ yào bīng de.", kr: "워 야오 삥 더", tip: "음료 주문 시 — 따로 말하지 않으면 미지근하게 나올 수 있어요" },
      { ko: "계산할게요", zh: "你好，买单。", pinyin: "Nǐ hǎo, mǎidān.", kr: "니 하오, 마이딴", tip: "식당에서 직원을 부르며" },
    ],
  },
  {
    id: "pay",
    label: "결제 및 쇼핑",
    short: "결제 · 쇼핑",
    phrases: [
      { ko: "얼마예요?", zh: "多少钱？", pinyin: "Duōshao qián?", kr: "뚸샤오 치엔" },
      { ko: "알리페이로 결제할 수 있어요?", zh: "可以用支付宝吗？", pinyin: "Kěyǐ yòng Zhīfùbǎo ma?", kr: "커이 융 즈푸바오 마" },
      { ko: "카드 결제 돼요?", zh: "可以刷卡吗？", pinyin: "Kěyǐ shuākǎ ma?", kr: "커이 솨카 마" },
      { ko: "결제가 안 됐어요. 다시 해 볼게요", zh: "付款没成功，我再试一下。", pinyin: "Fùkuǎn méi chénggōng, wǒ zài shì yíxià.", kr: "푸콴 메이 청궁, 워 짜이 스 이샤" },
    ],
  },
  {
    id: "hotel",
    label: "호텔",
    short: "호텔",
    phrases: [
      { ko: "체크인할게요. 예약했어요", zh: "我要办理入住，我有预订。", pinyin: "Wǒ yào bànlǐ rùzhù, wǒ yǒu yùdìng.", kr: "워 야오 빤리 루주, 워 여우 위딩" },
      { ko: "체크아웃할게요", zh: "我要退房。", pinyin: "Wǒ yào tuìfáng.", kr: "워 야오 투이팡" },
      { ko: "짐 좀 맡아 주실 수 있어요?", zh: "可以帮我寄存行李吗？", pinyin: "Kěyǐ bāng wǒ jìcún xíngli ma?", kr: "커이 빵 워 지춘 싱리 마" },
    ],
  },
  {
    id: "emergency",
    label: "긴급 상황",
    short: "긴급",
    note: "중국 긴급전화 — 110 경찰 · 120 구급차 · 119 화재",
    phrases: [
      { ko: "도와주세요!", zh: "请帮帮我！", pinyin: "Qǐng bāngbang wǒ!", kr: "칭 빵방 워" },
      { ko: "병원에 가야 해요", zh: "我需要去医院。", pinyin: "Wǒ xūyào qù yīyuàn.", kr: "워 쉬야오 취 이위엔" },
      { ko: "여권을 잃어버렸어요", zh: "我的护照丢了。", pinyin: "Wǒ de hùzhào diū le.", kr: "워 더 후자오 띠우 러" },
      { ko: "경찰에 신고해 주세요", zh: "请帮我报警。", pinyin: "Qǐng bāng wǒ bàojǐng.", kr: "칭 빵 워 빠오징" },
    ],
  },
];
