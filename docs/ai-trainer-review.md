# Revisión del portafolio: AI Trainer

Fecha: 22 de octubre de 2026.

## Resultado y acceso

- Rama: `codex/ai-trainer-case-study`.
- Vista local: http://localhost:4318/trainer.html; portada: http://localhost:4318/.
- El puerto 3000 ya estaba ocupado por otra copia. Las comprobaciones finales se repitieron contra este checkout en el puerto 4318.
- El código de Vision y Sorbot, los estilos compartidos y el JavaScript compartido se conservaron sin cambios. No se publicó a GitHub Pages ni se modificó `main`.

Para abrir esta copia si el servidor deja de estar activo:

```sh
cd /Users/adrian/Documents/Codex/2026-10-22/https-github-com-ekko94-portfolio-https/work/portfolio
git switch codex/ai-trainer-case-study
python3 -m http.server 4318 --bind 127.0.0.1
```

## Cambios y motivos

| Cambio | Motivo |
|---|---|
| Nuevo caso `trainer.html`, escrito en inglés para mantener el idioma del portafolio | Convertir la tarjeta “coming soon” en una lectura que permita evaluar alcance, criterio y decisiones concretas. |
| Foco en overview y datasets | Respetar el alcance indicado: preparación de datos y versiones; no atribuir trabajo sobre todo el entrenamiento ML. |
| Rol, colaboración, alcance y evidencia visibles al inicio | Ayudar al recruiter a entender qué hizo Adrián sin conocer Sorba o su arquitectura interna. |
| Comparación del overview viejo y nuevo con capturas completas | Demostrar cambios verificables: navegación secundaria retirada, etiquetas de Projects corregidas y acciones de Predictions adecuadas. |
| Configuración, operaciones de campos, reglas, versiones, Explorer, error de versión y salida sin guardar | Mostrar razonamiento sobre la tarea y sus estados problemáticos, con evidencia real en lugar de una galería sin explicación. |
| Captions orientados a la decisión y textos alternativos factuales | Explicar qué se puede evaluar en cada captura y evitar prometer contenido que la imagen no muestra. |
| Límites de validación y plan de evaluación explícitos | Reflejar que no hubo acceso a usuarios finales ni otros stakeholders; los developers fueron interlocutores técnicos. No inventar resultados ni equiparar esa revisión con validación de usabilidad. |
| Sketch retrospectivo de cinco tareas | Dar una lectura rápida de la relación entre configuración y gestión. Está rotulado como reconstrucción con asistencia IA, creado para el caso, no como un artefacto histórico de investigación. |
| Capturas WebP con variantes responsivas | Mantener proporciones y reservar espacio durante la carga; reducir la transferencia respecto de PNG sin alterar el contenido de la UI. |
| Visor propio de AI Trainer | Permitir leer cada captura a tamaño real en móvil y escritorio, con teclado, cierre por Escape, foco de retorno, recuperación ante fallo y enlace original sin JavaScript. |
| Nueva portada AI Trainer con una sola ventana 16:10 completa | Sustituir el dashboard vertical escondido dentro de un marco horizontal y retirar el alt que anunciaba un CSV preview inexistente. |
| Metadata, JSON-LD, Open Graph de 1200×630, sitemap y llms.txt | Integrar el nuevo caso en las rutas, referencias y vista al compartir del portafolio. Aplicación de `hagumi-seo-aeo-review`; sin despliegue. |

## Integridad de la historia

- El overview sí tiene un antes/después disponible. Dataset se presenta mediante sus estados de diseño; no se inventó una interfaz anterior.
- Los archivos muestran ejemplos MOTOR4 y MOTOR2. Se explican como estados separados, no como una grabación continua del mismo dataset.
- El botón Preview aparece en el formulario. No se creó una pantalla de resultado que no existe entre los artefactos revisados.
- El overview nuevo tiene más contenido y mayor altura. No se afirma que reduzca scroll o tiempos.
- Los números y gráficos pertenecen al diseño de la interfaz. No se presentan como métricas de impacto.
- La página llamada New del archivo ML-TRAINER contiene trabajo de imagen/video. Se escogieron los estados numéricos consistentes de Dataset, Versions y Explore, sin inventar una cronología que Figma no permite confirmar.

## Qué incorporó la revisión independiente

La revisión cruzada corrigió una primera sospecha de recorte global: la cascada CSS ya usa `contain` en las capturas principales de los casos existentes. Ese diagnóstico se retiró antes de implementar.

Se incorporaron la distinción entre Preview y su resultado, el tratamiento honesto de muestras diferentes y el aislamiento del nuevo visor. El revisor detectó metadata referenciando un Open Graph todavía no generado y una ampliación innecesaria de la tabla de 1032 px; ambos se resolvieron. También se ajustó `sizes` para imágenes emparejadas.

La CLI `codex exec` en modo read-only no pudo iniciar su app-server dentro del sandbox. La segunda opinión se realizó con un subagente Codex independiente, con análisis inicial, cross-review y lectura final del código. No se presenta la CLI fallida como una revisión completada.

En navegador apareció un fallo adicional de alineación: Chrome seguía aplicando `place-items:center` al contenido ampliado aunque el contenedor había cambiado a block. Se corrigió el zoom con `place-items:start`; la prueba final alcanzó ambos bordes de la imagen de 1440 px dentro de un área de 348 px.

