const express = require('express');
const router = express.Router();
const ctrl = require("../controllers/appointmentController");

// Public routes
router.post("/", ctrl.create);

// Protected routes
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.delete);

module.exports = router;