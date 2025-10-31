// script.js - versión corregida y más robusta
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log("Inicializando script...");

        const mainSections = document.querySelectorAll('main section');
        const navButtons = document.querySelectorAll('.nav-button');
        const volverGeneralButtons = document.querySelectorAll('.volver-general');

        const portadaInicial = document.getElementById('portada-inicial');
        const enterSiteBtn = document.getElementById('enter-site-btn');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const musicControl = document.getElementById('music-control');

        const menuHistorias = document.getElementById('menu-historias');
        const historiasGrid = document.querySelector('.historias-grid');
        const contenidoHistoria = document.getElementById('contenido-historia');
        const tituloHistoria = document.getElementById('titulo-historia');
        const textoHistoria = document.getElementById('texto-historia');
        const toggleSpeechBtn = document.getElementById('toggle-speech');
        const volverMenuBtn = document.getElementById('volver-menu');

        const mostrarQrPlinBtn = document.getElementById('mostrar-qr-plin');
        const qrOpenSound = document.getElementById('qr-open-sound');

        const backgroundMusic = document.getElementById('background-music');
        const toggleMusicBtn = document.getElementById('toggle-music');
        const toggleMusicIcon = toggleMusicBtn ? toggleMusicBtn.querySelector('i') : null;
        const cardClickSound = document.getElementById('card-click-sound');

        // Carta Astral
        const cartaAstralSection = document.getElementById('carta-astral-section');
        const astralQuizDiv = document.getElementById('astral-quiz');
        const astralResultDiv = document.getElementById('astral-result');
        const astralDescriptionP = document.getElementById('astral-description');
        const astralImageContainer = document.getElementById('astral-image-container');
        const startAstralQuizBtn = document.getElementById('start-astral-quiz');
        const nextAstralQuestionBtn = document.getElementById('next-astral-question');
        const showAstralResultBtn = document.getElementById('show-astral-result');

        // Verdad o Reto
        const verdadRetoSection = document.getElementById('verdad-reto-section');
        const vrQuestionP = document.getElementById('vr-question');
        const getVerdadBtn = document.getElementById('get-verdad');
        const getRetoBtn = document.getElementById('get-reto');
        const newVrBtn = document.getElementById('new-vr');

        let currentStoryText = '';
        const synthesis = window.speechSynthesis;
        let isMusicPlaying = false;
        const BGM_VOLUME = 0.2;
        const BGM_VOLUME_QUIET = 0.05;

        // --- Funcionalidad de la Portada Inicial ---
        if (enterSiteBtn) {
            enterSiteBtn.addEventListener('click', () => {
                // Protecciones por si los elementos no existen
                if (portadaInicial) portadaInicial.classList.add('oculto');
                if (header) header.classList.remove('oculto');
                if (footer) footer.classList.remove('oculto');
                if (musicControl) musicControl.classList.remove('oculto');
                showSection('menu-historias');
                playBackgroundMusic();
            });
        } else {
            console.warn("No se encontró el botón 'enter-site-btn' en el DOM.");
        }

        // --- Navegación General ---
        function showSection(targetId) {
            mainSections.forEach(section => {
                section.classList.add('oculto');
            });
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.remove('oculto');
            } else {
                console.warn("showSection: objetivo no encontrado:", targetId);
            }
            // Apoyanos (si existe)
            const apoyanosSection = document.getElementById('apoyanos');
            if (apoyanosSection) apoyanosSection.classList.remove('oculto');

            // Detener TTS si cambiamos de sección
            if (synthesis && synthesis.speaking) {
                synthesis.cancel();
            }
            restoreBackgroundMusicVolume();
        }

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset && button.dataset.target;
                if (target) {
                    showSection(target);
                    if (target === 'carta-astral-section') {
                        if (typeof resetAstralQuiz === 'function') resetAstralQuiz();
                    } else if (target === 'verdad-reto-section') {
                        if (typeof resetVerdadOReto === 'function') resetVerdadOReto();
                    } else if (target === 'menu-historias') {
                        if (typeof mostrarHistorias === 'function') mostrarHistorias();
                    }
                } else {
                    console.warn("Botón nav sin data-target");
                }
            });
        });

        volverGeneralButtons.forEach(button => {
            button.addEventListener('click', () => {
                showSection('menu-historias');
                if (typeof mostrarHistorias === 'function') mostrarHistorias();
            });
        });

        // --- Música y Sonidos ---
        function playBackgroundMusic() {
            if (!backgroundMusic) return;
            backgroundMusic.volume = BGM_VOLUME;
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                if (toggleMusicIcon) {
                    toggleMusicIcon.classList.remove('fa-volume-mute');
                    toggleMusicIcon.classList.add('fa-volume-up');
                }
            }).catch((error) => {
                console.warn("La música de fondo no pudo reproducirse automáticamente:", error);
                if (toggleMusicIcon) {
                    toggleMusicIcon.classList.remove('fa-volume-up');
                    toggleMusicIcon.classList.add('fa-volume-mute');
                }
            });
        }

        if (toggleMusicBtn) {
            toggleMusicBtn.addEventListener('click', () => {
                toggleBackgroundMusic();
            });
        }

        function toggleBackgroundMusic() {
            if (!backgroundMusic) return;
            if (backgroundMusic.paused) {
                playBackgroundMusic();
            } else {
                backgroundMusic.pause();
                isMusicPlaying = false;
                if (toggleMusicIcon) {
                    toggleMusicIcon.classList.remove('fa-volume-up');
                    toggleMusicIcon.classList.add('fa-volume-mute');
                }
            }
        }

        function lowerBackgroundMusicVolume() {
            if (isMusicPlaying && backgroundMusic) backgroundMusic.volume = BGM_VOLUME_QUIET;
        }

        function restoreBackgroundMusicVolume() {
            if (isMusicPlaying && backgroundMusic) backgroundMusic.volume = BGM_VOLUME;
        }

        function playCardClickSound() {
            if (!cardClickSound) return;
            try {
                cardClickSound.currentTime = 0;
                cardClickSound.play();
            } catch (e) {
                console.warn("No se pudo reproducir el sonido de clic:", e);
            }
        }

        // --- Historias: cargar tarjetas simples si existe el contenedor ---
        const historiasBase = [
            { titulo: "CURVAS ESCALOFRIANTES", sinopsis: "Un camionero se detiene..." , historia: "Un camionero veterano..." },
            { titulo: "CUMPLE TU PROMESA", sinopsis: "Andrés prometió..." , historia: "Andrés le prometió a Lucía..." },
            { titulo: "MIRA FIJAMENTE TU ESPEJO", sinopsis: "Una mujer compra..." , historia: "Una mujer, aficionada..." }
            // puedes agregar más aquí...
        ];

        function mostrarHistorias() {
            if (!historiasGrid) return;
            historiasGrid.innerHTML = '';
            historiasBase.forEach((h, idx) => {
                const card = document.createElement('div');
                card.className = 'historia-card';
                card.setAttribute('data-index', idx);
                card.innerHTML = `<h3>${h.titulo}</h3><p>${h.sinopsis}</p>`;
                card.addEventListener('click', () => {
                    if (tituloHistoria) tituloHistoria.textContent = h.titulo;
                    if (textoHistoria) textoHistoria.textContent = h.historia;
                    showSection('contenido-historia');
                    playCardClickSound();
                });
                historiasGrid.appendChild(card);
            });
        }

        // Cargar historias al inicio (si estamos en la sección correcta)
        if (menuHistorias && menuHistorias.classList.contains('oculto') === false) {
            mostrarHistorias();
        } else {
            // No forzamos nada; las historias se cargarán al mostrar la sección
        }

        // Mostrar consola lista
        console.log("Script inicializado correctamente. Botón ENTRAR listo:", !!enterSiteBtn);

    } catch (err) {
        console.error("Error al inicializar el script:", err);
    }
});
