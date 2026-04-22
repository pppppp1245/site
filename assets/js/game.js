/**
 * game.js
 * 미니게임 로직 제어 및 결과 모달 랜더링 (클릭, 타이밍, 블럭 쌓기)
 * 10~20대 감성에 맞춘 이너 모달(Overlay) 방식으로 결과 UI 개선
 */

const params = new URLSearchParams(window.location.search);
const gameType = params.get("type");

const gameTitleEl = document.getElementById("game-title");
const gameContainer = document.getElementById("game-container");
const btnStart = document.getElementById("btn-start");

// 공통 상태 변수
let isPlaying = false;
let reqId; // requestAnimationFrame 식별자

// DOM Load 시 진입로직
document.addEventListener("DOMContentLoaded", () => {
    if(!gameType) {
        alert("게임 정보가 유효하지 않습니다!");
        window.location.href = "arcade.html";
        return;
    }

    if(gameType === "click") {
        initClickGame();
    } else if(gameType === "timing") {
        initTimingGame();
    } else if(gameType === "stack") {
        initStackGame();
    } else if(gameType === "redlight") {
        initRedLightGame();
    } else {
        alert("알 수 없는 게임입니다!");
        window.location.href = "arcade.html";
    }

    // 결과 모달 버튼 이벤트 전역 할당
    document.getElementById("btn-retry").addEventListener("click", () => {
        // 가장 깔끔한 방법인 페이지 리로드(Param 유지)
        window.location.reload();
    });

    document.getElementById("btn-home").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});

/* ====================================================
   [전역 기능] 결과 모달 표시 기능
   기존 result.html 로 이동하지 않고 바로 화면에 예쁘게 오버레이
   ==================================================== */
function showResult(type, score) {
    const overlay = document.getElementById("game-result-overlay");
    const content = document.getElementById("game-result-content");
    
    let titleHtml = "";
    let descHtml = "";
    let iconHtml = "🎮";

    if (type === "click") {
        iconHtml = "⚡";
        const s = parseInt(score);
        if (s < 20) { 
            titleHtml = "나무늘보 😴"; 
            descHtml = `5초 동안 <b>${s}</b>번 터치!<br>느긋하고 우아한 플레이 스타일입니다.`; 
        } else if (s <= 40) { 
            titleHtml = "준수한 일반인 🙂"; 
            descHtml = `5초 동안 <b>${s}</b>번 터치!<br>일상 생활에 아주 적합한 속도입니다.`; 
        } else { 
            titleHtml = "빛의 속도 ⚡"; 
            descHtml = `5초 동안 무려 <b>${s}</b>번 터치!<br>손가락에 모터가 달린 것이 분명합니다!`; 
        }
    } 
    else if (type === "timing") {
        iconHtml = "🎯";
        if (score === "Perfect") { 
            titleHtml = "타이밍 마스터 🎯"; 
            descHtml = "중앙에 완벽하게 적중!<br>엄청난 집중력과 순발력입니다."; 
        } else if (score === "Good") { 
            titleHtml = "아쉬운 찰나 👍"; 
            descHtml = "조금 빗나갔지만 훌륭한 타이밍 감각!<br>한 번 더 해보시면 감이 올 거예요."; 
        } else { 
            titleHtml = "엇박자의 늪 🤦‍♂️"; 
            descHtml = "박자가 영 안 맞네요!<br>마음이 너무 급했던 건 아닐까요?"; 
        }
    }
    else if (type === "stack") {
        iconHtml = "🧱";
        titleHtml = `${score}층 돌파 🏙️`;
        descHtml = (score > 10) 
            ? `집중하여 <b>${score}층</b>까지 쌓았습니다!<br>건축가의 재능이 엿보이네요.`
            : `조금 아쉬운 <b>${score}층</b> 기록이네요.<br>한 번 더 시도해보세요!`;
    }
    else if (type === "redlight") {
        iconHtml = score.isWin ? "🎉" : "💀";
        titleHtml = score.isWin ? "도전 성공!" : "발각되었습니다!";
        descHtml = `도달 단계: <b>Stage ${score.stage}</b><br>최종 진행률: <b>${score.progress}%</b>`;
    }

    // 결과 내용물 조립
    content.innerHTML = `
        <div class="game-score-icon">${iconHtml}</div>
        <h3 class="game-score-title">${titleHtml}</h3>
        <p class="game-score-desc">${descHtml}</p>
    `;

    // 오버레이 표시 및 렌더링 애니메이션 트리거
    overlay.classList.remove("hidden");
}

