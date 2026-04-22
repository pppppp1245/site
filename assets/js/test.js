/**
 * test.js
 * 테스트 진행 로직
 */

// 1. URL에서 type 값 가져오기
const params = new URLSearchParams(window.location.search);
const currentType = params.get("type");

// 2. 테스트 데이터 객체 생성
const TEST_DATA = {
  mood: {
    title: "오늘의 무드 추천 😴",
    questions: [
      { q: "지금 가장 끌리는 날씨는?", options: [{ text: "포근하고 따뜻한 햇살", type: "calm" }, { text: "바람이 부는 시원한 날씨", type: "energetic" }, { text: "비가 내리는 감성적인 날", type: "sentimental" }] },
      { q: "지금 마시고 싶은 음료는?", options: [{ text: "따뜻하고 향긋한 차", type: "calm" }, { text: "톡 쏘는 시원한 탄산", type: "energetic" }, { text: "달콤하고 부드러운 라떼", type: "sentimental" }] },
      { q: "주말에 하고 싶은 일은?", options: [{ text: "집에서 조용히 책 읽기", type: "calm" }, { text: "친구들과 신나게 놀기", type: "energetic" }, { text: "분위기 좋은 카페 가기", type: "sentimental" }] }
    ]
  },
  spend: {
    title: "소비 성향 테스트 💸",
    questions: [
      { q: "월급이 들어왔다! 가장 먼저 할 일은?", options: [{ text: "일단 사고 싶었던 물건 결제!", type: "flex" }, { text: "언제나 그렇듯 적금부터 넣는다", type: "save" }, { text: "나를 위한 예쁜 소품을 구경한다", type: "emotion" }] },
      { q: "친구 생일 선물을 고를 때 나는?", options: [{ text: "무조건 비싸고 좋은 브랜드", type: "flex" }, { text: "가성비 좋고 실용적인 아이템", type: "save" }, { text: "포장이 예쁘고 감성적인 선물", type: "emotion" }] },
      { q: "스트레스 받을 때 나의 행동은?", options: [{ text: "장바구니를 싹 비운다", type: "flex" }, { text: "통장 잔고를 보며 마음 다스리기", type: "save" }, { text: "달콤하고 맛있는 디저트로 힐링", type: "emotion" }] }
    ]
  },
  first: {
    title: "첫인상 유형 테스트 👀",
    questions: [
      { q: "처음 보는 사람들과 있을 때 나는?", options: [{ text: "먼저 말을 걸며 분위기를 띄운다", type: "cute" }, { text: "조용히 앉아서 사람들을 관찰한다", type: "cold" }, { text: "상대방의 말에 리액션을 잘해준다", type: "warm" }] },
      { q: "자주 듣는 첫인상은?", options: [{ text: "밝고 활기차서 귀여워 보인다", type: "cute" }, { text: "도시적이고 약간 시크해 보인다", type: "cold" }, { text: "인상이 좋고 다정해 보인다", type: "warm" }] },
      { q: "나의 평소 표정은?", options: [{ text: "자주 웃음이 터지는 편이다", type: "cute" }, { text: "집중하면 무표정일 때가 많다", type: "cold" }, { text: "부드럽고 온화한 미소를 짓는다", type: "warm" }] }
    ]
  },
  travel: {
    title: "여행 스타일 테스트 ✈️",
    questions: [
      { q: "여행을 가기로 했다. 가장 먼저 할 일은?", options: [{ text: "엑셀을 켜서 분 단위 일정표를 짠다", type: "plan" }, { text: "비행기 표만 끊고 바로 출발 대기!", type: "free" }, { text: "가장 뷰가 좋은 예쁜 숙소부터 찾는다", type: "healing" }] },
      { q: "여행 중 예상치 못하게 비가 온다면?", options: [{ text: "미리 짜둔 실내 플랜B로 이동한다", type: "plan" }, { text: "비 맞는 것도 낭만! 우산 없이 걷는다", type: "free" }, { text: "숙소에서 빗소리를 들으며 푹 쉰다", type: "healing" }] },
      { q: "가장 기억에 남는 여행의 순간은?", options: [{ text: "계획했던 모든 일정을 완벽히 소화했을 때", type: "plan" }, { text: "계획에 없던 예쁜 골목을 우연히 발견했을 때", type: "free" }, { text: "맛있는 음식을 먹으며 여유를 즐겼을 때", type: "healing" }] }
    ]
  },
  love: {
    title: "연애 유형 테스트 💖",
    questions: [
      { q: "마음에 드는 사람을 발견했다!", options: [{ text: "망설임 없이 바로 호감을 표시한다", type: "straight" }, { text: "조심스럽게 다가가며 상대를 탐색한다", type: "careful" }, { text: "상대방이 나에게 먼저 오도록 유도한다", type: "pushpull" }] },
      { q: "연락할 때 나의 스타일은?", options: [{ text: "확인하는 즉시 칼답장!", type: "straight" }, { text: "바쁠 땐 늦지만 할 말이 있을 땐 진중하게", type: "careful" }, { text: "가끔은 답장을 미루며 상대방 애태우기", type: "pushpull" }] },
      { q: "기념일이 다가온다. 준비는?", options: [{ text: "서프라이즈 파티와 선물 준비 완료!", type: "straight" }, { text: "상대방이 진짜 필요한 선물을 꼼꼼히 체크", type: "careful" }, { text: "은근슬쩍 상대방이 나에게 해줄 걸 기대하기", type: "pushpull" }] }
    ]
  },
  sns: {
    title: "SNS 성향 테스트 📱",
    questions: [
      { q: "진짜 맛있는 음식을 먹을 때 나는?", options: [{ text: "일단 사진부터 찍어서 SNS 스토리 업로드", type: "record" }, { text: "가장 맛있을 때 바로 입으로 직행한다", type: "lurk" }, { text: "사진은 찍지만 올리기보단 친구 단톡방에 자랑", type: "share" }] },
      { q: "현재 내 SNS 피드의 상태는?", options: [{ text: "나의 다양한 일상이 예쁘게 꽉 차 있다", type: "record" }, { text: "게시물 0개거나 거의 버려진 계정이다", type: "lurk" }, { text: "유머 짤, 정보성 글 리그램이 더 많다", type: "share" }] },
      { q: "친구의 새로운 게시물을 봤을 때 나는?", options: [{ text: "보는 즉시 좋아요 누르고 폭풍 댓글 달기", type: "record" }, { text: "마음속으로만 좋아요를 누르고 조용히 넘어간다", type: "lurk" }, { text: "너무 웃긴 글이면 다른 친구를 폭풍 태그한다", type: "share" }] }
    ]
  },
  rest: {
    title: "휴식 스타일 테스트 🛋️",
    questions: [
      { q: "기다리던 주말이 왔다! 나는?", options: [{ text: "이불 밖은 위험해. 침대와 물아일체", type: "home" }, { text: "평일에 못 간 핫플레이스 무조건 탐방", type: "active" }, { text: "사람 없는 자연 속으로 떠나기", type: "healing" }] },
      { q: "스트레스가 극에 달했을 때 나는?", options: [{ text: "집에서 혼자 넷플릭스 보며 맛있는 거 먹기", type: "home" }, { text: "땀을 흠뻑 흘리는 격렬한 운동하기", type: "active" }, { text: "조용한 공원 산책이나 멍 때리기", type: "healing" }] },
      { q: "내 인생에서 가장 행복한 순간은?", options: [{ text: "샤워 후 보송보송한 이불 속으로 들어갔을 때", type: "home" }, { text: "바빴던 하루를 마치고 성취감을 느낄 때", type: "active" }, { text: "예쁜 풍경 사진을 찍고 감상할 때", type: "healing" }] }
    ]
  },
  fan: {
    title: "덕질 유형 테스트 🎧",
    questions: [
      { q: "최애의 새로운 굿즈/앨범이 출시됐다!", options: [{ text: "무조건 종류별로 다 산다 (소장용/실사용)", type: "allin" }, { text: "실용적인 것 하나만 사거나 안 산다", type: "hidden" }] },
      { q: "최애의 굿즈를 평소에 사용할 때 나는?", options: [{ text: "에코백, 폰케이스 등 동네방네 티 낸다", type: "allin" }, { text: "일반인 코스프레하며 티 안 나는 디자인만 쓴다", type: "hidden" }] },
      { q: "주변 사람들이 내 덕질 사실을 아는가?", options: [{ text: "내가 입을 열면 무조건 그 이야기라 다 안다", type: "allin" }, { text: "아주 친한 사람 소수에게만 고백했다", type: "hidden" }] }
    ]
  },
  drama: {
    title: "인생 드라마 장르 테스트 🎬",
    questions: [
      { q: "새로운 드라마를 고르는 기준은?", options: [{ text: "주인공들의 케미가 넘치는 러브라인", type: "romance" }, { text: "탄탄한 스토리 라인과 교훈적인 내용", type: "growth" }, { text: "마라맛 같은 고자극의 빠른 전개", type: "makjang" }] },
      { q: "드라마를 볼 때 가장 몰입되는 장면은?", options: [{ text: "남녀 주인공의 애틋한 첫 키스신", type: "romance" }, { text: "주인공이 시련을 극복하고 성공하는 씬", type: "growth" }, { text: "충격적인 반전이나 악역이 몰락하는 씬", type: "makjang" }] },
      { q: "주말 내내 한 장르만 정주행한다면?", options: [{ text: "달달하고 가슴 따뜻한 로맨틱 코미디", type: "romance" }, { text: "주인공과 함께 울고 웃는 성장 스토리물", type: "growth" }, { text: "욕하면서도 계속 보게 되는 자극적인 치정극", type: "makjang" }] }
    ]
  },
  meme: {
    title: "흑역사 생성기 😂",
    isSpecial: true,
    desc: "당신의 이름을 입력하면 AI가 숨겨진 흑역사를 폭로합니다..."
  },
  playlist: {
    title: "플레이리스트 감성 테스트 🎧",
    questions: [
      { q: "새벽 2시, 잠이 오지 않을 때 듣고 싶은 노래는?", options: [{ text: "눈 감기 좋은 어쿠스틱", type: "calm" }, { text: "방구석 댄스유발 팝송", type: "energy" }, { text: "바람 소리 같은 백색소음", type: "healing" }] },
      { q: "비 오는 날 차창 밖을 보며 생각나는 곡은?", options: [{ text: "아련하고 슬픈 인디 발라드", type: "calm" }, { text: "리듬감이 매력적인 R&B", type: "energy" }, { text: "차분하고 따뜻한 피아노곡", type: "healing" }] },
      { q: "아침 출근/등굣길, 기분을 끌어올릴 곡은?", options: [{ text: "가사가 예쁜 희망찬 보컬곡", type: "calm" }, { text: "빠른 템포의 아이돌 댄스곡", type: "energy" }, { text: "청량감이 터지는 밴드 곡", type: "healing" }] }
    ]
  },
  movie: {
    title: "인생 영화 제목 생성기 🎬",
    isSpecial: true,
    desc: "당신의 삶이 한 편의 영화라면? 주인공의 이름을 입력해주세요."
  }
};

