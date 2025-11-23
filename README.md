# Sistema de Gestión Clínica – Entrega Final

## Introducción

Este proyecto representa la versión final y mejorada del sistema de gestión para una clínica, desarrollado para la materia **Desarrollo de Sistemas Web (Back End)**. Partiendo de una base funcional con Node.js, Express y MongoDB, esta versión final introduce mejoras significativas en robustez, seguridad y experiencia de usuario, aplicando conceptos avanzados de desarrollo backend.

La aplicación sigue un patrón de diseño **Modelo-Vista-Controlador (MVC)** y permite la gestión integral de pacientes, médicos, usuarios y turnos, con un sistema de autenticación basado en roles y una interfaz renderizada en el servidor con Pug.

---

## Características Principales

- **Gestión CRUD Completa:** Operaciones de Crear, Leer, Actualizar y Eliminar para las entidades principales:
  -  Pacientes
  -  Médicos
  -  Turnos
  -  Usuarios
- **Autenticación y Autorización:**
  - Sistema de login basado en **sesiones** (`express-session`).
  - **Protección de rutas** mediante middlewares que verifican la autenticación y el rol del usuario (administrador/recepcionista).
  - Logout que destruye la sesión del usuario.
- **Manejo de Errores Centralizado:**
  - Un **middleware de errores global** captura todas las excepciones de la aplicación, previniendo caídas del servidor y presentando una página de error unificada.
- **Notificaciones con Mensajes Flash:**
  - Implementación de `connect-flash` para enviar mensajes de **éxito** y **error** a los usuarios tras realizar una acción.
- **Vistas Dinámicas Renderizadas en Servidor:**
  - Interfaz de usuario construida con el motor de plantillas **Pug**.
  - Diseño adaptable con modo **claro/oscuro**.
- **Base de Datos NoSQL:**
  - Persistencia de datos gestionada con MongoDB mediante Mongoose, con modelos bien definidos y relaciones básicas entre entidades.
- **Configuración Segura:**
  - Uso de **variables de entorno** (`.env`) para gestionar información sensible.
  - Separación de app y server para facilitar testing y despliegue.

---

## Tecnologías Utilizadas

| Tecnología | Propósito |
|--------------------|----------------------------------------------|
| **Node.js** | Entorno de ejecución del servidor (backend). |
| **Express.js** | Framework para la creación del servidor y la gestión de rutas. |
| **MongoDB** | Base de datos NoSQL para la persistencia de datos. |
| **Mongoose** | ODM para modelar y conectar con la base de datos MongoDB. |
| **Pug** | Motor de plantillas para generar las vistas HTML dinámicas. |
| **express-session**| Middleware para la gestión de sesiones de usuario. |
| **connect-flash** | Middleware para mostrar mensajes de notificación tras redirecciones. |
| **dotenv** | Para cargar y gestionar variables de entorno desde un archivo `.env`. |
| **Nodemon** | Herramienta de desarrollo para reiniciar el servidor automáticamente. |
| **Jest & Supertest** | Para la ejecución de pruebas automatizadas de rutas y funcionalidades del backend. |
| **bcrypt / bcryptjs** | Para el hash y verificación segura de contraseñas de usuarios.|
| **mongodb-memory-server** | Base de datos en memoria usada para pruebas automatizadas sin afectar la base de datos real.|

---

## Instalación y Puesta en Marcha

Seguí estos pasos para ejecutar el proyecto en tu entorno local.

