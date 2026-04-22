/**
 * main.js
 * MoodPick UI Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. Header 스크롤 인터랙션 (Sticky 처리)
       ========================================= */
    const header = document.getElementById('header');
    if(header) {
        function updateHeaderOnScroll() {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // 초기 로드 시 한 번 평가
        updateHeaderOnScroll();
        // 스크롤 이벤트 연결
        window.addEventListener('scroll', updateHeaderOnScroll);
    }


    /* =========================================
       2. 모바일 햄버거 메뉴 기능
       ========================================= */
    const hamburger = document.querySelector('.header__hamburger');
    const nav = document.querySelector('.header__nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            // 클래스 토글을 통한 애니메이션 제어
            const isActive = hamburger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
            
            // 웹 접근성 속성 업데이트
            hamburger.setAttribute('aria-expanded', isActive);

            // 메뉴 활성화 중에는 body 스크롤 금지 처리
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // 링크 클릭 시 자동으로 닫힘 처리
        const menuLinks = nav.querySelectorAll('.header__menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // 스크롤 원복
            });
        });
    }


    /* =========================================
       3. 스크롤 위치 기반 Fade-in 애니메이션 (Observer)
       ========================================= */
    // 최신식 IntersectionObserver 를 사용하여 성능 최적화
    const observerOptions = {
        root: null, // viewport 기준
        rootMargin: '0px 0px -50px 0px', // 요소가 화면 아래쪽에서 50px 보이기 시작할 때
        threshold: 0.1
    };

    const flexObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // data-delay 속성에 따라 지연시간 재부여
                const delay = target.getAttribute('data-delay');
                if (delay) {
                    target.style.animationDelay = delay;
                }
                
                // hidden 클래스를 제거하여 CSS animation 시작
                target.classList.remove('hidden');
                
                // 타겟은 한 번 애니메이션 후 감시 종료
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // .fade-in 과 .fade-in-up 요소 수집 후 초기화
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animateElements.forEach(el => {
        // 기존 스타일의 animationDelay 가 있다면 data-delay 로 백업
        if (el.style.animationDelay) {
            el.setAttribute('data-delay', el.style.animationDelay);
            el.style.animationDelay = '0s'; // CSS에서 초기화 막기 방지용
        }
        
        // CSS에서 애니메이션 무효화를 위한 hidden 추가
        el.classList.add('hidden');
        
        // Observer 에 등록
        flexObserver.observe(el);
    });

    /* ※ 이전 버전의 4.테스트 카드 클릭 모의 작동(preventDefault/alert)은 
       실제 페이지 이동을 위해 제거되었습니다. */
});
