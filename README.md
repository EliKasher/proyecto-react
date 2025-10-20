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
