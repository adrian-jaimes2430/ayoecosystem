# Optimización móvil de la homepage

## Objetivo
Mejorar la experiencia en teléfonos sin cambiar textos, rutas, formularios, modelos 3D ni la presentación de escritorio.

## Cambios
- Ajustar el primer bloque para que el logo 3D, el título, los botones y la guía de etapas respiren correctamente en pantallas estrechas.
- Convertir cada capítulo de unidad en una composición móvil estable: modelo visible, contenido legible y controles accesibles, evitando recortes por alturas fijas.
- Adaptar la secuencia final de Sistemas → Convergencia → A&O para que cada estado tenga espacio suficiente y no superponga texto u objetos.
- Reducir trabajo gráfico en móvil manteniendo nitidez: menor densidad de partículas y píxeles, video móvil con carga prudente y animaciones más ligeras.
- Afinar tamaños, espacios, tarjetas, formulario y botones flotantes para 360–430 px, incluyendo áreas táctiles y zonas seguras del dispositivo.

## Validación
- Revisar visualmente la portada, cada unidad, la secuencia final y contacto en 360 px y 430 px.
- Comprobar desplazamiento, enlaces, audio, WhatsApp, formularios, video y modelos 3D.
- Confirmar que no haya desbordes horizontales, superposiciones, errores de consola ni errores de compilación.

## Detalles técnicos
- Mantener los mismos componentes, GLB y contenido; aplicar variantes responsivas y detección móvil donde reduzca carga real.
- Respetar `prefers-reduced-motion` y conservar el comportamiento actual en escritorio.