/* ====================================================
   1. 클릭 속도 테스트 게임 로직
   ==================================================== */
function initClickGame() {
    gameTitleEl.textContent = "⚡ 클릭 속도 테스트";
    gameContainer.innerHTML = `<div id="click-area" class="click-area">터치!</div>`;
    btnStart.textContent = "타이머 시작 🚀";
    
    let clicks = 0;
    let timeLeft = 0;
    const clickArea = document.getElementById("click-area");

    btnStart.addEventListener("click", () => {
        clicks = 0;
        timeLeft = 5;
        isPlaying = true;
        btnStart.style.display = "none";
        
        clickArea.innerHTML = `<span style="font-size:1.5rem;color:var(--color-primary-dark);">남은 시간: ${timeLeft}초</span><br/>${clicks}`;
        
        const timer = setInterval(() => {
            timeLeft--;
            if(timeLeft > 0) {
                clickArea.innerHTML = `<span style="font-size:1.5rem;color:var(--color-primary-dark);">남은 시간: ${timeLeft}초</span><br/>${clicks}`;
            } else {
                // 게임 오버
                clearInterval(timer);
                isPlaying = false;
                clickArea.innerHTML = `<span style="font-size:2.5rem; color:#ff4d4d;">타임 오버!</span>`;
                
                // 모달 띄우기
                setTimeout(() => {
                    showResult("click", clicks);
                }, 800);
            }
        }, 1000);
    });

    clickArea.addEventListener("pointerdown", (e) => {
        if(!isPlaying) return;
        e.preventDefault(); // 더블탭 확대 방지
        clicks++;
        clickArea.innerHTML = `<span style="font-size:1.5rem;color:var(--color-primary-dark);">남은 시간: ${timeLeft}초</span><br/>${clicks}`;
    });
}

/* ====================================================
   2. 타이밍 맞추기 게임 로직
   ==================================================== */
function initTimingGame() {
    gameTitleEl.textContent = "🎯 타이밍 맞추기";
    gameContainer.innerHTML = `
        <div class="timing-target"></div>
        <div id="timing-bar" class="timing-bar"></div>
    `;
    btnStart.textContent = "타이밍 바 시작 🕹️";
    
    let isMoving = false;
    let pos = 0;
    let dir = 1;
    let speed = 9; // 약간 빠른 시작
    const bar = document.getElementById("timing-bar");
    let containerW = 0;
    
    function animate() {
        if(!isMoving) return;
        pos += dir * speed;
        // 좌우 끝벽 충돌 시 방향 턴
        if(pos >= containerW - 8) { pos = containerW - 8; dir = -1; speed += 0.5; }
        if(pos <= 0) { pos = 0; dir = 1; speed += 0.5; }
        bar.style.left = pos + "px";
        reqId = requestAnimationFrame(animate);
    }
    
    btnStart.addEventListener("click", () => {
        if(!isMoving) {
            containerW = gameContainer.offsetWidth; 
            isMoving = true;
            btnStart.textContent = "지금 정지! 🎯";
            btnStart.style.background = "#ff758c"; 
            animate();
        } else {
            isMoving = false;
            cancelAnimationFrame(reqId);
            
            // 유효성 판별
            const targetCenter = containerW / 2;
            const barCenter = pos + 4; // 8px 너비 감안
            const dist = Math.abs(targetCenter - barCenter);
            
            let resultKey = "Miss";
            if(dist <= 25) resultKey = "Perfect";
            else if(dist <= 55) resultKey = "Good";
            
            btnStart.textContent = "결과 판별 중...";
            bar.style.transform = "scale(1.5)"; // 시각 강조
            
            // 모달 띄우기
            setTimeout(() => {
                showResult("timing", resultKey);
            }, 800);
        }
    });
}


/* ====================================================
   3. 무한 블럭 쌓기 게임 로직
   ==================================================== */
