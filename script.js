document.addEventListener('DOMContentLoaded', () => {
    const menuHistorias = document.getElementById('menu-historias');
    const historiasGrid = document.querySelector('.historias-grid');
    const contenidoHistoria = document.getElementById('contenido-historia');
    const tituloHistoria = document.getElementById('titulo-historia');
    const textoHistoria = document.getElementById('texto-historia');
    const leerHistoriaBtn = document.getElementById('leer-historia');
    const volverMenuBtn = document.getElementById('volver-menu');
    const generarNuevaHistoriaBtn = document.getElementById('generar-nueva-historia');

    // Botones de apoyo y modal QR
    const mostrarQrPlinBtn = document.getElementById('mostrar-qr-plin');
    const qrModal = document.getElementById('qr-modal');
    const cerrarModalBtn = document.querySelector('.cerrar-modal');

    // Elementos de audio
    const backgroundMusic = document.getElementById('background-music');
    const toggleMusicBtn = document.getElementById('toggle-music');
    const toggleMusicIcon = toggleMusicBtn.querySelector('i');
    const cardClickSound = document.getElementById('card-click-sound');
    const qrOpenSound = document.getElementById('qr-open-sound');

    let currentStoryText = '';
    const synthesis = window.speechSynthesis;
    let isMusicPlaying = false; // Estado de la música de fondo
    const BGM_VOLUME = 0.2; // Volumen normal de la música de fondo
    const BGM_VOLUME_QUIET = 0.05; // Volumen cuando se lee una historia

    // Tus historias personalizadas
    const historiasBase = [
        {
            titulo: "El reflejo que no era mío",
            sinopsis: "Una sombra repite los gestos de Lucía en el espejo, pero en dirección contraria, con una sonrisa torcida y ojos negros, hasta que Lucía ya no se ve.",
            historia: "Esa noche el espejo del baño comenzó a empañarse solo, aunque hacía frío. Lucía se acercó con curiosidad y dibujó con su dedo un círculo en el vidrio.\n\nDel otro lado, una sombra repitió el mismo gesto… pero en dirección contraria.\n\nLucía se rió nerviosa, pensando que era su reflejo distorsionado, hasta que notó algo imposible: la sombra sonreía antes que ella.\n\nRetrocedió de golpe. El reflejo seguía ahí, con la misma sonrisa torcida y los ojos totalmente negros.\n\nDe pronto, la luz parpadeó. Cuando volvió, el espejo estaba limpio, sin vapor… pero Lucía ya no se veía.\n\nDesde entonces, cada mañana aparece un nuevo rostro en ese espejo. Todos con la misma sonrisa, esperando ser vistos."
        },
        {
            titulo: "La llamada de las 3:17",
            sinopsis: "Marco recibe una llamada misteriosa a las 3:17 a.m. de su propia voz, que afirma estar en su puerta, desatando una escalofriante secuencia de eventos.",
            historia: "Marco se despertó con el celular vibrando.\n\nUna llamada desconocida a las 3:17 a.m.\n\nMedio dormido, contestó. Nadie habló, pero escuchó una respiración lenta, muy cerca del micrófono.\n\n—¿Quién eres? —preguntó.\n\nUna voz idéntica a la suya respondió:\n\n—Estoy en la puerta.\n\nEl corazón le dio un vuelco. Giró la cabeza hacia la entrada, pero no había nadie. Colgó de inmediato.\n\nA los pocos segundos, el teléfono volvió a sonar. Mismo número.\n\nEsta vez no contestó.\n\nEl celular cayó de su mano al suelo, pero la llamada no se detuvo.\n\nSonaba, y sonaba.\n\nHasta que la pantalla se apagó sola.\n\nSilencio total…\n\nLuego, desde el pasillo, escuchó su propio tono de llamada sonando dentro del departamento."
        },
        {
            titulo: "No apagues el proyector",
            sinopsis: "Andrés, un empleado de una tienda de empeños, ignora una advertencia y proyecta una película antigua, desatando una presencia que lo atrapa en su propia cinta de terror.",
            historia: "Andrés trabajaba en una tienda de empeños. Una tarde, llegó una anciana con un proyector antiguo y una sola película en carrete.\n\nLe pidió que lo guardara unos días. “No lo uses”, le dijo. “Él aún está dentro”.\n\nPor curiosidad, Andrés esperó a cerrar el local y proyectó la película en la pared blanca del fondo.\n\nAparecía una familia cenando en silencio. Todo en blanco y negro, sin sonido. Hasta que, poco a poco, las figuras comenzaron a girar la cabeza hacia la cámara… una por una.\n\nLos ojos estaban en blanco.\n\nEl más pequeño, un niño, se levantó de la mesa y se acercó demasiado a la cámara.\n\nLa cinta tembló y la imagen se distorsionó, pero Andrés juraría que el niño lo miró directamente, desde el otro lado del proyector.\n\nApagó el aparato con el corazón acelerado.\n\nPero en la pared aún quedaba la sombra del niño, quieta, como esperando.\n\nPensó que era una ilusión óptica, hasta que esa sombra giró la cabeza.\n\nEsa noche, en su departamento, vio algo proyectarse sobre las paredes: figuras, flashes de rostros distorsionados.\n\nCuando intentó deshacerse del proyector al día siguiente, la caja ya no tenía peso.\n\nSolo un papel doblado con una frase escrita a mano:\n\n“Ahora tú eres parte de la cinta.”\n\nDesde entonces, hay una grabación circulando en internet.\n\nDicen que si la ves completa, aparece tu sombra moviéndose medio segundo después de ti, incluso cuando ya apagaste la pantalla."
        },
        {
            titulo: "El Silbido de Cumbemayo",
            sinopsis: "En los canales preincaicos de Cumbemayo, el arqueólogo Rafael ignora una advertencia local y silba de vuelta a un viento que parece llamarlo, desatando una desaparición aterradora.",
            historia: "Cumbemayo, Cajamarca.\n\nUn complejo de canales de piedra tallados por culturas preincaicas, donde el viento silba entre las rocas como si hablara en otro idioma.\n\nRafael, estudiante de arqueología, viajó con su grupo para documentar símbolos desconocidos en una de las cuevas laterales.\n\nDesde el primer día, notó que el viento ahí no sonaba igual que afuera.\n\nDentro de la cueva, los silbidos parecían responder. Tres tonos cortos, uno largo. Siempre igual.\n\nSu guía local, un hombre mayor, les advirtió antes de entrar más profundo:\n\n“No contesten cuando el viento los llame. Aquí no siempre sopla aire.”\n\nRafael no le dio importancia. Grabó todo con su cámara mientras avanzaba solo un poco más que el resto.\n\nEn el fondo encontró un muro cubierto de figuras humanas sin ojos, todas mirando hacia una abertura estrecha.\n\nAl acercarse, el silbido se repitió, esta vez claramente humano.\n\nRafael, burlón, silbó de vuelta.\n\nEl aire se detuvo.\n\nEl silencio pesaba.\n\nDe pronto, una corriente helada salió de la grieta y apagó todas las linternas.\n\nAl volver la luz, sus compañeros ya no estaban.\n\nEl túnel detrás de él había desaparecido; solo quedaba esa pared con los grabados… pero ahora una de las figuras tenía su rostro.\n\nTres días después, los rescatistas hallaron su cámara.\n\nEl video mostraba a Rafael caminando hacia la grieta, murmurando en un idioma gutural que no se reconocía.\n\nY al final, cuando ya no quedaba imagen, solo un sonido se escuchaba con claridad:\n\nTres silbidos cortos, uno largo.\n\nLos pobladores dicen que si vas a Cumbemayo y silbas en la noche, algo responde.\n\nY si repites su ritmo, ya no es el viento el que te contesta."
        },
        {
            titulo: "El Camino de los Muertos",
            sinopsis: "En una carretera desolada, el chofer Elías se adentra en un tramo evitado de noche, encontrándose con una voz fantasmal y una presencia que lo atrapa en un bucle sin fin.",
            historia: "En la carretera que une Huancavelica con Ayacucho hay un tramo de curvas cerradas y cerros pelados que los transportistas evitan de noche.\n\nLe dicen El Camino de los Muertos, porque cada cierto tiempo un camión desaparece entre la neblina y solo se encuentra el vehículo… vacío, con el motor encendido.\n\nElías era chofer de carga y no creía en esas historias.\n\nUna madrugada, con prisa por entregar mercancía, decidió atravesar el tramo.\n\nEl aire se volvió espeso y la radio comenzó a emitir solo estática, aunque no había montañas altas.\n\nA las 2:37 a.m. escuchó en la radio una voz femenina que susurró su nombre:\n\n“Elías… sigue las luces…”\n\nMiró por el parabrisas.\n\nA lo lejos, entre la neblina, se veían tres faroles encendidos, como los de otro camión detenido.\n\nPensando que alguien necesitaba ayuda, detuvo el motor y bajó.\n\nNo había nada.\n\nLos faroles se apagaron al instante.\n\nCuando regresó a su camión, el asiento del copiloto estaba ocupado.\n\nUna mujer con el rostro cubierto por un velo oscuro le sonreía levemente.\n\n—No debiste parar —susurró—. Ellos ya te vieron.\n\nElías intentó arrancar, pero el motor no respondía.\n\nLa neblina empezó a golpear los vidrios como si tuviera peso.\n\nDesde afuera, se escuchaban pasos… muchos pasos, rodeando el camión.\n\nY luego, golpes, como uñas arañando el metal.\n\nDesesperado, cerró los ojos.\n\nCuando los abrió, estaba conduciendo nuevamente, a plena luz del día, sin neblina.\n\nRespiró aliviado… hasta que notó las huellas de manos marcadas por dentro del parabrisas, cientos de ellas, como si alguien hubiera intentado salir.\n\nElías llegó al destino, pero los que lo vieron juraron que no hablaba igual, y que su sombra parecía moverse un segundo después de él.\n\nDicen que desde entonces, cada vez que alguien recorre esa carretera, una mujer con velo negro aparece en el asiento del copiloto, y susurra el nombre del conductor antes de que empiece la neblina."
        }
    ];

    // --- Funciones para la Música y Sonidos ---

    function playBackgroundMusic() {
        backgroundMusic.volume = BGM_VOLUME;
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            toggleMusicIcon.classList.remove('fa-volume-mute');
            toggleMusicIcon.classList.add('fa-volume-up');
        }).catch(error => {
            console.warn("Música de fondo no se pudo reproducir automáticamente:", error);
            // Esto puede ocurrir si el navegador bloquea el autoplay sin interacción.
            // Se puede mostrar un mensaje al usuario o esperar a que interactúe.
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
        if (isMusicPlaying) {
            backgroundMusic.volume = BGM_VOLUME_QUIET;
        }
    }

    function restoreBackgroundMusicVolume() {
        if (isMusicPlaying) {
            backgroundMusic.volume = BGM_VOLUME;
        }
    }

    function playCardClickSound() {
        cardClickSound.currentTime = 0; // Reinicia el sonido si se reproduce rápidamente
        cardClickSound.play();
    }

    function playQrOpenSound() {
        qrOpenSound.currentTime = 0;
        qrOpenSound.play();
    }

    // --- Funciones de la Web ---

    // Función para obtener historias (ahora de tus historias personalizadas)
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
        historiasGrid.innerHTML = ''; // Limpiar historias anteriores
        const historiasMostradas = obtenerHistoriasParaMostrar();

        historiasMostradas.forEach(historia => {
            const card = document.createElement('div');
            card.classList.add('historia-card');
            card.innerHTML = `
                <h3>${historia.titulo}</h3>
                <p>${historia.sinopsis}</p>
            `;
            card.addEventListener('click', () => {
                playCardClickSound();
                mostrarContenidoHistoria(historia);
            });
            historiasGrid.appendChild(card);
        });
    }

    function mostrarContenidoHistoria(historia) {
        menuHistorias.classList.add('oculto');
        document.getElementById('apoyanos').classList.add('oculto'); // Oculta también la sección de apoyo
        contenidoHistoria.classList.remove('oculto');
        tituloHistoria.textContent = historia.titulo;
        // Reemplazar saltos de línea para mostrar correctamente en HTML
        textoHistoria.innerHTML = historia.historia.replace(/\n/g, '<br><br>');
        currentStoryText = historia.historia;
    }

    function volverAlMenu() {
        menuHistorias.classList.remove('oculto');
        document.getElementById('apoyanos').classList.remove('oculto'); // Muestra la sección de apoyo de nuevo
        contenidoHistoria.classList.add('oculto');
        if (synthesis.speaking) {
            synthesis.cancel(); // Detener la lectura si está activa
        }
        restoreBackgroundMusicVolume(); // Restaurar volumen de música de fondo
    }

    function leerHistoria() {
        if (!synthesis) {
            alert('Tu navegador no soporta la lectura de texto.');
            return;
        }

        if (synthesis.speaking) {
            synthesis.cancel(); // Detener la lectura actual para iniciar una nueva
            restoreBackgroundMusicVolume();
            return; // Si ya estaba leyendo, lo cancela y sale.
        }

        lowerBackgroundMusicVolume(); // Baja el volumen de la música de fondo

        const utterance = new SpeechSynthesisUtterance(currentStoryText);
        utterance.lang = 'es-ES'; // Establecer el idioma a español
        utterance.pitch = 0.9; // Tono ligeramente más bajo para voz más "macabra" (0 a 2)
        utterance.rate = 0.95;  // Velocidad ligeramente más lenta (0.1 a 10)
        
        // Puedes intentar seleccionar una voz si lo deseas (descomentar y probar)
        // synthesis.getVoices().forEach(voice => {
        //     if (voice.lang === 'es-ES' && voice.name.includes('Google español')) {
        //         utterance.voice = voice;
        //     }
        // });

        utterance.onend = () => {
            restoreBackgroundMusicVolume(); // Restaurar volumen cuando termina la lectura
        };
        utterance.onerror = (event) => {
            console.error('Error en la síntesis de voz:', event.error);
            restoreBackgroundMusicVolume();
        };

        synthesis.speak(utterance);
    }

    // --- Configuración de partículas (particles.js) ---
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#b22222" // Color rojizo/anaranjado para las partículas
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false, // No queremos líneas entre partículas
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1, // Velocidad de movimiento lenta
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble" // Las partículas se agrandan al pasar el mouse
                },
                "onclick": {
                    "enable": false, // No queremos efecto al hacer click en partículas
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 200,
                    "size": 8, // Tamaño máximo al pasar el mouse
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });


    // --- Event Listeners ---
    volverMenuBtn.addEventListener('click', volverAlMenu);
    leerHistoriaBtn.addEventListener('click', leerHistoria);
    generarNuevaHistoriaBtn.addEventListener('click', mostrarHistorias); // Para recargar el menú con nuevas historias

    // Eventos para el modal QR
    mostrarQrPlinBtn.addEventListener('click', () => {
        qrModal.classList.remove('oculto');
        playQrOpenSound();
    });
    cerrarModalBtn.addEventListener('click', () => {
        qrModal.classList.add('oculto');
    });
    window.addEventListener('click', (event) => {
        if (event.target == qrModal) {
            qrModal.classList.add('oculto');
        }
    });

    // Evento para controlar la música
    toggleMusicBtn.addEventListener('click', toggleBackgroundMusic);

    // Inicializar la página
    mostrarHistorias();
    playBackgroundMusic(); // Intenta reproducir la música al cargar
});