// 3. 상태 변수
let currentQuestionIndex = 0;
let scores = {}; // 선택된 타입들의 점수를 저장할 객체

// 요소 선택
const testTitleEl = document.getElementById("test-title");
const testContainerEl = document.getElementById("test-container");

// 초기 세팅 함수
function initTest() {
  if (!currentType || !TEST_DATA[currentType]) {
    alert("유효하지 않은 테스트입니다. 메인 화면으로 돌아갑니다.");
    window.location.href = "index.html";
    return;
  }

  const testConfig = TEST_DATA[currentType];
  testTitleEl.textContent = testConfig.title;

  // 특수 생성기 종류는 별도 Input 화면 처리
  if (testConfig.isSpecial) {
    renderSpecialInput();
  } else {
    renderQuestion();
  }
}

// 4. 질문 진행 로직
function renderQuestion() {
  const testConfig = TEST_DATA[currentType];
  const qData = testConfig.questions[currentQuestionIndex];
  
  // 컨테이너 초기화 및 HTML 생성
  testContainerEl.innerHTML = `
    <div class="question-header fade-in">
        <span class="question-num">Q${currentQuestionIndex + 1}</span>
    </div>
    <h2 class="question-text fade-in" style="animation-delay: 0.1s;">${qData.q}</h2>
    <div class="options-group fade-in-up" style="animation-delay: 0.2s;">
        ${qData.options.map(opt => `
            <button class="btn btn--outline btn--large option-btn" data-type="${opt.type}">
                ${opt.text}
            </button>
        `).join("")}
    </div>
  `;

  // 질문 변경 시마다 트리거를 위해 애니메이션 상태 리셋
  testContainerEl.classList.remove("fade-in");
  void testContainerEl.offsetWidth; // DOM reflow 강제
  testContainerEl.classList.add("fade-in");

  // 버튼 이벤트 연결
  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      handleOptionClick(btn.dataset.type);
    });
  });
}

