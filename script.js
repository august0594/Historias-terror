document.addEventListener('DOMContentLoaded', () => {
    const menuHistorias = document.getElementById('menu-historias');
    const historiasGrid = document.querySelector('.historias-grid');
    const contenidoHistoria = document.getElementById('contenido-historia');
    const tituloHistoria = document.getElementById('titulo-historia');
    const textoHistoria = document.getElementById('texto-historia');
    const leerHistoriaBtn = document.getElementById('leer-historia');
    const volverMenuBtn = document.getElementById('volver-menu');
    const generarNuevaHistoriaBtn = document.getElementById('generar-nueva-historia');

    let currentStoryText = '';
    const synthesis = window.speechSynthesis;

    // Simulación de historias generadas por IA
    const historiasBase = [
        {
            titulo: "El Murmullo del Bosque",
            sinopsis: "Una expedición de campistas se adentra en un bosque donde las leyendas locales hablan de un espíritu ancestral que se comunica a través del viento.",
            historia: "El Murmullo del Bosque \n\nEl viejo mapa, arrugado y manchado, prometía un tesoro natural: un lago escondido en las profundidades del Bosque de Sombrío. Cuatro amigos, armados con tiendas de campaña, linternas y un espíritu aventurero, decidieron desafiar las advertencias de los lugareños. Decían que el bosque 'hablaba', que susurraba secretos a quienes se atrevían a perturbar su paz.\n\nLa primera noche, las historias parecían cuentos de fogata. El viento silbaba entre los árboles, creando sonidos extraños, pero fácilmente atribuibles a la naturaleza. Sin embargo, a medida que la noche avanzaba, los susurros se hicieron más claros, más articulados. 'Déjenlo... vayan...' parecían decir, arrastrados por las corrientes de aire. Clara, la más escéptica, intentó ignorarlo, pero un escalofrío le recorrió la espalda cuando juró escuchar su propio nombre entre los murmullos.\n\nAl día siguiente, el ambiente era tenso. Nadie había dormido bien. Los ruidos se habían intensificado, y la sensación de ser observados era palpable. Martín, el líder del grupo, decidió que lo mejor era irse. Pero cuando intentaron orientarse, el mapa parecía no tener sentido. Los senderos que recordaban haber tomado estaban cubiertos de maleza, y la brújula giraba sin control.\n\nEsa noche, el horror alcanzó su punto álgido. Los susurros se convirtieron en voces claras, resonando desde todas direcciones. Voces de dolor, de rabia, de súplicas. Las tiendas de campaña fueron sacudidas violentamente, y las linternas parpadearon hasta apagarse. En la oscuridad total, los amigos se apiñaron, aterrorizados. Una figura sombría, apenas perceptible, pareció danzar entre los árboles, susurrando sin cesar.\n\nCuando el sol finalmente se asomó, los susurros cesaron. Los amigos, pálidos y temblorosos, lograron encontrar un camino, milagrosamente claro, que los llevó de vuelta a la civilización. Nunca más volvieron al Bosque de Sombrío. Pero a veces, en las noches de viento, Clara jura escuchar un murmullo lejano, una voz que aún pronuncia su nombre."
        },
        {
            titulo: "El Reflejo Olvidado",
            sinopsis: "Una antigua casa con un espejo embrujado que revela un pasado oscuro y aterroriza a sus nuevos habitantes.",
            historia: "El Reflejo Olvidado \n\nLa casa de los Blackwood, abandonada por décadas, había sido comprada por Sarah y David con la ilusión de restaurarla y convertirla en su hogar soñado. Entre los objetos polvorientos y cubiertos de sábanas, encontraron un espejo de cuerpo entero en el ático, con un marco de madera tallada que parecía absorber la luz. Decidieron limpiarlo y colocarlo en su dormitorio, ignorando la advertencia del agente inmobiliario sobre 'ciertas peculiaridades' de la propiedad.\n\nAl principio, todo era normal. Pero pronto, Sarah notó algo extraño en el espejo. De reojo, juraba ver una figura borrosa detrás de su propio reflejo, una sombra que desaparecía al mirarla directamente. David, más racional, atribuyó sus miedos al estrés de la mudanza y la atmósfera lúgubre de la casa.\n\nUna noche, Sarah se despertó sobresaltada. La luz de la luna llena iluminaba el dormitorio, y en el espejo, en lugar de su propio reflejo, vio a una mujer con un vestido victoriano, su rostro demacrado y sus ojos llenos de un dolor antiguo. La mujer levantó una mano hacia el reflejo de Sarah, y el cristal se empañó como si un aliento helado lo hubiera tocado. Sarah gritó, despertando a David, pero cuando él encendió la luz, el espejo solo mostraba su habitación vacía.\n\nLos incidentes se hicieron más frecuentes. El reflejo de la mujer aparecía en momentos aleatorios, siempre con una expresión de agonía. Sarah empezó a investigar la historia de la casa y descubrió que una mujer, Elara Blackwood, había desaparecido misteriosamente allí un siglo atrás. Se decía que había sido encerrada en el ático por su esposo celoso, y que su espíritu seguía atrapado entre los muros.\n\nUna noche de tormenta, mientras Sarah y David dormían, el espejo cobró vida. Elara apareció con una furia contenida, su reflejo distorsionado por la ira. Extendió sus manos hacia Sarah en el mundo real, y el cristal del espejo comenzó a agrietarse. Un frío gélido llenó la habitación, y las voces susurrantes de Elara llenaron el aire, lamentando su destino y buscando venganza.\n\nSarah y David lograron escapar de la casa esa noche, dejando el espejo atrás, agrietado y aún más oscuro. Nunca más intentaron restaurar la casa de los Blackwood. Pero Sarah, cada vez que se mira en un espejo, no puede evitar sentir un escalofrío, preguntándose si el reflejo olvidado de Elara Blackwood aún la observa desde algún lugar."
        },
        {
            titulo: "La Cabaña en el Páramo",
            sinopsis: "Un grupo de amigos se refugia de una tormenta en una cabaña remota, solo para descubrir que no están solos.",
            historia: "La Cabaña en el Páramo \n\nEl coche se detuvo en seco, el motor ahogándose con un último gemido antes de morir. La lluvia azotaba el parabrisas, y el viento aullaba como un lamento en el páramo desolado. Cuatro amigos, de camino a un festival de música, se encontraron varados en medio de la nada. A lo lejos, entre la bruma y la oscuridad, divisaron una silueta: una cabaña rudimentaria, solitaria, que ofrecía la promesa de refugio.\n\nCon las linternas parpadeando, se abrieron paso hasta la puerta chirriante. El interior era frío y húmedo, con telarañas cubriendo cada rincón y el olor a moho y encierro impregnando el aire. Había una chimenea, pero estaba vacía de leña. Decidieron pasar la noche allí, esperando que la tormenta amainara para poder pedir ayuda.\n\nMientras exploraban la cabaña, encontraron objetos extraños: muñecas de trapo con ojos de botón, símbolos tallados en las paredes y un antiguo libro de oraciones en un idioma desconocido. La atmósfera era cada vez más opresiva. Los ruidos comenzaron: pasos en el piso de arriba que no existía, susurros que venían de las paredes, y un crujido constante que no parecía tener origen.\n\nSarah, la más sensible del grupo, juró ver sombras moviéndose en las esquinas. Mark, el escéptico, intentó calmarla, pero incluso él sentía una inquietud creciente. Una de las muñecas de trapo, que antes estaba en una estantería, apareció de repente en el suelo, mirando hacia ellos con sus ojos de botón. Nadie la había tocado.\n\nEsa noche, el horror se desató. La puerta se cerró de golpe, y los sonidos se intensificaron hasta convertirse en gritos. Las figuras sombrías se materializaron, bailando alrededor de ellos, sus formas distorsionadas y amenazantes. Los amigos se apiñaron, las linternas temblaban en sus manos, impotentes ante la presencia que los rodeaba. El libro de oraciones se abrió por sí solo, revelando un pasaje sobre 'aquellos que se alimentan del miedo en la oscuridad'.\n\nCuando el amanecer finalmente llegó, las sombras se desvanecieron, y los ruidos cesaron. La puerta se abrió, revelando un camino claro hacia la carretera principal. Los amigos huyeron, sin mirar atrás, sus mentes marcadas por la noche en la cabaña. Nunca supieron qué era lo que los había acechado en el páramo, pero la experiencia los dejó con una profunda aversión a las cabañas solitarias y a los páramos desolados."
        }
    ];

    // Función para obtener historias (simulando una IA)
    function generarHistoriaAleatoria() {
        // En una aplicación real, aquí integrarías con una API de IA
        // Por ahora, seleccionamos una historia aleatoria de la base
        const indiceAleatorio = Math.floor(Math.random() * historiasBase.length);
        return historiasBase[indiceAleatorio];
    }

    function mostrarHistorias() {
        historiasGrid.innerHTML = ''; // Limpiar historias anteriores
        const historiasMostradas = [];

        // Asegurarse de tener al menos 3 historias para mostrar
        while (historiasMostradas.length < 3) {
            const historia = generarHistoriaAleatoria();
            // Evitar duplicados si la base es pequeña
            if (!historiasMostradas.some(h => h.titulo === historia.titulo)) {
                historiasMostradas.push(historia);
            }
        }

        historiasMostradas.forEach(historia => {
            const card = document.createElement('div');
            card.classList.add('historia-card');
            card.innerHTML = `
                <h3>${historia.titulo}</h3>
                <p>${historia.sinopsis}</p>
            `;
            card.addEventListener('click', () => mostrarContenidoHistoria(historia));
            historiasGrid.appendChild(card);
        });
    }

    function mostrarContenidoHistoria(historia) {
        menuHistorias.classList.add('oculto');
        contenidoHistoria.classList.remove('oculto');
        tituloHistoria.textContent = historia.titulo;
        textoHistoria.textContent = historia.historia;
        currentStoryText = historia.historia;
    }

    function volverAlMenu() {
        menuHistorias.classList.remove('oculto');
        contenidoHistoria.classList.add('oculto');
        if (synthesis.speaking) {
            synthesis.cancel(); // Detener la lectura si está activa
        }
    }

    function leerHistoria() {
        if (!synthesis) {
            alert('Tu navegador no soporta la lectura de texto.');
            return;
        }

        if (synthesis.speaking) {
            synthesis.cancel(); // Detener la lectura actual para iniciar una nueva
        }

        const utterance = new SpeechSynthesisUtterance(currentStoryText);
        utterance.lang = 'es-ES'; // Establecer el idioma a español
        utterance.pitch = 1; // Tono (0 a 2)
        utterance.rate = 1;  // Velocidad (0.1 a 10)
        
        // Puedes intentar seleccionar una voz si lo deseas
        // synthesis.getVoices().forEach(voice => {
        //     if (voice.lang === 'es-ES' && voice.name.includes('Google español')) {
        //         utterance.voice = voice;
        //     }
        // });

        synthesis.speak(utterance);
    }

    // Event Listeners
    volverMenuBtn.addEventListener('click', volverAlMenu);
    leerHistoriaBtn.addEventListener('click', leerHistoria);
    generarNuevaHistoriaBtn.addEventListener('click', mostrarHistorias); // Para recargar el menú con nuevas historias

    // Inicializar la página
    mostrarHistorias();
});