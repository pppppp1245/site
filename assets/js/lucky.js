/**
 * lucky.js
 * 행운 문구 뽑기 게임 인터랙션 로직
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 결과 텍스트 모음 (감성과 재미 중심)
    const LUCKY_TEXT = [
      "오늘은 당신의 날입니다 ✨ 무엇을 해도 다 잘 풀릴 걸요?",
      "생각지도 못한 좋은 일이 곧 찾아옵니다. 기대해도 좋아요! 💖",
      "망설이고 있던 일, 지금 바로 도전하세요. 🚀",
      "너무 무리하지 마세요. 오늘은 편안하게 쉬어도 괜찮아요. 🌿",
      "뜻밖의 반가운 연락이 올지도 몰라요. 📞",
      "오늘 우연히 발견한 장소가 당신의 인생 핫플이 될 거예요. 🍔",
      "지나가다 들은 노래 한 곡이 당신의 하루를 따뜻하게 위로해 줄 거예요. 🎵",
      "베푼 작은 친절이 아주 큰 행운으로 돌아옵니다. 🎁",
      "오늘은 조금 특별한 행운이 따릅니다. 로또라도 한 장 어때요? 🍀",
      "당신의 웃는 모습이 누군가에겐 큰 위로가 됩니다. 항상 웃으세요! 😊"
    ];

    // 2. 요소 선택
    const btnDraw = document.getElementById("btn-draw");
    const btnRetry = document.getElementById("btn-retry");
    const machineKnob = document.getElementById("machine-knob");
    const activeCapsule = document.getElementById("active-capsule");
    const resultBox = document.getElementById("lucky-result");
    const resultText = document.getElementById("lucky-text");
    const guideText = document.getElementById("capsule-guide");

    // 상태 관리 변수
    let isDrawing = false;
    let isCapsuleReady = false;

    // 3. '행운 뽑기 시작' 버튼 클릭 이벤트
    btnDraw.addEventListener("click", () => {
        // 이미 진행 중이면 중복 실행 방지
        if (isDrawing) return;
        isDrawing = true;
        isCapsuleReady = false;
        
        // UI 초기화 세팅
        btnDraw.style.display = "none";
        resultBox.style.display = "none";
        guideText.style.display = "none";
        activeCapsule.classList.remove("open", "drop");
        
        // 머신 손잡이 부드럽게 회전
        machineKnob.classList.add("spin");
        
        // 회전 후 캡슐 떨어지기
        setTimeout(() => {
            machineKnob.classList.remove("spin");
            // CSS 애니메이션 'drop' 시작
            activeCapsule.classList.add("drop");
            
            // 캡슐이 바닥에 안착하는 시간(1.2초) 대기 후 가이드 표시
            setTimeout(() => {
                isCapsuleReady = true; // 이제 클릭 가능
                guideText.style.display = "block";
            }, 1200);

        }, 400); // 손잡이 돌리는 연출 시간
    });

    // 4. 떨어진 캡슐 클릭 이벤트
    activeCapsule.addEventListener("click", () => {
        // 캡슐이 떨어지기 전이거나 아직 바닥에 닿지 않았으면 무시
        if (!isCapsuleReady) return;
        isCapsuleReady = false; // 중복 클릭 방지
        
        guideText.style.display = "none";

        // 캡슐 폭발/오픈 진동 애니메이션 ('open' 클래스)
        activeCapsule.classList.add("open");
        
        // 랜덤 문구 뽑기
        const randomIndex = Math.floor(Math.random() * LUCKY_TEXT.length);
        const randomMessage = LUCKY_TEXT[randomIndex];
        resultText.textContent = randomMessage;
        
        // 캡슐 애니메이션(0.5초) 종료 후 결과 박스 등장
        setTimeout(() => {
            resultBox.style.display = "block";
            // 부드러운 스크롤 이동
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500); 
    });

    // 5. '다시 뽑기' 버튼 클릭 이벤트
    btnRetry.addEventListener("click", () => {
        // 모든 상태를 초기화하고 처음 화면 구도로 복귀
        isDrawing = false;
        resultBox.style.display = "none";
        activeCapsule.classList.remove("open", "drop");
        btnDraw.style.display = "inline-flex";
        
        // 화면 스크롤 위로
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
