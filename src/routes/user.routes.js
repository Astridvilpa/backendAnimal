const express = require('express');
const router = express.Router();
const ctrl = require("../controllers/userController");
const auth = require("../middlewares/auth");
const { authorize, allowUserOrAdmin } = require("../middlewares/authorize");

// user routes
router.get("/profile", auth, ctrl.getUserProfile);
router.put("/profile", auth, ctrl.updateUserProfile);

// protected routes
router.get("/", auth, authorize("super_admin"), ctrl.getAll);
router.get("/:id", auth, ctrl.getById);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, authorize("super_admin"), ctrl.delete);

// Nueva ruta para obtener las mascotas del usuario autenticado
router.get("/pets", auth, ctrl.getUserPets);

module.exports = router;