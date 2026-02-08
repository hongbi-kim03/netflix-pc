/* ================================
🎬 숏폼 콘텐츠 자동재생
================================ */
    function postMessageToIframe(iframe, command) {
    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(
        JSON.stringify({
        event: 'command',
        func: command,
        args: []
        }),
        '*'
    );
    }

    const slides = document.querySelectorAll('.slide');
    let activeSlide = null;

    slides.forEach(slide => {
    const iframe = slide.querySelector('iframe');
    const thumbnail = slide.querySelector('.thumbnail');
    const videoId = slide.dataset.videoId;

    /* 썸네일 자동 설정 */
    thumbnail.style.backgroundImage =
        `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;

    slide.addEventListener('mouseenter', () => {
        if (activeSlide && activeSlide !== slide) {
        activeSlide.classList.remove('playing');
        postMessageToIframe(
            activeSlide.querySelector('iframe'),
            'pauseVideo'
        );
        }

        slide.classList.add('playing');
        postMessageToIframe(iframe, 'playVideo');
        activeSlide = slide;
    });

    slide.addEventListener('mouseleave', () => {
        slide.classList.remove('playing');
        postMessageToIframe(iframe, 'pauseVideo');
        activeSlide = null;
    });
});