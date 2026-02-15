document.addEventListener("DOMContentLoaded", () => {
    // ================================
    // 1. 요소 선택
    // ================================
    const form = document.getElementById("pw-change-form");
    const profileBtn = document.getElementById("profile-btn");
    const dropdown = document.getElementById("dropdown");
    const passwordIcons = document.querySelectorAll(".password-icon");
    const pwInputs = document.querySelectorAll('.pw-input-group input');
    const logoutCheckbox = document.querySelector(".checkbox input");

    // ================================
    // 2. 프로필 드롭다운 메뉴
    // ================================
    if (profileBtn && dropdown) {
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // 클릭 이벤트 전파 방지
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
    }

    // ================================
    // 3. 비밀번호 보이기/숨기기 기능
    // ================================
    passwordIcons.forEach(icon => {
        icon.addEventListener("mousedown", (e) => e.preventDefault());

        icon.addEventListener("click", () => {
            const targetId = icon.getAttribute("data-target");
            const input = document.getElementById(targetId);
            if (!input) return;

            const isHidden = input.type === "password";
            input.type = isHidden ? "text" : "password";

            // 보이기 상태에 따른 이미지 교체
            icon.style.backgroundImage = isHidden
                ? "url('../images/unlock-icon.png')"
                : "url('../images/lock-icon.png')";

            icon.classList.toggle("active", isHidden);
            input.focus();
        });
    });

    // ================================
    // 4. 입력 필드 인터랙션 및 유효성 검사
    // ================================
    pwInputs.forEach(input => {
        const icon = input.parentElement.querySelector('.password-icon');

        input.addEventListener('focus', () => {
            if (icon) {
                icon.style.opacity = '1';
                // 클릭 시 처음에는 항상 잠긴 아이콘으로 보이도록 초기화 (필요 시)
                if (!icon.classList.contains('active')) {
                    icon.style.backgroundImage = "url('../images/lock-icon.png')";
                }
            }
            resetInput(input);
        });

        input.addEventListener('blur', () => {
            if (icon && !icon.classList.contains('active')) {
                icon.style.opacity = '0';
            }
            if (input.id === "new-password") validateNewPassword(input);
        });
    });

    // [기타 헬퍼 함수 및 제출 로직 - 기존 동일]
    function resetInput(input) {
        input.classList.remove("error");
        const errorElement = document.getElementById(input.id + "-error");
        if (errorElement) errorElement.textContent = "";
    }

    function validateNewPassword(input) {
        const errorElement = document.getElementById("new-password-error");
        if (input.value.length > 0 && (input.value.length < 6 || input.value.length > 60)) {
            errorElement.textContent = "비밀번호는 6~60자 사이여야 합니다.";
            input.classList.add("error");
            return false;
        }
        return true;
    }

    // ================================
    // 5. 폼 제출 및 로그아웃 리다이렉트
    // ================================
    function resetInput(input) {
        input.classList.remove("error");
        const errorElement = document.getElementById(input.id + "-error");
        if (errorElement) errorElement.textContent = "";
    }

    function validateNewPassword(input) {
        const errorElement = document.getElementById("new-password-error");
        if (input.value.length > 0 && (input.value.length < 6 || input.value.length > 60)) {
            errorElement.textContent = "비밀번호는 6~60자 사이여야 합니다.";
            input.classList.add("error");
            return false;
        }
        return true;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const oldPw = document.getElementById("old-password");
        const newPw = document.getElementById("new-password");
        const confirmPw = document.getElementById("confirm-password");

        let valid = true;
        if (!oldPw.value) { showError(oldPw, "old-password-error", "기존 비밀번호를 입력하세요."); valid = false; }
        if (newPw.value.length < 6 || newPw.value.length > 60) { showError(newPw, "new-password-error", "비밀번호는 6~60자 사이여야 합니다."); valid = false; }
        if (confirmPw.value !== newPw.value) { showError(confirmPw, "confirm-password-error", "비밀번호가 일치하지 않습니다."); valid = false; }

        if (valid) {
            alert("비밀번호가 성공적으로 변경되었습니다!");
            if (logoutCheckbox && logoutCheckbox.checked) {
                location.href = "logout.html";
            } else {
                location.href = "account.html";
            }
        }
    });

    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) errorElement.textContent = message;
        input.classList.add("error");
    }
});