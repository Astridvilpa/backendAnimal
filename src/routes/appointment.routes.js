const express = require('express');
const router = express.Router();
const ctrl = require("../controllers/appointmentController");
const auth = require("../middlewares/auth")
const authorize = require("../middlewares/authorize")

// Public routes
router.post("/",auth, ctrl.create);

// Protected routes
router.get("/",auth,authorize("super_admin"), ctrl.getAll);
router.get("/:id",auth, ctrl.getById);
router.put("/:id",auth, ctrl.update);
router.delete("/:id",auth, ctrl.delete);

module.exports = router;