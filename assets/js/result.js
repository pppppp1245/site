/**
 * result.js
 * 결과 화면 출력 로직
 */

// 1. URL에서 파라미터 가져오기
const params = new URLSearchParams(window.location.search);
const currentType = params.get("type");
const resultDataKey = params.get("result"); // 일반 테스트 결과 키
const paramName = params.get("name");       // 흑역사(meme) 전용 이름 키

// 2. 결과 데이터 정의 객체
const RESULT_DATA = {
  mood: {
    calm: { title: "포근한 위로 휴식 ☕", desc: "오늘은 따뜻한 차 한 잔과 함께 차분한 마음으로 하루를 정리해보세요. 스스로를 다독여주는 시간이 필요해요.", recom: "어쿠스틱, 재즈 플레이리스트 재생하기" },
    energetic: { title: "에너지 뿜뿜 파이팅 🔥", desc: "넘치는 에너지를 발산할 시간! 밖으로 나가 시원한 공기를 마시며 신나는 팝송을 들어보세요.", recom: "가장 좋아하는 카페나 핫플 방문하기" },
    sentimental: { title: "촉촉한 새벽 감성 🌙", desc: "감수성이 풍부해지는 오늘, 일기를 쓰거나 분위기 좋은 영화를 보는 걸 추천해요. 당신만의 세계에 빠져보세요.", recom: "나만 아는 인디 음악 들으며 방 안 불 끄기" }
  },
  spend: {
    flex: { title: "내 지갑은 열려있다 FLEX 💸", desc: "사고 싶은 건 꼭 사야 직성이 풀리는 쿨한 스타일이에요! 하지만 가끔은 미래의 나를 생각해볼까요?", recom: "장바구니 결제 버튼 누르기 전 5분만 고민해보기." },
    save: { title: "차곡차곡 모으는 저축왕 💰", desc: "미래를 위해 알뜰살뜰하게 자산을 관리하는 당신, 정말 칭찬해요! 경제관념이 아주 뚜렷하네요.", recom: "열심히 모은 돈으로 이번 주엔 나를 위한 작은 선물 하나 어때요?" },
    emotion: { title: "감성 한 스푼 소확행러 🌸", desc: "예쁜 포장이나 감동적인 스토리에 쉽게 마음을 뺏기는 감성 가득한 분이네요. 당신의 소확행 컬렉션을 존중해요.", recom: "실용성보단 예쁨! 오늘 꽂힌 예쁜 엽서라도 하나 사보아요." }
  },
  first: {
    cute: { title: "상큼 터지는 인간 비타민 🍋", desc: "주변을 환하게 밝히는 사랑스럽고 발랄한 첫인상이에요! 처음 보는 사람도 당신과 대화하면 쉽게 마음을 열 거예요.", recom: "언제나 그 매력적인 웃음을 잃지 마세요." },
    cold: { title: "시크하고 쿨한 차도남/녀 🕶️", desc: "처음엔 조금 다가가기 어려워 보일 수 있지만, 친해지면 엄청난 반전 매력과 의리를 보여주는 스타일이군요.", recom: "가끔은 먼저 따뜻한 인사 한마디 건네보는 건 어떨까요?" },
    warm: { title: "누구에게나 기대기 좋은 난로 ☕", desc: "부드럽고 편안한 인상을 가졌네요. 주변 사람들이 당신에게悩み을 자주 털어놓지 않나요? 포근한 이미지가 강점이에요.", recom: "주변을 챙기는 것도 좋지만, 나부터 먼저 챙기는 거 잊지 마세요." }
  },
  travel: {
    plan: { title: "파워 J의 완벽한 계산 ✈️", desc: "당신은 철저하고 완벽하게 모든 동선을 계획하는 스타일입니다! 시간과 돈을 가장 효율적으로 쓰는 마스터네요.", recom: "가끔은 계획이 조금 틀어져도 그 안에서 여유를 찾아보세요." },
    free: { title: "발길 닿는 곳이 곧 목적지 🌿", desc: "머리 아픈 계획보다는 직감과 그날의 기분에 따라 움직이는 자유로운 영혼입니다. 유연한 대처 능력이 훌륭하네요.", recom: "우연히 들어간 식당에서 인생 맛집을 발견할 확률 100%!" },
    healing: { title: "침대가 제일 좋아 힐링 추구자 🛌", desc: "여행=쉬는 것! 호캉스를 가거나 예쁜 카페에서 멍 때리는 걸 가장 좋아하는 당신, 충분한 쉼표가 필요한 시점이네요.", recom: "이번 주말, 아무것도 하지 않아도 되는 조용한 숙소를 예약해보세요." }
  },
  love: {
    straight: { title: "후진은 없다! 불도저 직진 💘", desc: "사랑 앞에서는 숨김없이 솔직한 당신! 재지 않고 자신의 마음을 당당하게 표현하는 멋진 스타일이네요.", recom: "당신의 솔직하고 맑은 마음에 상대도 분명 반할 거예요." },
    careful: { title: "천천히 따뜻해지는 로맨티스트 💌", desc: "돌다리도 백 번 두들겨보는 신중한 타입입니다. 진지하고 깊은 관계를 원하며, 한번 마음을 열면 오래가는 온도네요.", recom: "조금 더 용기를 내어 가끔은 먼저 다가가 보세요." },
    pushpull: { title: "아슬아슬 밀당의 달인 🦊", desc: "밀고 당기는 매력으로 상대의 애간장을 태우는 당신! 본능적으로 어떻게 해야 상대가 나에게 빠지는지 아는 고수네요.", recom: "너무 밀기만 하면 멀어질 수 있으니, 당길 땐 확실히 당겨주세요!" }
  },
  sns: {
    record: { title: "나의 발자취 기록러 📝", desc: "오늘의 감정, 먹은 것, 만난 사람 등 모든 일상을 꼼꼼하게 남기는 기록의 달인! 훗날 큰 추억 자산이 될 거예요.", recom: "부담 갖지 말고 지금처럼 당신만의 박물관을 채워가세요." },
    lurk: { title: "알고리즘만 타는 눈팅족 🥷", desc: "굳이 올릴 필요 있나? 유익하거나 재밌는 콘텐츠를 보는 것만으로도 충분히 목적을 달성하는 실속파입니다.", recom: "가끔은 친한 지인 게시물에 하트 하나 남겨서 생존 신고를 해보세요." },
    share: { title: "도파민 보급소 밈 전파자 📢", desc: "흥미로운 소식이나 재밌는 짤은 참을 수 없어! 빠르게 친구들을 태그하고 단톡방으로 나르는 진정한 인싸시군요.", recom: "덕분에 친구들의 단톡방은 오늘도 심심할 틈이 없습니다." }
  },
  rest: {
    home: { title: "완벽한 방어막! 프로 집콕러 🏠", desc: "침대 밖은 위험해! 넷플릭스, 배달음식, 푹신한 이불만 있다면 그곳이 천국이라고 느끼는 완벽한 집순이/집돌이입니다.", recom: "마음껏 뒹굴거리세요. 당신이 가장 충전되는 방식이니까요." },
    active: { title: "움직여야 충전되는 에너자이저 🔋", desc: "쉬는 날 집에만 있으면 오히려 좀이 쑤시는 스타일! 새로운 경험을 하고 사람들을 만나야 시너지가 나는군요.", recom: "이번 주말, 평소 가보고 싶었던 전시회나 액티비티를 강추합니다." },
    healing: { title: "자연 속 느린 걸음 🌳", desc: "복잡한 도심을 벗어나 조용한 숲길이나 바다를 보며 힐링하는 걸 선호하시는군요. 마음의 평화가 1순위인 분입니다.", recom: "가까운 근교 공원에서 따뜻한 햇살을 맞으며 산책해보세요." }
  },
  fan: {
    allin: { title: "나의 모든 걸 바치는 기둥형 💳", desc: "내 최애를 위해서라면 아낌없이 주는 나무! 콘서트 올출 열정부터 굿즈 수집까지 덕질의 정석을 걷고 계시네요.", recom: "열정적인 덕질은 일상의 강력한 원동력이 됩니다. 끝까지 응원해요!" },
    hidden: { title: "나만 아는 소중한 비밀 숨덕 🤫", desc: "굳이 세상 사람들에게 알리지 않고 혼자서 조용하고 밀도 있게 즐기는 덕질! 오직 나와 최애만이 아는 평화로운 세계네요.", recom: "일코(일반인 코스프레)를 철저히 지키며 평화로운 덕질을 이어가세요." }
  },
  drama: {
    romance: { title: "몽글몽글 설렘 주의보 💖", desc: "당신의 인생 장르는 보는 것만으로도 입가에 미소가 지어지는 달달한 로맨틱 코미디! 사랑이 넘치는 따뜻한 감성을 지녔어요.", recom: "현실에서도 드라마 주인공처럼 로맨틱한 일들이 일어날 거예요." },
    growth: { title: "역경을 딛고 피는 꽃 🎬", desc: "어려움을 극복하며 어제보다 나은 오늘을 만들어가는 당신, 눈물 찡한 성장 스토리의 멋진 주인공입니다.", recom: "수고했어, 오늘도. 당신의 앞날은 늘 반짝일 거예요." },
    makjang: { title: "도파민 팡팡! 매운맛 파티 🌶️", desc: "잔잔한 건 지루해! 반전의 반전을 거듭하는 스펙타클한 일상을 즐기거나 자극을 추구하는 화끈한 성향이네요.", recom: "지루할 틈 없는 당신의 남은 오늘 하루도 팝콘 각! 즐기세요." }
  },
  playlist: {
    calm: { title: "감성 한도 초과 🌙", desc: "당신의 고요한 플레이리스트는 어지러운 세상을 차분하게 정돈해 주는 매력이 있습니다. 섬세한 감성을 지니셨네요.", recom: "부드러운 조명 아래서 가장 좋아하는 인디 음악을 재생해보세요." },
    energy: { title: "인간 에너자이저 🔥", desc: "듣고 있으면 절로 어깨가 들썩! 흥과 긍정적인 에너지가 넘치는 멋진 성향을 가지고 계시네요.", recom: "오늘 하루도 음악 볼륨과 텐션을 끝까지 끌어올려 보세요!" },
    healing: { title: "포근한 마음의 쉼표 🌿", desc: "당신의 플레이리스트 속 노래들은 마치 따스한 봄햇살 같아요. 마음이 따뜻한 힐링 성향이시군요.", recom: "창밖을 보며 따뜻한 차 한 잔 마시는 여유를 가져보세요." }
  }
};

