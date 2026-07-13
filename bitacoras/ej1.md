# 📓 Bitácora de Prompts — Ejercicio N° ___

> Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, `entregas/01-bitacora.md`.
> Esta bitácora **es parte de la nota**. Un ejercicio sin bitácora no se corrige.

---

## Datos

- **Alumno/a:** Castillo, Roth
- **Ejercicio:** N° 1 — Nueva tabla y su CRUD
- **Fecha:** 6/7
- **Modelo de IA usado:** (ej: ChatGPT, Claude, Gemini, Copilot) ChatGPT

---

## 1. 🎯 Qué me pidieron

Resumí en 2–3 líneas el objetivo del ejercicio con tus palabras (no copiado del enunciado).

```
...
```

---

## 2. 💬 Mis prompts (en orden)

Pegá **todos** los prompts que usaste, en orden, con la respuesta resumida y qué hiciste con ella. Agregá tantos como necesites.

### Prompt #1

**Lo que escribí:**
```
Actuá como un desarrollador backend senior especializado en Node.js, Express y PostgreSQL. Tu objetivo es generar código siguiendo exactamente el patrón existente del proyecto, sin modificar la arquitectura ni proponer tecnologías diferentes. Contexto Estoy trabajando sobre una API REST desarrollada con: Node.js Express ES Modules (import/export) PostgreSQL Librería pg Arquitectura en capas: Controller Service Repository El acceso a la base de datos se realiza exclusivamente mediante la clase DbPg, utilizando sus métodos: this.db.queryAll(...) this.db.queryOne(...) this.db.queryReturnId(...) this.db.queryRowCount(...) No se accede directamente al Pool ni se crean clientes manualmente. Voy a pegar como referencia los siguientes archivos del proyecto: cursos-repository.js cursos-service.js cursos-controller.js db-pg.js Debés tomarlos como modelo de estilo, nombres, organización del código, manejo de errores, uso de clases, console.log y estructura general. Además existe la siguiente tabla SQL: CREATE TABLE materias ( id SERIAL PRIMARY KEY, nombre VARCHAR(75) NOT NULL ); Tarea Quiero crear la nueva entidad "materias" siguiendo exactamente el mismo patrón utilizado por "cursos". En esta primera iteración quiero generar el código de: materias-repository.js materias-controller.js materias-service.js Debe incluir los métodos: getAllAsync() getByIdAsync(id) createAsync(entity) updateAsync(entity) deleteByIdAsync(id) Las consultas SQL deben operar únicamente sobre la tabla: materias(id, nombre) Restricciones Muy importante: No cambies la arquitectura. No uses ORM. No uses Sequelize. No uses Prisma. No agregues dependencias nuevas. No cambies nombres de métodos. No inventes carpetas. No modifiques DbPg. Utilizá consultas parametrizadas con $1, $2, etc. Mantené exactamente el mismo estilo de código que cursos-repository.js. Conservá los console.log si aparecen en el archivo de referencia. Usá la misma forma de construir los arrays values (incluyendo el uso de ?? cuando corresponda). No agregues validaciones nuevas. No agregues comentarios explicativos. No escribas código del service ni del controller todavía. Antes de responder Compará el código generado contra cursos-repository.js y asegurate de que: tenga la misma estructura, los mismos nombres de métodos, el mismo estilo, la misma forma de acceder a DbPg. Formato de respuesta Respondé únicamente con el contenido completo de materias-repository.js listo para copiar y pegar. Cuando termine de revisarlo, en el siguiente mensaje te voy a pedir que generes materias-service.js utilizando exactamente el mismo criterio, y luego materias-controller.js. CURSOS REPOSITORY import Db from './db-pg.js'; export default class CursosRepository { constructor() { console.log('Estoy en: CursosRepository.constructor()'); this.db = new Db(); } getAllAsync = async () => { console.log(CursosRepository.getAllAsync()); const sql = SELECT * FROM cursos; return await this.db.queryAll(sql); } getByIdAsync = async (id) => { console.log(CursosRepository.getByIdAsync(${id})); const sql = SELECT * FROM cursos WHERE id=$1; return await this.db.queryOne(sql, [id]); } createAsync = async (entity) => { console.log(CursosRepository.createAsync(${JSON.stringify(entity)})); const sql = INSERT INTO cursos (nombre) VALUES ($1) RETURNING id; const values = [ entity?.nombre ?? '' ]; return await this.db.queryReturnId(sql, values); } updateAsync = async (entity) => { console.log(CursosRepository.updateAsync(${JSON.stringify(entity)})); const sql = UPDATE cursos SET nombre = $2 WHERE id = $1; const values = [ entity.id, entity?.nombre ?? '' ]; return await this.db.queryRowCount(sql, values); } deleteByIdAsync = async (id) => { console.log(CursosRepository.deleteByIdAsync(${id})); const sql = DELETE FROM cursos WHERE id=$1; return await this.db.queryRowCount(sql, [id]); } } CURSOS SERVICE import CursosRepository from '../repositories/cursos-repository.js'; export default class CursosService { constructor() { console.log('Estoy en: CursosService.constructor()'); this.CursosRepository = new CursosRepository(); } getAllAsync = async () => { console.log(CursosService.getAllAsync()); const returnArray = await this.CursosRepository.getAllAsync(); return returnArray; } getByIdAsync = async (id) => { console.log(CursosService.getByIdAsync(${id})); const returnEntity = await this.CursosRepository.getByIdAsync(id); return returnEntity; } createAsync = async (entity) => { console.log(CursosService.createAsync(${JSON.stringify(entity)})); const rowsAffected = await this.CursosRepository.createAsync(entity); return rowsAffected; } updateAsync = async (entity) => { console.log(CursosService.updateAsync(${JSON.stringify(entity)})); const rowsAffected = await this.CursosRepository.updateAsync(entity); return rowsAffected; } deleteByIdAsync = async (id) => { console.log(CursosService.deleteByIdAsync(${id})); const rowsAffected = await this.CursosRepository.deleteByIdAsync(id); return rowsAffected; } } CURSOS CONTROLLER import { Router } from 'express'; import { StatusCodes } from 'http-status-codes'; import CursosService from './../services/cursos-service.js'; const router = Router(); const currentService = new CursosService(); router.get('', async (req, res) => { try { console.log(CursosController.get); const returnArray = await currentService.getAllAsync(); if (returnArray != null) { res.status(StatusCodes.OK).json(returnArray); } else { res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error interno."); } } catch (error) { console.log(error); res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(Error: ${error.message}); } }); router.get('/:id', async (req, res) => { try { let id = req.params.id; const returnEntity = await currentService.getByIdAsync(id); if (returnEntity != null) { res.status(StatusCodes.OK).json(returnEntity); } else { res.status(StatusCodes.NOT_FOUND).send(No se encontro la entidad (id:${id}).); } } catch (error) { console.log(error); res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(Error: ${error.message}); } }); router.post('', async (req, res) => { try { let entity = req.body; const newId = await currentService.createAsync(entity); if (newId > 0) { res.status(StatusCodes.CREATED).json(newId); } else { res.status(StatusCodes.BAD_REQUEST).json(null); } } catch (error) { console.log(error); res.status(StatusCodes.BAD_REQUEST).send(Error: ${error.message}); } }); router.put('/:id', async (req, res) => { try { let id = parseInt(req.params.id); let entity = req.body; if (entity.id && parseInt(entity.id) !== id) { return res .status(StatusCodes.BAD_REQUEST) .send(El id de la URL (${id}) no coincide con el id del body (${entity.id}).); } entity.id = id; const rowsAffected = await currentService.updateAsync(entity); if (rowsAffected != 0) { res.status(StatusCodes.OK).json(rowsAffected); } else { res.status(StatusCodes.NOT_FOUND).send(No se encontro la entidad (id:${id}).); } } catch (error) { console.log(error); res.status(StatusCodes.BAD_REQUEST).send(Error: ${error.message}); } }); router.delete('/:id', async (req, res) => { try { let id = req.params.id; const rowCount = await currentService.deleteByIdAsync(id); if (rowCount != 0) { res.status(StatusCodes.OK).json(null); } else { res.status(StatusCodes.NOT_FOUND).send(No se encontro la entidad (id:${id}).); } } catch (error) { console.log(error); res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(Error: ${error.message}); } }); export default router; DB CONFIG // Configuración de conexión a PostgreSQL. // // Las credenciales se leen desde el archivo .env (que server.js carga al // arrancar con import 'dotenv/config'), así NO quedan escritas en el código. // // 👉 Para cambiar de base, editá UNA sola línea en el .env: // // DB_TARGET = "local" → PostgreSQL en tu máquina // DB_TARGET = "supabase" → PostgreSQL en la nube (Supabase) // // Según ese valor tomamos el juego de variables que corresponda: // las DB_LOCAL_* o las DB_SUPABASE_*. const target = (process.env.DB_TARGET ?? 'local').trim().toLowerCase(); const prefix = target === 'supabase' ? 'DB_SUPABASE_' : 'DB_LOCAL_'; const DBConfig = { host: process.env[prefix + 'HOST'] ?? 'localhost', database: process.env[prefix + 'DATABASE'] ?? '', user: process.env[prefix + 'USER'] ?? '', password: process.env[prefix + 'PASSWORD'] ?? '', port: process.env[prefix + 'PORT'] ?? 5432, // Supabase (y casi todas las bases en la nube) exigen SSL; la local no. ssl: target === 'supabase' ? { rejectUnauthorized: false } : false // max: 20, // idleTimeoutMillis: 30000, // connectionTimeoutMillis: 2000 }; console.log(db-config: conectando a la base "${target}"); export default DBConfig;
```

