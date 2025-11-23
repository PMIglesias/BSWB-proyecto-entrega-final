# Sistema de Gestión Clínica – Entrega Final

## Introducción

Este proyecto representa la versión final y mejorada del sistema de gestión para una clínica, desarrollado para la materia **Desarrollo Web Backend**. Partiendo de una base funcional con Node.js, Express y MongoDB, esta versión final introduce mejoras significativas en robustez, seguridad y experiencia de usuario, aplicando conceptos avanzados de desarrollo backend.

La aplicación sigue un patrón de diseño **Modelo-Vista-Controlador (MVC)** y permite la gestión integral de pacientes, médicos, usuarios y turnos, con un sistema de autenticación basado en roles y una interfaz renderizada en el servidor con Pug.

---

## Características Principales

- **Gestión CRUD Completa:** Operaciones de Crear, Leer, Actualizar y Eliminar para las entidades principales:
  - 🚶‍♂️ Pacientes
  - 👨‍⚕️ Médicos
  - 📅 Turnos
  - 👤 Usuarios
- **Autenticación y Autorización:**
  - Sistema de login basado en **sesiones** (`express-session`).
  - **Protección de rutas** mediante middlewares que verifican la autenticación y el rol del usuario (administrador/usuario).
- **Manejo de Errores Centralizado:**
  - Un **middleware de errores global** captura todas las excepciones de la aplicación, previniendo caídas del servidor y presentando una página de error unificada y amigable.
- **Notificaciones con Mensajes Flash:**
  - Implementación de `connect-flash` para enviar mensajes de **éxito** y **error** a los usuarios tras realizar una acción (ej. "Usuario creado correctamente"), mejorando la retroalimentación sin ensuciar las URLs.
- **Vistas Dinámicas Renderizadas en Servidor:**
  - Interfaz de usuario construida con el motor de plantillas **Pug**.
  - Diseño adaptable con modo **claro/oscuro**.
- **Base de Datos NoSQL:**
  - Persistencia de datos gestionada con **MongoDB** a través del ODM **Mongoose**, con modelos de datos bien definidos y validados.
- **Configuración Segura:**
  - Uso de **variables de entorno** (`.env`) para gestionar información sensible como credenciales de la base de datos y secretos de sesión.

---

## Tecnologías Utilizadas

| Tecnología | Propósito |
|--------------------|----------------------------------------------|
| **Node.js**        | Entorno de ejecución del servidor (backend). |
| **Express.js**     | Framework para la creación del servidor y la gestión de rutas. |
| **MongoDB**        | Base de datos NoSQL para la persistencia de datos. |
| **Mongoose**       | ODM para modelar y conectar con la base de datos MongoDB. |
| **Pug**            | Motor de plantillas para generar las vistas HTML dinámicas. |
| **express-session**| Middleware para la gestión de sesiones de usuario. |
| **connect-flash**  | Middleware para mostrar mensajes de notificación tras redirecciones. |
| **dotenv**         | Para cargar y gestionar variables de entorno desde un archivo `.env`. |
| **Nodemon**        | Herramienta de desarrollo para reiniciar el servidor automáticamente. |

---

## Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### 1. Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18.x o superior).
- Una instancia de [MongoDB](https://www.mongodb.com/try/download/community) (local o en la nube a través de MongoDB Atlas).

### 2. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 3. Instalar Dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar todos los paquetes necesarios.

```bash
npm install
```

### 4. Configurar Variables de Entorno

Crea un archivo llamado `.env` en la raíz del proyecto. Puedes duplicar el archivo `.env.example` si existe, o crearlo desde cero con las siguientes variables:

```env
# URL de conexión a tu base de datos MongoDB
MONGO_URI="mongodb+srv://<user>:<password>@cluster..."

# Puerto en el que correrá el servidor
PORT=3000

# Clave secreta para firmar las cookies de sesión
SESSION_SECRET="un_secreto_muy_fuerte_y_largo"
```

### 5. Ejecutar la Aplicación

El proyecto incluye scripts para iniciar el servidor en diferentes modos:

- **Modo Desarrollo:** (recomendado) Inicia el servidor con `nodemon`, que se reiniciará automáticamente con cada cambio en el código.
  ```bash
  npm run dev
  ```

- **Modo Producción:** Inicia el servidor de forma estándar.
  ```bash
  npm start
  ```

Una vez ejecutado, podrás acceder a la aplicación en `http://localhost:3000` (o el puerto que hayas configurado).

---

## Estructura del Proyecto

El proyecto sigue una estructura basada en el patrón MVC para mantener el código organizado y escalable.

```
/
├── public/             # Archivos estáticos (CSS, JS del cliente, imágenes)
├── src/
│   ├── app.js          # Archivo principal de configuración de Express
│   ├── config/         # Configuración de la base de datos (db.js)
│   ├── controllers/    # Lógica de negocio y manejo de peticiones
│   ├── middlewares/    # Middlewares personalizados (autenticación, roles, etc.)
│   ├── models/         # Modelos de datos de Mongoose (esquemas)
│   ├── routes/         # Definición de las rutas de la API y vistas
│   └── views/          # Plantillas Pug para la interfaz de usuario
├── .env                # (No versionado) Variables de entorno
├── .gitignore          # Archivos y carpetas a ignorar por Git
├── package.json        # Dependencias y scripts del proyecto
└── README.md           # Este archivo
```
