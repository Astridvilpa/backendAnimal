const appointmentController = {}
const { Appointment, Service, Pet, Veterinario, User, Role } = require("../models");

appointmentController.create = async (req, res) => {
    const { type, date, Service_id, Pet_id, Veterinario_id } = req.body;
  
    try {
      const appointment = await Appointment.create({ type, date, Service_id, Pet_id, Veterinario_id });
      res.status(201).json({
        success: true,
        message: "Cita creada exitosamente",
        data: appointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear cita",
        error: error.message,
      });
    }
  };

appointmentController.getAll = async (req, res) => {
    try {
      const appointments = await Appointment.findAll({
        include: [
            {
              model: Service,
              as: "service",
              attributes: ['name'],
            },
            {
              model: Pet,
              as: "pet",
              attributes: ['name', 'type'],
            },
            {
              model: Veterinario,
              as: "veterinario",
              attributes: ['name'],
            },
          ],
        attributes: { exclude: ["createdAt", "updatedAt", "Service_id", "Pet_id", "Veterinario_id" ] },
      });
      res.status(200).json({
        success: true,
        message: "Citas recuperadas exitosamente",
        data: appointments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al recuperar citas",
        error: error.message,
      });
    }
  };

appointmentController.getById = async (req, res) => {
    const appointmentId = req.params.id;
  
    try {
      const appointment = await Appointment.findByPk(appointmentId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
  
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Cita no encontrada",
        });
      }
      res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al recuperar cita",
        error: error.message,
      });
    }
  };

appointmentController.update = async (req, res) => {
    const appointmentId = req.params.id;
    const appointmentData = req.body;
  
    try {
      await Appointment.update(appointmentData, {
        where: {
          id: appointmentId,
        },
      });
  
      res.status(200).json({
        success: true,
        message: "Cita modificada exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al modificar cita",
        error: error.message,
      });
    }
  };

appointmentController.delete = async (req, res) => {
    const appointmentId = req.params.id;
  
    try {
      const deleteResult = await Appointment.destroy({
        where: {
          id: appointmentId,
        },
      });
  
      if (deleteResult === 0) {
        res.status(404).json({
          success: false,
          message: "Cita no encontrada",
        });
        return;
      }
  
      res.status(200).json({
        success: true,
        message: "Cita eliminada exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar cita",
        error: error.message,
      });
    }
  };

module.exports = appointmentController;