function initStackGame() {
    gameTitleEl.textContent = "🧱 흔들흔들 블럭 쌓기";
    gameContainer.innerHTML = `<div id="stack-area" style="position:relative; width:100%; height:100%;"></div>`;
    btnStart.textContent = "첫 블럭 생성 🚀";
    
    let isMoving = false;
    let floor = 0;
    let blockWidth = 0; 
    let blockPos = 0;
    let lastBlockPos = null;
    let dir = 1;
    let speed = 4;
    
    const stackArea = document.getElementById("stack-area");
    let containerW = 0;
    let containerH = 0;
    
    function createBlock() {
        const blk = document.createElement("div");
        blk.className = "stack-block fade-in";
        blk.id = "active-block";
        blk.style.width = blockWidth + "px";
        blk.style.bottom = (floor * 35) + "px";
        stackArea.appendChild(blk);
    }
    
    function animateBlock() {
        if(!isMoving) return;
        const blk = document.getElementById("active-block");
        if(blk) {
            blockPos += dir * speed;
            if(blockPos >= containerW - blockWidth) { 
                blockPos = containerW - blockWidth; 
                dir = -1; 
            }
            if(blockPos <= 0) { 
                blockPos = 0; 
                dir = 1; 
            }
            blk.style.left = blockPos + "px";
        }
        reqId = requestAnimationFrame(animateBlock);
    }
    
    function processDrop() {
        if(floor === 0 && !isMoving) {
            containerW = gameContainer.offsetWidth;
            containerH = gameContainer.offsetHeight;
            blockWidth = containerW * 0.45; // 초기 45% 크기 할당
            
            btnStart.textContent = "올리기! (빈 화면 터치)";
            isMoving = true;
            createBlock();
            animateBlock();
            return;
        }
        
        if(!isMoving) return;

        const blk = document.getElementById("active-block");
        if(!blk) return;
        
        blk.removeAttribute("id"); 
        blk.classList.remove("fade-in");
        
        if(lastBlockPos !== null) {
            const diff = Math.abs(blockPos - lastBlockPos);
            
            if(diff > blockWidth - 5) {
                // 게임 오버
                isMoving = false;
                cancelAnimationFrame(reqId);
                blk.style.transform = "translateY(50px) rotate(25deg)";
                blk.style.opacity = "0";
                
                btnStart.style.background = "#ccc";
                btnStart.textContent = `게임 오버! (${floor}층)`;
                
                // 모달 띄우기
                setTimeout(() => {
                    showResult("stack", floor);
                }, 1000);
                return;
            } else {
                // 일부 깎여나감
                blockWidth -= diff;
                
                if(blockPos > lastBlockPos) {
                   // 우측으로 벗어남
                } else {
                   blockPos = lastBlockPos; 
                   blk.style.left = blockPos + "px";
                }
                blk.style.width = blockWidth + "px"; 
            }
        }
        
        lastBlockPos = blockPos;
        floor++;
        speed += 0.4;
        btnStart.textContent = `올리기! (${floor}층 돌파)`;

        if((floor + 1) * 35 >= containerH) {
             isMoving = false;
             cancelAnimationFrame(reqId);
             btnStart.textContent = "천장 도달! 클리어 🎉";
             
             // 모달 띄우기
             setTimeout(() => {
                 showResult("stack", floor);
             }, 1000);
             return;
        }
        
        blockPos = 0;
        dir = 1;
        createBlock();
    }

    btnStart.addEventListener("click", processDrop);
    gameContainer.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        processDrop();
    });
}

/* ====================================================
   4. 무궁화 꽃이 피었습니다 게임 로직
   ==================================================== */
/* ====================================================
   4. 무궁화 꽃이 피었습니다 게임 로직
   ==================================================== */
// 게임마다 전역으로 분리해 두어 이벤트 중복 등록을 방지합니다.
let redlightKeyHandler = null;
let redlightTouchMoveHandler = null;

