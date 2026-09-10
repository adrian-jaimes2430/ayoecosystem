# Storytelling continuo para la homepage

## Objetivo
Convertir la homepage restaurada en una experiencia cinematográfica continua, sin alterar rutas, formularios, modelos 3D ni secciones finales esenciales.

## Cambios
- Simplificar la cabecera: retirar menú, menú móvil y “Solicitar acceso”; dejar únicamente el logo A&O pequeño arriba a la izquierda.
- Eliminar de la homepage la sección completa de mentoría/programas premium.
- Integrar el video existente como hilo narrativo visible y sincronizado con el recorrido, con reproducción por progreso, suavizado y composición menos oscura.
- Rehacer las transiciones de las secciones narrativas para que entren, permanezcan y salgan como escenas conectadas, con texto animado y movimiento moderado.
- Presentar INVERFACT, NOMADHIVE y ANMA uno por uno, manteniendo sus modelos GLB y contenido, pero eliminando la sensación de tarjetas comerciales flotantes.
- Unir Escalamiento y Convergencia en una sola secuencia animada: herramientas A&O → reunión de unidades → cierre del ecosistema.
- Mantener Authority, Contact, Footer, WhatsApp, audio, rutas y formularios existentes.

## Detalles técnicos
- Reutilizar Framer Motion, el scroll suave actual, los videos desktop/mobile y los cuatro modelos 3D actuales.
- Evitar nuevos Canvas o dependencias pesadas; activar cada escena 3D solo cuando esté cerca del viewport.
- Usar transform, opacity y blur ligero para los relevos; conservar lectura estable y navegación táctil.
- Aplicar fallback estático con `prefers-reduced-motion` y limitar intensidad en móvil.
- No copiar código ni recursos de las referencias; adaptar únicamente su continuidad, ritmo y profundidad. La guía Refero enlazada no pudo abrirse porque su suscripción está inactiva, así que se usarán las referencias públicas indicadas y los patrones actuales del proyecto.

## Validación
- Comprobar escritorio, móvil y movimiento reducido.
- Confirmar carga y visibilidad del video, audio y modelos A&O, INVERFACT, NOMADHIVE y ANMA.
- Revisar transiciones, enlaces a `/inverfact`, `/nomadhive` y `/anma`, y permanencia de Authority/Contact/Footer.
- Verificar consola, rutas directas y compilación final.
