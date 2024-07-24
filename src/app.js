const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./database/db");

const { where } = require("sequelize");
const userController = require("./controllers/userController")

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
app.post("/api/users", userController.create);
app.get("/api/users", userController.getAll );
app.get("/api/users/:id", userController.getById);
app.put("/api/users/:id", userController.update );
app.delete("/api/users/:id", userController.delete);

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
