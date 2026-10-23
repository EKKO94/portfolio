# Fuentes para revisar el portafolio de Adrián

Consulta web: 22 de octubre de 2026. Borrador de trabajo para la revisión del repositorio `EKKO94/portfolio` y sus casos de estudio.

La selección reúne diez fuentes primarias útiles para esta tarea. Ninguna búsqueda puede cubrir todos los recursos de internet. Las recomendaciones de contratación se contrastan con documentación técnica; no se usan como promesa de conseguir entrevistas.

## Fuentes verificadas

| Fuente | Qué aporta | Aplicación al portafolio | Límite de la evidencia |
|---|---|---|---|
| [NN/g: 5 Steps to Creating a UX-Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/) (4 ago 2019) | Recomienda casos escaneables con problema, rol, colaboración, decisiones, retos, resultados y aprendizajes. Explica que las imágenes necesitan contexto. | Comprobar que cada caso identifique el aporte de Adrián y explique lo que muestra cada captura. Priorizar unas pocas decisiones respaldadas con artefactos. | La encuesta citada comprende 204 profesionales de contratación UX; el artículo no demuestra que una estructura o cantidad fija garantice contratación. Sus cifras de resultados son ejemplos, nunca datos del portafolio. |
| [NN/g: UX Hiring: Insights from a Design Recruiter](https://www.nngroup.com/articles/ux-hiring-insights/) (16 ene 2026) | El primer lector puede ser recruiter, PM o founder. La idea de calidad varía entre equipos. | Abrir cada caso con lenguaje comprensible sin conocer la herramienta: usuario, tarea, problema y contribución. Mostrar detalle visual y razonamiento de producto. | Es una entrevista con un recruiter, editada para claridad; no es una encuesta representativa del mercado de 2026. |
| [IxDF: Design with Intent: Craft Your Portfolio with Visual Storytelling Tools](https://ixdf.org/literature/article/design-with-intent-craft-your-portfolio-with-visual-storytelling-tools) | Jerarquía, tipografía, color y capturas deben apoyar el contenido. Las imágenes necesitan calidad, propósito y encuadre que destaque lo relevante. | Elegir tomas de AI Trainer que demuestren el flujo explicado. Evitar márgenes de canvas, paneles accidentales y recortes que borren el elemento de interés. | Es orientación editorial de diseño. No prescribe una resolución, ratio ni plantilla universal. |
| [IxDF: Freytag’s Pyramid: Craft Compelling UX/UI Design Case Studies the Easy Way](https://ixdf.org/literature/article/freytags-pyramid-ux-ui-design-case-study) | Propone un orden narrativo: contexto, dificultades, decisión, consecuencias y cierre. Atribuye trabajo y colaboración. | Ordenar las capturas según la decisión que explican. Mostrar alternativas o cambios cuando existan artefactos verificables. | Es una estructura narrativa posible. No obliga a dramatizar ni permite inventar investigación, problemas o resultados. |
| [W3C WAI: Informative Images](https://www.w3.org/WAI/tutorials/images/informative/) | La alternativa textual comunica la información o finalidad de la imagen según el contexto. | Escribir `alt` que identifique la función o estado de la captura, en vez del nombre del archivo. Usar `alt=""` cuando la imagen sea puramente decorativa o redundante. | El tutorial ayuda a implementar accesibilidad; un `alt` por sí solo no certifica conformidad WCAG. |
| [W3C WAI: Complex Images](https://www.w3.org/WAI/tutorials/images/complex/) | Diagramas y gráficos con mucha información necesitan una identificación breve y una explicación del contenido esencial. | Añadir texto visible para explicar flujos, mapas y comparaciones que no se entiendan con una frase breve. No meter todo el caso dentro de `alt`. | La solución depende del propósito real del diagrama. No todas las capturas necesitan una transcripción literal de cada etiqueta. |
| [W3C: Understanding SC 2.5.8, Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | WCAG 2.2 AA pide targets de al menos 24×24 CSS px o una excepción aplicable, como separación suficiente o enlaces dentro del texto. | Revisar abrir/cerrar de galerías, navegación y controles de zoom, especialmente en móvil. | Los documentos Understanding explican el criterio. El tamaño de 24×24 no es una regla absoluta sin excepciones. |
| [W3C: Technique C37, Using CSS max-width and height to fit images](https://www.w3.org/WAI/WCAG22/Techniques/css/C37) (actualizada 12 ene 2026) | Las imágenes deben adaptarse al espacio y conservar proporciones; propone revisar reflow a 320 CSS px equivalentes. | Verificar que las capturas no desborden la página en móvil ni al aumentar zoom. Mantener proporción y dar una forma accesible de inspeccionar detalles. | Es una técnica orientativa, no el único modo de cumplir reflow. El contenido bidimensional puede requerir tratamiento específico. |
| [web.dev: Serve responsive images](https://web.dev/articles/serve-responsive-images) | `srcset` y `sizes` permiten que el navegador elija la resolución según espacio y dispositivo. | Generar tamaños apropiados de las capturas originales y declarar el ancho de presentación correcto. Inspeccionar nitidez y bytes descargados en móvil y escritorio. | No hay un número universal de variantes. Una imagen pequeña ampliada no recupera el detalle de una exportación original. |
| [web.dev: Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls) (actualizada 7 feb 2025) | Reservar espacio con dimensiones o proporción reduce movimientos mientras cargan las imágenes. | Usar dimensiones correctas de cada asset o una proporción equivalente. Comprobar la página durante carga y al abrir imágenes. | Un ajuste de código o una medición local no prueba Core Web Vitals de usuarios reales. No reportar mejora de campo sin medición. |

## Criterios derivados para revisar las capturas

Estos criterios son una síntesis aplicada al proyecto, no citas ni normas añadidas a las fuentes:

1. **Correspondencia:** el asset representa el producto, estado y tarea que describe el párrafo o caption. El nodo de Figma y el archivo exportado deben quedar registrados para poder reproducir la toma.
2. **Encuadre:** una captura de lectura conserva el contexto necesario del producto y muestra completo el elemento explicado. Una miniatura puede tener un recorte editorial distinto; no debe reutilizarse como evidencia detallada si oculta información.
3. **Nitidez:** revisar la captura a su tamaño real de presentación y en una pantalla de alta densidad. Cuando falte detalle, exportar otra vez desde Figma a la resolución necesaria. No disimular un original borroso con mayor tamaño o enfoque artificial.
4. **Proporción:** no estirar la interfaz. El contenedor y la imagen deben conservar proporción; un recorte intencional debe probarse en cada breakpoint.
5. **Lectura móvil:** si la interfaz completa queda ilegible, añadir una toma de detalle, una explicación junto a la imagen o una vista ampliable con controles accesibles. Revisar también teclado y cierre del diálogo si se incorpora galería.
6. **Caption y alternativa:** el caption explica qué decisión o cambio se observa; el `alt` comunica lo necesario en su contexto sin repetir todo el caption.
7. **Entrega técnica:** imágenes con dimensiones, carga diferida cuando corresponda, variantes responsivas si aportan valor y sin assets innecesariamente grandes.
8. **Integridad:** mantener como tales los prototipos, hipótesis y resultados pendientes. No añadir métricas de éxito, entrevistas, testers o datos de negocio sin una fuente del proyecto.

## Preguntas para cada caso

- ¿Se entiende para quién es el producto y qué tarea resuelve antes de entrar en detalles del proceso?
- ¿Se identifica el rol de Adrián, el alcance del trabajo y la colaboración?
- ¿Cada imagen aporta evidencia que el texto explica?
- ¿El recorte permite ver la decisión que se está defendiendo?
- ¿Hay resultados verificables o una declaración precisa de qué se validó y qué falta validar?
- ¿El caso puede recorrerse rápidamente mediante títulos, resúmenes y captions, y también leerse con más detalle?

## Validación pendiente

Este documento no contiene hallazgos del código ni afirma que AI Trainer tenga un defecto concreto. El encuadre, nitidez, accesibilidad y carga deben comprobarse en el repositorio y navegador, contrastando cada imagen con el Figma autorizado.
