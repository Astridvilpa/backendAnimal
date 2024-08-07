const veterinarioController = {}
const { Appointment, Service, Pet, Veterinario, User, Role } = require("../models/index");



veterinarioController.create = async (req, res) => {
    const { name, especialidad } = req.body;
  
    try {
      const veterinario = await Veterinario.create({ name, especialidad });
      res.status(201).json({
        success: true,
        message: "Veterinario creado exitosamente",
        data: veterinario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear veterinario",
        error: error.message,
      });
    }
  };


veterinarioController.getAll = async (req, res) => {
    try {
      const veterinarios = await Veterinario.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({
        success: true,
        message: "Veterinario creado exitosamente",
        data: veterinarios,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al recuperar un veterinario",
        error: error.message,
      });
    }
  };


  veterinarioController.getById = async (req, res) => {
    const veterinarioId = req.params.id;
  
    try {
      const veterinario = await Veterinario.findByPk(veterinarioId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
  
      if (!veterinario) {
        return res.status(404).json({
          success: true,
          message: "Veterinario no encontrado",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: veterinario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al recuperar al veterinario",
        error: error.message,
      });
    }
  };

  veterinarioController.update = async (req, res) => {
    const veterinarioId = req.params.id;
    const veterinarioData = req.body;
  
    try {
      await Veterinario.update(veterinarioData, {
        where: {
          id: veterinarioId,
        },
      });
  
      res.status(200).json({
        success: true,
        message: "Veterinario modificado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al modificar veterinario",
        error: error.message,
      });
    }
  };


  veterinarioController.delete = async (req, res) => {
    const veterinarioId = req.params.id;
  
    try {
      const deleteResult = await Veterinario.destroy({
        where: {
          id: veterinarioId,
        },
      });
  
      if (deleteResult === 0) {
        res.status(404).json({
          success: true,
          message: "Veterinario no encontrado",
        });
        return;
      }
  
      res.status(200).json({
        success: true,
        message: "veterinario eliminado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar veterinario",
        error: error.message,
      });
    }
  };

module.exports = veterinarioController

