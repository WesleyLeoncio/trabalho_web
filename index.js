import express, { application } from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import { errorHandling } from "./utils/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verificarToken } from "./utils/verificarToken.js";
import routeAlunos from "./routes/routesAlunos.js";
import routeAuth from "./routes/authRoutes.js";
import routeGrupoMusculares from "./routes/routesGrupoMusculares.js";
import routeTipoExercicios from "./routes/routesTipoExercicios.js";
import routeInstrutores from "./routes/routesInstrutores.js";
import routeFichas from "./routes/routesFichas.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandling);

app.use("/api/gruposmusculares",verificarToken, routeGrupoMusculares);
app.use("/api/tiposexercicios",verificarToken, routeTipoExercicios);
app.use("/api/alunos",verificarToken, routeAlunos);
app.use("/api/instrutores",verificarToken, routeInstrutores);
app.use("/api/fichas",verificarToken, routeFichas);
app.use("/api/auth", routeAuth);

app.listen(8080, () => {
    connectDatabase();
    console.log("Servidor rodando na porta 8080.");
});