const express = require('express');
const router = express.Router();
const petController = require("../controllers/petController");
const auth = require("../middlewares/auth");
const { authorize, allowUserOrAdmin } = require("../middlewares/authorize");

// Rutas públicas
router.post("/", auth, allowUserOrAdmin(), petController.create);
router.put("/:id", auth, allowUserOrAdmin(), petController.update);
router.delete("/:id", auth, allowUserOrAdmin(), petController.delete);

// Rutas protegidas
router.get("/", auth, allowUserOrAdmin(), petController.getAll);
router.get("/:id", auth, allowUserOrAdmin(), petController.getById);
router.get("/:id/appointments", auth, allowUserOrAdmin(), petController.getPetAppointments);

module.exports = router;