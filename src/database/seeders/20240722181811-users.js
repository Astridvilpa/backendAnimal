"use strict";
const bcrypt = require("bcrypt");
const plainPassword = "12345678";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id:1,
          name: "Juan",
          lastName: "Pérez",
          email:"juan.perez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:1,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          id:2,
          name: "María ",
          lastName: "López",
          email:"maria.lopez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:2,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          id:3,
          name: "Carlos",
          lastName: "Sánchez",
          email:"carlos.sanchez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:2,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          id:4,
          name: "Ana",
          lastName: "Martínez",
          email:"ana.martinez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:2,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          id:5,
          name: "José",
          lastName: "Gómez",
          email:"jose.gomez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:2,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          id:6,
          name: "Laura",
          lastName: "Díaz",
          email:"laura.diaz@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:2,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          id:7,
          name: "Luis",
          lastName: "Fernández",
          email:"luis.fernandez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:2,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          id:8,
          name: "Carmen",
          lastName: "Rodríguez",
          email:"carmen.rodriguez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:2,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          id:9,
          name: "Miguel",
          lastName: "Ramírez",
          email:"miguel.ramirez@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:2,
          createdAt: new Date(),
          updatedAt:new Date()
        },
        {
          id:10,
          name: "Elena",
          lastName: "García",
          email:"elena.garcia@example.com",
          password: bcrypt.hashSync(plainPassword, 10),
          role_id:2,
          createdAt: new Date(),
          updatedAt:new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", null, {});
  },
};