function handleOptionClick(selectedType) {
  // 선택된 type 점수 누적
  scores[selectedType] = (scores[selectedType] || 0) + 1;
  const testConfig = TEST_DATA[currentType];

  // 다음 질문이 있으면 진행, 없으면 결과 결과 계산
  if (currentQuestionIndex < testConfig.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    calculateAndRedirect();
  }
}

// 5. 결과 계산
function calculateAndRedirect() {
  let finalResult = null;
  let maxScore = -1;

  // 가장 높은 점수를 얻은 type 찾기
  for (const [type, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      finalResult = type;
    }
  }

  // 결과 페이지 이동 (결과 데이터와 함께)
  window.location.href = `result.html?type=${currentType}&result=${finalResult}`;
}

// 6. 흑역사 / 영화 생성기 전용 로직
function renderSpecialInput() {
  const isMovie = currentType === "movie";
  const placeholderText = isMovie ? "주인공의 이름을 입력해주세요" : "이름을 입력해주세요 (예: 김철수)";
  const btnText = isMovie ? "인생 영화 찾기 🎬" : "흑역사 결과 보기 🚀";

  testContainerEl.innerHTML = `
    <p class="meme-desc fade-in" style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 24px; color: var(--color-text-muted);">${TEST_DATA[currentType].desc}</p>
    <div class="meme-input-group fade-in-up" style="animation-delay: 0.1s;">
      <input type="text" id="meme-name" placeholder="${placeholderText}" class="input-text">
      <button id="meme-submit" class="btn btn--primary btn--large" style="margin-top: 16px;">${btnText}</button>
    </div>
  `;

  document.getElementById("meme-submit").addEventListener("click", () => {
    const nameStr = document.getElementById("meme-name").value.trim();
    if (!nameStr) {
      alert(isMovie ? "주인공 이름이 필요해요!" : "이름을 꼭 입력해주세요!");
      return;
    }
    // 생성기들은 result 대신 name 파라미터 전달
    window.location.href = `result.html?type=${currentType}&name=${encodeURIComponent(nameStr)}`;
  });
}

// 페이지 로드 시 초기화 실행
document.addEventListener("DOMContentLoaded", initTest);
