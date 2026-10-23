# Revisión de otros casos del portafolio

Fecha: 22 de octubre de 2026. Inspección de solo lectura de `work/portfolio/sorbot.html`, `vision.html`, `index.html`, `assets/js/main.js`, CSS y los assets relevantes. No se modificó el código de esos casos. Vision queda fuera de la implementación autorizada.

## Hallazgos y recomendaciones

| Prioridad | Caso y evidencia | Diagnóstico | Recomendación |
|---|---|---|---|
| Alta | Home, `index.html:139`; Sorbot, `sorbot.html:117–119`, `209–211`, `227–228`, `241–243` | La tarjeta promete respuestas con fuentes: “with sourced answers”. El caso y sus imágenes muestran inicio, chat de bienvenida, selector de modelos y sugerencias; no presentan una respuesta con referencias. No queda demostrado ese atributo dentro del portafolio. | En una revisión futura, respaldarlo con una toma auténtica y un caption sobre las fuentes, o ajustar la descripción a lo que el caso sí muestra. No asumir que la función existe o que no existe a partir de estas capturas. |
| Media | Sorbot, `sorbot.html:263–272` | La sección se titula “Iteration & stakeholder review”, pero sus dos párrafos describen quién participó y la limitación de acceso. No identifican una observación concreta ni el cambio que produjo. | Si existen notas o versiones, añadir una cadena breve: observación de los revisores, cambio y motivo. Mantener la revisión técnica separada de validación con usuarios; el caso ya reconoce esa limitación. |
| Media | Sorbot, `sorbot.html:203–215`, `223–228`, `238–243` | Las decisiones principales sí tienen imágenes y explicación. Falta una tarea completa: el chat embebido contiene un saludo, no una consulta de configuración resuelta. Esto limita lo que un recruiter puede evaluar sobre conversación y manejo de respuestas. | Cuando haya evidencia autorizada, mostrar una interacción concreta: pregunta, respuesta, siguiente acción y tratamiento de un estado problemático. No crear conversaciones ficticias presentadas como uso real. |
| Media | Vision, `vision.html:344–354`; asset `vision-canvas-in-page.webp` inspeccionado | Se afirma que se añadió fullscreen después de feedback, pero la captura contigua solo muestra el canvas dentro de la página. El texto explica el cambio; la imagen todavía demuestra el estado anterior. | Pendiente para otra ronda autorizada: mostrar el resultado fullscreen o identificar expresamente esta toma como el estado que motivó la decisión. No se propone cambiar el diseño de Vision. |
| Media | Vision, `vision.html:397` | El lanzamiento y la aceptación se atribuyen a ventas y soporte, y el mismo párrafo aclara que son comentarios cualitativos. La atribución es honesta; el repo no incluye un artefacto fechado que permita evaluar el alcance del feedback. | Si existe y puede compartirse, añadir un resumen fechado o un fragmento autorizado que indique quién observó qué. Conservar el carácter cualitativo; no traducir aceptación a porcentajes, éxito de tareas o impacto de negocio. |
| Media | Home / IoT Unified, `index.html:176–205` | Hay dos imágenes y una frase que atribuye a Adrián el rediseño de Asset Collection. La tarjeta dice explícitamente “Case study coming soon”. Todavía no hay un caso IoT independiente que permita evaluar problema, alcance personal, decisión, alternativa o resultado. | Para desarrollarlo más adelante, partir de una tarea concreta de Asset Collection, documentar el aporte personal y elegir dos decisiones demostrables. La captura del dashboard completo sirve de contexto; el trabajo atribuido es Asset Collection. |
| Baja | Home / IoT Unified, `index.html:203`; hero, `index.html:88` | El enfoque profesional está claro: Product Designer de B2B, AI e IoT. En la tarjeta IoT, “one of the largest nodes” comunica tamaño interno sin explicar qué hacía difícil el trabajo. | Sustituir o complementar esa comparación con la tarea del usuario y una restricción real, cuando esas fuentes estén disponibles. No inventar un problema de usabilidad para completar la tarjeta. |

## Imágenes y accesibilidad: lo que ya existe

- Sorbot y Vision tienen alternativas descriptivas, dimensiones declaradas y carga diferida en capturas secundarias. Las tomas se pueden ampliar mediante el visor compartido.
- `assets/js/main.js:81–109` incorpora activación con Enter/Espacio, navegación con flechas, cierre y retorno del foco. No corresponde afirmar que no hay ampliación ni soporte de teclado.
- La cascada actual conserva las capturas de los casos con `contain` (`styles.css:836`). No se reporta un recorte global. Las referencias tienen una regla aparte en `styles.css:877`.
- `sorbot-suggestions.webp` tiene transparencia. El componente usa fondo blanco (`styles.css:704`) y el visor también (`styles.css:1194`); el fondo negro de una previsualización aislada no prueba un asset roto.
- La portada IoT no tiene ampliación porque el visor solo se inicializa en páginas `body.case` (`main.js:25`). Su función actual es miniatura editorial. Si se quiere que pruebe detalles de la interfaz, necesita un destino con tomas legibles y contexto; no basta ampliar esa miniatura.

## Qué conservar y qué falta comprobar

Vision ya incluye contraste entre formularios y canvas, referencias enlazadas, dos iteraciones concretas, feedback atribuido a desarrolladores y preguntas abiertas de usabilidad (`vision.html:171–205`, `223–265`, `328–384`). Sorbot distingue su revisión de patrones de la investigación con usuarios (`sorbot.html:184`) y declara que el efecto sobre tareas todavía no se ha evaluado (`281`). Esos límites deben conservarse.

Esta revisión no valida la veracidad histórica de las afirmaciones del propietario ni prueba accesibilidad completa en navegador. Detecta qué puede demostrar el material publicado. La aclaración reciente sobre AI Trainer (sin acceso a stakeholders o usuarios, solo feedback técnico de desarrolladores) no se extrapola a estos proyectos.

Las recomendaciones siguen las fuentes ya verificadas en [la matriz de recursos](portfolio-review-sources.md), especialmente NN/g sobre decisiones y rol, IxDF sobre imágenes con propósito y W3C WAI sobre alternativas textuales. No se añadieron métricas ni se propusieron cambios de código.
