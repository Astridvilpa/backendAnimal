const express = require('express');
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middlewares/auth");
const { authorize } = require("../middlewares/authorize");

// Rutas públicas
router.post('/', auth, appointmentController.createAppointment);

// Rutas protegidas
router.get("/", auth, authorize("super_admin"), appointmentController.getAll);
router.get("/user", auth, appointmentController.getUserAppointments);
router.get("/:id", auth, appointmentController.getById);
router.put("/:id", auth, appointmentController.update);
router.delete("/:id", auth, appointmentController.deleteAppointment);

module.exports = router;

