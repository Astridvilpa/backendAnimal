const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./database/db");
const { User } = require("./models/index");
const { where } = require("sequelize");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/api/healthy", (req, res) => {
  res.status(200).json({
    success: true,
    message: "My APP server is healthy",
  });
});

// CRUD users
// create
app.post("/api/users", async (req, res) => {
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
});

// Get all
app.get("/api/users", async (req, res) => {
  const users = await User.findAll();

  res.status(200).json({
    success: true,
    message: "Users retreived successfully",
    data: users,
  });
});

// get by id

app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByPk(userId);

  res.status(200).json({
    success: true,
    message: "User retreived successfully",
    data: user,
  });
});

// update

app.put("/api/users/:id", async (req, res) => {
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
});

// delete

app.delete("/api/users/:id", async (req, res) => {
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
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database authenticated");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch(() => {
    console.error("Error authenticating database:");
  });
