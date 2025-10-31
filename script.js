document.addEventListener('DOMContentLoaded', () => {
    const mainSections = document.querySelectorAll('main section');
    const navButtons = document.querySelectorAll('.nav-button');
    const volverGeneralButtons = document.querySelectorAll('.volver-general');

    const portadaInicial = document.getElementById('portada-inicial');
    const enterSiteBtn = document.getElementById('enter-site-btn');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const musicControl = document.getElementById('music-control');
    const apoyanosSection = document.getElementById('apoyanos');


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

    // --- Funcionalidad de la Portada Inicial ---
    enterSiteBtn.addEventListener('click', () => {
        portadaInicial.classList.add('oculto'); // Oculta la portada
        header.classList.remove('oculto');     // Muestra el header
        footer.classList.remove('oculto');     // Muestra el footer
        musicControl.classList.remove('oculto'); // Muestra el control de música
        showSection('menu-historias');         // Muestra la sección inicial de historias
        playBackgroundMusic();                 // Inicia la música al entrar
    });


    // --- Navegación General ---
    function showSection(targetId) {
        mainSections.forEach(section => {
            section.classList.add('oculto');
        });
        document.getElementById(targetId).classList.remove('oculto');
        apoyanosSection.classList.remove('oculto'); // Apóyanos siempre visible con el contenido principal

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
        });
    });

    // --- Música y Sonidos ---
    function playBackgroundMusic() {
        backgroundMusic.volume = BGM_VOLUME;
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            toggleMusicIcon.classList.remove('fa-volume-mute');
            toggleMusicIcon.classList.add('fa-volume-up');
        }).catch((error) => {
            // Manejar error si la reproducción automática es bloqueada
            console.warn("La música de fondo no pudo reproducirse automáticamente:", error);
            // Si no se puede reproducir automáticamente, establecer el icono en mute
            toggleMusicIcon.classList.remove('fa-volume-up');
            toggleMusicIcon.classList.add('fa-volume-mute');
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
            titulo: "CURVAS ESCALOFRIANTES",
            sinopsis: "Un camionero se detiene por una autoestopista que le advierte sobre una curva peligrosa, pero ella tiene un secreto helado.",
            historia: "Un camionero veterano conduce por una carretera de montaña a altas horas de la noche. Cerca de una curva peligrosa, ve a una joven vestida de blanco haciendo autostop. Se detiene y ella sube. Le pide que reduzca la velocidad en la siguiente curva, advirtiéndole que es muy cerrada. El hombre obedece y se salva de un accidente. Aliviado, le agradece por el aviso. Ella le responde con una voz cortante y fría: 'No me lo agradezcas. Es mi misión. Me maté en esa misma curva hace veinticinco años, una noche como esta.' Cuando él gira la vista hacia el copiloto, el asiento está vacío, pero totalmente mojado."
        },
        {
            titulo: "CUMPLE TU PROMESA",
            sinopsis: "Andrés prometió nunca dejar sola a Lucía. Incluso después de la muerte, sigue cumpliendo su promesa de formas aterradoras.",
            historia: "Andrés le prometió a Lucía que nunca la dejaría sola, ni siquiera después de la muerte. Un accidente de auto lo arrancó de su vida, pero la promesa siguió cumpliéndose. Cada mañana, Lucía encontraba el cepillo de dientes de Andrés húmedo, el control remoto en su lado del sofá y marcas recientes en la almohada junto a la suya. Una noche, harta, gritó al aire: —¡Déjame en paz! El televisor se encendió solo. En la pantalla, reflejada en la oscuridad, la cara de Andrés sonreía desde atrás."
        },
        {
            titulo: "MIRA FIJAMENTE TU ESPEJO",
            sinopsis: "Una mujer compra un espejo antiguo y nota que su reflejo empieza a moverse de forma independiente.",
            historia: "Una mujer, aficionada a la decoración antigua, compra un espejo de marco oscuro y tallado para su dormitorio. Desde el primer día, siente que su reflejo es ligeramente más lento en reaccionar. Lo ignora como un truco de la luz. Una mañana, se está maquillando y mira fijamente al espejo. Su reflejo parpadea primero, un instante antes de que lo haga ella. Se queda inmóvil. El reflejo, sin embargo, se voltea lentamente y le da la espalda."
        },
        {
            titulo: "CUIDADO CUANDO TE LLAMEN",
            sinopsis: "Una niña escucha la voz de su madre llamándola desde abajo, pero su madre está a su lado con una advertencia escalofriante.",
            historia: "Una noche de tormenta, una niña de unos siete años está sola en su habitación. Escucha la voz de su madre que la llama desde el piso de abajo, con un tono suave y urgente: 'Baja, cariño, ven aquí.' A punto de levantarse de la cama, siente una mano fría y fuerte que la sujeta del brazo. Es su madre, que está de pie junto a su cama, pálida y con los ojos muy abiertos. Susurra, con el aliento helado: 'No bajes. Yo también lo escuché.'"
        },
        {
            titulo: "TU PASILLO LO CONFIRMA",
            sinopsis: "Una pareja escucha pasos en su pasillo recién reformado. Un vecino y una extraña evidencia confirman la presencia de un antiguo habitante.",
            historia: "Una pareja se muda a una casa antigua y la reforman por completo. Todo es moderno y reluciente, con pisos de madera nuevos. La primera noche, despiertan con el sonido de pasos firmes y rítmicos en el pasillo superior, justo encima de su habitación. Asustados, suben a revisar. El pasillo está vacío, y los pasos se han detenido. Esto se repite cada noche. Un anciano vecino les cuenta que el anterior dueño, un militar, se suicidó en ese pasillo. Al terminar la conversación, la pareja nota que, a pesar de que los pisos son nuevos y recién barnizados, solo en el tramo donde se detenían los pasos, la madera está ligeramente desgastada, como por el ir y venir constante."
        },
        {
            titulo: "REVISA TU GAL
