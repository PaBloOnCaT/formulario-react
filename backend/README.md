# Backend - Node + Express + Sequelize + MySQL

1. Crear la base de datos en MySQL (Workbench o consola):

       CREATE DATABASE IF NOT EXISTS formulario;

   (la tabla `personas` la crea Sequelize automáticamente; `db.sql` es opcional)
2. La clave de MySQL está en `config/db.js` (o puedes definirla en un archivo `.env`, copiando `.env.example`).
3. Instalar y correr:

       npm install
       npm start

Endpoints: GET/POST `/personas`, GET/PUT/DELETE `/personas/:id`
