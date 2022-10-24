import express from "express";
import { createGrupoMuscular, updateGrupoMuscular, deleteGrupoMuscular, getGrupoMuscular, getGrupoMusculars } from
"../controllers/GrupoMuscularController.js";
const router = express.Router();
router.post("/", createGrupoMuscular);
router.put("/", updateGrupoMuscular); // alterado de /:id
router.delete("/:id", deleteGrupoMuscular);
router.get("/:id", getGrupoMuscular);
router.get("/", getGrupoMusculars);
export default router;