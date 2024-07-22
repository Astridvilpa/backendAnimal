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
      "services",
      [
        {
          id:1,
          name: "Servicio de peluqueria",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:2,
          name: "Servicio de veterinario",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:3,
          name: "Servicio de guarderia",
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

    await queryInterface.bulkDelete("services", null, {});
  },
};
