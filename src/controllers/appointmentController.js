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

    const appointment = await Appointment.create({ 
      type, 
      date, 
      Service_id: service_id,  // Asegúrate de usar el nombre correcto del campo
      Pet_id: pet_id,           // Asegúrate de usar el nombre correcto del campo
      Veterinario_id: veterinario_id,  // Asegúrate de usar el nombre correcto del campo
      user_id 
    });

    console.log('Cita creada:', appointment); // Log para verificar la cita creada

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
      attributes: { exclude: ["createdAt", "updatedAt", "service_id", "pet_id", "veterinario_id", "user_id"] },
    });
    
    console.log("Appointments retrieved:", appointments); // Log para verificar los datos recuperados

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

    console.log("Appointment retrieved by ID:", appointment); // Log para verificar los datos recuperados por ID

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
  const { type, date, service_id, pet_id, veterinario_id } = req.body;

  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      console.log(`Cita con ID ${appointmentId} no encontrada.`);
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada",
      });
    }

    // Actualiza los campos necesarios
    appointment.type = type || appointment.type;
    appointment.date = date || appointment.date;
    appointment.Service_id = service_id || appointment.Service_id;
    appointment.Pet_id = pet_id || appointment.Pet_id;
    appointment.Veterinario_id = veterinario_id || appointment.Veterinario_id;

    // Guarda los cambios
    await appointment.save();

    // Obtén la cita actualizada
    const updatedAppointment = await Appointment.findByPk(appointmentId, {
      include: [
        { model: Service, as: "service", attributes: ['name'] },
        { model: Pet, as: "pet", attributes: ['name', 'type'] },
        { model: Veterinario, as: "veterinario", attributes: ['name'] },
        { model: User, as: "user", attributes: ['name', 'lastName'] }
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    console.log("Cita modificada exitosamente:", updatedAppointment);
    return res.status(200).json({
      success: true,
      message: "Cita modificada exitosamente",
      data: updatedAppointment,
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

    console.log("Resultado de eliminación:", deleteResult); // Log para verificar el resultado de la eliminación

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
          attributes: ['name', 'lastName'], 
        }
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    console.log("User appointments retrieved:", appointments); // Verifica que los datos relacionados estén presentes

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