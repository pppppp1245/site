const isScrolled = window.HEADER_SCROLLED || false;
const headerId = isScrolled ? "" : 'id="header"';
const scrolledClass = isScrolled ? "scrolled" : "";
const ariaExpanded = 'aria-expanded="false" aria-controls="mobile-menu"';

document.write(`
<header class="header ${scrolledClass}" ${headerId}>
    <div class="header__inner container">
        <a href="/" class="header__logo" aria-label="메인 페이지로 로고">MoodPick</a>
        
        <nav class="header__nav" aria-label="주요 메뉴">
            <ul class="header__menu">
                <li class="header__menu-item">
                    <a href="/" class="header__menu-link">메인</a>
                </li>
                <li class="header__menu-item">
                    <a href="/about.html" class="header__menu-link">소개</a>
                </li>
                <li class="header__menu-item header__menu-group">
                    <button type="button" class="header__menu-trigger" aria-expanded="false" aria-controls="subnav-tools" id="subnav-tools-btn">
                        무드 도구
                    </button>
                    <ul class="header__subnav" id="subnav-tools" role="menu" aria-labelledby="subnav-tools-btn" hidden>
                        <li role="none"><a role="menuitem" href="/tools/index.html">도구 홈</a></li>
                        <li role="none"><a role="menuitem" href="/tools/focus-timer.html">포커스 타이머</a></li>
                        <li role="none"><a role="menuitem" href="/tools/breathing.html">박스 호흡 가이드</a></li>
                        <li role="none"><a role="menuitem" href="/tools/three-line-journal.html">하루 3행 저널</a></li>
                        <li role="none"><a role="menuitem" href="/tools/mood-color-note.html">무드 컬러 메모</a></li>
                        <li role="none"><a role="menuitem" href="/tools/micro-stretch.html">마이크로 스트레칭</a></li>
                        <li role="none"><a role="menuitem" href="/tools/focus-checklist.html">집중 체크리스트</a></li>
                    </ul>
                </li>
                <li class="header__menu-item header__menu-group">
                    <button type="button" class="header__menu-trigger" aria-expanded="false" aria-controls="subnav-play" id="subnav-play-btn">
                        테스트 · 놀이
                    </button>
                    <ul class="header__subnav" id="subnav-play" role="menu" aria-labelledby="subnav-play-btn" hidden>
                        <li role="none"><a role="menuitem" href="/index.html#tests">테스트 모음</a></li>
                        <li role="none"><a role="menuitem" href="/popular.html">인기 순위</a></li>
                        <li role="none"><a role="menuitem" href="/arcade.html">미니 오락관</a></li>
                        <li role="none"><a role="menuitem" href="/game.html">미니 게임</a></li>
                        <li role="none"><a role="menuitem" href="/lucky.html">행운 문구</a></li>
                    </ul>
                </li>
                <li class="header__menu-item">
                    <a href="/contact.html" class="header__menu-link">문의하기</a>
                </li>
            </ul>
        </nav>

        <button class="header__hamburger" aria-label="메뉴 열기/닫기" ${ariaExpanded}>
            <span></span><span></span><span></span>
        </button>
    </div>
</header>
`);