## Verificación realizada

18 comprobaciones finales en Chromium:

- Ruta correcta y respuesta 200; título único y un h1.
- Las diez imágenes del caso cargan y tienen alternativa descriptiva.
- Sin overflow horizontal a 320, 390, 768 y 1440 CSS px.
- Proporciones nativas de imágenes y tarjeta 16:10 conservadas; la tabla de 1032 px no se amplía más allá de su ancho.
- Apertura del visor con teclado y foco inicial en Close.
- Controles del visor de al menos 44×44 CSS px.
- Zoom accesible de extremo a extremo; Fit reinicia el scroll.
- Escape cierra y devuelve foco al enlace exacto que abrió la imagen.
- Fallo de imagen simulado: mensaje de recuperación y enlace original disponibles.
- Los enlaces a originales funcionan con JavaScript desactivado.
- Enlace de portada al caso; sin errores JavaScript.

`node --check` y `git diff --check` pasan. La comparación Git confirma que `vision.html`, `sorbot.html`, `assets/css/styles.css` y `assets/js/main.js` no tienen diferencias.

No se midieron Core Web Vitals de campo, no se probó un dispositivo físico ni se certificó WCAG completa. Las capturas del producto conservan sus colores originales; la legibilidad interna del producto sigue siendo un punto a validar.

### Detector Impeccable

Se ejecutó una vez sobre los objetivos cambiados. Los avisos de padding corresponden a la navegación y los mockups heredados; las tomas muestran su espaciado intencional. El aviso de imagen sin src corresponde a la imagen oculta del diálogo: recibe una URL al abrirse y mantiene un estado de error y un enlace alternativo. Se documentan como excepciones verificadas, sin ampliar el alcance hacia Vision o los componentes compartidos.

### Checklist premium aplicada al nuevo caso

| Criterio | Estado | Evidencia o límite |
|---|---|---|
| Mensaje | Fuerte | Producto, alcance y tarea visibles al inicio. |
| CTA | Fuerte | Un destino principal desde la portada; contacto al cierre. |
| Copy | Fuerte | Decisiones concretas y límites honestos. |
| Confianza | Fuerte | Rol, interlocutores y fuentes identificados. |
| Dirección visual | Fuerte | Identidad editorial existente preservada. |
| Tipografía | Fuerte | IBM Plex y jerarquía coherente. |
| Color | Fuerte | Paleta del portafolio; capturas originales. |
| Jerarquía | Fuerte | Lectura por decisiones, resúmenes y captions. |
| Imágenes | Fuerte | Exportaciones trazables, proporciones completas y detalle ampliable. |
| Motion | Fuerte | Contenido visible sin animación nueva innecesaria. |
| Móvil | Fuerte | Reflow y visor comprobados en viewports emulados. |
| Consistencia | Fuerte | Estilos aislados que heredan tokens existentes. |
| Performance | Mixto | WebP, srcset y carga diferida; sin métricas de campo. |
| Accesibilidad | Mixto | Semántica, alt, teclado, foco y targets comprobados; no auditoría completa con lector de pantalla. |
| SEO y share | Fuerte | Metadata, OG, schema y rutas añadidos y comprobados localmente. |

## Carencias de los demás casos

La revisión queda documentada sin cambiar esos proyectos. El detalle está en `docs/portfolio-other-cases-audit.md`.

| Caso | Qué convendría añadir después |
|---|---|
| Sorbot | Una respuesta real con referencias si se mantiene “with sourced answers”; una observación de revisión y el cambio concreto que generó; un ejemplo auténtico de tarea conversacional completa. |
| Vision | La captura del resultado fullscreen que respalde la iteración descrita. Si existe evidencia autorizada, una nota fechada sobre el feedback cualitativo. Su código y contenido quedan intactos. |
| IoT Unified | Un caso desarrollado de Asset Collection: tarea, problema, aporte personal, dos decisiones y evidencia. Hoy sigue siendo una tarjeta anunciada como pendiente. |

## Fuentes y trazabilidad

La matriz de diez fuentes primarias está en `docs/portfolio-review-sources.md`, con aportes y límites. Las principales son [NN/g sobre portafolios](https://www.nngroup.com/articles/ux-design-portfolios/), [NN/g sobre contratación UX](https://www.nngroup.com/articles/ux-hiring-insights/) e [IxDF sobre narrativa visual](https://ixdf.org/literature/article/design-with-intent-craft-your-portfolio-with-visual-storytelling-tools). También se verificaron guías W3C de imágenes, reflow y targets, y web.dev de imágenes responsivas y CLS.

El archivo `docs/ai-trainer-assets.json` registra cada Figma file key, node ID, dimensión y salida. El prompt exacto del sketch está en `docs/trainer-flow-sketch-prompt.txt`; se usó la herramienta integrada ImageGen. No se modificaron los archivos de Figma.

## Mantenimiento opcional

PRODUCT.md conserva un esquema antiguo de Impeccable. Una futura migración con `init` puede actualizarlo; se preservó el contexto confirmado y no se amplió este trabajo para cambiarlo.
