const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/serviceController")

// public
router.get("/", ctrl.getAll );
router.get("/:id", ctrl.getById);



// protect

router.post("/", ctrl.create);
router.put("/:id", ctrl.update );
router.delete("/:id", ctrl.delete);




module.exports = router