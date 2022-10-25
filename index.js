import express, { application } from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import { errorHandling } from "./utils/error.js";

import routeAlunos from "./routes/routesAlunos.js";
import routeGrupoMusculares from "./routes/routesGrupoMusculares.js";
import routeTipoExercicios from "./routes/routesTipoExercicios.js";
import routeInstrutores from "./routes/routesInstrutores.js";
//import routeExercicios from "./routes/routesExercicios.js";
//import routeFichas from "./routes/routesFicha.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandling);

app.use("/api/gruposmusculares", routeGrupoMusculares);
app.use("/api/tiposexercicios", routeTipoExercicios);
app.use("/api/alunos", routeAlunos);
app.use("/api/instrutores", routeInstrutores);
//app.use("/api/exercios", routeExercicios);
//app.use("/api/fichas",routeFicha);

app.listen(8080, () => {
    connectDatabase();
    console.log("Servidor rodando na porta 8080.");
});