function initRedLightGame() {
    // 2. DOM 요소 null 에러 방지
    if (gameTitleEl) gameTitleEl.textContent = "🌺 무궁화 꽃이 피었습니다";
    
    if (gameContainer) {
        gameContainer.innerHTML = `
            <div class="redlight-header">
                <div class="redlight-stage-info" id="redlight-stage-text">현재 단계: 1단계</div>
                <div class="redlight-sub-status" id="redlight-sub-status">대기 중</div>
            </div>
            
            <div class="redlight-progress-wrapper fade-in-up">
                <div class="redlight-gauge-bg">
                    <div id="redlight-progress-fill" class="redlight-gauge-fill"></div>
                </div>
                <div id="redlight-progress-text" class="redlight-progress-text">0%</div>
            </div>

            <div id="redlight-arena" class="redlight-arena fade-in-up">
                <!-- 시작 전 화면 -->
                <div id="redlight-start-screen" class="redlight-overlay-card">
                    <h2 class="redlight-overlay-title">준비 완료</h2>
                    <p class="redlight-overlay-desc">버튼을 눌러 게임을 시작하세요</p>
                    <div class="redlight-overlay-actions">
                        <button id="btn-start-game" class="rl-btn-primary">게임 시작</button>
                    </div>
                </div>

                <!-- 단계 클리어 화면 -->
                <div id="redlight-next-screen" class="redlight-overlay-card hidden">
                    <h2 class="redlight-overlay-title">단계 클리어! 🎉</h2>
                    <p class="redlight-overlay-desc">다음 단계에 도전하세요.</p>
                    <div class="redlight-overlay-actions">
                        <button id="btn-next-stage" class="rl-btn-primary">다음 단계 ▶</button>
                    </div>
                </div>

                <div id="redlight-status" class="redlight-status status-green hidden">대기중</div>
                <div id="redlight-character" class="redlight-character hidden"><span class="redlight-char-inner">🏃</span></div>
                <div class="redlight-goal hidden" id="redlight-goal-container">
                    <div class="tagger" id="redlight-tagger" style="transition: transform 0.2s;">👧</div>
                </div>
            </div>
            <div class="redlight-footer fade-in-up" style="animation-delay: 0.1s; text-align:center; padding-bottom:10px;">
                <button id="redlight-btn-move" class="redlight-btn-move" style="display:none;">🏃 이동하기</button>
            </div>
        `;
        
        // 컨테이너가 모바일에서 280px로 고정되어 버튼이 잘리는 현상을 방지
        gameContainer.style.height = "auto";
        gameContainer.style.minHeight = "450px";
        gameContainer.style.padding = "20px 0";
    }
    
    // 글로벌 버튼 제거 (새로 만든 overlay 화면 버튼을 사용)
    if (btnStart) btnStart.style.display = "none";
    const gameActionsEl = document.querySelector(".game-actions");
    if (gameActionsEl) gameActionsEl.style.display = "none";

    // 1. 상태 변수 확실히 정의 (isPlaying 변수 미정의 오류 해결)
    let isPlaying = false; 
    let isGreen = false;
    let currentStage = 1;
    let progress = 0;
    let loopTimeout = null;
    let isPractice = false;
    
    // DOM Elements (체크 후 안전하게 사용)
    const arenaEl = document.getElementById("redlight-arena");
    const charEl = document.getElementById("redlight-character");
    const stageEl = document.getElementById("redlight-stage-text");
    const progressFillEl = document.getElementById("redlight-progress-fill");
    const progressTextEl = document.getElementById("redlight-progress-text");
    const subStatusEl = document.getElementById("redlight-sub-status");
    const statusEl = document.getElementById("redlight-status");
    
    const startScreenEl = document.getElementById("redlight-start-screen");
    const nextScreenEl = document.getElementById("redlight-next-screen");
    const btnStartGame = document.getElementById("btn-start-game");
    const btnNextStage = document.getElementById("btn-next-stage");

    const btnMove = document.getElementById("redlight-btn-move");
    const taggerEl = document.getElementById("redlight-tagger");
    const goalContainerEl = document.getElementById("redlight-goal-container");

    const STAGE_CONFIG = {
        1: { min: 2500, max: 3000, fakeProb: 0, redMin: 1500, redMax: 2000 },
        2: { min: 2000, max: 2500, fakeProb: 0, redMin: 1200, redMax: 1800 },
        3: { min: 1500, max: 2000, fakeProb: 0, redMin: 1000, redMax: 1500 },
        4: { min: 1200, max: 1800, fakeProb: 0.2, redMin: 800, redMax: 1200, fakeDur: 300 },
        5: { min: 1000, max: 1500, fakeProb: 0.4, redMin: 700, redMax: 1000, fakeDur: 250 },
        6: { min: 800, max: 1200, fakeProb: 0.6, redMin: 600, redMax: 900, fakeDur: 200 },
        7: { min: 600, max: 1000, fakeProb: 0.8, redMin: 500, redMax: 800, fakeDur: 150 },
        8: { min: 400, max: 800, fakeProb: 0.9, redMin: 400, redMax: 600, fakeDur: 100 }
    };

    /* --------------------------------------------------
       7. 핵심 함수 분리 및 가독성 개선
       -------------------------------------------------- */
       
    // UI 업데이트 (스테이지 및 게이지)
    function updateStageUI() {
        if (!stageEl || !progressFillEl || !progressTextEl) return;
        stageEl.textContent = `현재 단계: ${currentStage}단계`;
        progressFillEl.style.width = `${progress}%`;
        progressTextEl.textContent = `${Math.floor(progress)}%`;
    }

    // 상태 변경 (파란불/빨간불 텍스트 및 클래스 제어)
    function setState(green) {
        if (!statusEl) return;
        isGreen = green;
        if (isGreen) {
            statusEl.textContent = "🟢 GREEN LIGHT";
            statusEl.className = "redlight-status status-green";
            if (taggerEl) {
                taggerEl.textContent = "👧";
                taggerEl.style.transform = "rotateY(0deg)";
            }
        } else {
            statusEl.textContent = "🔴 RED LIGHT";
            statusEl.className = "redlight-status status-red";
            if (taggerEl) {
                taggerEl.textContent = "👀";
                taggerEl.style.transform = "rotateY(180deg)";
            }
        }
    }

    // 리커시브 타이머를 활용한 게임 메인 루프 (난이도, 페이크 적용)
    function gameLoop() {
        if (!isPlaying) return;

        let conf = STAGE_CONFIG[currentStage] || STAGE_CONFIG[8];

        if (isGreen) {
            setState(false); // 빨간불로 전환
            let redDuration = conf.redMin + Math.random() * (conf.redMax - conf.redMin);
            
            if (conf.fakeProb > 0 && Math.random() < conf.fakeProb) {
                redDuration = conf.fakeDur; // 페이크: 매우 짧은 빨간불
            }
            clearTimeout(loopTimeout);
            loopTimeout = setTimeout(gameLoop, redDuration);
        } else {
            setState(true); // 파란불로 전환
            let greenDuration = conf.min + Math.random() * (conf.max - conf.min);
            clearTimeout(loopTimeout);
            loopTimeout = setTimeout(gameLoop, greenDuration);
        }
    }

    // 도달(성공) 또는 발각(실패)에 따른 게임 정리
    function endGame(isWin) {
        // 6. 게임 종료 후 이벤트/타이머 확실한 정리
        isPlaying = false;
        clearTimeout(loopTimeout);
        loopTimeout = null;
        
        if (btnMove) btnMove.style.display = "none";
        
        if (!isWin) {
            if (arenaEl) arenaEl.classList.add("shake-red");
            if (statusEl) statusEl.textContent = "💥 발각!";
            if (charEl) charEl.innerHTML = '<span class="redlight-char-inner">😵</span>';
            if (taggerEl) {
                taggerEl.textContent = "👀!!";
                taggerEl.style.transform = "scale(1.5)";
            }
            if (subStatusEl) subStatusEl.textContent = "게임 오버";
            
            setTimeout(() => {
                showResult("redlight", { stage: currentStage, progress, isWin });
            }, 1200);
        } else {
            if (statusEl) statusEl.textContent = "🎉 통과!";
            if (charEl) {
                charEl.innerHTML = '<span class="redlight-char-inner">🕺</span>';
                charEl.style.left = "85%";
            }
            if (taggerEl) taggerEl.textContent = "😭";
            if (subStatusEl) subStatusEl.textContent = "단계 완료";
            
            setTimeout(() => {
                if (currentStage >= 8 || isPractice) {
                    showResult("redlight", { stage: currentStage, progress: 100, isWin: true });
                } else {
                    if (nextScreenEl) nextScreenEl.classList.remove("hidden");
                    if (statusEl) statusEl.classList.add("hidden");
                }
            }, 1200);
        }
    }

    // 화면 입력 시 캐릭터를 전진시키는 실제 핸들러
    function handleMove() {
        if (!isPlaying) return;

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        if (!isGreen) {
            // 빨간불에 움직였으므로 실패 처리
            endGame(false);
            return;
        }

        progress += 2;
        if (progress >= 100) {
            progress = 100;
            updateStageUI();
            endGame(true);
            return;
        }

        updateStageUI();
        
        if (charEl) {
            charEl.style.position = "absolute"; 
            const leftPercent = Math.min(90, progress * 0.9);
            const rotate = progress % 4 === 0 ? 5 : -5;
            charEl.style.left = `${leftPercent}%`;
            charEl.style.transform = `rotate(${rotate}deg)`;
        }
    }

    /* --------------------------------------------------
       3. 이벤트 중복 등록 문제 해결 (함수 분리 및 옵서버)
       -------------------------------------------------- */

    function handleKeyDown(e) {
        if (["Space", "ArrowUp", "ArrowRight", "ArrowLeft", "ArrowDown"].includes(e.code)) {
            if (isPlaying) {
                e.preventDefault();
                handleMove();
            }
        }
    }

    function handleTouch(e) {
        if (isPlaying) {
            e.stopPropagation(); // 4. DOM Bubbling으로 인한 중복 실행 차단 방지 (아레나 + 버튼 동시 감지 X)
            e.preventDefault();
            handleMove();
        }
    }

    function handleTouchMove(e) {
        if (isPlaying && e.target.closest("#redlight-arena")) {
            e.preventDefault(); // 게임 진행 중 스크롤 튀는 현상 방지
        }
    }

    function startStage() {
        isPlaying = true;
        progress = 0;
        updateStageUI();
        
        if (startScreenEl) startScreenEl.classList.add("hidden");
        if (nextScreenEl) nextScreenEl.classList.add("hidden");
        if (statusEl) statusEl.classList.remove("hidden");
        if (subStatusEl) subStatusEl.textContent = "달리세요!";
        
        if (btnMove) btnMove.style.display = "inline-block";

        if (charEl) {
            charEl.classList.remove("hidden");
            charEl.style.position = "absolute";
            charEl.innerHTML = '<span class="redlight-char-inner">🏃</span>';
            charEl.style.left = "2%";
            charEl.style.transform = "rotate(0deg)";
        }
        if (goalContainerEl) goalContainerEl.classList.remove("hidden");
        if (taggerEl) {
            taggerEl.textContent = "👧";
            taggerEl.style.transform = "rotateY(0deg) scale(1)";
        }
        if (arenaEl) {
            arenaEl.classList.remove("shake-red");
        }
        
        setState(true);
        clearTimeout(loopTimeout);
        let conf = STAGE_CONFIG[currentStage] || STAGE_CONFIG[8];
        
        // 연습 모드면 무조건 안전한 타임 부여 및 페이크 확률 제거
        if (isPractice) {
            conf = { min: 2500, max: 3500, fakeProb: 0, redMin: 1500, redMax: 2000 };
        }
        
        loopTimeout = setTimeout(gameLoop, conf.min + Math.random() * (conf.max - conf.min));
    }

    if (btnStartGame) {
        btnStartGame.addEventListener("click", () => {
             isPractice = false;
             currentStage = 1;
             startStage();
        });
    }
    if (btnNextStage) {
        btnNextStage.addEventListener("click", () => {
             currentStage++;
             startStage();
        });
    }

    // 문서 전역 키보드 이벤트 (이전 핸들러가 있다면 제거)
    if (redlightKeyHandler) {
        document.removeEventListener("keydown", redlightKeyHandler);
    }
    redlightKeyHandler = handleKeyDown;
    document.addEventListener("keydown", redlightKeyHandler);

    // 터치 무브 방지 이벤트 제어
    if (redlightTouchMoveHandler) {
        document.body.removeEventListener("touchmove", redlightTouchMoveHandler);
    }
    redlightTouchMoveHandler = handleTouchMove;
    document.body.addEventListener("touchmove", redlightTouchMoveHandler, { passive: false });

    // 내부 컨테이너(아레나) 터치 제거: 전체 화면 터치 X 방식 채택 (오작동 방지)
    
    // 버튼 터치 및 클릭 이벤트 (이동하기 버튼 전용)
    if (btnMove) {
        btnMove.removeEventListener("touchstart", handleTouch);
        btnMove.addEventListener("touchstart", handleTouch, { passive: false });
        btnMove.removeEventListener("mousedown", handleTouch);
        btnMove.addEventListener("mousedown", handleTouch);
    }
}