// 3. 흑역사(meme) 랜덤 데이터
const MEME_RESULTS = [
  "중학교 2학년, 이어폰이 뽑힌 줄도 모르고 버스 안에서 엑소 춤을 추던 [{name}]...",
  "새벽 2시 감성에 취해 전 애인에게 '자니...?' 문자를 보내버린 [{name}]...",
  "길거리에서 비둘기한테 말 걸다가 지나가는 친구랑 눈 마주친 [{name}]...",
  "피씨방에서 컵라면 먹다가 게임 지고 모니터에 후루룩 뿜은 [{name}]...",
  "자소서 단점에 '치명적인 매력'이라고 적었다가 서류 광탈당한 [{name}]..."
];

// 결과 화면 렌더링 함수
function initResult() {
  const resultBoxEl = document.getElementById("result-box");

  if (!currentType) {
    alert("테스트 데이터가 없습니다.");
    window.location.href = "index.html";
    return;
  }

  // =========================================
  // A. 특수 생성기 출력 로직 (흑역사, 영화)
  // =========================================
  if (currentType === "meme" || currentType === "movie") {
    if (!paramName) {
      alert("입력된 이름이 없습니다.");
      window.location.href = "index.html";
      return;
    }
    
    if (currentType === "meme") {
        const randomIndex = Math.floor(Math.random() * MEME_RESULTS.length);
        const rawText = MEME_RESULTS[randomIndex];
        const finalText = rawText.replace("[{name}]", `[ ${paramName} ]`);

        resultBoxEl.innerHTML = `
          <div class="result-img fade-in">🙈</div>
          <h2 class="result-title fade-in" style="animation-delay: 0.1s;">오 마이 갓...</h2>
          <div class="result-desc fade-in" style="animation-delay: 0.2s;">
            <p style="font-size: 1.25rem; font-weight: bold; color: var(--color-primary); line-height: 1.6;">"${finalText}"</p>
          </div>
          <div class="result-recom fade-in" style="animation-delay: 0.3s;">
            <p>💡 이 흑역사는 저희 서버도 모르게 무덤까지 비밀로 해드릴게요.</p>
          </div>
        `;
    } 
    else if (currentType === "movie") {
        const TITLE_PART_1 = ["잃어버린", "빛나는", "어느 날의", "마지막", "너와 나의", "시간을 건너는", "기억 속의"];
        const TITLE_PART_2 = ["여름", "기억", "선택", "순간", "우주", "비밀", "편지"];
        const part1 = TITLE_PART_1[Math.floor(Math.random() * TITLE_PART_1.length)];
        const part2 = TITLE_PART_2[Math.floor(Math.random() * TITLE_PART_2.length)];
        const movieTitle = `${part1} ${part2}`;

        resultBoxEl.innerHTML = `
          <div class="result-img fade-in">🍿</div>
          <h2 class="result-title fade-in" style="animation-delay: 0.1s;">[ ${paramName} ] 주연 영화</h2>
          <div class="result-desc fade-in" style="animation-delay: 0.2s;">
            <p style="font-size: 2rem; font-weight: 800; color: var(--color-primary); line-height: 1.4;">🎬 "${movieTitle}"</p>
          </div>
          <div class="result-recom fade-in" style="animation-delay: 0.3s;">
            <p>💡 감동과 반전이 있는 대서사시, 올겨울 전국 극장 개봉 예정!</p>
          </div>
        `;
    }
    
    addShareUI();
    return;
  }

  // =========================================
  // B. 미니게임 결과 출력 로직
  // =========================================
  if (currentType === "click" || currentType === "timing" || currentType === "stack") {
      const score = params.get("score");
      let titleHtml = "", descHtml = "", recomHtml = "";
      let iconHtml = "🎮";

      if (currentType === "click") {
          iconHtml = "⚡";
          const s = parseInt(score);
          if (s < 25) { titleHtml = "여유 만만 나무늘보 😴"; descHtml = `5초 동안 ${s}번 클릭하셨군요! 느긋한 플레이 스타일입니다.`; recomHtml = "손가락 스트레칭 필수!"; }
          else if (s <= 45) { titleHtml = "준수한 일반인 🙂"; descHtml = `5초 동안 ${s}번 터치! 일상 생활에 매우 적합한 속도입니다.`; recomHtml = "조금 더 피치를 올려볼까요?"; }
          else { titleHtml = "동에 번쩍 빛의 속도 ⚡"; descHtml = `5초 동안 무려 ${s}번! 손가락에 모터가 달렸네요!`; recomHtml = "당신의 손가락은 키보드 워리어 그 자체!"; }
      } 
      else if (currentType === "timing") {
          iconHtml = "🎯";
          if (score === "Perfect") { titleHtml = "타이밍 마스터 등장 🎯"; descHtml = "중앙에 완벽하게 적중했습니다! 순발력이 훌륭하시네요."; recomHtml = "당신의 동체시력, 더 이상 바랄 게 없습니다."; }
          else if (score === "Good") { titleHtml = "아쉬운 찰나 👍"; descHtml = "아주 조금 빗나갔지만, 훌륭한 타이밍 감각입니다!"; recomHtml = "다시 도전하면 분명 완벽할 거예요."; }
          else { titleHtml = "엇박자의 늪 🤦‍♂️"; descHtml = "박자가 영 맞지 않네요. 마음이 너무 급했나 봐요!"; recomHtml = "침착하게 다시 한 번 타이밍을 노려봅시다."; }
      }
      else if (currentType === "stack") {
          iconHtml = "🧱";
          titleHtml = `도달 층수 : ${score}층 탑 🏙️`;
          descHtml = `집중력을 발휘하여 흔들리는 블럭을 ${score}층까지 쌓아올렸습니다.`;
          recomHtml = (score > 10) ? "건축가의 재능이 엿보입니다!" : "블럭이 꽤 무거웠나 봐요. 한 번 더 도전!";
      }

      resultBoxEl.innerHTML = `
        <div class="result-img fade-in">${iconHtml}</div>
        <h2 class="result-title fade-in" style="animation-delay: 0.1s;">${titleHtml}</h2>
        <div class="result-desc fade-in" style="animation-delay: 0.2s;">
          <p>${descHtml}</p>
        </div>
        <div class="result-recom fade-in" style="animation-delay: 0.3s;">
          <p>💡 ${recomHtml}</p>
        </div>
      `;
      addShareUI();
      return;
  }

  // =========================================
  // C. 일반 테스트 결과 출력 로직
  // =========================================
  if (!RESULT_DATA[currentType] || !RESULT_DATA[currentType][resultDataKey]) {
    alert("결과 데이터를 찾을 수 없습니다.");
    window.location.href = "index.html";
    return;
  }

  const resultInfo = RESULT_DATA[currentType][resultDataKey];
  
  resultBoxEl.innerHTML = `
    <h2 class="result-title fade-in">${resultInfo.title}</h2>
    <div class="result-desc fade-in" style="animation-delay: 0.1s;">
      <p>${resultInfo.desc}</p>
    </div>
    <div class="result-recom fade-in" style="animation-delay: 0.2s;">
      <p>💡 ${resultInfo.recom}</p>
    </div>
  `;
  
  addShareUI();
}

// "다시하기" 버튼 클릭 시 실행할 함수 (전역 노출 필요)
window.retryTest = function() {
    if(currentType === "click" || currentType === "timing" || currentType === "stack") {
        window.location.href = `game.html?type=${currentType}`;
    } else if(currentType) {
        window.location.href = `test.html?type=${currentType}`;
    } else {
        window.location.href = `index.html`;
    }
};

// "공유하기" UI 추가 함수
function addShareUI() {
    const actions = document.querySelector(".result-actions");
    if(actions && !document.querySelector(".btn-share")) {
        const shareBtn = document.createElement("button");
        shareBtn.className = "btn btn--primary btn--large btn-share fade-in";
        shareBtn.style.animationDelay = "0.5s";
        shareBtn.style.background = "#fee500"; // 카카오톡 색상
        shareBtn.style.color = "#191919";
        shareBtn.style.boxShadow = "none";
        shareBtn.innerHTML = "결과 카톡으로 공유하기 💬";
        shareBtn.onclick = () => alert("공유하기 기능은 준비 중입니다!");
        actions.appendChild(shareBtn);
    }
}

document.addEventListener("DOMContentLoaded", initResult);
