# Proyecto Aplicaciones Webs Reactivas

## Integrantes

- Evelyn Ávila
- Tomás Méndez
- Javier Sandoval
- Tomás Vergara

## Requerimientos

- Node.js 22.16.0

## Preparando el frontend y el backend

Primero hay que instalar las dependencias de ambos, para esto ejecute los siguientes comandos:

```shell
# Ubicado en la carpeta raíz
cd app
cd backend
npm install
```

```shell
# Ubicado en la carpeta raíz
cd app
cd frontend
npm install
```

## Creando la build de producción

Primero, hay que compilar el frontend, para esto, ejecute los siguientes comandos:

```shell
# Ubicado en la carpeta raíz
cd app
cd backend
npm run build:ui
```

Y esperar a que termine la compilación del frontend.

Antes de compilar el backend, hay que configurar las variables de entorno, para eso en la carpeta `/app/backend` cree el archivo `.env` tal que su ruta sea `/app/backend/.env`, llene este archivo con las variables de entorno guiandose por el archivo `/app/backend/.env.Example`.

Una vez se encuentren configuradas las variables de entorno y el frontend compilado, se puede crear la build de producción de la siguiente forma:

```shell
# Ubicado en `/app/backend`
npm run build
```

## Corriendo la aplicación

Ya una vez con las builds del backend y frontend, se puede iniciar el servidor de la aplicación con:

```shell
# Ubicado en `/app/backend`
npm run start
```

Si solo se tiene la build del frontend y se desea correr el servidor en modo desarrollador, puede hacerlo con el siguiente comando:

```shell
# Ubicado en `/app/backend`
npm run dev
```

## Tema del Proyecto

El proyecto a desarrollar será una aplicación web para mejorar el proceso de inscripción de cursos de la EdV, programa de la Universidad de Chile que imparte cursos para estudiantes de enseñanza básica y media en las distintas facultades de la UChile. El proyecto contempla que un profesor pueda registrarse/iniciar sesión y crear un nuevo curso desde cero o usando uno anterior como plantilla. En ese proceso deberá ingresar datos básicos del curso, como su nombre, facultad de implementación, semana en que será dictado, cupo total, así como su programación semanal (qué harán cada día y bloque), además de registrar a los profesores que participarán y los materiales que necesitarán.

Un profesor podrá registrarse usando sus datos personales junto con su vínculo laboral con la Universidad de Chile y la documentación necesaria según ese vínculo, para procesar su eventual pago.

Por parte de los funcionarios, estos podrán revisar el listado de cursos inscritos por versión, editarlos y descargar la información consolidada (por ejemplo, equipos docentes, materiales, etc., ordenados por curso y facultad).

Este proyecto busca optimizar un proceso que actualmente requiere más de 40 horas de trabajo a los funcionarios de la EdV que al ser un proceso manual ha tenido errores al ingresar la información a la página web del programa y con ello confundir a las y los estudiantes interesados y, al mismo tiempo, permitirá que los profesores que repiten un curso de una versión anterior no deban volver a completar los campos que no requieran actualización.

## Estructura del Estado Global

## Mapa de Rutas y Flujo de Autenticación

## Descripción Tests E2E

## Librería de Estilos



## URL de la aplicación
