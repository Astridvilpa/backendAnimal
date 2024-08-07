const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/petController")
const auth = require("../middlewares/auth")
const authorize = require("../middlewares/authorize")


// public
router.post("/",auth, ctrl.create);
router.put("/:id", auth, ctrl.update );
router.delete("/:id", auth, ctrl.delete);



// protect

router.get("/",auth, authorize("super_admin"), ctrl.getAll );
router.get("/:id", auth, ctrl.getById);
router.get("/:id/appointments", auth, ctrl.getPetAppointments);



module.exports = router

