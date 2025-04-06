import bodyParser from "body-parser";
import express from "express";
import descuentoRoutes from "./routes/DescuentoRoute.js"; // Cambiado de clientRoutes a descuentoRoutes
import swaggerSpec from "./api-docs.js";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());


app.use("/app/descuentos", descuentoRoutes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default app;