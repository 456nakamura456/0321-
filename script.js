document.addEventListener('DOMContentLoaded', () => {
    // 1. Copy to Clipboard Functionality
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const targetId = button.getAttribute('data-target');
            if (!targetId) return;

            const codeElement = document.getElementById(targetId);
            if (!codeElement) return;

            const textToCopy = codeElement.textContent || codeElement.innerText;

            try {
                // Clipboard API を使用
                await navigator.clipboard.writeText(textToCopy);
                
                // 成功時のフィードバック (Tooltip等)
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');

                // 2秒後に元に戻す
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
                button.textContent = 'Error';
                setTimeout(() => {
                    button.textContent = 'コピー';
                }, 2000);
            }
        });
    });

    // 2. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeId = entry.target.id;
                const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});
