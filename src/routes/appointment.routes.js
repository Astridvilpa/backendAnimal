const express = require('express');
const router = express.Router();
const ctrl = require("../controllers/appointmentController");
const auth = require("../middlewares/auth")

// Public routes
router.post("/",auth, ctrl.create);

// Protected routes
router.get("/",auth, ctrl.getAll);
router.get("/:id",auth, ctrl.getById);
router.put("/:id",auth, ctrl.update);
router.delete("/:id",auth, ctrl.delete);

module.exports = router;