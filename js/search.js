document.addEventListener('DOMContentLoaded', () => {
    // 1. 데이터 정의 (제공해주신 리스트)
    const movieData = [
    { name: "피지컬 아시아", category: "entertainment", bg: "images/physical-asia.webp" },
    { name: "서울자가에 대기업다니는 김부장이야기", category: "kcontent", bg: "images/seoul-kim.webp" },
    { name: "태풍상사", category: "kcontent", bg: "images/taepoong.jpg" },
    { name: "다 이루어질 지니", category: "romance", bg: "images/wish-genie.jpg" },
    { name: "우리들의 발라드", category: "romance", bg: "images/ballad.webp" },
    { name: "나는 solo", category: "entertainment", bg: "images/solo.jpg" },
    { name: "내겐 너무까칠한 매니저 비서진", category: "entertainment", bg: "images/manager.jpg" },
    { name: "퍼스트레이디", category: "global", bg: "images/firstlady.jpg" },
    { name: "체인소 맨", category: "genre", bg: "images/chainsaw.jpg" },
    { name: "로맨틱 어나니머스", category: "romance", bg: "images/romantic.jpg" }
    ];

    const bgContainer = document.querySelector('.background-container');
    const popularLeft = document.getElementById('popular-left');
    const popularRight = document.getElementById('popular-right');
    const categoryBoxes = document.querySelectorAll('.category-box');

let currentIndex = 0; // 현재 강조된 인덱스
    let autoPlayInterval; // 타이머 변수
    let currentFilteredData = []; // 현재 필터링된 데이터 저장용

    const renderContent = (filter = 'all') => {
        // 타이머 초기화 (카테고리 바뀔 때 중복 방지)
        stopAutoPlay();

        currentFilteredData = filter === 'all' 
            ? movieData 
            : movieData.filter(item => item.category === filter);

        popularLeft.innerHTML = '';
        popularRight.innerHTML = '';

        if (currentFilteredData.length === 0) {
            popularLeft.innerHTML = '<li class="no-result">해당 카테고리의 콘텐츠 준비 중입니다.</li>';
            bgContainer.style.backgroundImage = 'none'; 
            return;
        }

        currentFilteredData.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${index + 1}</strong><span>${item.name}</span>`;
            
            // 마우스 호버 시 자동 재생 멈춤 + 해당 항목 강조
            li.addEventListener('mouseenter', () => {
                stopAutoPlay();
                activateItem(index);
            });

            // 마우스가 나가면 다시 자동 재생 시작
            li.addEventListener('mouseleave', () => {
                startAutoPlay();
            });

            if (index < 5) popularLeft.appendChild(li);
            else popularRight.appendChild(li);
        });

        // 초기 상태 설정
        currentIndex = 0;
        activateItem(0);
        startAutoPlay();
    };

    /**
     * 특정 인덱스의 아이템을 강조하고 배경을 바꾸는 함수
     */
    const activateItem = (index) => {
        const allItems = document.querySelectorAll('.popular-list li');
        if (allItems.length === 0 || !currentFilteredData[index]) return;

        // 모든 active 제거 후 현재 것만 추가
        allItems.forEach(li => li.classList.remove('active'));
        if (allItems[index]) allItems[index].classList.add('active');

        // 배경 이미지 변경
        bgContainer.style.backgroundImage = `url(${currentFilteredData[index].bg})`;
        currentIndex = index;
    };

    /**
     * 자동 재생 시작
     */
    const startAutoPlay = () => {
        if (autoPlayInterval) return;
        autoPlayInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % currentFilteredData.length;
            activateItem(nextIndex);
        }, 3000); // 3초마다 변경
    };

    /**
     * 자동 재생 멈춤
     */
    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    };

    // 카테고리 클릭 이벤트
    categoryBoxes.forEach(box => {
        box.addEventListener('click', () => {
            categoryBoxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');
            renderContent(box.dataset.category);
        });
    });

    renderContent('all');
});


document.addEventListener('DOMContentLoaded', () => {
    // ... (기존 변수들 생략) ...
    const timeDisplay = document.getElementById('current-time');

    /**
     * ✅ 1. 실시간 시계 기능 (1초마다 자동 갱신)
     */
    const startRealTimeClock = () => {
        const updateClock = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0'); // 초 추가

            // 초까지 포함해서 화면에 출력
            timeDisplay.innerText = `${year}.${month}.${day} ${hours}:${minutes}:${seconds} 기준`;
        };

        updateClock(); // 즉시 실행
        setInterval(updateClock, 1000); // 1초마다 반복
    };

    // 2. 초기 실행 시 시계 작동 시작
    startRealTimeClock();

    // ... (나머지 리스트 렌더링 및 자동 롤링 로직은 그대로 유지) ...
});