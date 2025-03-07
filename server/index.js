/* require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const movieRoute = require("./routes/movie.js");
const app = express();
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

//Connect to DB
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

//Routes
app.use("/", movieRoute);

//Server run
app.listen(5000, () => console.log("Server running on port 5000"));
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const movieRoute = require("./routes/movie.js");
const next = require("next");

// Configuración de Next.js
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const mongoUri = process.env.MONGO_URI; // URI de la base de datos MongoDB

// Inicializa Next.js
app.prepare().then(() => {
  const server = express();

  // Middleware de Express
  server.use(express.json());
  server.use(cors());

  // Conexión a la base de datos MongoDB
  mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error de conexión a MongoDB:", err));

  // Rutas de Express
  server.use("/api", movieRoute); // Puedes tener las rutas del backend en esta ruta

  // Rutas de Next.js
  server.all("*", (req, res) => {
    return handle(req, res); // Delega la solicitud a Next.js
  });

  // Levantar el servidor en el puerto 5000
  server.listen(5000, (err) => {
    if (err) throw err;
    console.log("> Servidor corriendo en http://localhost:5000");
  });
});
