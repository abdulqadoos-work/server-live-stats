'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sportId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sports',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      team1Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      team2Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      location: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      team1PlayGround: {
        allowNull: false,
        type: Sequelize.STRING
      },
      team2PlayGround: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('games')
  }
};
