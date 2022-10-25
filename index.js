import express, { application } from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import { errorHandling } from "./utils/error.js";

import routeAlunos from "./routes/routesAlunos.js";
import routeGrupoMuscular from "./routes/routesGrupoMuscular.js";
import routeTipoExercicio from "./routes/routesTipoExercicio.js";
import routeInstrutor from "./routes/routesInstrutor.js";
//import routeFicha from "./routes/routesFicha.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandling);

app.use("/api/gruposmusculares", routeGrupoMuscular);
app.use("/api/tiposexercicios", routeTipoExercicio);
app.use("/api/alunos", routeAlunos);
app.use("/api/instrutores", routeInstrutor);
//app.use("/api/fichas",routeFicha);

app.listen(8080, () => {
    connectDatabase();
    console.log("Servidor rodando na porta 8080.");
});