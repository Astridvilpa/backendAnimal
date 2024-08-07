const petController = {};
const { Appointment, Service, Pet, Veterinario, User, Role  } = require("../models/index");

petController.create = async (req, res) => {
  const { name, type, user_id } = req.body;

  try {
    const pet = await Pet.create({ name, type, user_id });
    res.status(201).json({
      success: true,
      message: "Mascota creada exitosamente",
      data: pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear mascota",
      error: error.message,
    });
  }
};

petController.getAll = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({
      success: true,
      message: "Mascota creada exitosamente",
      data: pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar mascota",
      error: error.message,
    });
  }
};

petController.getById = async (req, res) => {
  const petId = req.params.id;

  try {
    const pet = await Pet.findByPk(petId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!pet) {
      return res.status(404).json({
        success: true,
        message: "Mascota no encontrada",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar mascota",
      error: error.message,
    });
  }
};

petController.update = async (req, res) => {
  const petId = req.params.id;
  const petData = req.body;

  try {
    await Pet.update(petData, {
      where: {
        id: petId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Mascota modificada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al modificar Mascota",
      error: error.message,
    });
  }
};

petController.delete = async (req, res) => {
  const petId = req.params.id;

  try {
    const deleteResult = await Pet.destroy({
      where: {
        id: petId,
      },
    });

    if (deleteResult === 0) {
      res.status(404).json({
        success: true,
        message: "Mascota no encontrada",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Mascota eliminada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar mascota",
      error: error.message,
    });
  }
};


petController.getPetAppointments = async (req, res) => {
  const petId = req.params.id;

  try {
    const pet = await Pet.findByPk(petId, {
      include: [
        {
          model: Appointment,
          as: 'appointments',
          include: [
            {
              model: Service,
              as: 'service',
              attributes: ['name'],
            },
            {
              model: Veterinario,
              as: 'veterinario',
              attributes: ['name'],
            },
          ],
          attributes: { exclude: ['createdAt', 'updatedAt', 'Service_id', 'Pet_id', 'Veterinario_id', 'type' ] },
        },
      ],
      attributes: ['id', 'name', 'type'],
    });

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Mascota no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      data: pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar las citas de la mascota",
      error: error.message,
    });
  }
};


module.exports = petController;


