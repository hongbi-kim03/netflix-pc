document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('wishlist-container');
    const countElement = document.getElementById('wishlist-count');
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    function renderWishlist() {
        container.innerHTML = '';
        countElement.textContent = `총 ${wishlist.length}개의 작품을 찜했어요 💖`;

        if (wishlist.length === 0) {
            container.innerHTML = `
                <div class="empty-message">
                    <span style="font-size: 3rem;">📝</span>
                    <p>찜한 콘텐츠가 없습니다.<br>나만의 리스트를 채워보세요!</p>
                    <a href="index.html" class="explore-btn">새로운 작품 보러 가기</a>
                </div>`;
        countElement.textContent = '';
        return;
        }

        wishlist.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('wishlist-item');
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <button class="remove-btn" title="찜 취소">×</button>`;
        container.appendChild(card);

        // 찜 취소 버튼 클릭 시 삭제
        card.querySelector('.remove-btn').addEventListener('click', () => {
            wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            renderWishlist();
        });
        });
    }

    renderWishlist();
    });
