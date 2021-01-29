require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

// Configurar CORS
app.use(cors());

// Lectura y parseo de body
app.use( express.json() );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));




app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto: ", process.env.PORT);
});
