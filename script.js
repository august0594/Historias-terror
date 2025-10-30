document.addEventListener('DOMContentLoaded', () => {
    const menuHistorias = document.getElementById('menu-historias');
    const historiasGrid = document.querySelector('.historias-grid');
    const contenidoHistoria = document.getElementById('contenido-historia');
    const tituloHistoria = document.getElementById('titulo-historia');
    const textoHistoria = document.getElementById('texto-historia');
    const leerHistoriaBtn = document.getElementById('leer-historia');
    const volverMenuBtn = document.getElementById('volver-menu');
    const generarNuevaHistoriaBtn = document.getElementById('generar-nueva-historia');

    const mostrarQrPlinBtn = document.getElementById('mostrar-qr-plin');
    const qrOpenSound = document.getElementById('qr-open-sound');

    const backgroundMusic = document.getElementById('background-music');
    const toggleMusicBtn = document.getElementById('toggle-music');
    const toggleMusicIcon = toggleMusicBtn.querySelector('i');
    const cardClickSound = document.getElementById('card-click-sound');

    let currentStoryText = '';
    const synthesis = window.speechSynthesis;
    let isMusicPlaying = false;
    const BGM_VOLUME = 0.2;
    const BGM_VOLUME_QUIET = 0.05;

    const historiasBase = [
        {
            titulo: "El reflejo que no era mío",
            sinopsis: "Una sombra repite los gestos de Lucía en el espejo...",
            historia: "Esa noche el espejo del baño comenzó a empañarse solo..."
        },
        {
            titulo: "La llamada de las 3:17",
            sinopsis: "Marco recibe una llamada misteriosa a las 3:17 a.m....",
            historia: "Marco se despertó con el celular vibrando..."
        },
        {
            titulo: "No apagues el proyector",
            sinopsis: "Andrés ignora una advertencia y proyecta una película antigua...",
            historia: "Andrés trabajaba en una tienda de empeños..."
        },
        {
            titulo: "El Silbido de Cumbemayo",
            sinopsis: "Rafael ignora una advertencia local en Cumbemayo...",
            historia: "Cumbemayo, Cajamarca..."
        },
        {
            titulo: "El Camino de los Muertos",
            sinopsis: "Elías se adentra en un tramo evitado de noche...",
            historia: "En la carretera que une Huancavelica con Ayacucho..."
        }
    ];

    // --- Música y Sonidos ---
    function playBackgroundMusic() {
        backgroundMusic.volume = BGM_VOLUME;
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            toggleMusicIcon.classList.remove('fa-volume-mute');
            toggleMusicIcon.classList.add('fa-volume-up');
        }).catch(() => {});
    }

    function toggleBackgroundMusic() {
        if (backgroundMusic.paused) playBackgroundMusic();
        else {
            backgroundMusic.pause();
            isMusicPlaying = false;
            toggleMusicIcon.classList.remove('fa-volume-up');
            toggleMusicIcon.classList.add('fa-volume-mute');
        }
    }

    function lowerBackgroundMusicVolume() {
        if (isMusicPlaying) backgroundMusic.volume = BGM_VOLUME_QUIET;
    }

    function restoreBackgroundMusicVolume() {
        if (isMusicPlaying) backgroundMusic.volume = BGM_VOLUME;
    }

    function playCardClickSound() {
        cardClickSound.currentTime = 0;
        cardClickSound.play();
    }

    // --- Historias ---
    function obtenerHistoriasParaMostrar() {
        const historiasAleatorias = [];
        const indicesUsados = new Set();
        while (historiasAleatorias.length < 3 && historiasAleatorias.length < historiasBase.length) {
            const randomIndex = Math.floor(Math.random() * historiasBase.length);
            if (!indicesUsados.has(randomIndex)) {
                historiasAleatorias.push(historiasBase[randomIndex]);
                indicesUsados.add(randomIndex);
            }
        }
        return historiasAleatorias;
    }

    function mostrarHistorias() {
        historiasGrid.innerHTML = '';
        const historiasMostradas = obtenerHistoriasParaMostrar();
        historiasMostradas.forEach(historia => {
            const card = document.createElement('div');
            card.classList.add('historia-card');
            card.innerHTML = `<h3>${historia.titulo}</h3><p>${historia.sinopsis}</p>`;
            card.addEventListener('click', () => {
                playCardClickSound();
                mostrarContenidoHistoria(historia);
            });
            historiasGrid.appendChild(card);
        });
    }

    function mostrarContenidoHistoria(historia) {
        menuHistorias.classList.add('oculto');
        document.getElementById('apoyanos').classList.add('oculto');
        contenidoHistoria.classList.remove('oculto');
        tituloHistoria.textContent = historia.titulo;
        textoHistoria.innerHTML = historia.historia.replace(/\n/g, '<br><br>');
        currentStoryText = historia.historia;
    }

    function volverAlMenu() {
        menuHistorias.classList.remove('oculto');
        document.getElementById('apoyanos').classList.remove('oculto');
        contenidoHistoria.classList.add('oculto');
        if (synthesis.speaking) synthesis.cancel();
        restoreBackgroundMusicVolume();
    }

    function leerHistoria() {
        if (!synthesis) { alert('Tu navegador no soporta la lectura de texto.'); return; }
        if (synthesis.speaking) { synthesis.cancel(); restoreBackgroundMusicVolume(); return; }
        lowerBackgroundMusicVolume();
        const utterance = new SpeechSynthesisUtterance(currentStoryText);
        utterance.lang = 'es-ES';
        utterance.pitch = 0.9;
        utterance.rate = 0.95;
        utterance.onend = restoreBackgroundMusicVolume;
        utterance.onerror = restoreBackgroundMusicVolume;
        synthesis.speak(utterance);
    }

    // --- Modal QR que desaparece ---
    function abrirModalQR() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-contenido">
                <span class="cerrar-modal">&times;</span>
                <h3>Apóyanos con un Plin</h3>
                <p>Escanea el código QR para hacer una donación.</p>
                <img src="plin-qr.png" alt="Código QR de Plin" class="qr-imagen">
                <p class="qr-nombre">Roman Valverde</p>
            </div>
        `;
        document.body.appendChild(modal);

        qrOpenSound.currentTime = 0;
        qrOpenSound.play();

        modal.querySelector('.cerrar-modal').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    }

    mostrarQrPlinBtn.addEventListener('click', abrirModalQR);

    // --- Particles.js ---
    particlesJS('particles-js', {
        "particles": { "number": {"value":50,"density":{"enable":true,"value_area":800}},
        "color":{"value":"#b22222"},
        "shape":{"type":"circle"},
        "opacity":{"value":0.5},
        "size":{"value":3,"random":true},
        "line_linked":{"enable":false},
        "move":{"enable":true,"speed":1,"random":true,"out_mode":"out"} },
        "interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"}}},
        "retina_detect": true
    });

    // --- Event Listeners ---
    volverMenuBtn.addEventListener('click', volverAlMenu);
    leerHistoriaBtn.addEventListener('click', leerHistoria);
    generarNuevaHistoriaBtn.addEventListener('click', mostrarHistorias);
    toggleMusicBtn.addEventListener('click', toggleBackgroundMusic);

    // --- Inicialización ---
    mostrarHistorias();
    playBackgroundMusic();
});


