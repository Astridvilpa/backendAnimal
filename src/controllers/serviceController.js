const serviceController = {}
const { Appointment, Service, Pet, Veterinario, User, Role  } = require("../models/index");

serviceController.create = async (req, res) => {
    const { name } = req.body;
  
    try {
      if (!name) {
        res.status(400).json({
          success: true,
          message: "Informacion invalida",
        });
        return;
      }
      await Service.create({
        name,
        
      });
  
      res.status(200).json({
        success: true,
        message: "Servicio creado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear un servicio",
        error: error.message,
      });
    }
  };

  serviceController.getAll = async (req, res) => {
    try {
      const services = await Service.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({
        success: true,
        message: "Servicio creado exitosamente",
        data: services,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al recuperar servicio",
        error: error.message,
      });
    }
  };
  
  serviceController.getById = async (req, res) => {
    const serviceId = req.params.id;
  
    try {
      const service = await Service.findByPk(serviceId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
  
      if (!service) {
        return res.status(404).json({
          success: true,
          message: "Servicio no encontrado",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: service,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al recuperar servicio",
        error: error.message,
      });
    }
  };
  

  serviceController.update = async (req, res) => {
    const serviceId = req.params.id;
    const serviceData = req.body;
  
    try {
      await Service.update(serviceData, {
        where: {
          id: serviceId,
        },
      });
  
      res.status(200).json({
        success: true,
        message: "Servicio modificado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al modificar servicio",
        error: error.message,
      });
    }
  };

  serviceController.delete = async (req, res) => {
    const serviceId = req.params.id;
  
    try {
      const deleteResult = await Service.destroy({
        where: {
          id: serviceId,
        },
      });
  
      if (deleteResult === 0) {
        res.status(404).json({
          success: true,
          message: "Servicio no encontrado",
        });
        return;
      }
  
      res.status(200).json({
        success: true,
        message: "Servicio eliminado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar servicio",
        error: error.message,
      });
    }
  };

module.exports = serviceController

