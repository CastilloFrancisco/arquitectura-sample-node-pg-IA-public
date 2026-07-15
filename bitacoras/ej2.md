# 📓 Bitácora de Prompts — Ejercicio N° 2

> Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, `entregas/01-bitacora.md`.
> Esta bitácora **es parte de la nota**. Un ejercicio sin bitácora no se corrige.

---

## Datos

- **Alumno/a:** Castillo - Roth
- **Ejercicio:** N° 2 — Refactorización del CRUD repetido
- **Fecha:** 6/7
- **Modelo de IA usado:** (ej: ChatGPT, Claude, Gemini, Copilot) ChatGPT

---

## 1. 🎯 Qué me pidieron

Resumí en 2–3 líneas el objetivo del ejercicio con tus palabras (no copiado del enunciado).

```
crear código reutilizable para evitar la repeticion entre alumnos/cursos/materias
```

---

## 2. 💬 Mis prompts (en orden)

Pegá **todos** los prompts que usaste, en orden, con la respuesta resumida y qué hiciste con ella. Agregá tantos como necesites.

### Prompt #1

**Lo que escribí:**
```
Actuá como un desarrollador backend senior especializado en Node.js, Express y PostgreSQL, con experiencia en refactorización y aplicación del principio DRY (Don't Repeat Yourself).

## Contexto

Estoy trabajando sobre una API REST desarrollada con:

- Node.js
- Express
- PostgreSQL
- ES Modules
- Arquitectura en capas:
    - Controller
    - Service
    - Repository

El acceso a la base de datos se realiza mediante la clase DbPg utilizando:

- this.db.queryAll()
- this.db.queryOne()
- this.db.queryReturnId()
- this.db.queryRowCount()

No utilizamos ORM ni queremos cambiar el stack tecnológico.

Voy a pegar los siguientes archivos:

- alumnos-repository.js
- cursos-repository.js
- materias-repository.js
- alumnos-service.js
- cursos-service.js
- materias-service.js
- alumnos-controller.js
- cursos-controller.js
- materias-controller.js

## Tarea

No quiero que escribas código todavía.

Analizá los archivos y detectá qué partes están duplicadas.

Luego proponé entre dos y tres estrategias de refactorización para reducir esa duplicación.

Para cada estrategia explicá:

- qué archivos cambiaría,
- ventajas,
- desventajas,
- dificultad de implementación,
- qué tan compatible es con la arquitectura actual.

## Restricciones

- No propongas cambiar de arquitectura.
- No propongas usar Sequelize.
- No propongas Prisma.
- No propongas ningún ORM.
- No agregues dependencias nuevas.
- No modifiques la API pública.
- No cambies las rutas.
- No cambies los nombres de los métodos públicos.
- El comportamiento de los endpoints debe seguir siendo exactamente el mismo.

## Formato de respuesta

No escribas código.

Limitate únicamente a analizar el proyecto y recomendar cuál estrategia utilizarías y por qué.
```

**Auto-chequeo de las 5 partes EFSI** (marcá lo que incluiste):
- [X] Rol
- [X] Contexto (¿pegaste código del proyecto?)
- [X] Tarea
- [X] Restricciones
- [X] Iteración

**Qué me devolvió (resumen):**
```
Un resumen de las psoibles maneras de optimizar el código: clases base, helpers reutilizables y repossitory generico
```

**¿Me sirvió tal cual, o tuve que corregir/repreguntar?**
```
Me sirvió
```

### Prompt #2

**Lo que escribí:**
```
Actuá como un desarrollador backend senior especializado en Node.js, Express y PostgreSQL, con experiencia en refactorización y aplicación del principio DRY (Don't Repeat Yourself).

## Contexto

Estoy trabajando sobre una API REST desarrollada con:

- Node.js
- Express
- PostgreSQL
- ES Modules
- Arquitectura en capas:
  - Controller
  - Service
  - Repository

El acceso a la base de datos se realiza exclusivamente mediante la clase `DbPg`, utilizando:

- this.db.queryAll(...)
- this.db.queryOne(...)
- this.db.queryReturnId(...)
- this.db.queryRowCount(...)

Voy a pegar los siguientes archivos como referencia:

- alumnos-repository.js
- cursos-repository.js
- materias-repository.js
- db-pg.js

Actualmente los repositories tienen mucho código repetido. Quiero eliminar esa duplicación utilizando **helpers reutilizables**, manteniendo la misma arquitectura del proyecto.

## Objetivo

Extraer únicamente la lógica repetida de los repositories.

Cada repository debe seguir teniendo solamente el código específico de su entidad.

Los helpers deben contener la lógica genérica que hoy está duplicada, mientras que los repositories solo deberán indicar el nombre de la tabla, las columnas y cualquier comportamiento específico de la entidad.

## Restricciones

- No modificar la API pública.
- Los controllers no deben cambiar.
- Los services no deben cambiar salvo que sea estrictamente necesario.
- Mantener exactamente el mismo comportamiento.
- Seguir usando DbPg.
- Continuar utilizando SQL con placeholders $1, $2...
- No usar ORM.
- No agregar dependencias nuevas.
- No utilizar herencia (`extends`).
- No crear un BaseRepository.
- No cambiar la estructura general del proyecto.
- Mantener los console.log existentes.
- Mantener el mismo estilo de programación utilizado en el proyecto.

## Iteración

Primero proponé qué helpers conviene crear y justificá por qué.

Después generá únicamente el archivo de helpers con la lógica reutilizable.

No modifiques todavía los repositories.

Cuando revise el helper, en el siguiente paso adaptaremos alumnos-repository.js, luego cursos-repository.js y finalmente materias-repository.js para utilizar esos helpers.

## Formato de respuesta

1. Explicá brevemente qué lógica repetida encontraste.
2. Justificá por qué los helpers son una buena solución para este proyecto.
3. Generá únicamente el archivo de helpers.
4. No generes todavía modificaciones en los repositories.
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
Ver de que manera implementaba el código
```

