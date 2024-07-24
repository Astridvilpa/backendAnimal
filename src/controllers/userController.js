const userController = {}
const { User } = require("../models/index");

userController.create =  async (req, res) => {
    const { name, lastName, email, password, role_id } = req.body;
  
    await User.create({
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      role_id: role_id || 2,
    });
  
    res.status(200).json({
      success: true,
      message: "Usuario creado con èxito",
    });
  }


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
    const userData = req.body;
  
    await User.update(userData, {
      where: {
        id: userId,
      },
    });
  
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  }

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


module.exports = userController