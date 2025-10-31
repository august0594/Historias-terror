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
            titulo: "REVISA TU GALERÍA DE FOTOS",
            sinopsis: "Un hombre soltero descubre una selfie inquietante de sí mismo durmiendo en su celular.",
            historia: "Un hombre vive solo en su apartamento. Una tarde, revisando la galería de su celular, encuentra una foto que no recuerda haber tomado. Es una selfie de él mismo durmiendo, en su cama, tomada desde un ángulo bajo y cercano. La foto es perfectamente nítida y muestra su rostro en plena inconsciencia. Él vive solo y nunca duerme con el celular cerca de su cama, sino en el escritorio del otro extremo."
        },
        {
            titulo: "GRABA SIN MIEDO UN MOMENTO",
            sinopsis: "Un grupo de amigos graba un columpio moviéndose en un parque abandonado y descubre una figura extraña.",
            historia: "En un viejo parque abandonado, un grupo de amigos se atreve a ir de noche. Se acercan a unos columpios oxidados que se mueven suavemente con el viento. Uno de ellos saca su celular para grabar. En la grabación, se distingue una silueta de niña sentada en el columpio central, meciéndose lentamente. Ninguno de ellos la vio en el momento, y el columpio no se movía con tanta fuerza como para justificar la silueta. Al día siguiente, la policía reporta que la noche anterior, en ese mismo parque, desapareció una niña de la zona que vestía igual."
        },
        {
            titulo: "EL PASAJERO SILENCIOSO",
            sinopsis: "Un taxista recoge a una mujer misteriosa que lo lleva a una casa abandonada y desaparece.",
            historia: "En una noche fría y lluviosa, un taxista solitario, Juan, recoge a una mujer vestida elegantemente, pero con un aire de tristeza. Le da una dirección en las afueras, un lugar que a Juan le suena a viejo y abandonado. Durante el trayecto, la mujer no habla, solo observa la lluvia caer. Al llegar a su destino, una mansión ruinosa y oscura, Juan se gira para cobrar, pero el asiento trasero está vacío. Solo queda un tenue olor a azucenas. Mientras se pregunta si se ha vuelto loco, una luz parpadea en el piso superior de la casa, revelando por un instante la silueta de la mujer mirándolo desde la ventana. Juan acelera, dejando atrás el misterio y el eco de una risa infantil."
        },
        {
            titulo: "EL LAMENTO DEL BOSQUE",
            sinopsis: "Senderistas ignoran las advertencias sobre un bosque encantado y escuchan un lamento que los persigue.",
            historia: "Un grupo de amigos decide ir de camping a un bosque conocido por sus antiguas leyendas. Los lugareños les advierten sobre 'El Lamento de las Almas Perdidas' que se escucha de noche. Escépticos, montan sus tiendas. A medianoche, un llanto desgarrador, como el de un niño, rompe el silencio. Uno de ellos, valiente, decide investigar con una linterna. El lamento se hace más fuerte, pareciendo moverse entre los árboles, siempre un paso por delante de él. Vuelve aterrorizado, y el grupo decide irse. Mientras empacan, los demás escuchan el llanto no solo del bosque, sino también, débilmente, desde el interior de su propia tienda. La tienda que habían cerrado con cremallera, donde uno de ellos había dejado su mochila."
        },
        {
            titulo: "LA MELODÍA DE LA CAJA MUSICAL",
            sinopsis: "Una chica encuentra una caja musical antigua que toca sola y atrae a una presencia oscura.",
            historia: "Sofía hereda de su abuela una pequeña caja musical de madera, con una bailarina polvorienta en su interior. La caja parece rota, pero una noche, Sofía la escucha tocar una melodía espeluznante. Al principio, piensa que ha sido el viento o un animal, pero se repite. Intenta cerrar la tapa, pero esta se resiste. La música suena más fuerte y una sombra oscura comienza a formarse en su habitación, moviéndose al ritmo de la melodía. La bailarina dentro de la caja empieza a girar más rápido, sus ojos pintados parecen seguir a Sofía. El aire se vuelve frío, y la sombra se acerca a la cama. Sofía grita, y la caja musical se detiene de golpe, la bailarina quieta y mirando hacia ella, pero la sombra ya no está en la habitación. Siente algo frío sobre su pie, y al mirar, ve las puntas de los dedos de una mano oscura aferrándose al borde de su manta."
        }
    ];

    function obtenerHistoriasParaMostrar() {
        // Devuelve una copia de todo el array de historiasBase para mostrarlas todas.
        return [...historiasBase];
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
        "¿Cuál fue la mentira más grande que has dicho sin que te descubran?",
        "¿Con quién te gustaría quedar atrapado/a en un ascensor?",
        "¿Cuál ha sido tu momento más vergonzoso frente a alguien que te gusta?",
        "¿Has stalkeado a tu ex últimamente?",
        "¿Qué es lo más loco que has hecho por amor o deseo?",
        "¿Cuál fue tu primera impresión de la persona a tu lado?",
        "Si pudieras borrar un recuerdo, ¿cuál sería?",
        "¿Qué cosa te da más morbo?",
        "¿A quién besarías de este grupo?",
        "¿Cuál ha sido tu sueño más extraño o picante?",
        "¿Qué es lo más infantil que aún haces en secreto?",
        "¿Cuál es tu fantasía más loca?",
        "¿Has enviado una foto comprometedora alguna vez?",
        "¿Qué cosa no soportas en una cita?",
        "¿A quién no invitarías nunca a salir?",
        "¿Qué es lo más atrevido que has hecho en público?",
        "¿Con quién del grupo tendrías una cita de una noche?",
        "¿Qué parte de tu cuerpo te gusta más?",
        "¿Cuál ha sido tu peor beso?",
        "¿A quién le confesarías algo esta noche si tuvieras que hacerlo?"
        "¿Has tenido pensamientos subidos de tono con alguien aquí?",
        "¿Cuál fue tu primera experiencia sexual?",
        "¿Te han atrapado haciendo algo indebido?",
        "¿Cuál es tu posición favorita?",
        "¿Qué es lo más raro que te han pedido en la cama?",
        "¿Con quién de aquí te imaginas una noche loca?",
        "¿Qué prefieres: hacerlo en silencio o con ruido?",
        "¿Cuál es tu punto débil?",
        "¿Has tenido un amor prohibido?",
        "¿Qué es lo más atrevido que has hecho con alguien?",
        "¿Has fingido alguna vez placer?",
        "¿Cuántas veces lo has hecho en un mismo día?",
        "¿Te gusta dominar o ser dominado/a?",
        "¿Cuál fue tu peor experiencia íntima?",
        "¿Qué canción te pone en modo 'romance'?"
    ];

    const retos = [
        "Canta el estribillo de tu canción favorita como si estuvieras en un concierto.",
        "Imita a alguien del grupo durante 1 minuto.",
        "Habla con acento argentino hasta tu siguiente turno.",
        "Cuenta un chiste malo y ríete de tu propio chiste.",
        "Deja que alguien te cambie el nombre en el grupo por el resto del juego.",
        "Graba un audio diciendo algo ridículo y mándalo a un amigo.",
        "Publica una historia en tus redes con un emoji al azar sin explicación.",
        "Haz 10 sentadillas mientras dices un piropo en cada una.",
        "Muestra la última foto que tienes en tu galería.",
        "Di una frase de amor mirando a alguien del grupo.",
        "Baila sin música durante 30 segundos.",
        "Deja que alguien revise tus emojis recientes.",
        "Léele un mensaje antiguo a alguien del grupo."
          "Envía un emoji 🔥 a tu contacto más reciente.",
        "Dale un beso en la mejilla a la persona que el grupo elija.",
        "Deja que alguien escriba una frase coqueta en tu estado.",
        "Mira fijamente a alguien durante 20 segundos sin reírte.",
        "Haz un cumplido con tono sexy a quien tengas al frente.",
        "Cuenta un secreto íntimo en voz baja al oído de alguien.",
        "Describe cómo sería tu cita ideal con alguien de aquí.",
        "Da un abrazo “de película” a alguien.",
        "Di el nombre de alguien con quien te gustaría dormir una noche.",
        "Simula que estás coqueteando con alguien del grupo durante 15 segundos.",
        "Envía un audio diciendo “te extraño” a alguien aleatorio.",
        "Muestra tu historial de búsqueda por 5 segundos.",
        "Envía un mensaje de “me gustas” a un contacto al azar (real o falso).",
        "Deja que alguien te cambie la foto de perfil por 1 hora."
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
