// ================================
// 1. 프로필 드롭다운 메뉴
// ================================
const profileBtn = document.getElementById("profile-btn");
const dropdown = document.getElementById("dropdown");

profileBtn.addEventListener("click", () => {
    profileBtn.classList.toggle("active");
    dropdown.classList.toggle("active");
});

// 화면 클릭 시 드롭다운 닫기
document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
        profileBtn.classList.remove("active");
        dropdown.classList.remove("active");
    }
});

// ================================
// 2. 멤버십 카드 선택 기능
// ================================
let currentPlanId = "standard"; 

const plans = document.querySelectorAll(".plan");
const nextBtn = document.querySelector(".next-btn");
const selectedPlanText = document.querySelector(".selected-plan-text");

let selectedPlan = null;

plans.forEach(plan => {
    plan.addEventListener("click", () => {
        const clickedPlanId = plan.dataset.plan;

        // [수정] 고정된 "standard"가 아니라 변수 currentPlanId와 비교합니다.
        if (clickedPlanId === currentPlanId) {
            alert("현재 사용 중인 멤버십입니다.");
            return;
        }

        if (plan.classList.contains("selected")) {
            plan.classList.remove("selected");
            selectedPlan = null;
            nextBtn.disabled = true;
            selectedPlanText.textContent = "선택한 멤버십: 없음";
            return;
        }

        plans.forEach(p => p.classList.remove("selected"));
        plan.classList.add("selected");

        // 이름 추출 (data-name 속성이 없다면 기존 방식 유지)
        const planName = plan.getAttribute('data-name') || plan.querySelector("div").innerText.split("\n")[0];
        selectedPlan = clickedPlanId;
        selectedPlanText.textContent = `선택한 멤버십: ${planName}`;
        nextBtn.disabled = false;
    });
});

// 3. 다음 버튼 클릭 이벤트
nextBtn.addEventListener("click", () => {
    if (selectedPlan) {
        alert(`선택한 멤버십: ${selectedPlanText.textContent.replace('선택한 멤버십: ', '')}으로 변경되었습니다.`);

        // 뱃지 이동 로직
        const oldBadge = document.querySelector(".current-plan");
        if (oldBadge) oldBadge.remove();

        const selectedPlanCard = document.querySelector(".plan.selected");
        const newBadge = document.createElement("div");
        newBadge.className = "current-plan";
        newBadge.innerText = "현재 멤버십";
        selectedPlanCard.prepend(newBadge);

        // ⭐ [중요] 현재 플랜 ID를 새로 선택된 플랜으로 업데이트합니다.
        // 이제부터는 방금 선택한 카드를 클릭하면 "현재 사용 중..." 알림이 뜹니다.
        currentPlanId = selectedPlan; 

        // UI 초기화
        selectedPlan = null;
        nextBtn.disabled = true;
        selectedPlanText.textContent = "선택한 멤버십: 없음";
        selectedPlanText.style.color = "#b3b3b3";
        plans.forEach(p => p.classList.remove("selected"));
    }
});

// ================================
// 3. 다음 버튼 클릭 이벤트 (뱃지 이동 로직 추가)
// ================================
nextBtn.addEventListener("click", () => {
    if (selectedPlan) {
        // 1. 알림 띄우기
        alert(`선택한 멤버십: ${selectedPlanText.textContent.replace('선택한 멤버십: ', '')}으로 변경되었습니다.`);

        // 2. 기존 "현재 멤버십" 뱃지 찾아서 삭제
        const oldBadge = document.querySelector(".current-plan");
        if (oldBadge) oldBadge.remove();

        // 3. 새로 선택된 카드 찾기
        const selectedPlanCard = document.querySelector(".plan.selected");

        // 4. 새로운 "현재 멤버십" 뱃지 생성 및 부착
        const newBadge = document.createElement("div");
        newBadge.className = "current-plan";
        newBadge.innerText = "현재 멤버십";
        selectedPlanCard.prepend(newBadge); // 카드 맨 윗부분에 삽입

        // 5. 현재 플랜 ID 업데이트 및 UI 초기화
        currentPlanId = selectedPlan; // 이제 선택한 플랜이 현재 플랜이 됨
        selectedPlan = null;
        nextBtn.disabled = true;
        selectedPlanText.textContent = "선택한 멤버십: 없음";
        selectedPlanText.style.color = "#b3b3b3";
        
        // 모든 카드의 선택 효과(테두리 등) 제거
        plans.forEach(p => p.classList.remove("selected"));
    }
});