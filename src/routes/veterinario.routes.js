const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/veterinarioController")
const auth = require("../middlewares/auth")
const authorize = require("../middlewares/authorize")

// public
router.get("/", ctrl.getAll );


// protect
router.post("/", auth, authorize("super_admin"), ctrl.create);
router.get("/:id",auth, authorize("super_admin"), ctrl.getById);
router.put("/:id",auth, authorize("super_admin"), ctrl.update );
router.delete("/:id",auth, authorize("super_admin"), ctrl.delete);

module.exports = router

