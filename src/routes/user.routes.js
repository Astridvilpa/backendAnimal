const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/userController")
const auth = require("../middlewares/auth");

// user routes

router.get("/profile",auth,  ctrl.getUserProfile);
router.put("/profile",auth, ctrl.updateUserProfile);



// protected  routes



router.get("/", ctrl.getAll );
router.get("/:id",auth, ctrl.getById);
router.put("/:id", auth, ctrl.update );
router.delete("/:id", auth, ctrl.delete);
router.get("/:id/pets", auth, ctrl.getUserPets);

module.exports = router