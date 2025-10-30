document.addEventListener('DOMContentLoaded', () => {
    const menuHistorias = document.getElementById('menu-historias');
    const historiasGrid = document.querySelector('.historias-grid');
    const contenidoHistoria = document.getElementById('contenido-historia');
    const tituloHistoria = document.getElementById('titulo-historia');
    const textoHistoria = document.getElementById('texto-historia');
    const toggleSpeechBtn = document.getElementById('toggle-speech'); // Renombrado
    const volverMenuBtn = document.getElementById('volver-menu');
    // const generarNuevaHistoriaBtn = document.getElementById('generar-nueva-historia'); // Eliminado

    const mostrarQrPlinBtn = document.getElementById('mostrar-qr-plin');
    const qrOpenSound = document.getElementById('qr-open-sound');

    const backgroundMusic = document.getElementById('background-music');
    const toggleMusicBtn = document.getElementById('toggle-music');
    const toggleMusicIcon = toggleMusicBtn.querySelector('i');
    const cardClickSound = document.getElementById('card-click-sound');

    let currentStoryText = '';
    const synthesis = window.speechSynthesis;
    let isMusicPlaying = false;
    let isSpeaking = false; // Nueva variable para controlar si se está narrando
    const BGM_VOLUME = 0.2;
    const BGM_VOLUME_QUIET = 0.05;

    const historiasBase = [
        {
            titulo: "El reflejo que no era mío",
            sinopsis: "Una sombra repite los gestos de Lucía en el espejo...",
            historia: `Esa noche el espejo del baño comenzó a empañarse solo, mientras Lucía se cepillaba los dientes. Pensó que era por el vapor de la ducha, pero no se había duchado. Al limpiar el cristal, vio una figura borrosa detrás de ella. Se dio la vuelta, pero no había nadie. Extrañada, volvió a mirar el espejo, y la figura seguía allí, moviéndose como si la imitara con un desfase de un segundo. Lucía intentó levantar la mano, y la figura la levantó con un retardo escalofriante. El corazón le latió con fuerza. La figura en el espejo tenía los ojos hundidos y una sonrisa torcida. Lucía gritó y corrió fuera del baño, sin atreverse a mirar atrás. Desde entonces, evita los espejos, porque sabe que hay algo más que su propio reflejo observándola.`
        },
        {
            titulo: "La llamada de las 3:17",
            sinopsis: "Marco recibe una llamada misteriosa a las 3:17 a.m. que lo sumerge en una pesadilla telefónica.",
            historia: `Marco se despertó con el celular vibrando en la mesita de noche. La pantalla marcaba 3:17 a.m. y un número desconocido. Dudó en contestar, pero la curiosidad le ganó. Al acercar el teléfono a su oído, solo escuchó un siseo constante, como estática de radio vieja, mezclado con lo que sonaba a un susurro lejano e incomprensible. La piel se le erizó. Estuvo a punto de colgar cuando una voz infantil, distorsionada y lenta, dijo: "Él está justo detrás de ti." Marco se giró bruscamente, el corazón martilleándole en el pecho, pero no había nada. La voz en el teléfono rió, una risa fría y gutural. "Ahora sí." La llamada se cortó. Desde esa noche, Marco siente una presencia constante en su espalda, y cada vez que mira un reloj, teme ver las 3:17.`
        },
        {
            titulo: "No apagues el proyector",
            sinopsis: "Andrés ignora una advertencia y proyecta una película antigua, desatando una presencia oscura en el cine abandonado.",
            historia: `Andrés trabajaba en una tienda de empeños, y un día llegó un proyector de cine antiguo junto con una bobina de película sin etiqueta. El dueño le advirtió que nunca la proyectara. Una noche, Andrés, aburrido y solo en el cine abandonado que usaban de almacén, decidió ignorar la advertencia. Conectó el proyector y la película empezó a rodar. Las imágenes eran granuladas, de un bosque oscuro y un camino solitario. De repente, una figura alta y delgada apareció en la pantalla, moviéndose de forma antinatural. Andrés sintió un frío gélido. La figura en la pantalla se detuvo, y lentamente, giró su cabeza para mirar directamente a la cámara, a Andrés. Sus ojos, dos puntos brillantes en la oscuridad. El proyector empezó a temblar, y un rasguño se escuchó detrás de él. Andrés no pudo apagar el proyector, paralizado por el miedo mientras la figura en la pantalla se acercaba, y un chillido inhumanamente agudo llenó el cine. Hoy, el cine está sellado, y Andrés, aunque vivo, nunca ha vuelto a ser el mismo, susurrando constantemente: "No apagues el proyector..."`
        },
        {
            titulo: "El Silbido de Cumbemayo",
            sinopsis: "Rafael ignora una advertencia local en Cumbemayo y se adentra en un camino sagrado, atrayendo a una entidad ancestral.",
            historia: `Cumbemayo, Cajamarca, era conocido por sus enigmáticos petroglifos y su atmósfera mística. Rafael, un turista aventurero, había escuchado las advertencias de los locales sobre no desviarse del camino principal al caer la noche, especialmente cerca de las formaciones rocosas. "El silbido, joven, no es del viento", le dijo un anciano. Intrigado, Rafael decidió explorar un sendero menos transitado al anochecer. La niebla comenzó a descender, y el silencio se hizo profundo. Entonces lo escuchó: un silbido largo y agudo, que parecía venir de todas partes y de ninguna a la vez, haciéndole doler los oídos. Se sintió observado. Aceleró el paso, pero el silbido se acercaba, y ahora podía distinguir lo que sonaba como pasos arrastrándose entre las rocas. El pánico se apoderó de él. De pronto, la niebla se disipó por un instante, revelando una figura alta y oscura, con extremidades retorcidas, silueteada contra las rocas milenarias. Rafael corrió sin mirar atrás, el silbido persiguiéndolo hasta el pueblo. Nunca supo qué era, pero el sonido de ese silbido quedó grabado en su mente, recordándole que hay secretos ancestrales que es mejor no despertar.`
        },
        {
            titulo: "El Camino de los Muertos",
            sinopsis: "Elías se adentra en un tramo evitado de noche, descubriendo que no está solo en la oscuridad de la carretera.",
            historia: `En la carretera que une Huancavelica con Ayacucho, existe un tramo conocido por los lugareños como "El Camino de los Muertos". Se decía que al caer la noche, las almas de quienes perecieron allí vagaban en busca de compañía. Elías, un camionero escéptico y apurado, decidió tomar ese atajo una noche cerrada, ignorando las advertencias. La oscuridad era total, solo rota por los faros de su camión. A mitad del tramo, vio una figura de pie al borde de la carretera, vestida con ropa andina antigua. Pensando que era un autoestopista, Elías desaceleró. La figura levantó una mano, pero al pasarla con los faros, Elías vio con horror que su rostro era cadavérico, con ojos hundidos y la boca abierta en un grito silencioso. Elías pisó el acelerador, el corazón desbocado. Miró por el espejo retrovisor, y la figura estaba ahora corriendo junto a su camión, igualando su velocidad, su rostro espectral pegado a la ventanilla, susurrando algo que no podía escuchar pero que sentía en sus huesos. No se detuvo hasta llegar a la siguiente ciudad, temblando. Desde aquella noche, Elías nunca más tomó "El Camino de los Muertos", y cada vez que conduce de noche, no puede evitar revisar sus espejos, por si el caminante sin alma sigue intentando alcanzarlo.`
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
    // Función obtenerHistoriasParaMostrar eliminada, ahora se muestran todas directamente
    function mostrarHistorias() {
        historiasGrid.innerHTML = '';
        const historiasMostradas = historiasBase; // Muestra todas las historias base
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

        // Resetear el botón de narración y estado al entrar a una nueva historia
        toggleSpeechBtn.innerHTML = '<i class="fas fa-play"></i> Leer Historia';
        isSpeaking = false;
        if (synthesis.speaking) synthesis.cancel(); // Asegurar que no quede hablando de una historia anterior
        restoreBackgroundMusicVolume();
    }

    function volverAlMenu() {
        menuHistorias.classList.remove('oculto');
        document.getElementById('apoyanos').classList.remove('oculto');
        contenidoHistoria.classList.add('oculto');
        if (synthesis.speaking) synthesis.cancel();
        isSpeaking = false; // Actualizar estado
        toggleSpeechBtn.innerHTML = '<i class="fas fa-play"></i> Leer Historia'; // Restaurar texto del botón
        restoreBackgroundMusicVolume();
    }

    function toggleHistoriaSpeech() { // Función para pausar/reanudar
        if (!synthesis) { alert('Tu navegador no soporta la lectura de texto.'); return; }

        if (isSpeaking) {
            synthesis.pause();
            isSpeaking = false;
            toggleSpeechBtn.innerHTML = '<i class="fas fa-play"></i> Reanudar';
            restoreBackgroundMusicVolume();
        } else {
            if (synthesis.paused) {
                synthesis.resume();
                isSpeaking = true;
                toggleSpeechBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
                lowerBackgroundMusicVolume();
            } else {
                synthesis.cancel(); // Cancelar cualquier narración previa antes de empezar una nueva
                const utterance = new SpeechSynthesisUtterance(currentStoryText);
                utterance.lang = 'es-ES';
                utterance.pitch = 0.9;
                utterance.rate = 0.95;
                utterance.onend = () => {
                    restoreBackgroundMusicVolume();
                    isSpeaking = false;
                    toggleSpeechBtn.innerHTML = '<i class="fas fa-play"></i> Leer Historia'; // Al finalizar, cambiar a "Leer"
                };
                utterance.onerror = () => {
                    restoreBackgroundMusicVolume();
                    isSpeaking = false;
                    toggleSpeechBtn.innerHTML = '<i class="fas fa-play"></i> Leer Historia'; // En caso de error, cambiar a "Leer"
                };
                synthesis.speak(utterance);
                isSpeaking = true;
                toggleSpeechBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
                lowerBackgroundMusicVolume();
            }
        }
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
    // Asegúrate de que particles.min.js esté en la misma carpeta
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
    toggleSpeechBtn.addEventListener('click', toggleHistoriaSpeech); // Event listener para el nuevo botón
    // generarNuevaHistoriaBtn.addEventListener('click', mostrarHistorias); // Eliminado
    toggleMusicBtn.addEventListener('click', toggleBackgroundMusic);

    // --- Inicialización ---
    mostrarHistorias(); // Ahora muestra todas las historias al cargar
    playBackground