**Auto-chequeo de las 5 partes EFSI** (marcá lo que incluiste):
- [X] Rol
- [X] Contexto (¿pegaste código del proyecto?)
- [X] Tarea
- [X] Restricciones
- [X] Iteración

**Qué me devolvió (resumen):**
```
Primero me devolvió sólo el repository, luego tuve que reiterarle que me dé todo el código, junto con respetar el estilo
```

**¿Me sirvió tal cual, o tuve que corregir/repreguntar?**
```
tuve que reiterarle que me dé todo el código, junto con respetar el estilo
```

### Prompt #2

**Lo que escribí:**
```
Mantén el estilo de programación presentado en los ejemplos, continúa con service, controller y entity```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
...
```

*(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)*

---

## 3. 🔧 Qué hizo la IA y qué hice yo

Marcá esto **también en el código** con comentarios `// [IA]` y `// [YO]`. Acá resumilo:

| Archivo / función | Lo generó la IA | Lo modifiqué/escribí yo | Por qué |
|server.js| - |agregado manual de rutas|funcionamiento correcto del proyecto|
| | | | |
| | | | |

---

## 4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA

> Si ponés "ninguno", probablemente no las viste. **Siempre** hay algo (un import de más, un estilo distinto, un caso borde olvidado, una mala práctica de seguridad).

