const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/appointmentController")



// public
router.post("/", ctrl.create);
router.get("/", ctrl.getById);



// protect
router.get("/", ctrl.getAll );
router.put("/", ctrl.update );
router.delete("/:id", ctrl.delete);

module.exports = router