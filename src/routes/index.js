const express = require('express')
const router = express.Router()
const userRoutes = require("./user.routes")
const appointmentRoutes = require("./appointment.routes")
const petRoutes = require("./pet.routes")
const serviceRoutes = require("./service.routes")
const veterinarioRoutes = require("./veterinario.routes")





router.use("/users", userRoutes)
router.use("/appointments", appointmentRoutes)
router.use("/pets", petRoutes)
router.use("/services", serviceRoutes)
router.use("/veterinarios", veterinarioRoutes)



module.exports = router