```
Devuelve todos los errores con el mismo código de error
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
Durante el desarrollo de esta actividad seguí un proceso ordenado, tomando como punto de partida el código ya existente del proyecto. Antes de generar nuevas clases, analicé la estructura de la aplicación para comprender cómo estaba organizada la arquitectura en capas (Controller, Service y Repository) y cómo se realizaba el acceso a la base de datos mediante la clase `DbPg`. El objetivo fue mantener la coherencia con el resto del proyecto y evitar introducir cambios innecesarios en la arquitectura o en el estilo de programación.

Para implementar la nueva entidad **Materias**, reutilicé el mismo patrón que se utilizaba para **Cursos**, adaptando únicamente los nombres de las clases, los métodos y las consultas SQL para trabajar con la tabla `materias`. También mantuve la misma forma de construir los arreglos de valores para las consultas parametrizadas, el uso de `async/await`, los nombres de los métodos y la estructura general del código. De esta manera, el nuevo módulo quedó integrado de forma consistente con el resto de la aplicación.

Durante el proceso utilicé una herramienta de inteligencia artificial como apoyo para acelerar la generación del código repetitivo. Sin embargo, no tomé el resultado como definitivo. Revisé cuidadosamente cada archivo generado y lo comparé con el código de referencia del proyecto para verificar que respetara exactamente el estilo solicitado. En esa revisión detecté algunos aspectos que fue necesario corregir. Por ejemplo, la IA tendía a modificar el formato de algunas consultas SQL, incorporar pequeños cambios de estilo y, en ocasiones, sugería estructuras o prácticas diferentes a las utilizadas en el proyecto. También era necesario comprobar que se utilizaran únicamente los métodos disponibles de la clase `DbPg` y que no se agregaran dependencias, validaciones o tecnologías que no formaban parte de la consigna.

Esta actividad me permitió comprender la importancia de utilizar la inteligencia artificial como una herramienta de asistencia y no como un reemplazo del análisis del desarrollador. Aunque la IA facilita la escritura de código y reduce el tiempo necesario para realizar tareas repetitivas, sigue siendo responsabilidad del programador revisar, validar y adaptar el resultado al contexto específico del proyecto. También aprendí que mantener un estilo uniforme en una aplicación es tan importante como lograr que el código funcione correctamente, ya que mejora la legibilidad, el mantenimiento y el trabajo en equipo.

En conclusión, el desarrollo de esta práctica reforzó tanto mis conocimientos sobre la arquitectura utilizada en la API como la importancia de revisar críticamente el código generado por herramientas de inteligencia artificial antes de incorporarlo a un proyecto real.

```

---

## 7. 🔗 Adjuntos

- [ ] Link/PDF de la conversación completa con la IA https://chatgpt.com/share/6a54e530-d130-83e9-96ef-e9f60130e001
- [ ] Commit(s) en GitHub: `https://github.com/CastilloFrancisco/arquitectura-sample-node-pg-IA-public/tree/8db5e180795154d297148917f8033ca96e4c4693`
- [ ] Capturas / evidencias de verificación