### 1. Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18.x o superior).
- Una instancia de [MongoDB](https://www.mongodb.com/try/download/community) (local o en la nube a través de MongoDB Atlas).

### 2. Clonar el Repositorio

```bash
git clone https://github.com/PMIglesias/BSWB-proyecto-entrega-final.git
cd BSWB-proyecto-entrega-final
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Configurar Variables de Entorno

Creá un archivo llamado `.env` en la raíz del proyecto. Puedes duplicar el archivo `.env.example`(duplicarlo y renombrar como ".env"), o crearlo desde cero con las siguientes variables:

```env
# URL de conexión a tu base de datos MongoDB
MONGO_URI="mongodb+srv://<user>:<password>@cluster.../?retryWrites=true&w=majority"

# Puerto en el que correrá el servidor
PORT=3000

# Clave secreta para firmar las cookies de sesión
SESSION_SECRET="un_secreto_muy_fuerte_y_largo_para_las_sesiones"

```

### 5. Ejecutar la Aplicación

El proyecto incluye scripts para iniciar el servidor en diferentes modos:

- **Modo Desarrollo (recomendado):** Inicia el servidor con `nodemon`, que se reiniciará automáticamente con cada cambio en el código.
  ```bash
  npm run dev
  ```

- **Modo Producción:** Inicia el servidor de forma estándar.
  ```bash
  npm start
  ```

Una vez ejecutado, podrás acceder a la aplicación en `http://localhost:3000`.

---

## Pruebas

#### Pruebas Automatizadas

El proyecto utiliza `jest` y `supertest` para pruebas de integración, con `mongodb-memory-server` para evitar depender de una base de datos externa durante las pruebas.

```bash
npm test
```

#### Pruebas Manuales y Credenciales de Demostración

Para facilitar las pruebas manuales del flujo de la aplicación, puedes usar las siguientes credenciales (si estás usando la db dentro de .env.examples ):

-   **Administrador:**
    -   **Email:** `admin@hospital.com`
    -   **Password:** `123456`
-   **Recepcionista:**
    -   **Email:** `recepcion@hospital.com`
    -   **Password:** `123456`

**Flujo de Prueba Manual Recomendada:**
1.  Intentar acceder a `/pacientes` sin haber iniciado sesión. El sistema **debe redirigir** a `/auth/login`.
2.  Iniciar sesión con las credenciales de `recepcionista`.
3.  Acceder a `/pacientes` nuevamente. El acceso **debe ser exitoso**.
4.  Cerrar sesión y repetir el proceso con las credenciales de `admin`.

---

## Solución de Problemas Comunes

-   **Error: `MONGO_URI no definido`**
    -   **Causa:** El archivo `.env` no existe o la variable `MONGO_URI` no está definida.
    -   **Solución:** Asegúrate de que el archivo `.env` esté en la raíz del proyecto y contenga la línea `MONGO_URI="..."`.

-   **Al acceder a una ruta protegida sin sesión, se muestra un JSON (`{"mensaje":"No autorizado"}`) en lugar de redirigir al login.**
    -   **Causa:** El servidor de Node.js no ha recargado los cambios del código.
    -   **Solución:** Detén el servidor (`Ctrl + C`) y reinícialo (`npm run dev`). Si el problema persiste, verifica que el middleware en la ruta afectada esté llamado con la opción de redirección: `authMiddleware({ redirect: true })`.

-   **El botón "Cerrar Sesión" no funciona o muestra un error `Cannot GET /auth/logout`.**
    -   **Causa:** La ruta de logout espera un método `POST`, pero se está enviando un `GET` desde un enlace.
    -   **Solución:** Asegúrate de que en la vista (`layout.pug`) el logout se gestione a través de un `<form>` con `method="POST"`.

---

## Estructura del Proyecto

```
/
├── public/             # Archivos estáticos (CSS, JS del cliente, imágenes)
├── src/
│   ├── app.js          # Archivo principal de configuración de Express
│   ├── server.js       # Archivo para iniciar el servidor
│   ├── config/         # Configuración de la base de datos (db.js)
│   ├── controllers/    # Lógica de negocio y manejo de peticiones
│   ├── middlewares/    # Middlewares personalizados (autenticación, roles, etc.)
│   ├── models/         # Modelos de datos de Mongoose (esquemas)
│   ├── routes/         # Definición de las rutas de la API y vistas
│   ├── scripts/        # Actualmente solo contiene "seed.js" que usamos para poblar la DB
│   └── views/          # Plantillas Pug para la interfaz de usuario
├── tests/              # Pruebas unitarias y de integración
├── .env                # (No versionado) Variables de entorno
├── .env.example        # Variables de entorno para correr la demo
├── .gitignore          # Archivos y carpetas a ignorar por Git
├── package.json        # Dependencias y scripts del proyecto
└── README.md           # Este archivo
```
