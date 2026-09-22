# Notas de sesión

## Backup del src/app original
Ruta: `C:\Users\Ness\AppData\Local\Temp\opencode\rickmorty_backup_20260922.txt`
Encontrado con marcas `===== FILE: ruta =====`.

Para restaurar: solo los 2 archivos tocados, usando el backup:
1. `src/app/components/lista-personajes/lista-personajes.ts`
2. `src/app/components/lista-personajes/lista-personajes.html`

## Estado actual (2026-09-22)
- Build compila sin errores. 6/6 tests pasan.
- lista-personajes: conectado a `services/personaje.ts` + `models/personaje.ts` (Rick and Morty API). Muestra "cargando personajes..." y luego grid de tarjetas (imagen + nombre).
- Implementación: signals (`personajes`, `cargando`), fetch en `ngOnInit`, control flow @if/@for.
- Detalle crítico: el mensaje de carga debe contener `cargando` en minúscula (lo exige `lista-personajes.spec.ts:53`). La petición va en `ngOnInit` (no en constructor) para que `app.spec.ts` "should create the app" no deje request abierta.