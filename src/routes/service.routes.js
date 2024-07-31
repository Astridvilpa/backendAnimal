const express = require('express')
const router = express.Router()
const ctrl = require("../controllers/serviceController")
const auth = require("../middlewares/auth")
const authorize = require("../middlewares/authorize")

// public
router.get("/", ctrl.getAll );
router.get("/:id", ctrl.getById);



// protect

router.post("/", auth, authorize("super_admin"), ctrl.create);
router.put("/:id",auth, authorize("super_admin"), ctrl.update );
router.delete("/:id",auth, authorize("super_admin"), ctrl.delete);




module.exports = router