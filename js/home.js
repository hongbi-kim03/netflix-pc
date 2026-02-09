document.addEventListener('DOMContentLoaded', () => {
    if (typeof initHoverVideo === 'function') initHoverVideo();
    
});

/* ================================
📩 YouTube iframe 제어
================================ */
function postMessageToIframe(iframe, command) {
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
    );
}

/* ================================
🎬 넷플릭스 스타일 hover 비디오
================================ */
function initHoverVideo() {
    const videoItems = document.querySelectorAll('[data-video-id]');
    let activeItem = null;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    videoItems.forEach(item => {
        const iframe = item.querySelector('iframe');
        const thumbnail = item.querySelector('.thumbnail');
        const videoId = item.dataset.videoId;
        if (!iframe || !thumbnail) return;

        thumbnail.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;

        const playVideo = (target) => {
            if (activeItem && activeItem !== target) stopVideo(activeItem);
            target.classList.add('playing');
            postMessageToIframe(target.querySelector('iframe'), 'playVideo');
            activeItem = target;
        };

        const stopVideo = (target) => {
            target.classList.remove('playing');
            postMessageToIframe(target.querySelector('iframe'), 'pauseVideo');
            if (activeItem === target) activeItem = null;
        };

        if (isTouchDevice) {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); 
                item.classList.contains('playing') ? stopVideo(item) : playVideo(item);
            });
        } else {
            item.addEventListener('mouseenter', () => playVideo(item));
            item.addEventListener('mouseleave', () => stopVideo(item));
        }
    });

    if (isTouchDevice) {
        document.addEventListener('touchstart', (e) => {
            if (activeItem && !activeItem.contains(e.target)) stopVideo(activeItem);
        });
    }
}