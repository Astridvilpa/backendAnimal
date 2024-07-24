const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/appointmentController")

router.post("/", ctrl.create);
router.get("/", ctrl.getAll );
router.get("/", ctrl.getById);
router.put("/", ctrl.update );
router.delete("/:id", ctrl.delete);

module.exports = router