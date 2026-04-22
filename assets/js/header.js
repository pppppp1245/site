const isScrolled = window.HEADER_SCROLLED || false;
const headerId = isScrolled ? "" : 'id="header"';
const scrolledClass = isScrolled ? "scrolled" : "";
const ariaExpanded = 'aria-expanded="false" aria-controls="mobile-menu"';

document.write(`
<header class="header ${scrolledClass}" ${headerId}>
    <div class="header__inner container">
        <a href="index.html" class="header__logo" aria-label="메인 페이지로 로고">MoodPick</a>
        
        <nav class="header__nav">
            <ul class="header__menu">
                <li class="header__menu-item"><a href="index.html" class="header__menu-link">메인</a></li>
                <li class="header__menu-item"><a href="index.html#tests" class="header__menu-link">테스트</a></li>
                <li class="header__menu-item"><a href="popular.html" class="header__menu-link">인기 순위</a></li>
                <li class="header__menu-item"><a href="arcade.html" class="header__menu-link">미니 오락관</a></li>
                <li class="header__menu-item"><a href="lucky.html" class="header__menu-link">행운 문구</a></li>
            </ul>
        </nav>

        <button class="header__hamburger" aria-label="메뉴 열기/닫기" ${ariaExpanded}>
            <span></span><span></span><span></span>
        </button>
    </div>
</header>
`);
