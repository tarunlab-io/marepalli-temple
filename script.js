document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const currentDisplay = navLinks.style.display;
            navLinks.style.display = currentDisplay === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.background = 'rgba(253, 251, 247, 0.95)';
            navLinks.style.width = '100%';
            navLinks.style.left = '0';
            navLinks.style.padding = '20px 0';
        });
    }

    // Language Toggle with LocalStorage persistence
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('templeLang') || 'en';

    const applyLanguage = (lang) => {
        const teElements = document.querySelectorAll('.lang-te');
        const enElements = document.querySelectorAll('.lang-en');

        if (lang === 'en') {
            teElements.forEach(el => el.classList.add('hidden'));
            enElements.forEach(el => el.classList.remove('hidden'));
            if(langBtn) langBtn.textContent = 'TELUGU';
        } else {
            enElements.forEach(el => el.classList.add('hidden'));
            teElements.forEach(el => el.classList.remove('hidden'));
            if(langBtn) langBtn.textContent = 'ENGLISH';
        }
        localStorage.setItem('templeLang', lang);
        currentLang = lang;
    };

    applyLanguage(currentLang);

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            applyLanguage(currentLang === 'en' ? 'te' : 'en');
        });
    }

    // Background Audio Logic
    const bgAudio = document.getElementById('bg-audio');
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    
    if (bgAudio && audioToggleBtn) {
        bgAudio.volume = 0.5;

        // Restore playback position and state from sessionStorage
        const savedTime = sessionStorage.getItem('audioTime');
        const isPausedManually = sessionStorage.getItem('audioPaused');

        if (savedTime) {
            bgAudio.currentTime = parseFloat(savedTime);
        }

        // Continuously save the current time so it resumes seamlessly on the next page
        setInterval(() => {
            if (!bgAudio.paused) {
                sessionStorage.setItem('audioTime', bgAudio.currentTime);
            }
        }, 200); 

        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('audioTime', bgAudio.currentTime);
        });

        if (isPausedManually === 'true') {
            bgAudio.pause();
            audioToggleBtn.textContent = '⏸️';
        } else {
            // Try to play automatically
            const playPromise = bgAudio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    audioToggleBtn.textContent = '🎵';
                    sessionStorage.setItem('audioPaused', 'false');
                }).catch(error => {
                    audioToggleBtn.textContent = '⏸️'; 
                    const startAudio = () => {
                        bgAudio.play();
                        audioToggleBtn.textContent = '🎵';
                        sessionStorage.setItem('audioPaused', 'false');
                        document.removeEventListener('click', startAudio);
                    };
                    document.addEventListener('click', startAudio, { once: true });
                });
            }
        }

        audioToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (bgAudio.paused) {
                bgAudio.play();
                audioToggleBtn.textContent = '🎵';
                sessionStorage.setItem('audioPaused', 'false');
            } else {
                bgAudio.pause();
                audioToggleBtn.textContent = '⏸️';
                sessionStorage.setItem('audioPaused', 'true');
            }
        });
    }
});
