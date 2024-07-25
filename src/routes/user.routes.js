const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/userController")

// user routes

router.get("/profile",  ctrl.getUserProfile);
router.put("/profile", ctrl.updateUserProfile);



// protected  routes


router.post("/", ctrl.create);
router.get("/", ctrl.getAll );
router.get("/:id", ctrl.getById);
router.put("/:id", ctrl.update );
router.delete("/:id", ctrl.delete);
router.get("/:id/pets", ctrl.getUserPets);

module.exports = router