*(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)*

---

## 3. 🔧 Qué hizo la IA y qué hice yo

Marcá esto **también en el código** con comentarios `// [IA]` y `// [YO]`. Acá resumilo:

| Archivo / función | Lo generó la IA | Lo modifiqué/escribí yo | Por qué |
|---|---|---|---|
| | | | |
| | | | |

---

## 4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA

> Si ponés "ninguno", probablemente no las viste. **Siempre** hay algo (un import de más, un estilo distinto, un caso borde olvidado, una mala práctica de seguridad).

```
No hay manejo de errores
```

---

## 5. ✅ Verificación

Pegá el checklist de verificación del ejercicio y marcá lo que comprobaste **vos** (con qué evidencia: captura de Postman, salida de `npm test`, número de ms, etc.).

```
...
```

---

## 6. ✍️ Reflexión (300–600 palabras)

Cubrí: qué proceso seguiste, qué decisiones tomaste y por qué, qué aprendiste, y —lo más importante— **qué corregiste de lo que te dio la IA**. Escribí con tus palabras; esto se contrasta con el oral.

```
En este ejercicio seguí un proceso en dos etapas. Primero le pedí a la IA que analizara los repositorios existentes para identificar qué partes del código estaban repetidas y que me propusiera distintas estrategias de refactorización, sin generar código todavía. A partir de ese análisis decidí utilizar **helpers reutilizables**, ya que me permitían reducir la duplicación sin modificar la arquitectura del proyecto ni incorporar conceptos nuevos como herencia o clases base, que hacían la solución más compleja para este caso.

Una vez elegida la estrategia, le pedí a la IA que generara únicamente el archivo de helpers y, después de revisarlo, fui adaptando los repositorios para que utilizaran esas funciones reutilizables. Trabajé de manera incremental porque resultaba más fácil revisar cada cambio y comprobar que el comportamiento de la aplicación siguiera siendo el mismo.

Durante el proceso aprendí que la IA puede detectar rápidamente patrones repetidos y proponer buenas alternativas de refactorización, pero que es necesario revisar cuidadosamente sus respuestas antes de incorporarlas al proyecto. También entendí mejor cómo aplicar el principio DRY sin cambiar el funcionamiento de la aplicación, simplemente extrayendo la lógica común a funciones compartidas.

La principal corrección que hice sobre el código generado por la IA fue adaptar algunos helpers para que respetaran exactamente la estructura y el estilo del proyecto. En una primera versión, la IA intentó generalizar demasiado algunas funciones y modificar la organización existente, por lo que ajusté la implementación para mantener la misma forma de trabajar con `DbPg`, conservar los nombres de los métodos y evitar cambios innecesarios en los repositorios. Además, verifiqué que las consultas siguieran utilizando parámetros (`$1`, `$2`, etc.), que no se agregaran dependencias nuevas y que los endpoints continuaran funcionando igual que antes del refactor. Este proceso me permitió comprender cada modificación realizada y asegurarme de que el resultado final fuera consistente con el proyecto original.
```

---

## 7. 🔗 Adjuntos

- [ ] Link/PDF de la conversación completa con la IA https://chatgpt.com/share/6a571c4a-3330-83e9-99b5-5cb5860d2503
- [ ] Commit(s) en GitHub: `https://github.com/CastilloFrancisco/arquitectura-sample-node-pg-IA-public/commit/a002f1694be366458f0eb8a38752cf2cdb52faa2`
- [ ] Capturas / evidencias de verificación