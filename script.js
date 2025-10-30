document.addEventListener('DOMContentLoaded', () => {
    const mainSections = document.querySelectorAll('main section');
    const navButtons = document.querySelectorAll('.nav-button');
    const volverGeneralButtons = document.querySelectorAll('.volver-general');

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
    const toggleMusicIcon = toggleMusicBtn.querySelector('i');
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

    // --- Navegación General ---
    function showSection(targetId) {
        mainSections.forEach(section => {
            section.classList.add('oculto');
        });
        document.getElementById(targetId).classList.remove('oculto');
        document.getElementById('apoyanos').classList.remove('oculto'); // Apóyanos siempre visible

        // Detener TTS si cambiamos de sección
        if (synthesis.speaking) {
            synthesis.cancel();
        }
        restoreBackgroundMusicVolume();
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            showSection(button.dataset.target);
            // Lógica específica para cada sección al mostrarla
            if (button.dataset.target === 'carta-astral-section') {
                resetAstralQuiz();
            } else if (button.dataset.target === 'verdad-reto-section') {
                resetVerdadOReto();
            } else if (button.dataset.target === 'menu-historias') {
                mostrarHistorias(); // Asegura que las historias se carguen al volver
            }
        });
    });

    volverGeneralButtons.forEach(button => {
        button.addEventListener('click', () => {
            showSection('menu-historias');
            mostrarHistorias(); // Recargar las historias
            // Los resets ya se manejan al volver a entrar en las secciones específicas,
            // pero si quieres que se reseteen *al salir*, podrías ponerlos aquí.
            // Por ahora, solo se resetean al volver a *entrar* en ellas.
        });
    });

    // --- Música y Sonidos ---
    function playBackgroundMusic() {
        backgroundMusic.volume = BGM_VOLUME;
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            toggleMusicIcon.classList.remove('fa-volume-mute');
            toggleMusicIcon.classList.add('fa-volume-up');
        }).catch(() => {
            // Manejar error si la reproducción automática es bloqueada
            console.warn("La música de fondo no pudo reproducirse automáticamente.");
        });
    }

    function toggleBackgroundMusic() {
        if (backgroundMusic.paused) {
            playBackgroundMusic();
        } else {
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

    // --- Historias (Mantiene la lógica existente) ---
    const historiasBase = [
        {
            titulo: "El reflejo que no era mío",
            sinopsis: "Una sombra repite los gestos de Lucía en el espejo...",
            historia: "Esa noche el espejo del baño comenzó a empañarse solo, mientras Lucía se cepillaba los dientes. Al principio no le dio importancia, pensando que era el vapor de la ducha de su hermana, aunque nadie se había duchado. Pero cuando intentó limpiar el cristal, notó que su reflejo no la copiaba exactamente. Había un ligero desfase, como un eco visual. Los ojos de su doble en el espejo parecían más oscuros, y una sonrisa lúgubre se extendió por su rostro antes de que Lucía pudiera reaccionar. El espejo se hizo completamente opaco un instante y al volver a aclararse, su reflejo había desaparecido. Solo quedaba el de la pared detrás de ella. Se giró lentamente, la piel de gallina, y vio su reflejo oscuro mirándola fijamente desde la sombra del pasillo."
        },
        {
            titulo: "La llamada de las 3:17",
            sinopsis: "Marco recibe una llamada misteriosa a las 3:17 a.m....",
            historia: "Marco se despertó con el celular vibrando, la pantalla iluminando el cuarto oscuro. Eran las 3:17 a.m., y el número era desconocido. Dudó un instante, pero la curiosidad pudo más. Contestó con un '¿Hola?' apenas audible. Al otro lado, solo silencio. No un silencio de línea muerta, sino uno denso, pesado, como si algo estuviera conteniendo la respiración. Estuvo a punto de colgar cuando una voz, apenas un susurro rasposo, pronunció su nombre. 'Marco... te estoy esperando.' El pánico se apoderó de él. Colgó y bloqueó el número, pero el teléfono volvió a sonar un instante después, con el mismo número. Y así, cada noche a las 3:17 a.m., el teléfono sonaba, y la voz lo llamaba, más cerca cada vez."
        },
        {
            titulo: "No apagues el proyector",
            sinopsis: "Andrés ignora una advertencia y proyecta una película antigua...",
            historia: "Andrés trabajaba en una tienda de empeños, y un día llegó un proyector de cine antiguo con unas bobinas de película sin identificar. Una nota gastada advertía: 'No apagues el proyector una vez iniciado.' Ignorando la superstición, Andrés lo llevó a un viejo cine abandonado que solía visitar. Conectó el proyector y la imagen cobró vida: una familia en un picnic, normal al principio. Pero pronto, figuras sombrías comenzaron a aparecer en el fondo del metraje, observando. Las sombras se movían, acercándose a la familia, que parecía no verlas. De repente, la pantalla se llenó de rostros distorsionados, gritos mudos. Andrés, aterrado, intentó apagar el proyector, pero el botón no respondía. Las imágenes se hicieron cada vez más vívidas, y el calor del proyector comenzó a envolverlo, como si las sombras hubieran cruzado la pantalla y estuvieran ahora con él en la oscuridad."
        },
        {
            titulo: "El Silbido de Cumbemayo",
            sinopsis: "Rafael ignora una advertencia local en Cumbemayo...",
            historia: "Cumbemayo, Cajamarca, es famoso por sus enigmáticos canales y su ambiente místico. Rafael, un arqueólogo escéptico, desestimó las advertencias de los lugareños sobre no adentrarse solo en la zona al anochecer, especialmente cerca de las cuevas con petroglifos. 'Dicen que el silbido de la Pachamama se lleva a los curiosos', le advirtieron. Rafael se internó al caer la tarde, buscando una formación rocosa en particular. La oscuridad llegó rápido, y con ella, un silbido penetrante y agudo que parecía venir de todas partes y de ninguna. No era el viento, era un sonido consciente, casi musical, pero lleno de una maldad ancestral. El silbido lo atrajo más profundamente entre las rocas, desorientándolo. Sintió una presencia fría a su lado, y aunque no vio nada, el silbido se hizo una voz en su mente, repitiendo su nombre. Nunca encontró la salida esa noche, solo se encontró a sí mismo, girando en círculos, respondiendo al eco de un silbido que prometía guiarlo... a un lugar sin retorno."
        },
        {
            titulo: "El Camino de los Muertos",
            sinopsis: "Elías se adentra en un tramo evitado de noche...",
            historia: "En la carretera que une Huancavelica con Ayacucho, hay un tramo viejo y sinuoso que pocos se atreven a tomar de noche. Lo llaman 'El Camino de los Muertos' por las historias de accidentes inexplicables y apariciones. Elías, un camionero joven, decidió tomarlo para ahorrar tiempo, desoyendo las historias. La niebla se levantó densa, envolviendo el camión en un silencio sepulcral. Las luces de sus faros apenas penetraban la oscuridad. Fue entonces cuando los vio: figuras borrosas, como sombras desvanecidas, caminando por el borde de la carretera. No lo miraban, simplemente avanzaban en un silencio inquietante. Al principio pensó que eran alucinaciones por el cansancio, pero la cantidad de figuras aumentó, rodeando su camión, algunas incluso pareciendo pasar a través de él. El frío se hizo insoportable, y el motor empezó a fallar. Elías pisó el acelerador, pero las figuras no se quedaban atrás. De repente, una de ellas se detuvo justo frente a él, un rostro pálido y antiguo con ojos vacíos. Elías cerró los ojos y gritó, el camión patinó... Se despertó al día siguiente, el camión a salvo al costado de la carretera, con la puerta abierta. Pero al mirar el espejo retrovisor, vio por un instante, entre la niebla matutina, las siluetas que seguían caminando, esperándolo."
        }
    ];

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
        document.getElementById('apoyanos').classList.add('oculto'); // Ocultar Apóyanos en la historia
        contenidoHistoria.classList.remove('oculto');
        tituloHistoria.textContent = historia.titulo;
        textoHistoria.innerHTML = historia.historia.replace(/\n/g, '<br><br>');
        currentStoryText = historia.historia;
    }

    function volverAlMenu() {
        menuHistorias.classList.remove('oculto');
        document.getElementById('apoyanos').classList.remove('oculto'); // Mostrar Apóyanos al volver
        contenidoHistoria.classList.add('oculto');
        if (synthesis.speaking) synthesis.cancel();
        restoreBackgroundMusicVolume();
    }

    function leerHistoria() {
        if (!synthesis) { alert('Tu navegador no soporta la lectura de texto.'); return; }
        if (synthesis.speaking) {
            synthesis.cancel();
            restoreBackgroundMusicVolume();
            toggleSpeechBtn.querySelector('i').classList.remove('fa-pause');
            toggleSpeechBtn.querySelector('i').classList.add('fa-play');
            return;
        }
        lowerBackgroundMusicVolume();
        const utterance = new SpeechSynthesisUtterance(currentStoryText);
        utterance.lang = 'es-ES';
        utterance.pitch = 0.9;
        utterance.rate = 0.95;
        utterance.onend = () => {
            restoreBackgroundMusicVolume();
            toggleSpeechBtn.querySelector('i').classList.remove('fa-pause');
            toggleSpeechBtn.querySelector('i').classList.add('fa-play');
        };
        utterance.onerror = () => {
            restoreBackgroundMusicVolume();
            toggleSpeechBtn.querySelector('i').classList.remove('fa-pause');
            toggleSpeechBtn.querySelector('i').classList.add('fa-play');
        };
        synthesis.speak(utterance);
        toggleSpeechBtn.querySelector('i').classList.remove('fa-play');
        toggleSpeechBtn.querySelector('i').classList.add('fa-pause');
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

    // --- Lógica de Carta Astral ---
    const astralQuestions = [
        {
            question: "¿Qué elemento te atrae más en una noche de Halloween?",
            options: [
                { text: "El crepúsculo y la brisa fría (Aire)", value: "aire" },
                { text: "El calor de una hoguera o velas (Fuego)", value: "fuego" },
                { text: "La niebla que cubre la tierra (Tierra)", value: "tierra" },
                { text: "La humedad de la noche, la lluvia (Agua)", value: "agua" }
            ]
        },
        {
            question: "¿Qué criatura mística sientes que te representa?",
            options: [
                { text: "Un sabio Búho o un espíritu del viento (Sabiduría, Libertad)", value: "aire" },
                { text: "Un poderoso Dragón o un fénix (Poder, Transformación)", value: "fuego" },
                { text: "Un antiguo Golem o un espíritu del bosque (Estabilidad, Raíces)", value: "tierra" },
                { text: "Una enigmática Sirena o un espectro del lago (Emoción, Misterio)", value: "agua" }
            ]
        },
        {
            question: "¿Cuál es tu forma preferida de afrontar lo desconocido?",
            options: [
                { text: "Analizando la situación y buscando explicaciones lógicas (Racional)", value: "aire" },
                { text: "Confrontándolo directamente, sin miedo (Valiente)", value: "fuego" },
                { text: "Observando con cautela y planificando (Prudente)", value: "tierra" },
                { text: "Dejándome llevar por la intuición y los sentimientos (Intuitivo)", value: "agua" }
            ]
        }
    ];

    let currentAstralQuestionIndex = 0;
    let astralResults = { aire: 0, fuego: 0, tierra: 0, agua: 0 };

    function renderAstralQuestion() {
        const questionData = astralQuestions[currentAstralQuestionIndex];
        astralQuizDiv.innerHTML = `<h3>${questionData.question}</h3><div class="question-options"></div>`;
        const optionsContainer = astralQuizDiv.querySelector('.question-options');

        questionData.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.dataset.value = option.value;
            button.addEventListener('click', handleAstralAnswer);
            optionsContainer.appendChild(button);
        });

        startAstralQuizBtn.classList.add('oculto');
        nextAstralQuestionBtn.classList.remove('oculto');
        showAstralResultBtn.classList.add('oculto');
    }

    function handleAstralAnswer(event) {
        const selectedValue = event.target.dataset.value;
        astralResults[selectedValue]++;

        // Desactivar botones después de la selección
        astralQuizDiv.querySelectorAll('.question-options button').forEach(btn => {
            btn.disabled = true;
            if (btn !== event.target) {
                btn.style.opacity = '0.6'; // Opcional: reducir opacidad de no seleccionados
            } else {
                btn.style.backgroundColor = '#ff4500'; // Resaltar el seleccionado
            }
        });

        if (currentAstralQuestionIndex < astralQuestions.length - 1) {
            nextAstralQuestionBtn.classList.remove('oculto');
            showAstralResultBtn.classList.add('oculto');
        } else {
            nextAstralQuestionBtn.classList.add('oculto');
            showAstralResultBtn.classList.remove('oculto');
        }
    }

    function showAstralResult() {
        astralQuizDiv.classList.add('oculto');
        nextAstralQuestionBtn.classList.add('oculto');
        showAstralResultBtn.classList.add('oculto');
        astralResultDiv.classList.remove('oculto');

        let dominantElement = '';
        let maxScore = -1;
        for (const element in astralResults) {
            if (astralResults[element] > maxScore) {
                maxScore = astralResults[element];
                dominantElement = element;
            }
        }

        let resultDescription = '';
        let resultImage = '';

        switch (dominantElement) {
            case 'aire':
                resultDescription = "Tu Carta Astral de Halloween te revela como un espíritu libre y pensador, como el Viento Nocturno. Eres curioso, adaptable y siempre buscas entender los misterios. Tu mente es tu mayor arma contra la oscuridad, pero a veces puedes ser etéreo y difícil de aferrar. Los susurros del viento te guían hacia la verdad oculta.";
                resultImage = 'astral-aire.png'; // Asegúrate de tener esta imagen
                break;
            case 'fuego':
                resultDescription = "Tu Carta Astral de Halloween te marca como una Llama Danzante, llena de pasión y energía. Eres valiente, decidido y no temes enfrentarte a lo desconocido. Tu presencia ilumina la oscuridad, pero a veces puedes ser impulsivo y un poco volátil. La fuerza ardiente de tu espíritu te protege de los males de la noche.";
                resultImage = 'astral-fuego.png'; // Asegúrate de tener esta imagen
                break;
            case 'tierra':
                resultDescription = "Tu Carta Astral de Halloween te define como la Tierra Ancestral, firme y arraigada. Eres práctico, paciente y confías en tu instinto para navegar los caminos ocultos. Tu estabilidad es un refugio en la tormenta, pero a veces puedes ser terco y reacio al cambio. Las profundidades de la tierra guardan tus secretos más oscuros.";
                resultImage = 'astral-tierra.png'; // Asegúrate de tener esta imagen
                break;
            case 'agua':
                resultDescription = "Tu Carta Astral de Halloween te identifica como la Corriente Misteriosa, profunda e intuitiva. Eres emocional, empático y posees una conexión innata con el velo entre los mundos. Tu sensibilidad es tu don, pero a veces puedes ser influenciable y melancólico. Las aguas sombrías de la noche revelan tus verdades más íntimas.";
                resultImage = 'astral-agua.png'; // Asegúrate de tener esta imagen
                break;
            default:
                resultDescription = "Parece que tu destino es tan enigmático que no pudo ser revelado por completo. ¡El misterio te persigue!";
                resultImage = 'astral-misterio.png'; // Imagen por defecto
                break;
        }
        astralDescriptionP.textContent = resultDescription;
        astralImageContainer.innerHTML = `<img src="${resultImage}" alt="Tu Carta Astral: ${dominantElement}">`;
    }

    function resetAstralQuiz() {
        currentAstralQuestionIndex = 0;
        astralResults = { aire: 0, fuego: 0, tierra: 0, agua: 0 };
        astralQuizDiv.innerHTML = ''; // Limpiar preguntas anteriores
        astralQuizDiv.classList.remove('oculto');
        astralResultDiv.classList.add('oculto');
        startAstralQuizBtn.classList.remove('oculto');
        nextAstralQuestionBtn.classList.add('oculto');
        showAstralResultBtn.classList.add('oculto');
    }

    startAstralQuizBtn.addEventListener('click', () => {
        renderAstralQuestion();
    });

    nextAstralQuestionBtn.addEventListener('click', () => {
        currentAstralQuestionIndex++;
        if (currentAstralQuestionIndex < astralQuestions.length) {
            renderAstralQuestion();
        }
    });

    showAstralResultBtn.addEventListener('click', showAstralResult);

    // --- Lógica de Verdad o Reto ---
    const verdades = [
        "¿Cuál es el miedo más irracional que tienes?",
        "¿Alguna vez has mentido para evitar problemas graves? ¿Sobre qué?",
        "¿Qué es lo más vergonzoso que te ha pasado en público?",
        "Si pudieras cambiar una cosa de tu pasado, ¿cuál sería y por qué?",
        "¿Cuál es tu mayor secreto que nadie conoce?",
        "¿Qué es lo más travieso que hiciste de niño y nadie descubrió?",
        "¿Crees en fantasmas? ¿Por qué sí o por qué no?",
        "Si tuvieras un superpoder por un día, ¿cuál elegirías y qué harías?",
        "¿Qué es lo que más te molesta de la gente?",
        "¿Alguna vez te has enamorado de alguien que no debías?",
    ];

    const retos = [
        "Haz un baile espeluznante durante 30 segundos.",
        "Imita a tu personaje de película de terror favorito.",
        "Canta una canción de cuna con voz de monstruo.",
        "Envía un mensaje de texto a alguien y dile 'La luna me susurró tu nombre' sin más explicaciones.",
        "Cuenta una mini historia de terror improvisada en 30 segundos.",
        "Permite que el siguiente jugador te ponga un 'tatuaje' de maquillaje aterrador.",
        "Habla con voz de robot durante tus próximas 3 intervenciones.",
        "Intenta asustar a alguien (de forma segura y sin gritar) y grábalo.",
        "Come algo inusual (si hay algo disponible y es seguro, ej: una cucharada de mostaza).",
        "Haz 10 sentadillas mientras haces ruidos de fantasma.",
    ];

    let usedVerdades = new Set();
    let usedRetos = new Set();

    function getRandomItem(array, usedSet) {
        if (usedSet.size === array.length) {
            usedSet.clear(); // Reiniciar si todas han sido usadas
        }
        let item;
        do {
            item = array[Math.floor(Math.random() * array.length)];
        } while (usedSet.has(item));
        usedSet.add(item);
        return item;
    }

    function displayVerdad() {
        vrQuestionP.textContent = getRandomItem(verdades, usedVerdades);
        getVerdadBtn.classList.add('oculto');
        getRetoBtn.classList.add('oculto');
        newVrBtn.classList.remove('oculto');
    }

    function displayReto() {
        vrQuestionP.textContent = getRandomItem(retos, usedRetos);
        getVerdadBtn.classList.add('oculto');
        getRetoBtn.classList.add('oculto');
        newVrBtn.classList.remove('oculto');
    }

    function resetVerdadOReto() {
        vrQuestionP.textContent = "Presiona \"Verdad\" o \"Reto\" para empezar...";
        getVerdadBtn.classList.remove('oculto');
        getRetoBtn.classList.remove('oculto');
        newVrBtn.classList.add('oculto');
        usedVerdades.clear();
        usedRetos.clear();
    }

    getVerdadBtn.addEventListener('click', displayVerdad);
    getRetoBtn.addEventListener('click', displayReto);
    newVrBtn.addEventListener('click', resetVerdadOReto); // Al hacer clic en "Nueva Pregunta/Reto" resetea y permite elegir
                                                         // de nuevo Verdad o Reto. Si quisieras directamente otra
                                                         // de la misma categoría, la lógica cambiaría ligeramente.


    // --- Particles.js (Se mantiene igual) ---
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

    // --- Event Listeners Iniciales ---
    volverMenuBtn.addEventListener('click', volverAlMenu);
    toggleSpeechBtn.addEventListener('click', leerHistoria);
    mostrarQrPlinBtn.addEventListener('click', abrirModalQR);
    toggleMusicBtn.addEventListener('click', toggleBackgroundMusic);

    // --- Inicialización ---
    showSection('menu-historias'); // Asegúrate de que esta es la sección inicial
    mostrarHistorias(); // Carga las tarjetas de historias al inicio
    playBackgroundMusic(); // Inicia la música de fondo
});
