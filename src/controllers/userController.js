const userController = {};
const bcrypt = require("bcrypt");
const { Appointment, Service, Pet, Veterinario, User, Role  } = require("../models/index");


userController.getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
    res.status(200).json({
      success: true,
      message: "Usuarios recuperados con éxito",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar usuarios",
      error: error.message,
    });
  }
};

userController.getById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });

    if (!user) {
      return res.status(404).json({
        success: true,
        message: "Usuario no encontrado",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar usuario",
      error: error.message,
    });
  }
};

userController.update = async (req, res) => {
  const userId = req.params.id;
  const { password, role_id, ...restUserData } = req.body;

  try {
    const userToUpdate = await User.findByPk(userId);

    if (!userToUpdate) {
      res.status(404).json({
        success: true,
        message: "User not found",
      });
      return;
    }

    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      userToUpdate.password = hashedPassword;
    }

    userToUpdate.set({
      ...userToUpdate,
      ...restUserData,
    });

    await userToUpdate.save();

    res.status(200).json({
      success: true,
      message: "User update successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Users",
      error: error.message,
    });
  }
};

userController.delete = async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteResult = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (deleteResult === 0) {
      res.status(404).json({
        success: true,
        message: "Usuario no encontrado",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
};

userController.getUserProfile = async (req, res) => {
  const userId = req.tokenData.userId;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      include: {
        model: Role,
        as: "role",
        attributes: ["name"],
      },
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar usuario",
      error: error.message,
    });
  }
};


userController.updateUserProfile = async (req, res) => {
  const userId = req.tokenData.userId;
  const { password, role_id, ...restUserData } = req.body;

  try {
    const userToUpdate = await User.findByPk(userId);

    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      userToUpdate.password = hashedPassword;
    }

    userToUpdate.set({
      ...userToUpdate,
      ...restUserData,
    });

    await userToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Usuario modificado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al modificar usuario",
      error: error.message,
    });
  }
};

userController.getUserPets = async (req, res) => {
  try {
   
    const userId = req.tokenData.userId;

    
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Pet,
          attributes: {
            exclude: ["createdAt", "updatedAt", "user_id"],
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mascotas encontradas",
      data: user.Pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar las mascotas",
      error: error.message,
    });
  }
};

module.exports = userController;


