"use strict";

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
      "veterinarios",
      [
        {
          id:1,
          name: "Dr. Alejandro Gómez",
          especialidad: "Medicina General",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:2,
          name: "Dra. Beatriz Martínez",
          especialidad: "Medicina General",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:3,
          name: "Dr. Gustavo Sánchez",
          especialidad: "Peluquería",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:4,
          name: "Dr. Carlos Hernández",
          especialidad: "Peluquería",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:5,
          name: "Dr. Ernesto Ramírez",
          especialidad: "Guardería",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:6,
          name: "Dra. Helena Fernández",
          especialidad: "Guardería",
          createdAt: new Date(),
          updatedAt: new Date(),
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
    await queryInterface.bulkDelete("veterinarios", null, {});
  },
};
