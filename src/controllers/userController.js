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
      message: "User created successfully",
    });
  }


userController.getAll = async (req, res) => {
    const users = await User.findAll();
  
    res.status(200).json({
      success: true,
      message: "Users retreived successfully",
      data: users,
    });
  }


userController.getById =  async (req, res) => {
    const userId = req.params.id;
  
    const user = await User.findByPk(userId);
  
    res.status(200).json({
      success: true,
      message: "User retreived successfully",
      data: user,
    });
  }

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

  userController.delete =  async (req, res) => {
    const userId = req.params.id;
  
    await User.destroy({
      where: {
        id: userId,
      },
    });
  
    res.status(200).json({
      success: true,
      message: "User delete successfully",
    });
  }



module.exports = userController