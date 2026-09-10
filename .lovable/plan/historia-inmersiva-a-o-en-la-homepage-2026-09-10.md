# Historia inmersiva A&O en la homepage

## Objetivo
Convertir la home actual en una experiencia cinematográfica continua inspirada en los principios de movimiento de Oryzo, usando únicamente los videos, audio, textos, logos 3D, rutas y funciones que ya existen.

## Implementación
- Activar y refinar la escena narrativa existente de ocho capítulos como experiencia principal de la home.
- Usar un único escenario 3D persistente para A&O, Inverfact, NomadHive y ANMA, mostrando una unidad por capítulo sin modificar los modelos GLB.
- Integrar el video existente dentro del relato con avance controlado por scroll, selección desktop/móvil, amortiguación y control de carga para evitar saltos.
- Añadir partículas interactivas, profundidad y transiciones tipo humo mediante recursos WebGL ligeros ya disponibles; sincronizar entrada y salida de objeto, texto, iluminación y cámara.
- Presentar cada capítulo como una ficha editorial de pantalla completa: etiqueta, título breve, frase esencial y acceso contextual para las tres unidades con ruta propia.
- Sustituir la navegación superior por el logotipo A&O minimizado; retirar el menú, el botón superior y la navegación lateral durante la historia.
- Mantener el audio narrativo actual con inicio tras interacción válida y control discreto.
- Conservar completas al final las secciones Authority, Contact, Footer y WhatsApp.

## Rendimiento y accesibilidad
- Evitar videos y lienzos 3D duplicados en la home.
- Mantener un solo contexto WebGL durante los capítulos y carga progresiva de modelos.
- Limitar resolución según dispositivo, pausar trabajo fuera de vista y respetar movimiento reducido.
- Mantener scroll táctil estable y texto legible sobre el video sin ocultarlo con capas excesivas.

## Sin cambios
- No se tocarán rutas, formularios, correos, base de datos ni funciones de envío.
- No se reemplazarán ni rediseñarán los GLB existentes.
- No se eliminarán archivos reutilizables por otras páginas.
- `/inverfact`, `/nomadhive` y `/anma` conservarán su funcionamiento.

## Validación
- Verificar la historia completa en escritorio, móvil y movimiento reducido.
- Confirmar los cuatro modelos, video desktop/móvil, audio tras interacción y accesos a cada funnel.
- Confirmar Authority, Contact, Footer y WhatsApp al final.
- Revisar errores visuales, consola, recursos de red y compilación final.
