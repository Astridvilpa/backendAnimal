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
      "appointments",
      [
        {
          id:1,
          type: "Medicina General",
          date: "2024-08-01 11:30:00",
          Service_id:2,
          Pet_id:1,
          Veterinario_id: 1,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:2,
          type: "Peluqueria",
          date: "2024-08-02 12:00:00",
          Service_id:1,
          Pet_id:2,
          Veterinario_id:4,
          user_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:3,
          type: "Guarderia",
          date: "2024-08-03 07:00:00",
          Service_id:3,
          Pet_id:3,
          Veterinario_id:6,
          user_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:4,
          type: "Peluqueria",
          date: "2024-08-04 12:30:00",
          Service_id:1,
          Pet_id:4,
          Veterinario_id:3,
          user_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:5,
          type: "Medicina General",
          date: "2024-08-05 13:00:00",
          Service_id:2,
          Pet_id:5,
          Veterinario_id:1,
          user_id: 6, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:6,
          type: "Guarderia",
          date: "2024-08-06 08:00:00",
          Service_id:3,
          Pet_id:6,
          Veterinario_id:5,
          user_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:7,
          type: "Peluqueria",
          date: "2024-08-07 14:00:00",
          Service_id:1,
          Pet_id:7,
          Veterinario_id:3,
          user_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:8,
          type: "Medicina General",
          date: "2024-08-08 14:30:00",
          Service_id:2,
          Pet_id:8,
          Veterinario_id:2,
          user_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:9,
          type: "Guarderia",
          date: "2024-08-09 07:30:00",
          Service_id:3,
          Pet_id:9,
          Veterinario_id:5,
          user_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:10,
          type: "Medicina General",
          date: "2024-08-10 15:30:00",
          Service_id:2,
          Pet_id:10,
          Veterinario_id:2,
          user_id: 2,
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

    await queryInterface.bulkDelete('appointments', null, {});
  },
};
