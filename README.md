# 🤖 Aprender a Promptear con IA — sobre una API real

**Materia:** DAI — Desarrollo de Aplicaciones I (ORT)

> **El objetivo de este repositorio NO es programar. Es aprender a usar la IA bien.**
> El código de esta API **ya funciona**. Lo que vas a practicar —y lo que se evalúa— es
> **pedirle cosas a una IA, darte cuenta si te las dio bien, iterar cuando no sirve, y poder
> defender lo que entregaste.**

Este repo es el **proyecto base** de un trabajo práctico de *prompting*: una API REST de `alumnos`
y `cursos` (Express + PostgreSQL, arquitectura en capas) que usás como campo de juego para
practicar cómo se le pide código a una IA de forma profesional.

---

## 🎯 De qué se trata (leer esto primero)

Es facilísimo pedirle a una IA que "refactorice todo" y pegar el resultado. Lo difícil —y lo que
vamos a evaluar— es **demostrar que entendiste** qué pediste, por qué, y por qué el resultado está
bien. Concretamente, la habilidad es:

1. **Escribir un buen prompt** — con rol, contexto, tarea, restricciones e iteración.
2. **Leer críticamente** lo que la IA devuelve — saber si está bien, mal o a medias.
3. **Iterar** — corregir el prompt cuando el resultado no sirve.
4. **Defender** lo que entregaste — si no entendés lo que la IA escribió, no lo entregues.

> ⚠️ **"Lo hizo la IA" no es una justificación válida en el oral.** Si la IA metió un bug y vos no
> lo viste, el bug es tuyo.

**El criterio de evaluación** está basado en la guía de *Uso de IA en EFSI*:
👉 https://uso-de-ia-en-efsi.lovable.app/#builder

---

## 🚀 Empezá acá: la carpeta [`prompting/`](prompting/)

Todo el trabajo práctico vive en [`prompting/`](prompting/). **Andá primero a:**

📄 **[`prompting/00 - README - Como usar este TP de Prompting.md`](prompting/00%20-%20README%20-%20Como%20usar%20este%20TP%20de%20Prompting.md)**

Ahí está: la estructura de un buen prompt (las 5 partes EFSI), el semáforo de qué podés hacer con
IA, cómo se entrega cada ejercicio y cómo te vamos a evaluar. Los ejercicios van de generar código
nuevo (⭐) a rediseñar arquitectura y seguridad (⭐⭐⭐⭐):

| # | Ejercicio | Foco | Dificultad |
|---|-----------|------|:---:|
| 01 | Nueva tabla y su CRUD | generación guiada | ⭐ |
| 02 | Refactorización del CRUD repetido | DRY / refactor | ⭐⭐ |
| 03 | Extracción a Helpers | modularización | ⭐⭐ |
| 04 | Validaciones y códigos de error | validación | ⭐⭐⭐ |
| 05 | Middleware de Autenticación JWT | seguridad / auth | ⭐⭐⭐ |
| 06 | Arquitectura de la aplicación | diseño | ⭐⭐⭐⭐ |
| 07 | Testing | testing | ⭐⭐⭐⭐ |
| 08 | Performance y optimización | performance | ⭐⭐⭐⭐ |
| 09 | Seguridad | auditoría | ⭐⭐⭐⭐ |

Cada ejercicio se entrega con la [plantilla de bitácora](prompting/PLANTILLA%20-%20Bitacora%20de%20prompts%20y%20entrega.md):
repo con commits ordenados, historial de la conversación con la IA, reflexión escrita, comentarios
`[IA]`/`[YO]` en el código y **defensa oral**.

---

## 🧱 El proyecto base (la API que ya está hecha)

Antes de promptear, entendé sobre qué vas a trabajar. Es una API REST que hace CRUD de `alumnos` y
`cursos` contra PostgreSQL, con **arquitectura en capas** (controller → service → repository) y una
clase helper (`DbPg`) que aísla el acceso a datos.

📄 **Toda la referencia técnica está en un documento aparte:**
👉 **[`documents/proyecto-base-referencia-tecnica.md`](documents/proyecto-base-referencia-tecnica.md)**

Ahí encontrás: la estructura del proyecto, cómo arrancarlo (PostgreSQL, `.env`, `npm run server`),
los endpoints, el diagrama de la arquitectura en capas, la clase `DbPg`, las entidades, el esquema
de base de datos, la colección de Postman y las dependencias.

> 💡 El flujo recomendado: primero leé la referencia técnica y entendé cómo está armada la API →
> después volvé a [`prompting/`](prompting/00%20-%20README%20-%20Como%20usar%20este%20TP%20de%20Prompting.md)
> y empezá a agregarle funcionalidad prompteando con IA.
