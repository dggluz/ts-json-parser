# TypeScript JSON parser

## Description (EN)

This is a JSON parser written in TypeScript just for fun and learning. This is not intended to be productive ready at all. This repository complements a [series of videos](https://youtube.com/playlist?list=PL6FEYMPk3vCaONfBx1szFrn47rcoIkCV8). The rest of this document is written in Spanish, as the videos are aimed at a Spanish-speaking community.

## Descripción (ES)

Este proyecto es un parser de JSON escrito en TypeScript con la única finalidad de divertirse y aprender. No pretende para nada ser usado en producción. Este repositorio complementa una [serie de videos](https://youtube.com/playlist?list=PL6FEYMPk3vCaONfBx1szFrn47rcoIkCV8). Si todavía no viste los videos, te recomiendo mucho que los visites. :)


## ¿Aprender qué?, ¿a quién está dirigido?

Hacer parsers es una excelente excusa para aprender programación funcional. Si tenés alguna idea aproximada de programación funcional, o si te interesa aprender y sabés algo de TypeScript, este video te puede interesar.

### Conocimientos requeridos

- Familiaridad con TypeScript (por lo menos poder escribir tipos con _generics_)
- Familiaridad con _arrow functions_
- Familiaridad con funciones _currificadas_ (`const foo = a => b => a + b` en lugar de `const foo = (a, b) => a + b`) y _aplicación parcial_ (`foo (1) (2)` en lugar de `foo(1, 2)`)
- Familiaridad con algunas funciones más _funcionales_ de la librería estándar: `Array.prototype.map`, `Array.prototype.reduce`, etc.
- Familiaridad con la recursividad

## Los tags

La idea del repo es poder ir _codeando_ a medida que vas viendo los videos. Por ese motivo, voy a ir agragando tags con nombres de las versiones (`v0`, `v1`, `v2`, etc.). La `v0` tiene la versión "inicial" del repo: sin nada de código aún, sólo la parte burócratica (paquete, dependencias y demás). Luego, cada tag se va a corresponder con la versión "final" del video correspondiente (`v1` con la versión del código al final del primer video, `v2` con la versión del código al final del segundo video, y así).

## Primer video

Acá vemos una introducción a parser, empezamos programando un parser capaz de reconocer `null` y _booleanos_ y profundizamos un poco en el concepto de `map`. Andá a verlo! :D

https://youtu.be/YHi4WFbmZL8

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/YHi4WFbmZL8/0.jpg)](https://www.youtube.com/watch?v=YHi4WFbmZL8)

## Comentarios/dudas/sugerencias

Podés dejar tus comentarios en los videos o [abrir un issue](https://github.com/dggluz/ts-json-parser/issues/new) en este repo. Como prefieras!

## Licencia

[MIT License](./LICENSE).
