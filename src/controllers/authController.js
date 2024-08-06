const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {};

authController.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Datos recibidos:", { name, email, password });

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Campos de registro no válidos",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role_id: 2,
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: "Usuario registrado correctamente",
      token: token,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    if (error.name === 'SequelizeValidationError') {
      error.errors.forEach((e) => {
        console.error(e.message);
      });
    }
    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
      error: error.message,
    });
  }
};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const user = await User.findOne({
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const tokenPayLoad = {
      userId: user.id,
      userRoleName: user.role.name,
    };

    const token = jwt.sign(tokenPayLoad, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });

    res.status(200).json({
      success: true,
      message: "Login correcto",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login incorrecto",
      error: error.message,
    });
  }
};

module.exports = authController;