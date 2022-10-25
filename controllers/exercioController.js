import Exercicio from "../models/Exercicio.js";

export const createExercicio = async (req, res, next) => {
    const exercicio = new Exercicio(req.body);
    try {
        const createdExercicio = await exercicio.save();
        res.status(201).json(createdExercicio);
    } catch (error) {
        next(error);
    }
};

export const updateExercicio = async (req, res, next) => {
    try {
        const updatedExercicio = await Exercicio.findByIdAndUpdate(req.params.id, {
            $set:
                req.body
        }, { new: true });
        res.status(200).json(updatedExercicio);
    } catch (error) {
        next(error);
    }
};

export const deleteExercicio = async (req, res, next) => {
    try {
        await Exercicio.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Exercicio excluído com sucesso." });
    } catch (error) {
        next(error);
    }
};

export const getExercicio = async (req, res, next) => {
    try {
        const Exercicio = await Exercicio.findById(req.params.id);
        res.status(200).json(Exercicio);
    } catch (error) {
        next(error);
    }
};

export const getExercicios = async (req, res, next) => {
    try {
        const Exercicios = await Exercicio.find();
        res.status(200).json(Exercicios);
    } catch (error) {
        next(error);
    }
};