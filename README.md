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

La implementación del estado global fue realizada con Redux Toolkit

El estado global contiene dos slices:

- form: La cual contiene el estado del formulario actual
- user: Contiene los datos del usuario

El usuario es un objeto con la siguiente estructura:

```ts
{
    logged: boolean,
    id: string,
    roles: string,
    first_name: string,
    last_name: string,
    rut: string,
    email: string,
    phone: string,
}
```

Como se tienen dos tipos de usuarios, ambos extienden de una interfaz que es igual al tipo del slice form, la cual contiene información que tienen en común, para acceder a información específica de un tipo de usuario, como `Teacher`, se debe realizar un casteo al tipo correspondiente.

Contiene dos reducers para reiniciar el usuario a su estado original, en el cual simplemente todos sus campos tienen un string vacío, y otro para cambiar el valor del estado a otro usuario, que será obtenido cuando un usuario se autentifique.

form contiene la siguiente la siguiente estructura:

```ts
export interface RegisterForm {
  course_data: CourseData;
  program_content: ProgramContent;
  weekly_planification: DailyPlanification[]; // 5 days
  staff: Staff[];
  materials: Material[];
  state: number | null; // state == 1 means a course registered, 0 means is incomplete
  id: string | null; //null when creating a new form
  showErrors: boolean; // showErrors on form
  currentPageNumber: number; // which step of the form are we on
  currentPageIsValid: boolean; // if the current step fields are valid
}

export interface CourseData {
  name: string;
  faculty: string;
  educational_level: string[];
  quota: number; // min 25
  course_start: CourseDate[];
}

export interface ProgramContent {
  course_purpose: string;
  learning_objectives: string[];
}

export interface DailyPlanification {
  day: number;
  first_period: string;
  first_classroom: string;
  second_period: string;
  second_classroom: string;
}

export interface Teacher {
  first_name: string;
  last_name: string;
  rut: string;
  email: string;
  phone: string;
  degree: string;
  college_relationship: string;
}

export interface Staff {
  first_name: string;
  last_name: string;
  rut: string;
  email: string;
  phone: string;
  position: string;
}

export interface Material {
  name: string;
  quantity: number;
  link: string;
}

export interface CourseDate {
  start_date: string;
  end_date: string;
  start_month: string;
  end_month: string;
}
```

El cual contiene todos los campos de un curso en la base de datos (los campos hasta state), con unos campos extras para manejar en el front, `showErrors` indica si el front debe mostrar los errores, `currentPageNumber` es para almacenar el paso actual del form y así volver al mismo paso al volver al registro, `currentPageIsValid` se usa para saber si es posible avanzar al siguiente paso y/o mandar el formulario al backend.

En cuanto a reducers, se tienen los siguientes:

- Un set para todo el formulario, y para cada campo a excepción de id, id solo debe ser modificado cuando se cambia el valor de todo el formulario.
- Reducers para añadir/remover elementos de cada campo que sea un arreglo.
- Reducers para modificar elementos específicos de `materials` y de `weekly_planification`.
- Reducers para incrementar/disminuir la página actual.

## Mapa de Rutas y Flujo de Autenticación

# POST /api/login
La petición espera un objeto JSON con las credenciales del profesor:

{
  rut: string,
  password: string
}

POST /api/logout
Este endpoint no espera ningún objeto y le hace logout al usuario. Borra el token de las cookies.

# GET /api/courses/
Retorna todos los cursos almacenados en la base de datos.

# POST /api/courses/
La petición espera un objeto JSON con la información del curso a registrar:

{
  course_data,
  program_content,
  weekly_planification,
  teacher,
  staff,
  materials
}

# GET /api/teachers/
Retorna la lista completa de profesores registrados en la base de datos.

POST /api/teachers/
La petición espera un objeto JSON con los datos del profesor a registrar:
{
  first_name: string,
  last_name: string,
  email: string,
  rut: string,
  phone: string,
  degree: string,
  college_relationship: string,
  password: string
}

GET /api/functionaries/
Retorna la lista completa de funcionarios registrados en la base de datos.

POST /api/functionaries/
La petición espera un objeto JSON con los datos del funcionario a registrar:

{
    rut: string,
    first_name: string,
    last_name: string, 
    email: string,
    password: string
}

GET api/faculties/
Obtiene el nombre de todas las facultades de la Universidad desde la base de datos.

GET api/educational-levels/
Obtiene los niveles de estudios desde la base de datos, para el form de registro de curso.

GET api/documents/
Obtiene los documentos desde la base de datos.

GET api/course-dates
Entrega las fechas posibles para la realización de un curso desde la base de datos. El cuerpo de la respuesta es:

{
    start_date: number,
    start_month: string,
    end_date: number,
    end_month: string,
}

GET api/contractual-relations
Obtiene las relaciones contractuales desde la base de datos para el registro de un profesor. La respuesta tiene los siguientes campos:

{
    relation: String,
    requirements: Array<String>
}

<img width="1081" height="744" alt="autenticación" src="https://github.com/user-attachments/assets/751b59f9-5f8f-412a-bfd3-0e6f057c42a7" />

## Librería de Estilos

# Colores

Se elige un gradiente de púrpura a rosa por su buen contraste y sobre él otro gradiente de azul a rosa para darle continuidad y mejor visibilidad al contenido importante.
Se prefiere el púrpura dado que son colores agradables a la vista y aporta una sensación de formalidad a la web dado que sus usuarios principales serán profesores y funcionarios de la UChile.
Además, se busca que sea llamativa para motivar a dichos usuarios a trasladarse a esta nueva herramienta.

# Estructura

El formulario de registro se realiza de tal manera que posteriormente sea más expedito el proceso de rellenar campos para la creación de cursos, trayendo dichos datos desde el backend.
El inicio de sesión se realiza con el RUT dado que es la herramienta de identificación chilena y existe diferenciación entre loggeo de funcionarios y profesores para hacer más seguro el uso de roles.
El registro de un curso se realiza con la metodología step-by-step para hacer más digerible el rellenado de datos, además de autorellenarse los datos personales requeridos.

La librería de estilos elegida es tailwindcss por su amplio uso en muchas plataformas, su comodidad de uso y especificidad.

## E2E tests

Para testear la aplicación se utilizó Playwright. Para correr los tests e2e se debe correr la aplicación en modo test, para usar la base de datos correspondiente. Para esto se debe crear un archivo `.env.test` con la misma información del `.env` pero cambiando `MONGODB_URI` por la base de datos de testing. Luego se debe hacer build del proyecto como se señala en esta [sección](#creando-la-build-de-producción) y ejecutarlo con:

```
npm run start:test
```

De esta forma se utilizará la base de datos de testing. Para correr los test de playwright se debe navegar a la carpeta `e2etests` y ejecutar:

```bash
npm test
```

Los flujos cubiertos por los tests e2e son los siguientes:

- Login de profesores.
- Visitar rutas protegidas con un usuario (lista de cursos, perfil, formulario de registro).
- Visitar rutas protegidas sin usuario (redirige al login)
- Registrar un curso con el formulario y verlo en el listado de cursos creados por el usuario.

## URL de la aplicación

https://fullstack.dcc.uchile.cl:7146
