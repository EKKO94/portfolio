# Portfolio

Repositorio inicial para desarrollar el portfolio a partir del diseño de Figma.

## Diseño

[Figma: Portfolio](https://www.figma.com/design/hUanEpPYqs8nYgQMsO6piD/Portfolio?node-id=143-9)

## Abrir con Claude Code

Desde la carpeta donde quieras guardar el proyecto:

```bash
git clone https://github.com/EKKO94/portfolio.git
cd portfolio
claude
```

Si ya tienes archivos del portfolio en otra carpeta, conserva esa carpeta y comprueba primero su estado de Git antes de conectarla a este repositorio.

## Desarrollo

Sitio estático (HTML, CSS y JS sin dependencias ni build), publicado con GitHub Pages desde la rama `main`.

- Páginas: `index.html` (Home), `vision.html` y `sorbot.html` (casos de estudio).
- Estilos en `assets/css/styles.css`, imágenes optimizadas en `assets/img`, fuentes self-hosted en `assets/fonts`.
- Vista previa local: `pnpm dlx serve .`
- Pendiente: URLs reales de Resume y LinkedIn (buscar `data-todo` en los HTML).

## Guardar cambios

Revisa `git status` y `git diff`, añade los archivos concretos que quieras guardar, crea un commit y ejecuta `git push`. Los cambios locales no se suben automáticamente.

No subir credenciales, archivos .env ni datos privados.
