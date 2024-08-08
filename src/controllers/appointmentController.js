const { Appointment, Service, Pet, Veterinario, User } = require("../models");

const createAppointment = async (req, res) => {
  try {
    const { type, date, service_id, pet_id, veterinario_id } = req.body;
    const user_id = req.tokenData.userId;

    if (!type || !date || !service_id || !pet_id || !veterinario_id || !user_id) {
      console.log('Campos recibidos:', { type, date, service_id, pet_id, veterinario_id, user_id });
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: type, date, service_id, pet_id y veterinario_id son necesarios',
      });
    }

    const appointment = await Appointment.create({ type, date, service_id, pet_id, veterinario_id, user_id });
    res.status(201).json({
      success: true,
      message: 'Cita creada exitosamente',
      data: appointment,
    });
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear cita',
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
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
        {
          model: User,
          as: "user",
          attributes: ['name', 'lastName'], // Corrige los nombres de las columnas
        }
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "Service_id", "Pet_id", "Veterinario_id", "user_id"] },
    });
    console.log("Appointments retrieved:", appointments);
    res.status(200).json({
      success: true,
      message: "Citas recuperadas exitosamente",
      data: appointments,
    });
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error al recuperar citas",
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findByPk(appointmentId, {
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
        {
          model: User,
          as: "user",
          attributes: ['name', 'lastName'], // Corrige los nombres de las columnas
        }
      ],
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
    console.error("Error retrieving appointment by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error al recuperar cita",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
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
    console.error("Error updating appointment:", error);
    res.status(500).json({
      success: false,
      message: "Error al modificar cita",
      error: error.message,
    });
  }
};

const deleteAppointment = async (req, res) => {
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
    console.error("Error deleting appointment:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar cita",
      error: error.message,
    });
  }
};

const getUserAppointments = async (req, res) => {
  const userId = req.tokenData.userId;

  try {
    const appointments = await Appointment.findAll({
      where: { user_id: userId },
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
        {
          model: User,
          as: "user",
          attributes: ['name', 'lastName'], // Corrige los nombres de las columnas
        }
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "Service_id", "Pet_id", "Veterinario_id", "user_id"] },
    });

    console.log("User appointments retrieved:", appointments);
    res.status(200).json({
      success: true,
      message: "Citas del usuario recuperadas exitosamente",
      data: appointments,
    });
  } catch (error) {
    console.error("Error retrieving user appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener citas",
      error: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getAll,
  getById,
  update,
  deleteAppointment,
  getUserAppointments,
};