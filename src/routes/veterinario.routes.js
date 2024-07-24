const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/veterinarioController")

// public
router.get("/", ctrl.getAll );


// protect
router.post("/", ctrl.create);
router.get("/:id", ctrl.getById);
router.put("/:id", ctrl.update );
router.delete("/:id", ctrl.delete);

module.exports = router