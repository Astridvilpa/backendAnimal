const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/petController")


// public
router.post("/", ctrl.create);
router.put("/:id", ctrl.update );
router.delete("/:id", ctrl.delete);



// protect

router.get("/", ctrl.getAll );
router.get("/:id", ctrl.getById);



module.exports = router